import Header from "components/Header/Header";
import React from "react";
import { Link } from "wouter";
import Search from "../Search/Search";
import "./Menu.css";
/*
<nav className="navbar">
<button
  className="navbar-toggler"
  type="button"
  data-toggle="collapse"
  data-target="#navbarToggler"
  aria-expanded="false"
  aria-label="Toggle"
>
  <span>Expandir</span>
</button>
<div className="collapse navbar-collapse" id="navbarToggler">
  <Link className="navbar-brand" to="/">
    <h3 id="giffy">Giffy</h3>
  </Link>
</div>
</nav>*/

export default function Menu() {
  return (
    <nav>
      <div className="row menu">
        <div className="col" id="colGiffy">
          <Link className="anchor" to="/">
            <h3 id="giffy">Giffy</h3>
          </Link>
        </div>

        <div className="col-s" id="colSearch">
          <ul className="search">
            <Search></Search>
          </ul>
        </div>
      </div>
    </nav>
  );
}
