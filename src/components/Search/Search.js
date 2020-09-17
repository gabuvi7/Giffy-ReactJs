import React, { useReducer } from "react";
import { useLocation } from "wouter";
//useHistory == useLocation
import "./Search.css";

const RATINGS = ["g", "pg", "pg-13", "r"];
const ACTION = {
  UPDATE_KEYWORD: "update_keyword",
  UPDATE_RATING: "update_rating",
};

const reducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case ACTION.UPDATE_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
        times: state.times + 1,
      };
    case ACTION.UPDATE_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    default:
      throw new Error(`Action ${action.type} not supported`);
  }
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
    dispatch({ type: ACTION.UPDATE_KEYWORD, payload: e.target.value });
  };

  const submitAction = (e) => {
    // prevents default evita el comportamiento por defecto de la pagina y no la recarga al hacer submit
    e.preventDefault();
    onSubmit({ keyword });
  };

  const handleChangeRating = (e) => {
    dispatch({ type: ACTION.UPDATE_RATING, payload: e.target.value });
  };

  return (
    <>
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
