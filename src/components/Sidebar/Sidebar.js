import React from "react";
import "./Sidebar.css";
import LazyTrending from "../TrendingSearches/TrendingSearches";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <button id="btnToggle" type="button" className="ToggleBtn">
        Trending Categories
      </button>
      <LazyTrending />
    </div>
  );
}
