import React from "react";
import logo from "../images/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место Россия" className="header__logo" />
    </header>
  );
};

export default Header;
