import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const { isLogged, login } = useUser();

  useEffect(() => {
    isLogged ? navigate("/") : navigate("/login");
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`${username}, ${password}`);
    login({ username, password });
  };
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        value={username}
        onChange={handleChangeUsername}
      />
      <input
        placeholder="password"
        type="password"
        onChange={handleChangePassword}
        value={password}
      />
      <button type="input">Login</button>
    </form>
  );
}
