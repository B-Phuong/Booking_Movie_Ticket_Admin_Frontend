import React, { useEffect, useContext } from "react";
import { StoreContext } from "./Redux/Store/Store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { API_USER } from "./common/ApiController";
import PrivateAdminRoutes from "./utils/PrivateAdminRoutes";

import SignIn from "./Components/SignIn/SignIn";
import AdminMenu from "./Page/AdminMenu";


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

    }
  }, [store.accounts.userAccount.account]);
  return (
    <div>
      <BrowserRouter>
        {/* <HeaderAdmin /> */}

        <Routes >

          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<SignIn />} />
          <Route element={<PrivateAdminRoutes />}>
            <Route path="/Admin/*" element={<AdminMenu />} />
          </Route>
          {/* <Route exact path="/" element={<Navigate to="/Admin/Movies" replace />} /> */}
          {/* <Route element={<PrivateAdminRoutes />}>
            <Route exact path="/" element={<Navigate to="/Admin/Movies" replace />} />
          </Route> */}

        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
