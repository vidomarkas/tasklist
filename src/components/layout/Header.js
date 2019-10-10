import React from "react";

import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="" />
      <h1>TodoList</h1>
    </header>
  );
}

export default Header;
