import React, { useReducer } from "react";
import { useLocation } from "wouter";
//useHistory == useLocation
import "./Search.css";

const LANGUAGES = ["en", "es", "ru", "it", "de"];
const RATINGS = ["g", "pg", "pg-13", "r"];
const ACTION = {
  UPDATE_KEYWORD: "update_keyword",
  UPDATE_RATING: "update_rating",
  UPDATE_LANGUAGE: "update_language",
  RESET_FILTERS: "reset_filters",
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
    case ACTION.UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case ACTION.RESET_FILTERS:
      return {
        keyword: "",
        rating: "g",
        language: "en"
      };
    default:
      throw new Error(`Action ${action.type} not supported`);
  }
};
export default function Search({
  initialKeyword = "",
  initialRating = RATINGS[0],
  initialLanguage = LANGUAGES[0],
}) {
  const mainTitleText = "Qué Gif buscas?";
  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    language: initialLanguage,
    times: 0,
  });

  const { keyword, rating, times, language } = state;

  const [_, pushLocation] = useLocation(); //custom Hook de wouter. Devuelve el path y una funcion.

  const onSubmit = ({ keyword }) => {
    if (keyword !== "") {
      pushLocation(`/gif/search/${keyword}/${rating}/${language}`);
    }
  };

  const handleChange = (e) => {
    dispatch({ type: ACTION.UPDATE_KEYWORD, payload: e.target.value });
  };

  const submitAction = (e) => {
    e.preventDefault();
    onSubmit({ keyword });
  };

  const handleChangeRating = (e) => {
    dispatch({ type: ACTION.UPDATE_RATING, payload: e.target.value });
  };

  const handleChangeLanguage = (e) => {
    dispatch({ type: ACTION.UPDATE_LANGUAGE, payload: e.target.value });
    console.log(e.target.value);
  };

  const handleResetFilters = (e) => {
    dispatch({ type: ACTION.RESET_FILTERS, payload: e.target.value });
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
        <button type="button" className="btn btn-danger" onClick={handleResetFilters}>
          X
        </button>
        <button className="btn btn-primary"></button>
        <select value={rating} onChange={handleChangeRating}>
          <option disabled>Rating</option>
          {RATINGS.map((rating) => (
            <option key={rating}>{rating}</option>
          ))}
        </select>
        <select value={language} onChange={handleChangeLanguage}>
          <option disabled>Idiomas</option>
          {LANGUAGES.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
      </form>
    </>
  );
}

//export default React.memo(Search);
