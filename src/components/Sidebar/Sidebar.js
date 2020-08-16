import React from "react";
import TrendingSearches from "../TrendingSearches/TrendingSearches";
import "./Sidebar.css";
export default function Sidebar() {
  return (
    <div className="Sidebar">
      <button id="btnToggle" type="button" className="ToggleBtn">
        Categorias
      </button>
      <TrendingSearches></TrendingSearches>
    </div>
  );
}
