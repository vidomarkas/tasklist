import React from "react";

import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <img className="header__logo" src={logo} alt="" />
        <h1 className="header__title">TodoList</h1>
      </div>
    </header>
  );
}

export default Header;
