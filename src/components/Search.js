import React, { useState } from "react";
//import { Link, useLocation } from "wouter";
import { Link } from "wouter";
//useHistory == useLocation

export default function Search() {
  const mainTitleText = "Qué Gif buscas?";
  const [searchState, updateSearchState] = useState([""]);
  // const [path, pushLocation] = useLocation(); //custom Hook de wouter. Devuelve el path y una funcion.
  const submitAction = (e) => {
    // prevents default evita el comportamiento por defecto de la pagina y no la recarga al hacer submit
    e.preventDefault();
    //    pushLocation(`gif/${searchState}`);
  };

  const handleChange = (e) => {
    updateSearchState(e.target.value);
  };

  return (
    <>
      <form className="searchForm" onSubmit={submitAction}>
        <input id='idSearch'
          value={searchState}
          placeholder={mainTitleText}
          onChange={handleChange}
        ></input>
        <Link className="anchor" to={`/gif/${searchState}`}>
          <button type="submit">Buscar...</button>
        </Link>
      </form>
    </>
  );
}
