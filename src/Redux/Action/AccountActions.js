import { API_ACCOUNTS } from "../../common/ApiController";
import swal from 'sweetalert'
import Reducer from '../Reducer/ReducerAccounts'
import { SIGN_IN } from "../Constant/accountConst";
export const signInAction = ({ info, navigate }) => {
    return async (dispatch) => {
        let res = await fetch(API_ACCOUNTS.SIGNIN, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(info),
        });
        swal({
            icon: "info",
            title: "Xin chờ giây lát",
            buttons: false,
        });
        // console.log(">> res.json()", res.json());
        const token = JSON.parse(localStorage.getItem("token"));
        if (res.status === 200) {
            swal({
                title: "Đăng nhập thành công!",
                text: "",
                icon: "success",
                buttons: false,
            });
            const {
                token,
                data,
                expiresIn /*taiKhoan, maLoaiNguoiDung, ...authSignIn*/,
            } = res.json();
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem(
                "maLoaiNguoiDung",
                JSON.stringify(data.maLoaiNguoiDung)
            );
            localStorage.setItem("taiKhoan", JSON.stringify(data.tentaiKhoan));
            localStorage.setItem("thoiHan", JSON.stringify(expiresIn));
            dispatch({
                type: SIGN_IN,
                payload: res.json, //authSignIn,
            });

            if (JSON.parse(localStorage.getItem("maLoaiNguoiDung")) === "0") {
                navigate("/AdminSignIn");
            } else
                swal({
                    title: "Tài khoản hoặc mật khẩu chưa đúng",
                    text: "Hãy thử lại",
                    icon: "warning",
                    dangerMode: true,
                });
        };
    };
}

export const logOut = ({ store, navigate }) => {
    localStorage.clear();
    // console.log(">> store.accounts", store.accounts.userAccount)
    store.accounts.AccountDispatch({
        type: "SIGN_IN",
        payload: localStorage.getItem("taiKhoan"),
    });
    navigate("/AdminSignIn")
}