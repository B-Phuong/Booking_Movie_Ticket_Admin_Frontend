import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { StoreContext } from "../Redux/Store/Store";

const CheckExpiredToken = () => {
  const navigate = useNavigate();
  const store = useContext(StoreContext);
  let dateNow = new Date(); // Auto logout
  let timeNow = dateNow.getTime();
  // Auto logout
  let expireTime = localStorage.getItem("thoiHan") * 1000;
  let countdown = expireTime - timeNow;
  setTimeout(() => {
    localStorage.clear();
    swal("Phiên đăng nhập đã hết hạn").then((value) => {
      switch (value) {
        case true:
          store.accounts.AccountDispatch({
            type: "SIGN_IN",
            payload: localStorage.getItem("taiKhoan"),
          });
          navigate("/");
          break;
        default:
          navigate("/");
          return;
      }
    });
  }, countdown);
};
export default CheckExpiredToken;
