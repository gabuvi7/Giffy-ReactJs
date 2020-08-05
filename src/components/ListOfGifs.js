import React, { useEffect, useState } from "react";
import Gif from "./Gif";
import getGifs from "../services/getGifs";

export default function ListOfGifs({ keyword }) {
  const [gifs, setGifs] = useState([]);
  useEffect(() => {
    console.log("ejec");
    getGifs({ keyword }).then((gifs) => setGifs(gifs));
  }, [keyword]);
  return (
    <div>
      {gifs.map(({ id, title, url }) => (
        <Gif id={id} key={id} title={title} url={url}></Gif>
      ))}
    </div>
  );
}
