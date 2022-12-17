
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Redux/Store/Store';
// import { Link } from 'react-scroll'; // react-scroll is a library for scrolling in React
import './HeaderAdmin.css'
import { logOut } from '../../Redux/Action/AccountActions';
import Avatar from '@mui/material/Avatar';

const HeaderAdmin = () => {
  const store = useContext(StoreContext);
  const [userName, setUserName] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    setUserName(store.accounts.userAccount.account?.slice(1, -1));
  }, [store.accounts.userAccount.account]);

  return (
    <>
      <div id="navbar" style={{ top: "0px", height: "60px" }}>
        <nav class="close">
          {console.log(">> TEST HEADER")}
          <i class="bx bx-user-circle"></i>
          <NavLink end to="/Admin/Info"><span><Avatar sx={{ bgcolor: '#eaa0ad' }}>{userName && userName[0]}</Avatar></span></NavLink>
          <NavLink><span onClick={() => logOut({ store, navigate })}>Đăng xuất</span></NavLink>

        </nav>
        <i class="bx bx-menu"></i>

      </div>
    </>
  )
}

export default HeaderAdmin;