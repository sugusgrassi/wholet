import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <span className="footertext">Made with ♡ by <a href="https://sugusgrassi.netlify.app/" target="blank" className="footerlinks">@sugusgrassi</a></span>
            <NavLink className="footerlinks" activeClassName='is-active' to="/about">
            <span>About</span>
            </NavLink>
        </div>
    )
}

export default Footer