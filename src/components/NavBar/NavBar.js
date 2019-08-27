import React from "react";
import { withRouter } from "react-router-dom";
import "./NavBar.scss";

function NavBar(props) {
  const handleClick = (e, destination) => {
    e.preventDefault();
    props.history.push(`/${destination}`);
  };
  return (
    <header className="NavBar">
      <h2>PalettePicker</h2>
      <form className="navbar-form">
        <button onClick={e => handleClick(e, "login")}>Login</button>
        <button onClick={e => handleClick(e, "register")}>Register</button>
      </form>
    </header>
  );
}

export default withRouter(NavBar);
