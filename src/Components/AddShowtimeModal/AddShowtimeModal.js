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
import Calendar from "../Calendar/Calender";

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
  const [warning, setWarningList] = useState([])
  let warningList = []
  let listShowtimesList = []
  // console.log("*", detailShowtime);
  // console.log("**", props.clusterName);
  useEffect(() => {
    if (!(store.movie?.FailedShowtimes?.failed || []).isEmpty) {
      setFailedList(store.movie?.FailedShowtimes?.failed || []);
      setFail(true)
      setListShowtimes([])
      setWarningList([])
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
    setWarningList([])
    setFailedList([])
    setInvalid(true)
    setTime()
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

  const getTimeEnd = (datetime) => {
    let getTime = new Date(datetime).getTime() + (props.duration + 10) * 60000; // thêm 10p để rạp chuẩn bị suất chiếu tiếp theo
    return getTime
  }
  const getDate = (datetime) => {
    return datetime.split(" ")[0]
  }
  const getTime = (datetime) => {
    return new Date(datetime).getTime()
  }
  const handleAddList = (e, movie) => {
    setFail(false)
    // console.log(">> listShowtimes test")
    list.forEach((item) => {
      let formatDateTime = `${item.ngayChieu} ${time}`;
      getTimeEnd(formatDateTime)
      const getSelectEmlements = document.querySelectorAll('select')
      let tenRap = getSelectEmlements[getSelectEmlements.length - 1].querySelector(`option[value="${detailShowtime.tenRap}"]`)
      let body = {
        ngayChieu: formatDateTime,
        tenRapBangChu: tenRap.innerHTML,
        tenRap: detailShowtime.tenRap,
        tenCumRap: props.clusterID,
        giaVe: item.giaVe
      }
      let compareSameValues = listShowtimes.filter((item) => item.ngayChieu === body.ngayChieu
        && item.tenRap === body.tenRap);
      let compareSameTheaterWValidHourEnd = listShowtimes.filter((item) => getDate(item.ngayChieu) === getDate(body.ngayChieu) && item.tenRap === body.tenRap
        && ((getTime(item.ngayChieu) <= getTime(body.ngayChieu) && getTime(body.ngayChieu) <= getTimeEnd(item.ngayChieu))
          || getTime(item.ngayChieu) <= getTimeEnd(body.ngayChieu) && getTimeEnd(body.ngayChieu) <= getTimeEnd(item.ngayChieu)));
      if (listShowtimes.length > 0)
        if (compareSameValues.length === 0) {
          if (compareSameTheaterWValidHourEnd.length !== 0)
            return warningList.push({ ngayChieu: formatDateTime, loi: `Giờ chiếu cách nhau ${Math.floor((props.duration + 10) / 60)} giờ ${(props.duration + 10) % 60} phút` })
          // console.log(">> List showtimes", listShowtimes)
          return listShowtimesList.push(body)//([...listShowtimes, body])
        } else return warningList.push({ ngayChieu: formatDateTime, loi: 'Lịch chiếu này đã được thêm vào lúc nãy' })
      else return listShowtimes.push(body)//setListShowtimes([body])
    })
    setWarningList(warningList)
    setListShowtimes([...listShowtimes, ...listShowtimesList])
    // let formatDateTime = `${detailShowtime.ngayChieu} ${detailShowtime.gioChieu}:${detailShowtime.phutChieu}`;

  }
  const handleDelete = (item, e) => {
    e.preventDefault()
    let listAfterRemoveItem = listShowtimes.filter((showtime) => showtime !== item)
    setListShowtimes(listAfterRemoveItem)
  }
  const [list, setList] = useState([])
  const [time, setTime] = useState()
  const handleAddMultiple = (newValue) => {
    if (list === newValue) { return }
    setList(newValue)
  }

  const handleChangeTime = (newValue) => {
    // console.log(">> show time ơ đây", newValue.$H + ":" + newValue.$m)
    setTime(newValue.$H + ":" + newValue.$m)
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
                <Calendar handleSet={handleAddMultiple} handleTime={handleChangeTime}
                  startDate={props.startDate} endDate={props.endDate} warning={warning}
                  failed={failed} />

                <Row className="mb-3">
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
                </Row>
                <div style={{ display: "flex" }}>

                  <div className="add-list" style={{ paddingLeft: "10px" }}>
                    Các suất chiếu sẽ thêm <br></br>
                    {
                      listShowtimes?.map((item, index) => {
                        return (
                          <>
                            {index + 1}.&nbsp;
                            {item.tenRapBangChu} vào &nbsp;
                            {item.ngayChieu} giá &nbsp;
                            <br></br>
                            {item.giaVe}/ vé  &nbsp;
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
                  </div>

                  <div className="error-list">
                    Các lịch thêm thất bại <br></br>
                    {
                      failed?.map((item, index) => {
                        return (
                          <div style={{ color: "red" }}>
                            {index + 1}.&nbsp;
                            {item.showtime.ngayChieu} tại {item.showtime.tenRapBangChu} &nbsp; -&gt;  &nbsp;
                            {item.error} &nbsp;
                            <br />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
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
                disabled={isInvalid === undefined || time === undefined ? true : isInvalid}
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
