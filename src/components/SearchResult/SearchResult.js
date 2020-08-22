import React, { useRef, useEffect, useCallback } from "react";
import { useGifs } from "hooks/useGifs";
import Spinner from "../Spinner/Spinner";
import ListOfGifs from "../ListOfGifs/ListOfGifs";
import useNearScreen from "hooks/useNearScreen";
import debounce from "just-debounce-it";
import throttle from "just-throttle";

export default function SearchResult({ params }) {
  const { keyword } = params;
  const { loading, gifs, setPage } = useGifs({ keyword });
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  });

  const HandleNextPage = () => console.log("next page");
  /*const HandleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };*/
  /*
  const debounceHandleNextPage = useCallback(
    () => debounce(HandleNextPage, 1000),
    []
  );*/

  const throttleHandleNextPage = useCallback(
    throttle(() => setPage((prevPage) => prevPage + 1), 200),
    []
  );

  useEffect(() => {
    console.log(isNearScreen);
    if (isNearScreen) throttleHandleNextPage();
  }, [throttleHandleNextPage, isNearScreen]);
  return (
    <>
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
    </>
  );
}
