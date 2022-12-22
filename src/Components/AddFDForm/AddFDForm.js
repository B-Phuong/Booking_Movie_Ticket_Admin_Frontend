import React, { useContext, useState } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { Card } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import "../../Page/Movies/MovieManage.css"
import { addFDAction } from "../../Redux/Action/FDActions";
function AddFDForm(props) {
  const store = useContext(StoreContext);
  const [image, setDisplayImage] = useState();
  const [fileImage, setFileImage] = useState("");
  const [isInvalid, setInvalid] = useState();
  const navigate = useNavigate();
  let emptyFD = {
    tenCombo: "",
    moTa: "",
    ghiChu: "",
    giaGoc: "",
    hinhAnh: "",
    giamGia: "",
  };
  const [detailFD, setDetailFD] = useState(emptyFD);
  const initModal = () => {
    setDetailFD(emptyFD);
    setDisplayImage();
  };
  const checkValid = (event) => {
    let temp = document.getElementsByName(event.target.name).item(0);
    // console.log(">> temp.checkValidity()", temp.checkValidity());
    // console.log(">> temp", temp);
    if (temp.name === "image" && image) {
      return temp.classList.remove("is-invalid");
    }
    if (
      (isEmpty(temp.value) ||
        temp.checkValidity() === false ||
        temp.value.trim() === 0) &&
      temp.required
    ) {
      event.preventDefault();
      temp.classList.add("is-invalid");
    } else temp.classList.remove("is-invalid");
    checkInvalidAndRerender();
  };

  const checkInvalidAndRerender = () => {
    //console.log(isInvalid === undefined)
    if (document.getElementsByClassName("is-invalid add-fd").length > 0) {
      // console.log(">> STILL INVALID");
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

  const AddFDAction = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (fileImage != null && fileImage != "")
      fd.append("hinhAnh", fileImage, fileImage.name);
    for (let keyOfObj in detailFD) {
      fd.append(keyOfObj, detailFD[keyOfObj]);
    }
    addFDAction({ store, fd, navigate })
  };
  const handleAdd = async (e, movie) => {
    AddFDAction(e);
  };

  // console.log(">> isInvalid", isInvalid);

  const uploadImage = async (event) => {
    if (event.target.files[0] != null) {
      setFileImage(event.target.files[0]);
      // console.log('>> uploadImage', event.target.files[0])
      let url = URL.createObjectURL(event.target.files[0]);
      setDisplayImage(url);
    }
  };
  return (
    <div
      style={{
        marginLeft: "40px",
        background: "transparent",
        paddingLeft: "20px",
        marginBottom: "20px",
        width: "100%"
      }}
    >
      <Form id="create-form">
        <Form.Label style={{ fontWeight: "bold" }}>THÔNG TIN COMBO</Form.Label>
        <div style={{ background: "transparent", width: "100%" }}>
          {/* <Form style={{ maxWidth: "800px" }} noValidate validated={validated} onSubmit={handleEdit}> */}
          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <FloatingLabel
                controlId="floatingInput"
                label="Tên combo"
                className="mb-3"
              >
                <Form.Control
                  className="is-invalid add-fd"
                  required
                  type="text"
                  name="tenCombo"
                  onChange={(event) => {
                    checkValid(event);
                    detailFD.tenCombo = event.target.value;
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Nhập tên cho combo
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row style={{ paddingBottom: "40px" }}>
            <Form.Group className="col-5">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                className="is-invalid add-fd"
                as="textarea"
                name="moTa"
                rows={4}
                onChange={(event) => {
                  checkValid(event);
                  detailFD.moTa = event.target.value;
                }}
              />
            </Form.Group>
            <Form.Group className="col-5">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                name="ghiChu"
                rows={4}
                onChange={(event) => {
                  detailFD.ghiChu = event.target.value;
                }}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustom04">
              <FloatingLabel
                controlId="floatingInput"
                label="Giá tiền (VNĐ)"
                className="mb-3"
              >
                <Form.Control
                  className="is-invalid add-fd"
                  type={"number"}
                  name="giaGoc"
                  min={"1000"}
                  step={"1000"}
                  required
                  onChange={(event) => {
                    checkValid(event);
                    detailFD.giaGoc = event.target.value;
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Số tiền không được âm
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Bước nhảy là 1.000 VNĐ
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} md="5" controlId="validationCustom04">
              <FloatingLabel
                controlId="floatingInput"
                label="Giảm giá (%)"
                className="mb-3"
              >
                <Form.Control
                  className="is-invalid add-fd"
                  type={"number"}
                  name="giamGia"
                  min={"0"}
                  required
                  onChange={(event) => {
                    checkValid(event);
                    detailFD.giamGia = event.target.value;
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Phần giảm giá không được âm
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              style={{ width: "24rem" }}
              controlId="validationCustom05"
            >
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                className="is-invalid add-fd"
                type="file"
                name="image"
                onChange={(event) => {
                  checkValid(event);
                  uploadImage(event);
                }}
              />
              <Card style={{ alignItems: "center", background: "transparent" }}>
                <Card.Img
                  style={{
                    maxHeight: "8rem",
                    maxWidth: "fit-content",
                  }}
                  variant="top"
                  required
                  src={image}
                />
              </Card>
              <Form.Control.Feedback type="invalid">
                Vui lòng chọn hình ảnh cho combo
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="button-custom yes"
              name="Tạo combo"
              borderRadius="0.4em"
              disabled={isInvalid === undefined ? true : isInvalid}
              onClick={(e) => handleAdd(e)}
            >
              Tạo combo
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
        </div>
      </Form>
      {/* </div> */}
    </div>
  );
}
/*className="container mt-3"*/
export default AddFDForm;
