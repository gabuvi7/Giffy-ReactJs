import React from "react";
import "./ListOfGifs/ListOfGifs.css";
import { Link } from "wouter";

function Gif({ title, id, url }) {
  return (
    <div className="ListOfGifs-item">
      <Link to={`/gif/detail/${id}`} className="ListOfGifs-item">
        <h4>{title !== " " ? title : "Giffy"}</h4>
        <img loading="lazy" alt={title} src={url} />
      </Link>
    </div>
  );
}

export default React.memo(Gif, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; //Para este caso, compruebo los id.
}); //Evito que renderice siempre, al scrollear, todos los gifs.

// Si el memo retorna false es === que hacer export default Function Gif()
