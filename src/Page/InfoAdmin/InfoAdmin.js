import React, { useEffect, useContext, useState, useRef } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { Card, Modal, Spinner } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Button } from "../../Components/Button/Button"
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { List } from "react-content-loader";
import { getDetailAdminAction } from "../../Redux/Action/UserActions";

function InfoAdmin(props) {
  const store = useContext(StoreContext);
  const [image, setDisplayImage] = useState();
  const [fileImage, setFileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let emptyUser = {
    tenTaiKhoan: "",
    email: "",
    hoTen: "",
  };
  const [detailUser, setDetailUser] = useState(emptyUser);
  let data = store.accounts.AdminDetail?.adminDetail
  useEffect(() => {
    setLoading(true);

    getDetailAdminAction({ store })
    let admin = store.accounts.AdminDetail?.adminDetail
    // console.log(">> detail user:", store.users?.listUsers);
    setDetailUser({
      tenTaiKhoan: admin?.tentaiKhoan,
      email: admin?.email,
      hoTen: admin?.hoTen,
    });
    setLoading(false)
  }, []);

  console.log(">> detail user:", detailUser);
  if (!loading)
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
            THÔNG TIN CÁ NHÂN
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
                    required
                    type="text"
                    name="tenPhim"
                    value={detailUser?.tenTaiKhoan}
                    readOnly
                  />

                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Ngày khởi chiếu"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="date"
                    name="ngayKhoiChieu"
                  // isInvalid={isInvalid}             
                  />

                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Họ tên"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="hoTen"
                    min={"1"}
                    value={detailUser?.hoTen}
                  />

                </FloatingLabel>
              </Form.Group>
            </Row>
          </div>
        </Form>
        {/* </div> */}
      </div>
    );
  else {
    return (
      <><List /></>
    )
  }
}
/*className="container mt-3"*/
export default InfoAdmin;
