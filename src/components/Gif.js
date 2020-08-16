import React from "react";
import "./ListOfGifs/ListOfGifs.css";
import { Link } from "wouter";

export default function Gif({ title, id, url }) {
  return (
    <div className="ListOfGifs-item">
      <Link to={`/gif/detail/${id}`} className="ListOfGifs-item">
        <h4>{title}</h4>
        <img loading="lazy" alt={title} src={url} />
      </Link>
    </div>
  );
}
