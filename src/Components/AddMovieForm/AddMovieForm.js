import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_MOVIE } from "../../common/ApiController";
import { Button } from "../Button/Button";
import isEmpty from "validator/lib/isEmpty";
import swal from "sweetalert";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import "../../Page/Movies/MovieManage.css";
import { addMovieAction } from "../../Redux/Action/MovieActions";

function AddMovieForm(props) {
  const store = useContext(StoreContext);
  const [image, setDisplayImage] = useState();
  const [fileImage, setFileImage] = useState(null);
  const [banner, setDisplayBanner] = useState();
  const [fileBanner, setFileBanner] = useState(null);
  const [isInvalid, setInvalid] = useState();
  const navigate = useNavigate();
  let emptyMovie = {
    tenPhim: "",
    hinhAnh: "",
    moTa: "",
    ngayKhoiChieu: "",
    thoiLuong: "",
    trailer: "",
    anhBia: "",
    theLoai: [],
    quocGia: "",
  };
  // const navigate = useNavigate();
  const [detailMovie, setDetailMovie] = React.useState(emptyMovie);
  const initModal = () => {
    setDetailMovie(emptyMovie);
    setDisplayImage();
  };
  const AddMovieAction = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (fileImage != null) fd.append("hinhAnh", fileImage, fileImage.name);
    if (fileBanner != null) fd.append("anhBia", fileBanner, fileBanner.name);
    for (let keyOfObj in detailMovie) {
      fd.append(keyOfObj, detailMovie[keyOfObj]);
    }
    swal({
      icon: "info",
      title: "Xin chờ giây lát",
      buttons: false,
    });
    addMovieAction({ store, fd, navigate })
  };

  const handleAdd = (e) => {
    e.preventDefault();
    // console.log(">> before add", detailMovie)
    // AddMovieAction(e);
  };
  // console.log(">> Invalid in add movie", isInvalid);
  const formattedDate = (dateInput) => {
    let today = new Date(dateInput);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  };

  const uploadImage = async (event) => {
    if (event.target.files[0] != null) {
      setFileImage(event.target.files[0]);
      // console.log(">> uploadImage", event.target.files[0]);
      let url = URL.createObjectURL(event.target.files[0]);
      setDisplayImage(url);
    }
  };
  const uploadBanner = async (event) => {
    if (event.target.files[0] != null) {
      setFileBanner(event.target.files[0]);
      // console.log(">> uploadBanner", event.target.files[0]);
      let url = URL.createObjectURL(event.target.files[0]);
      setDisplayBanner(url);
    }
  };
  const checkValid = (event) => {
    let temp = document.getElementsByName(event.target.name).item(0);
    // console.log(">> temp.checkValidity()", temp.checkValidity());
    // console.log(">> temp", temp);
    if (
      (temp.name === "banner" && banner) ||
      (temp.name === "image" && image)
    ) {
      return temp.classList.remove("is-invalid");
    }
    if (
      (isEmpty(temp.value) ||
        temp.checkValidity() == false ||
        temp.value.trim() == 0) &&
      temp.required
    ) {
      event.preventDefault();
      temp.classList.add("is-invalid");
    } else temp.classList.remove("is-invalid");
    checkInvalidAndRerender();
  };

  const checkInvalidAndRerender = () => {
    //console.log(isInvalid === undefined)
    if (document.getElementsByClassName("is-invalid add-movie").length > 0) {
      // If needed
      if (!isInvalid || isInvalid === undefined) {
        setInvalid(true);
      }
    } else {
      // Should be rerender
      if (isInvalid || isInvalid === undefined) {
        setInvalid(false);
      }
    }
  };
  var today = new Date();
  var nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);
  return (
    <div
      style={{
        marginLeft: "40px",
        background: "transparent",
        paddingLeft: "20px",
        marginBottom: "20px",
      }}
    >
      <Form id="create-form">
        <Form.Label style={{ fontWeight: "bold" }}>
          THÔNG TIN PHIM MỚI
        </Form.Label>
        <div style={{ background: "transparent", width: "925px" }}>
          {/* <Form style={{ maxWidth: "800px" }} noValidate validated={validated} onSubmit={handleEdit}> */}
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <FloatingLabel
                controlId="floatingInput"
                label="Tên phim"
                className="mb-3"
              >
                <Form.Control
                  className="is-invalid add-movie"
                  required
                  type="text"
                  name="tenPhim"
                  // isInvalid={isInvalid}
                  onChange={(e) => {
                    checkValid(e);
                    detailMovie.tenPhim = e.target.value;
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Nhập tên cho phim
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <FloatingLabel
                controlId="floatingInput"
                label="Ngày khởi chiếu"
                className="mb-3"
              >
                <Form.Control
                  className="is-invalid add-movie"
                  required
                  type="date"
                  name="ngayKhoiChieu"
                  // isInvalid={isInvalid}
                  min={formattedDate(nextMonth)}
                  onChange={(event) => {
                    checkValid(event);
                    detailMovie.ngayKhoiChieu = event.target.value;
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Chọn ngày khởi chiếu cho phim
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <FloatingLabel
                controlId="floatingInput"
                label="Thời lượng"
                className="mb-3"
              >
                <Form.Control
                  className="is-invalid add-movie"
                  type="number"
                  name="thoiLuong"
                  min={"1"}
                  // isInvalid={isInvalid}
                  required
                  onChange={(event) => {
                    checkValid(event);
                    detailMovie.thoiLuong = event.target.value; //== "-0" || event.target.value == "0" ? "-1" : event.target.value,
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Nhập thời lượng lớn hơn 0
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" style={{ width: "92%" }}>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              onChange={(event) => {
                detailMovie.moTa = event.target.value;
              }}
            />
          </Form.Group>
          <Row className="mb-3">
            <div className="row">
              <div className="col-md-5">
                Thể loại
                <Multiselect
                  isObject={false}
                  onRemove={(event) => {
                    //checkValid(event);
                    //setDetailMovie({ ...detailMovie, theLoai: event });
                    detailMovie.theLoai = event;
                  }}
                  onSelect={(event) => {
                    //checkValid(event);
                    //setDetailMovie({ ...detailMovie, theLoai: event });
                    detailMovie.theLoai = event;
                    // console.log(">>  detailMovie.theLoai", detailMovie.theLoai)
                  }}
                  options={[
                    "Kinh dị",
                    "Hài hước",
                    "Lãng mạn",
                    "Hành động",
                    "Hoạt hình",
                    "Viễn tưởng",
                    "Tâm lý",
                  ]}
                  selectedValues={detailMovie.theLoai}
                  showCheckbox
                  hidePlaceholder
                  placeholder="Nhấp để chọn"
                />
              </div>
              <div className="col-md-5">
                Quốc gia
                <Form.Select
                  // aria-label="Default select example"
                  onChange={
                    (e) => (detailMovie.quocGia = e.target.value)
                    // setDetailMovie({ ...detailMovie, quocGia: e.target.value })
                  }
                >
                  <option>Chọn quốc gia</option>
                  <option value="Mỹ">Mỹ</option>
                  <option value="Việt Nam">Việt Nam</option>
                  <option value="Anh">Anh</option>
                  <option value="Pháp">Pháp</option>
                  <option value="Nhật">Nhật</option>
                  <option value="Thái Lan">Thái Lan</option>
                  <option value="Hàn">Hàn</option>
                  <option value="Khác">Khác</option>
                </Form.Select>
              </div>
              <div className="col-md-6"></div>
            </div>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="5"
              // style={{ width: "20rem" }}
              controlId="validationCustom05"
            >
              <Form.Label>Ảnh bìa</Form.Label>
              <Form.Control
                className="is-invalid add-movie"
                type="file"
                ////// isInvalid={isInvalid}
                onChange={(event) => {
                  checkValid(event);
                  uploadBanner(event);
                }}
                name="banner"
                required
                md="6"
              />
              <Card style={{ alignItems: "center", background: "transparent" }}>
                <Card.Img
                  style={{ maxHeight: "8rem", maxWidth: "fit-content" }}
                  variant="top"
                  src={banner || detailMovie?.anhBia}
                />
              </Card>
              <Form.Control.Feedback type="invalid">
                Vui lòng chọn ảnh bìa cho phim
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="5"
              // style={{ width: "18rem" }}
              controlId="validationCustom05"
            >
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                className="is-invalid add-movie"
                type="file"
                required
                name="image"
                onChange={(event) => {
                  checkValid(event);
                  uploadImage(event);
                }}
              />
              <Card style={{ alignItems: "center", background: "transparent" }}>
                <Card.Img
                  style={{ maxHeight: "8rem", maxWidth: "fit-content" }}
                  variant="top"
                  src={image || detailMovie?.hinhAnh}
                />
              </Card>
              <Form.Control.Feedback type="invalid">
                Vui lòng chọn ảnh đại diện cho phim
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="button-custom yes"
            name="Tạo phim"
            borderRadius="0.4em"
            disabled={isInvalid === undefined ? true : isInvalid}
            onClick={(e) => handleAdd(e)}
          >
            Tạo phim
          </button>
          <button
            className="button-custom no"
            name="Hủy"
            borderRadius="0.4em"
            onClick={initModal}
          >
            Hủy
          </button>
        </div>
      </Form >
      {/* </div> */}
    </div >
  );
}
export default AddMovieForm;
