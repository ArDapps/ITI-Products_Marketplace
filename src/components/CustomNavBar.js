import React from "react";
import { Link } from "react-router-dom";

const CustomNavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          ITI Market
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/create-product">
                Create Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/purchased-product">
                My Purchased Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/created-product">
                My Created Product
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default CustomNavBar;
