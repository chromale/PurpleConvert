import React from "react";
import "./Header.css";
import logo from "../../Images/logo.png";

const Header = () => (
  <header className="PurpleConvertHeader">
    <div className="PurpleConvertHeader-block _logo">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <div className="PurpleConvertHeader-block _title">
      <h1>Currency Converter</h1>
    </div>
  </header>
);

export default Header;
