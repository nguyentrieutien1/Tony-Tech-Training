import React, { Component } from "react";

export default class SignUp extends Component {
  render() {
    return (
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-5">
          <div className="signup__form">
            <legend>Form Sign up</legend>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
              />
            </div>
            <button className="btn btn-success btn-signup">Sign Up</button>
          </div>
        </div>
      </div>
    );
  }
}
