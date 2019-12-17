import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", user)
      .then(res => {
        console.log(res);
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username" />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <label htmlFor="password" />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
