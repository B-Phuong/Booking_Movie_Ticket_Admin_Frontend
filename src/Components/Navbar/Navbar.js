//Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ navClass, linkClassName }) => (
    <NavComponent navClass={navClass}
        linkClassName={linkClassName}
    />
);

export const NavComponent = ({ onClick, navClass, linkClassName }) => (
    <nav className={navClass}>
        {["Projects", "About", "Contact", "Footer"].map(section =>
            <Link to={section}
                smooth={true}
                className={linkClassName}
                onClick={onClick}>
                {section}
            </Link>
        )}
    </nav>
)
export default Navbar;