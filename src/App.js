import React, { useEffect, useContext, } from "react";
import { StoreContext } from "./Redux/Store/Store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import PrivateAdminRoutes from "./utils/PrivateAdminRoutes";
import SignIn from "./Components/SignIn/SignIn";
import AdminMenu from "./Page/AdminMenu";
import NotFound from "./Components/NotFound/NotFound";
import { Offline, Online } from "react-detect-offline";
import NoInternetConnection from "./Components/NoInternetConnection/NoInternetConnection";

function App() {
  const store = useContext(StoreContext);
  useEffect(() => {
    store.accounts.AccountDispatch({
      type: "SIGN_IN",
      payload: localStorage.getItem("taiKhoan"),
    });
  }, [localStorage.getItem("taiKhoan")]);
  return (
    <div>
      <BrowserRouter>
        {/* <HeaderAdmin /> */}
        <Offline>
          <NoInternetConnection />
        </Offline>
        <Online>
          <Routes >
            <Route path="/AdminSignIn" element={<SignIn />} />
            <Route element={<PrivateAdminRoutes />}>
              <Route exact path="/" element={<Navigate to="/Admin/Movies" replace />} />
              <Route path="/Admin/*" element={<AdminMenu />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Online>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
