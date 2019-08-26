import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./userPopup.scss";

function userPopup(props) {
  const handleExit = () => {
    props.history.push("/");
  };

  const handlePageChange = destination => props.history.push(`/${destination}`);

  const loginFormat = (
    <Fragment>
      <h3 className="editor-title">To continue, log in to PalettePicker.</h3>
      <label htmlFor="">Enter Username</label>
      <input type="text" name="username" />
      <label htmlFor="">Enter Password</label>
      <input type="password" name="password" />
      <button className="submit-btn">Login</button>
      <button
        className="submit-btn"
        onClick={() => handlePageChange("register")}
      >
        new user?
      </button>
    </Fragment>
  );

  const registerFormat = (
    <Fragment>
      <h3 className="editor-title">Sign up with a username and password.</h3>
      <label htmlFor="">Enter Username</label>
      <input type="email" name="email" />
      <label htmlFor="">Enter Password</label>
      <input type="text" name="password" />
      <button className="submit-btn">Register</button>
      <button className="submit-btn" onClick={() => handlePageChange("login")}>
        Already have an account?
      </button>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="screen" />
      <section className="SavePopup">
        <button className="editor-exit" onClick={handleExit}>
          X
        </button>
        <form className="editor-form">
          {props.location.pathname === "/login" ? loginFormat : registerFormat}
        </form>
      </section>
    </Fragment>
  );
}

export default userPopup;
