import React, { useRef, useEffect, useCallback } from "react";
import { useGifs } from "hooks/useGifs";
import Spinner from "../Spinner/Spinner";
import ListOfGifs from "../ListOfGifs/ListOfGifs";
import useNearScreen from "hooks/useNearScreen";
import throttle from "just-throttle";
import "./SearchResult.css";
import { Helmet } from "react-helmet";
import { Redirect } from "wouter";

export default function SearchResult({ params }) {
  const { keyword, rating = "g", lang = "es" } = params;
  const { loading, gifs, setPage } = useGifs({ keyword, rating, lang });
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  });
  const title = gifs ? `${gifs.length} Resultados de ${keyword}` : "";
  const throttleHandleNextPage = useCallback(
    throttle(() => setPage((prevPage) => prevPage + 1), 200),
    [setPage]
  );
  useEffect(() => {
    if (isNearScreen) throttleHandleNextPage();
  }, [throttleHandleNextPage, isNearScreen]);

  if (gifs.length === 0) {
    return <Redirect to="/404" />;
  }

  return (
    <div id="idSearchResult">
      {loading ? ( 
        <Spinner />
      ) : (
        <>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={`Resultados de ${keyword}`} />
          </Helmet>
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
