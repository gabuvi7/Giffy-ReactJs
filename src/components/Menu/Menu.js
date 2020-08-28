import React from "react";
import { Link } from "wouter";
import Search from "../Search";
import "./Menu.css";

const POPULAR_GIFS = [
  "Argentina",
  "Boca Juniors",
  "Harry Potter",
  "Resident Evil",
];
/*  <div className="col">
          {POPULAR_GIFS.map((popularGifs) => (
            <ul key={popularGifs}>
              <Link className="anchor" to={`/gif/${popularGifs}`}>
                {popularGifs}
              </Link>
            </ul>
          ))}
        </div>
*/
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
