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
  let admin = store.accounts.AdminDetail?.adminDetail
  useEffect(() => {
    setLoading(true);
    getDetailAdminAction({ store })
    let admin = store.accounts.AdminDetail?.adminDetail
    console.log(">> detail admin:", admin);

    setLoading(false)
  }, []);

  console.log(">> detail user:", admin);
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
                  label="Tên tài khoản"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="tenTaiKhoan"
                    value={admin?.tentaiKhoan}
                    readOnly
                  />

                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control
                    value={admin?.email}
                    readOnly
                    type="text"
                    name="email"
                  // isInvalid={isInvalid}             
                  />

                </FloatingLabel>
              </Form.Group>

            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Họ tên"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="hoTen"
                    value={admin?.hoTen}
                    readOnly
                  />

                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Số điện thoại"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="hoTen"
                    value={admin?.SDT}
                    readOnly
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
