import React from "react";

import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="header__container">
      <div className="header__box">
        <img className="header__logo" src={logo} alt="" />
        <h1 className="header__title">TaskList</h1>
      </div>
    </header>
  );
}

export default Header;
