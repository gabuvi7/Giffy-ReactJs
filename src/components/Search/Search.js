import React, { useReducer, useState } from "react";
import { Link, useLocation } from "wouter";
//useHistory == useLocation
import "./Search.css";

const RATINGS = ["g", "pg", "pg-13", "r"];
const reducer = (state, action) => {
  console.log(action.payload);
  if (action.type === "update_keyword") {
    return {
      ...state,
      keyword: action.payload,
      times: state.times + 1,
    };
  } else if (action.type === "update_rating") {
    return {
      ...state,
      rating: action.payload,
    };
  }
  return state;
};
export default function Search({
  initialKeyword = "",
  initialRating = RATINGS[0],
}) {
  const mainTitleText = "Qué Gif buscas?";
  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0,
  });

  const { keyword, rating, times } = state;

  const [_, pushLocation] = useLocation(); //custom Hook de wouter. Devuelve el path y una funcion.

  const onSubmit = ({ keyword }) => {
    if (keyword !== "") {
      // navegar a otra ruta
      pushLocation(`/gif/search/${keyword}/${rating}`);
    }
  };

  const handleChange = (e) => {
    dispatch({ type: "update_keyword", payload: e.target.value });
  };

  const submitAction = (e) => {
    // prevents default evita el comportamiento por defecto de la pagina y no la recarga al hacer submit
    e.preventDefault();
    onSubmit({ keyword });
  };

  const handleChangeRating = (e) => {
    dispatch({ type: "update_rating", payload: e.target.value });
  };

  return (
    <>
      <span className="anchor">{times}</span>
      <form className="searchForm" onSubmit={submitAction}>
        <input
          id="idSearch"
          value={keyword}
          placeholder={mainTitleText}
          onChange={handleChange}
        ></input>
        <button>Buscar...</button>
        <select value={rating} onChange={handleChangeRating}>
          <option disabled>Tipos de rating</option>
          {RATINGS.map((rating) => (
            <option key={rating}>{rating}</option>
          ))}
        </select>
      </form>
    </>
  );
}

//export default React.memo(Search);
