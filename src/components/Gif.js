import React from "react";
import './ListOfGifs/ListOfGifs.css'

export default function Gif({title,id,url}) {
    return (
        <div className="ListOfGifs-item">
          <h4>{title}</h4>
          <img alt={title} src={url} />
        </div>
      );
}