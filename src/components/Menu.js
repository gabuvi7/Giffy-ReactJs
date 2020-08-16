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
      <div className="row menu">
        <div className="col">
          <Link className="anchor" to="/">
            <h3>Giffy</h3>
          </Link>
        </div>
        <div className="col">
          {POPULAR_GIFS.map((popularGifs) => (
            <ul key={popularGifs}>
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
