import React from "react";
import { Link } from "wouter";
import Search from "./Search";

const POPULAR_GIFS = [
  "Argentina",
  "Boca Juniors",
  "Harry Potter",
  "Resident Evil",
];

export default function Menu() {
  return (
    <nav>
      <div className="row">
        <div className="col">
          <h3>App Giffy</h3>
        </div>
        <div className="col">
          <ul>
            <Link className="anchor" to="/">
              Inicio
            </Link>
          </ul>
          {POPULAR_GIFS.map((popularGifs) => (
            <ul>
              <Link className="anchor" to={`/gif/${popularGifs}`}>
                {popularGifs}
              </Link>
            </ul>
          ))}
        </div>
        <div className="col-s">
          <ul className="search">
            <Search></Search>
          </ul>
        </div>
      </div>
    </nav>
  );
}
