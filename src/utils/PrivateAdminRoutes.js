import { Outlet, useNavigate } from "react-router-dom";
import CheckExpiredToken from "./CheckExpiredToken";

const PrivateAdminRoutes = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("taiKhoan")) CheckExpiredToken();
  let token = JSON.parse(localStorage.getItem("token"));

  // console.log(">> token", token)
  let isAdmin =
    JSON.parse(localStorage.getItem("maLoaiNguoiDung")) === "0" ? true : false;

  // console.log(">> isAdmin", isAdmin)
  return isAdmin ? <Outlet /> : (token ? navigate(-1) : navigate("/AdminSignIn"));
};
export default PrivateAdminRoutes;
