import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { API_URL } from "../../constants/apiUrl";
import { saveToLocalStorage } from "../../utils/storage";
export default function SignIn() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSignIn = async () => {
    const response = await fetch(`${API_URL}/user/signin`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    const { status } = result;
    if (status === 201) {
      const { data } = result;
      saveToLocalStorage("accessToken", data?.accessToken);
      router.push("/");
    } else {
      const { message } = data;
      alert(message);
    }
  };
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
              name="email"
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              value={user.password}
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
            <button
              onClick={handleSignIn}
              className="btn btn-success btn-signin"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
