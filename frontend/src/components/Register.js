import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./landing/header";

const Register = (props) => {
  const [registerReq, setRegisterReq] = useState({
    loading: false,
    data: undefined,
  });
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCompare, setPasswordCompare] = useState(false);

  useEffect(() => {
    if (registerReq.data) {
      props.history.push("/login");
    }
  }, [registerReq.data]);
  const onSubmit = async () => {
    if (password !== confirmPassword) {
      setPasswordCompare(true);
      return;
    }
    setPasswordCompare(false);
    setRegisterReq({ loading: true, data: undefined });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND}/user`,
      {
        email,
        password,
        name: userName,
      },
      config
    );
    if (res) {
      console.log(res);
      setRegisterReq({ loading: false, data: res.data.token });
      localStorage.setItem("token", res.data.token);
    }
  };

  const register = () => {};
  return (
    <div className="register">
      <Header />
      <div className="register-content">
        <h2>Register</h2>
        {registerReq.loading && <p>Loading</p>}
        <div className="register-form">
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="user Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="confirm password"
          />

          <button onClick={onSubmit}>Register</button>
          {passwordCompare && <p>Password do not match</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
