import React from "react";
import { Routes, Route } from "react-router-dom";
import Showtimes from "./Showtimes/Showtimes";
import "../App.css";
import AllFoodDrinks from "./FoodDrinks/AllFoodDrinks";
import AddFDForm from "../Components/AddFDForm/AddFDForm";
import EditMovieModal from "../Components/EditMovieModal/EditMovieModal";
import AllFoodDrinks2 from "./FoodDrinks/AllFoodDrinks2";
import NotFound from "../Components/NotFound/NotFound";

export default function AdminFoodDrinks() {
  return (
    // <div className="admin-page">
    /* <HeaderAdmin /> */
    <>
      <div className="general" style={{ marginTop: "1em" }}>
        <Routes>
          <Route path="/" element={<AllFoodDrinks2 />} />
          <Route path="/Add" element={<AddFDForm />} />
          <Route path="/:slug/showtimes" element={<Showtimes />} />
          <Route path="/Edit" element={<EditMovieModal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>

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
