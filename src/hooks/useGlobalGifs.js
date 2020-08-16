import { useContext } from "react";
import GifsContext from "../context/GifsContext";
//Es un custom hook que solo me devuelve los Gifs, separo lectura de actualizacion. 
export default function useGlobalGifs() {
  const { gifs } = useContext(GifsContext);
  return gifs;
}
