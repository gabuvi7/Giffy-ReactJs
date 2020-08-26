import React from "react";
import "./Sidebar.css";
import LazyTrending from "../TrendingSearches/LazyTrending";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <button id="btnToggle" type="button" className="ToggleBtn">
        Tendencias
      </button>
      <LazyTrending />
    </div>
  );
}
