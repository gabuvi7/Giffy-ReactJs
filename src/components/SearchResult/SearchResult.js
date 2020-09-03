import React, { useRef, useEffect, useCallback } from "react";
import { useGifs } from "hooks/useGifs";
import Spinner from "../Spinner/Spinner";
import ListOfGifs from "../ListOfGifs/ListOfGifs";
import useNearScreen from "hooks/useNearScreen";
//import debounce from "just-debounce-it";
import throttle from "just-throttle";
import "./SearchResult.css";
import useTitle from "hooks/useTitle";

export default function SearchResult({ params }) {
  const { keyword } = params;
  const { loading, gifs, setPage } = useGifs({ keyword });
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  });

  //  const HandleNextPage = () => console.log("next page");
  /*const HandleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };*/
  /*
  const debounceHandleNextPage = useCallback(
    () => debounce(HandleNextPage, 1000),
    []
  );*/

  const title = gifs ? `${gifs.length} Resultados de ${keyword}` : "";
  useTitle({ title });

  const throttleHandleNextPage = useCallback(
    throttle(() => setPage((prevPage) => prevPage + 1), 200),
    [setPage]
  ); //Con el useCallback evito crear una nueva funcion entre renderizados. Con la dependencia vacia solo la crea la 1era vez.
  // En este caso quiero que se cree cada vez que la dependencia setPage cambie.

  useEffect(() => {
    if (isNearScreen) throttleHandleNextPage();
  }, [throttleHandleNextPage, isNearScreen]);
  return (
    <div id="idSearchResult">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3> {decodeURI(keyword)}</h3> <ListOfGifs gifs={gifs} />
          <div id="visorScroll" ref={externalRef}></div>
        </>
      )}
      {/* Lo comento para hacer Infinity Scroll <button type="button" className="btn" onClick={HandleNextPage}>
        Get next page...
      </button>  */}
    </div>
  );
}
