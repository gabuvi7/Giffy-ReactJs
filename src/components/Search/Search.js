import React from "react";
import { useLocation } from "wouter";
//useHistory == useLocation
import "./Search.css";
import useForm from "./useForm";

const LANGUAGES = ["en", "es", "ru", "it", "de"];
const RATINGS = ["g", "pg", "pg-13", "r"];

function Search({
  initialKeyword = "",
  initialRating = RATINGS[0],
  initialLanguage = LANGUAGES[0],
}) {
  const mainTitleText = "Qué Gif buscas?";

  const {
    keyword,
    rating,
    language,
    updateKeyword,
    updateRating,
    updateLanguage,
    updateFilter,
  } = useForm({
    initialKeyword,
    initialRating,
    initialLanguage,
  });

  const [_, pushLocation] = useLocation();

  const onSubmit = ({ keyword }) => {
    if (keyword !== "") {
      pushLocation(`/gif/search/${keyword}/${rating}/${language}`);
    }
  };

  const handleChange = (e) => {
    updateKeyword(e.target.value);
  };

  const submitAction = (e) => {
    e.preventDefault();
    onSubmit({ keyword });
  };

  const handleChangeRating = (e) => {
    updateRating(e.target.value);
  };

  const handleChangeLanguage = (e) => {
    updateLanguage(e.target.value);
  };

  const handleResetFilters = (e) => {
    updateFilter(e.target.value);
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
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleResetFilters}
        >
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

export default React.memo(Search);
