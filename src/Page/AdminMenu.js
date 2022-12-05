
import { NavLink, Route, Routes } from 'react-router-dom'
import HeaderAdmin from '../Components/Header/HeaderAdmin'
import './Admin.css'
import AdminCharts from './AdminCharts'
import AdminFoodDrinks from './AdminFoodsDrinks'
import AdminMovies from './AdminMovies'
import AdminUsers from './AdminUsers'
import InfoAdmin from './InfoAdmin/InfoAdmin'

export default function AdminMenu() {
  return (
    <>
      <HeaderAdmin />
      <div className="nav-side-menu">
        <div className="brand">Trang quản lý</div>
        <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
        <div className="menu-list">
          <ul id="menu-content" className="menu-content collapse out">

            <i className="fa fa-dashboard fa-lg"></i>Các chức năng
            {/* <li> <NavLink end to="Info" > <i className="fa fa-user fa-lg"></i> Thông tin cá nhân</NavLink></li> */}
            <li data-toggle="collapse" data-target="#products" className="collapsed">
              <a href="#"><i className="fa fa-file-video fa-lg"></i> Quản lý phim <span className="arrow"></span></a>
            </li>
            <ul className="sub-menu collapse" id="products">
              <li> <NavLink end to="Movies" >Danh sách phim</NavLink></li>
              <li> <NavLink end to="Movies/Add" >Tạo phim mới</NavLink></li>
            </ul>

            <li data-toggle="collapse" data-target="#service" className="collapsed">
              <a href="#"><i className="fa fa-pizza-slice fa-lg"></i> Quản lý combo <span className="arrow"></span></a>
            </li>
            <ul className="sub-menu collapse" id="service">
              <li> <NavLink end to="Foods" >Danh sách combo</NavLink></li>
              <li> <NavLink end to="Foods/Add" >Thêm đồ ăn</NavLink></li>
            </ul>


            <li> <NavLink end to="Users/"> <i className="fa fa-user fa-lg"></i> Danh sách người dùng</NavLink> </li>

            <li data-toggle="collapse" data-target="#new" className="collapsed">
              <a href="#"><i className="fas fa-chart-bar fa-lg"></i> Thống kê <span className="arrow"></span></a>
            </li>
            <ul className="sub-menu collapse" id="new">
              <li> <NavLink end to="Charts/"> Tổng quát</NavLink> </li>
            </ul>
          </ul>
        </div>

      </div>
      <div style={{ marginLeft: "240px" }}>
        {/* , display: "flex"  */}
        <Routes>
          <Route path="Info" element={<InfoAdmin />} />
          <Route path="Movies/*" element={<AdminMovies />} />
          <Route path="Foods/*" element={<AdminFoodDrinks />} />
          <Route path="Users/*" element={<AdminUsers />} />
          <Route path="Charts/*" element={<AdminCharts />} />
        </Routes>
      </div>

    </>
  )
}