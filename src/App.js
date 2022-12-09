import React, { useEffect, useContext } from "react";
import { StoreContext } from "./Redux/Store/Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { API_USER } from "./common/ApiController";
import PrivateAdminRoutes from "./utils/PrivateAdminRoutes";
import HeaderAdmin from "./Page/Header/HeaderAdmin";
import SignIn from "./Components/SignIn/SignIn";
import AdminMenu from "./Page/AdminMenu";
import AdminMovies from "./Page/AdminMovies";
import AdminFoodDrinks from "./Page/AdminFoodsDrinks";
import Header from "./Components/Header/HeaderAdmin";


function App() {
  const store = useContext(StoreContext);
  useEffect(() => {
    store.accounts.AccountDispatch({
      type: "SIGN_IN",
      payload: localStorage.getItem("taiKhoan"),
    });
  }, [localStorage.getItem("taiKhoan")]);

  useEffect(() => {
    if (store.accounts.userAccount.account) {
      store.accounts.AccountDispatch({
        type: "SIGN_IN",
        payload: localStorage.getItem("taiKhoan"),
      });
      // let token = JSON.parse(localStorage.getItem("token"));
      // fetch(API_USER.PROFILE, {
      //   headers: {
      //     //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
      //     "Content-Type": "application/json",
      //     Authorization: `Basic ${token}`,
      //   },
      //   method: "GET",
      // })
      //   .then((res) => res.json())
      //   .then((dt) =>
      //     store.accounts.AccountDispatch({
      //       type: "SIGN_IN",
      //       payload: dt.data,
      //     })
      //   );
    }
  }, [store.accounts.userAccount.account]);
  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<SignIn />} />
          {/* <Route path="/" element={<Home />} /> */}

          <Route element={<PrivateAdminRoutes />}>
            <Route path="/Admin/*" element={<AdminMenu />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
