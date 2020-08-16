import { useContext, useEffect, useState } from "react";
import getGifs from "../services/getGifs";
import GifsContext from "../context/GifsContext";

export function useGifs({ keyword } = { keyword: null }) {
  const [loading, setLoading] = useState(false);
  const {gifs, setGifs} = useContext(GifsContext);
  //const [gifs, setGifs] = useState([]);

  useEffect(() => {
    setLoading(true);
    const keywordToUse = keyword || localStorage.getItem("lastKeyword");
    getGifs({ keyword: keywordToUse }).then((gifs) => {
      setGifs(gifs);
      setLoading(false);
      localStorage.setItem("lastKeyword", keyword);
    }); // eslint-disable-next-line
  }, [keyword]);

  return { loading, gifs };
}
