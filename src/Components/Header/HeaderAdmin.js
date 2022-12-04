
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Redux/Store/Store';
// import { Link } from 'react-scroll'; // react-scroll is a library for scrolling in React
import './HeaderAdmin.css'
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
          <a href="/#">
            <i class="bx bx-home-smile"></i>
            <span>Home</span>
          </a>
          <a href="/#">
            <i class="bx bx-info-circle"></i>
            <span>About</span>
          </a>
          <a href="/#">
            <i class="bx bx-message-square-detail"></i>
            <span>Contact</span>
          </a>
          <a href="/#">
            <i class="bx bx-user-circle"></i>
            <span>Profile</span>
          </a>
          <a href="/#">
            <i class="bx bx-user-circle"></i>
            <span>{userName}</span>
          </a>
        </nav>
        <i class="bx bx-menu"></i>

      </header>
    </>
  )
}

export default HeaderAdmin;