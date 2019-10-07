import React from "./node_modules/react";
import { Link } from "./node_modules/react-router-dom";
import logo from "../../assets/logo.png";

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
