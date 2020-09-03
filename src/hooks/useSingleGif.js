import { useState, useEffect } from "react";
import { useGifs } from "./useGifs";
import getSingleGif from "services/getSingleGif";

export default function useSingleGif({ id }) {
  const { gifs } = useGifs();
  const gifFromCache = gifs.find((singleGifs) => singleGifs.id === id);

  const [gif, setGif] = useState(gifFromCache);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    function () {
      if (!gif) {
        setIsLoading(true);
        //Llamar al servicio si no tengo el gif
        getSingleGif({ id })
          .then((gif) => {
            setGif(gif);
            setIsLoading(false);
            setIsError(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setIsError(true);
          });
      }
    },
    [gif, id]
  );

  return { gif, isLoading, isError };
}
