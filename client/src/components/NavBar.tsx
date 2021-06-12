import React from "react";
import {Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation ();
  const routes = [
    {path: '/', name: 'Dashboard'},
    {path: '/new-session', name: 'New Session'},
  ]
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-header">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="open-navbar1"
          >
            <span />
            <span />
            <span />
          </button>
          <Link to="/">
            <h4 className="header-title">
              <span>YouTube2Topics</span>
            </h4>
          </Link>
        </div>
        <div className="navbar-menu" id="open-navbar1">
          <ul className="navbar-nav">
            {routes.map(route => (
              <li className={`${location.pathname === route.path ? 'active' : ''}`} key={route.name}>
                <Link to={route.path}>{route.name}</Link>
              </li>
           ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;