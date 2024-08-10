import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li><NavLink to='/cats'>Cats</NavLink></li>
            <li><NavLink to='/dogs'>Dogs</NavLink></li>
            <li><NavLink to='/computers'>Computers</NavLink></li>
        </ul>
        <Outlet />
    </nav>
);

export default Nav;