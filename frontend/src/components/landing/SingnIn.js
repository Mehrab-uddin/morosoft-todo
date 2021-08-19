import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";

const SingnIn = (props) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState({
    loading: false,
    data: undefined,
  });

  useEffect(() => {
    if (signIn.data) {
      props.history.push("/task");
    }
  }, [signIn.data]);

  const onSubmit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setSignIn({ loading: true, data: undefined });

    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND}/user/login`,
      {
        email,
        password,
      },
      config
    );
    if (res) {
      setSignIn({ loading: false, data: res.data });
      localStorage.setItem("token", res.data.token);
    }
  };

  return (
    <div className="main-dev">
      <Header />
      <div className="login-content">
        {signIn.loading && <p>Loading</p>}
        <h2>login</h2>
        <div className="login-form">
          <input
            value={email}
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
            type="password"
          />
          <button onClick={onSubmit}>login</button>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default SingnIn;
