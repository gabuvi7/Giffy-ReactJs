import { useEffect, useState } from "react";
import getGifs from "../services/getGifs";

export function useGifs({ keyword } = {keyword: null}) {
  const [loading, setLoading] = useState(false);
  const [gifs, setGifs] = useState([]);
  console.log("hook gifs");
  console.log({ keyword });
  useEffect(() => {
    setLoading(true);
    getGifs({ keyword }).then((gifs) => {
      setGifs(gifs);
      setLoading(false);
    });
  }, [keyword]);

  return { loading, gifs };
}
