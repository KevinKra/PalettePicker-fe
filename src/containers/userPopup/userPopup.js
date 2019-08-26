import React, { Component, Fragment } from "react";
import "./userPopup.scss";

class userPopup extends Component {
  state = {
    username: "",
    password: ""
  };

  handleExit = () => {
    this.props.history.push("/");
  };

  handlePageChange = destination => this.props.history.push(`/${destination}`);

  handleLogin = e => {
    console.log("logging in...");
    e.preventDefault();
    // login user
  };

  handleRegister = e => {
    console.log("Registering...");
    e.preventDefault();
    // register user
  };

  render() {
    const loginFormat = (
      <Fragment>
        <h3 className="editor-title">To continue, log in to PalettePicker.</h3>
        <form onSubmit={e => this.handleLogin(e)}>
          <label htmlFor="">Enter Username</label>
          <input type="text" name="username" />
          <label htmlFor="">Enter Password</label>
          <input type="password" name="password" />
          <button className="submit-btn">Login</button>
          <button
            className="submit-btn"
            onClick={() => this.handlePageChange("register")}
          >
            new user?
          </button>
        </form>
      </Fragment>
    );

    const registerFormat = (
      <Fragment>
        <h3 className="editor-title">Sign up with a username and password.</h3>
        <form onSubmit={e => this.handleRegister(e)}>
          <label htmlFor="">Enter Username</label>
          <input type="email" name="email" />
          <label htmlFor="">Enter Password</label>
          <input type="text" name="password" />
          <button className="submit-btn">Register</button>
          <button
            className="submit-btn"
            onClick={() => this.handlePageChange("login")}
          >
            Already have an account?
          </button>
        </form>
      </Fragment>
    );
    return (
      <Fragment>
        <div className="screen" />
        <section className="UserPopup">
          <button className="popup-exit" onClick={this.handleExit}>
            X
          </button>
          {this.props.location.pathname === "/login"
            ? loginFormat
            : registerFormat}
        </section>
      </Fragment>
    );
  }
}

export default userPopup;
