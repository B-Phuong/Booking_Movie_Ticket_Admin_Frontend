
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar'
import { Link, NavLink } from 'react-router-dom';
import { StoreContext } from '../../Redux/Store/Store';
// import { Link } from 'react-scroll'; // react-scroll is a library for scrolling in React
import './HeaderAdmin.css'
import { logOut } from '../../Redux/Action/AccountActions';
const HeaderAdmin = () => {
  const store = useContext(StoreContext);
  const [userName, setUserName] = useState();
  useEffect(() => {
    setUserName(store.accounts.userAccount.account?.slice(1, -1));
  }, [store.accounts.userAccount.account]);
  return (
    <>
      <header id="navbar" style={{ top: "0px" }}>
        <nav class="close">

          <i class="bx bx-user-circle"></i>
          <NavLink end to="/Admin/Info" ><span>{userName}</span></NavLink>

          <a href="/#">
            <i class="bx bx-home-smile" onClick={() => logOut({ store })}></i>
            <span>Đăng xuất</span>
          </a>

        </nav>
        <i class="bx bx-menu"></i>

      </header>
    </>
  )
}

export default HeaderAdmin;