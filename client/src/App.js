import React, { useState } from "react";
import UserList from "./UserList";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
