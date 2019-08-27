import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../_redux/actions";
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

  // user logs in, get user data / projects from server
  // dispatch data to store
  // close popup window
  handleLogin = e => {
    console.log("logging in...");
    e.preventDefault();
    // capture login values
    // verify against server and retrieve
    // return user details and projects
    // REDUX update store => ACTION: this.props.addUserProjects(projects)
    // REDUX update user => ACTION: this.props.updateCurrentUser(userDetails)
    // login user / close window
  };

  handleRegister = e => {
    console.log("Registering...");
    e.preventDefault();
    // capture register values
    // make sure user doesnt already exist in DB
    // Good: add user to database
    // REDUX update user => ACTION: this.props.updateCurrentUser(userDetails)
    // login user / close window
  };

  handleChanges = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const inputs = (
      <Fragment>
        <label htmlFor="username">Enter Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={e => this.handleChanges(e)}
        />
        <label htmlFor="password">Enter Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={e => this.handleChanges(e)}
        />
      </Fragment>
    );
    const loginFormat = (
      <Fragment>
        <h3 className="editor-title">To continue, log in to PalettePicker.</h3>
        <form className="user-form" onSubmit={e => this.handleLogin(e)}>
          {inputs}
          <div className="form-btns">
            <button className="form-btn">Login</button>
            <button
              className="form-btn"
              onClick={() => this.handlePageChange("register")}
            >
              new user?
            </button>
          </div>
        </form>
      </Fragment>
    );

    const registerFormat = (
      <Fragment>
        <h3 className="editor-title">Sign up with a username and password.</h3>
        <form className="user-form" onSubmit={e => this.handleRegister(e)}>
          {inputs}
          <div className="form-btns">
            <button className="form-btn">Register</button>
            <button
              className="form-btn"
              onClick={() => this.handlePageChange("login")}
            >
              Already have an account?
            </button>
          </div>
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
          <section className="form-section">
            {this.props.location.pathname === "/login"
              ? loginFormat
              : registerFormat}
          </section>
        </section>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUserProjects: projects => dispatch(actions.addUserProjects(projects)),
  updateCurrentUser: userDetails =>
    dispatch(actions.updateCurrentUser(userDetails))
});

export default connect(
  null,
  mapDispatchToProps
)(userPopup);
