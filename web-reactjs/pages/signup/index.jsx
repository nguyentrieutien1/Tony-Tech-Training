import { API_URL } from "../../constants/apiUrl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
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
  const handleSignUp = async () => {
    const result = await fetch(`${API_URL}/user/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    const { status } = data;
    if (status === 201) {
      router.push("/signin");
    } else {
      const { message } = data;
      alert(message);
    }
  };
  return (
    <div className="row" style={{ display: "flex", justifyContent: "center" }}>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-5">
        <div className="signup__form">
          <legend>Form Sign up</legend>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
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
          <button onClick={handleSignUp} className="btn btn-success btn-signup">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
