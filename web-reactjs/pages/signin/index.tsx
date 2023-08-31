import React from "react";

export default function SignIn() {
  return (
    <div className="row" style={{ display: "flex", justifyContent: "center" }}>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-5">
        <div className="signin__form">
          <legend>Form Sign in</legend>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="footer__form"
          >
            <a href="./signup.html">Sign up</a>
            <button className="btn btn-success btn-signin">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
