import { useContext, React } from "react";
import GifsContext from "../context/GifsContext";
import { Redirect } from "wouter";
//Es un custom hook que solo me devuelve los Gifs, separo lectura de actualizacion.
export default function useGlobalGifs() {
  const { gifs } = useContext(GifsContext);
  if (!gifs) {
    return <Redirect to="/404" />;
  } else {
    return gifs;
  }
}
