import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { Col, FloatingLabel, Modal, Row } from "react-bootstrap";

import isEmpty from "validator/lib/isEmpty";
import swal from "sweetalert";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "../Button/Button";
import { addShowtimeAction } from "../../Redux/Action/ShowtimeActions";
import { getAllRoomsAction } from "../../Redux/Action/RoomActions"
import Swal from "sweetalert2";
import SweetAlert from "react-swal";

function AddShowtimeModal(props) {
  const [isShow, setInvokeModal] = useState(false);
  const [isInvalid, setInvalid] = useState(true);
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  // const [validationMsg, setValidationMsg] = React.useState({
  //   ngayChieu: "Vui lòng chọn ngày chiếu cho phim",
  // });

  const [validated, setValidated] = useState(true);
  let emptyShowtime = {
    ngayChieu: "",
    gioChieu: "",
    phutChieu: "",
    tenRap: "",
  };
  const [detailShowtime, setDetailShowtime] = useState(emptyShowtime);
  const [listShowtimes, setListShowtimes] = useState([]);
  const [failed, setFailedList] = useState([])
  // console.log("*", detailShowtime);
  // console.log("**", props.clusterName);
  useEffect(() => {
    if (!(store.movie?.FailedShowtimes?.failed || []).isEmpty) {
      setFailedList(store.movie?.FailedShowtimes?.failed || []);
      setFail(true)
      setListShowtimes([])
    }
    else {
      setFail(false)
    }
  }, [store.movie?.FailedShowtimes?.failed])
  let price = {
    Mon: "95000",
    Tue: "95000",
    Wed: "75000",
    Thu: "95000",
    Fri: "115000",
    Sat: "115000",
    Sun: "115000",
  };
  const checkPrice = (e) => {
    const formatDay = e.target.value;
    const dayName = new Date(formatDay).toString().split(" ")[0];
    let priceTicket = price[dayName];
    setDetailShowtime({
      ...detailShowtime,
      ngayChieu: formatDay,
      giaVe: priceTicket,
    });
  };
  useEffect(() => {
    getAllRoomsAction({ store })
  }, []);

  const [fail, setFail] = useState(false)
  const AddShowtimeAction = async (e) => {
    e.preventDefault();
    let body = listShowtimes
    await addShowtimeAction({ store, body, navigate, props })

  };
  let rooms = store.lsRooms?.Rooms?.rooms;
  if (rooms) {
    rooms = rooms.sort((a, b) => a.tenRap.localeCompare(b.tenRap));
  }
  const initModal = () => {
    setInvokeModal(!isShow);
    setDetailShowtime(emptyShowtime);
    rooms = rooms.sort((a, b) => a.tenRap.localeCompare(b.tenRap));
    setListShowtimes([])
    setFailedList([])
    setInvalid(true)
  };
  const formattedDate = (dateInput) => {
    let today = new Date(dateInput);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  };

  const handleClick = (e) => {
    AddShowtimeAction(e);
    // setInvokeModal(true)
  };
  const checkValid = (event) => {
    let temp = document.getElementsByName(event.target.name).item(0);
    if (
      (isEmpty(temp.value) || temp.value.toString() === "") &&
      temp.required
    ) {
      event.preventDefault();
      //temp.className = "is-invalid add-showtime form-select";
      temp.classList.add("is-invalid");
    } else {
      //temp.className = "form-select";
      temp.classList.remove("is-invalid");
    }
    // Check and rerender if needed
    checkInvalidAndRerender();
  };

  const checkInvalidAndRerender = () => {
    // console.log("isInvalid", isInvalid);
    if (document.getElementsByClassName("is-invalid add-showtime").length > 0) {
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
  const handleAddList = (e, movie) => {
    setFail(false)
    // console.log(">> listShowtimes test")
    let formatDateTime = `${detailShowtime.ngayChieu} ${detailShowtime.gioChieu}:${detailShowtime.phutChieu}`;

    const getTimeEnd = (datetime) => {
      let getTime = new Date(datetime).getTime() + (props.duration + 10) * 60000; // thêm 10p để rạp chuẩn bị suất chiếu tiếp theo
      console.log(">> getTime", getTime)
      return getTime
    }
    const getTime = (datetime) => {
      return new Date(datetime).getTime()
    }
    getTimeEnd(formatDateTime)
    const getDate = (datetime) => {
      return datetime.split(" ")[0]
    }

    let tenRap = document.querySelectorAll('select')[0].querySelector(`option[value="${detailShowtime.tenRap}"]`)

    let body = {
      ngayChieu: formatDateTime,
      tenRapBangChu: tenRap.innerHTML,
      tenRap: detailShowtime.tenRap,
      tenCumRap: props.clusterID,
      giaVe: detailShowtime.giaVe
    }
    let compareSameValues = listShowtimes.filter((item) => item.ngayChieu === body.ngayChieu
      && item.tenRap === body.tenRap);

    let compareSameTheaterWValidHourEnd = listShowtimes.filter((item) => getDate(item.ngayChieu) === getDate(body.ngayChieu) && item.tenRap === body.tenRap
      && ((getTime(item.ngayChieu) < getTime(body.ngayChieu) && getTime(body.ngayChieu) < getTimeEnd(item.ngayChieu))
        || getTime(item.ngayChieu) < getTimeEnd(body.ngayChieu) && getTimeEnd(body.ngayChieu) < getTimeEnd(item.ngayChieu)));
    // console.log(">> compareSameValues", compareSameValues)
    // console.log(">> compareSameTheaterWValidHourEnd", compareSameTheaterWValidHourEnd)
    //TH1: 19:20  -> 21:20
    //TH2: 17:20 --> 19:20  16 --> 18

    // 18:20 --> 20:20

    // test: 13:10  --> 15:10 
    // 17:30 --> 19:30
    //   start < x < timeEnd || start <timeEnd(x) < timeEnd

    if (listShowtimes.length > 0)
      if (compareSameValues.length === 0) {
        if (compareSameTheaterWValidHourEnd.length !== 0)
          return Swal.fire(`Giờ chiếu cách nhau ${Math.floor((props.duration + 10) / 60)} giờ ${(props.duration + 10) % 60} phút`)
        console.log(">> List showtimes", listShowtimes)
        return setListShowtimes([...listShowtimes, body])
      } else return Swal.fire('Lịch chiếu này đã được thêm vào lúc nãy')
    else return setListShowtimes([body])

  }
  var today = new Date();
  var chooseDate = new Date();
  var startDate = new Date(props.startDate)
  if (today > startDate)
    chooseDate.setDate(today.getDate() + 1);
  else {
    chooseDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
  }
  const handleDelete = (item, e) => {
    e.preventDefault()
    let listAfterRemoveItem = listShowtimes.filter((showtime) => showtime !== item)
    setListShowtimes(listAfterRemoveItem)
    console.log(">> List showtimes", listShowtimes)

  }
  return (
    <div>
      <Button
        color="black"
        name="Thêm lịch chiếu"
        background="pink"
        height="34px"
        borderRadius="10.2em"
        fontWeight="bold"
        onClick={initModal}
      />
      <Form id="edit-form" style={{ maxWidth: "800px" }}>
        <Modal size="lg" show={isShow}>
          <Modal.Header closeButton onClick={initModal}>
            <Modal.Title style={{ fontWeight: "bold" }}>
              THÊM LỊCH CHIẾU CHO RẠP{" "}
              <span style={{ color: "#e98d9d" }}>{props.clusterName}</span>
              <br />
              Phim khởi chiếu ngày {formattedDate(new Date(props.startDate))}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ background: "transparent", maxWidth: "800px" }}>
              <Form style={{ maxWidth: "800px" }}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Ngày chiếu"
                      className="mb-3"
                    >
                      <Form.Control
                        className="is-invalid add-showtime"
                        required
                        type="date"
                        name="ngayChieu"
                        min={formattedDate(chooseDate)}
                        onChange={(e) => {
                          checkValid(e);
                          checkPrice(e);
                          detailShowtime.ngayChieu = e.target.value;
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Chọn ngày khởi chiếu cho phim
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Rạp"
                      className="mb-3"
                    >
                      <Form.Select
                        className="is-invalid add-showtime"
                        required
                        name="rapChieu"
                        onChange={(e) => {
                          checkValid(e);
                          detailShowtime.tenRap = e.target.value;
                        }}
                      >
                        <option value="">Chọn rạp chiếu</option>
                        {rooms?.map((item, index) => {
                          return (
                            <option key={index} value={item._id}>
                              {item.tenRap}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Chọn rạp chiếu phim
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    {detailShowtime?.giaVe
                      ? `Giá vé: ${detailShowtime?.giaVe} VNĐ`
                      : ""}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Giờ"
                      className="mb-3"
                    >
                      <Form.Select
                        className="is-invalid add-showtime"
                        name="gioChieu"
                        onChange={(e) => {
                          checkValid(e);
                          detailShowtime.gioChieu = e.target.value;
                        }}
                        required
                      >
                        <option value="">Chọn giờ chiếu</option>
                        {Array.from(Array(15).keys())?.map((item, index) => {
                          return (
                            <option key={index} value={item + 9}>
                              {item + 9}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Chọn giờ chiếu cho phim
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group as={Col} md="4">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Phút"
                      className="mb-3"
                    >
                      <Form.Select
                        className="is-invalid add-showtime"
                        name="phutChieu"
                        required
                        onChange={(e) => {
                          checkValid(e);
                          detailShowtime.phutChieu = e.target.value;
                        }}
                      >
                        <option value="">Chọn phút chiếu</option>
                        {Array.from(Array(12).keys())?.map((item, index) => {
                          return (
                            <option key={index} value={item * 5}>
                              {item * 5}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Chọn ngày khởi chiếu cho phim
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                </Row>

                Các suất chiếu sẽ thêm  <br></br>
                {
                  listShowtimes?.map((item) => {
                    return (
                      <>
                        {item.tenRapBangChu} &nbsp;
                        {item.ngayChieu} &nbsp;
                        {item.giaVe} &nbsp;
                        <Button
                          color="black"
                          name={<i className="fa fa-trash"></i>}
                          background="pink"
                          width="30px"
                          height="30px"
                          borderRadius="10.2em"
                          fontWeight="bold"
                          onClick={(e) => {

                            handleDelete(item, e);
                          }}
                        />
                        <br />
                      </>
                    )
                  })

                }
                <br></br>
                Các lịch thêm thất bại <br></br>
                {
                  failed?.map((item, index) => {
                    return (
                      <div style={{ color: "red" }}>
                        {item.showtime.ngayChieu} tại {item.showtime.tenRapBangChu} -&gt;  &nbsp;
                        {item.error} &nbsp;
                        <br />
                      </div>
                    )
                  })
                }
              </Form>
            </div>

            {/* <EditForm /> */}
          </Modal.Body>

          <Modal.Footer>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                name="Thêm"
                className="button-custom no"
                style={{ background: "radial-gradient(100% 100% at 100% 0, #71ff5a 0, #35b853 100%)" }}
                borderRadius="0.4em"
                disabled={isInvalid === undefined ? true : isInvalid}
                onClick={(e, movie) => handleAddList(e, movie)}
              >
                Thêm
              </button>
              <button
                className="button-custom yes"
                name="Đồng ý"
                borderRadius="0.4em"
                disabled={listShowtimes.length == 0}
                onClick={(e, movie) => handleClick(e, movie)}
              >
                Đồng ý
              </button>
              <button
                className="button-custom no"
                name="Hủy"
                borderRadius="0.4em"
                onClick={() => navigate(0)}
              >
                Hủy
              </button>

            </div>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
}
export default AddShowtimeModal;
