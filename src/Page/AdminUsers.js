import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Showtimes from "./Showtimes/Showtimes";
import "../App.css";
import { Link, NavLink } from "react-router-dom";
import AllUsers from "./Users/AllUsers";
import AllUsers2 from "./Users/AllUsers2";

// const MenuFDAdmin = React.memo(() => (
//   <div className="vertical-menu">
//     <NavLink end to="/Admin/Users">
//       Danh sách người dùng
//     </NavLink>
//   </div>
// ));
export default function AdminUsers() {
  return (
    // <div className="admin-page">
    /* <HeaderAdmin /> */
    <div className="general" style={{ marginTop: "1em" }}>
      <Routes>
        <Route path="/" element={<AllUsers2 />} />
      </Routes>
    </div>
    /* <div className="vertical-menu">
            <Link to="#" className="active">
                Tất cả phim
            </Link>
            <NavLink end to="/Admin/movie">
                Tạo phim mới
            </NavLink>
            <Link to="#">Phim được yêu thích</Link>
        </div> */
    // </div>
  );
}
