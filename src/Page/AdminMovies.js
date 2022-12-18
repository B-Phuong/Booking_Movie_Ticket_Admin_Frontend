import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMovies from "./Movies/AllMovies";
import AddMovieForm from "../Components/AddMovieForm/AddMovieForm";
import Showtimes from "./Showtimes/Showtimes";
import AllMoviesTest from "./Movies/AllMoviesTest";
import EditMovieModal from "../Components/EditMovieModal/EditMovieModal";
import AllMovies2 from "./Movies/AllMovies2";
import NotFound from "../Components/NotFound/NotFound";
// const MenuAdmin = React.memo(() => (
//   <div className="vertical-menu">
//     <NavLink defaultValue end to="/Admin">
//       Danh sách phim
//     </NavLink>
//     <NavLink end to="/Admin/movie">
//       Tạo phim mới
//     </NavLink>
//   </div>
// ));

export default function AdminMovies() {
  return (
    // <div className="admin-page">
    //   <HeaderAdmin />
    <>
      <div className="general" style={{ marginTop: "1em" }}>
        <Routes>
          <Route path="/" element={<AllMovies2 />} />
          <Route path="/Add" element={<AddMovieForm />} />
          <Route path="/:slug/showtimes" element={<Showtimes />} />
          <Route path="/Edit" element={<EditMovieModal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>

  );
}
