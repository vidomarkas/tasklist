import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="" />
      <h1>TodoList</h1>
      <Link to="/">Home</Link> <Link to="/about">About</Link>
    </header>
  );
}

export default Header;
