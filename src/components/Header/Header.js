import React from "react";
import { Link } from "wouter";
import "./Header.css";
import useUser from "hooks/useUser";

export default function Header() {
  const { isLogged, logout } = useUser();

  const handleClickLogout = (e) => {
    logout();
    console.log(isLogged);
  };

  return (
    <header className="gf-header">
      {isLogged ? (
        <button
          type="button"
          onClick={handleClickLogout}
          className="btn btn-danger"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}
