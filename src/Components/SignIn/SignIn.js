
import { useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import isEmpty from 'validator/lib/isEmpty';
import './SignIn.css'
import '../Button/Button.css'
import swal from 'sweetalert'
import { signInAction } from '../../Redux/Action/AccountActions';
import { useNavigate } from 'react-router-dom/dist';
import { SIGN_IN } from '../../Redux/Constant/accountConst';
import { API_ACCOUNTS } from '../../common/ApiController';
import { useContext } from "react";
import { StoreContext } from '../../Redux/Store/Store';

export default function SignIn() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isInvalid, setInvalid] = useState();
    const navigate = useNavigate()
    const store = useContext(StoreContext)
    const handleClick = async (e) => {
        let info = {
            taiKhoan: userName,
            matKhau: password
        }
        swal({
            icon: "info",
            title: "Xin chờ giây lát",
            buttons: false,
        });
        let res = await fetch(API_ACCOUNTS.SIGNIN, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(info),
        })
        let dataUser = await res.json();
        if (res.status === 200) {
            swal({
                title: "Đăng nhập thành công!",
                text: "",
                icon: "success",
                buttons: false,
                timer: 1000
            })
            const {
                token,
                data,
                expiresIn /*taiKhoan, maLoaiNguoiDung, ...authSignIn*/,
            } = dataUser;
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem(
                "maLoaiNguoiDung",
                JSON.stringify(data.maLoaiNguoiDung)
            );
            localStorage.setItem("taiKhoan", JSON.stringify(data.tentaiKhoan));
            localStorage.setItem("thoiHan", JSON.stringify(expiresIn));
            store.accounts.AccountDispatch({
                type: "SIGN_IN",
                payload: localStorage.getItem("taiKhoan"),
            });
            if (JSON.parse(localStorage.getItem("maLoaiNguoiDung")) === "0") {
                setTimeout(() => { navigate("/Admin/Movies") }, 1000);
            }
            else swal({
                title: "Bạn không có quyền truy cập!",
                text: "",
                icon: "warning",
                buttons: false,
            });
        }
        else
            swal({
                title: "Tài khoản hoặc mật khẩu chưa đúng",
                text: "Hãy thử lại",
                icon: "warning",
                dangerMode: true,
            });
    }
    return (
        <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src="admin-signin.svg"
                        className="img-fluid" alt="Không tải được ảnh" />
                </div>
                <div id="loginform">
                    <h2 id="headerTitle">Đăng nhập</h2>
                    <div>
                        <div className="signin">
                            <label>Tài khoản</label>
                            <input type="text" placeholder="Nhập mật khẩu"
                                onChange={(e) =>
                                    setUserName(e.target.value)
                                } />
                        </div>
                        <div className="signin">
                            <label>Mật khẩu</label>
                            <input type="password" placeholder="Nhập mật khẩu"
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                } />
                        </div>
                        <div>
                            <button style={{ margin: "20px 0px 20px 120px" }} className="button-custom yes" onClick={() => {
                                handleClick()
                            }}>Đồng ý</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
