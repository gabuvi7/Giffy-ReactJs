import React from "react";

export default function Gif({title,id,url}) {
    return (
        <div>
          <h4>{title}</h4>
          <img alt="" src={url} />
        </div>
      );
}