import React, { useRef, useEffect } from "react";
import { useGifs } from "hooks/useGifs";
import Spinner from "../Spinner/Spinner";
import ListOfGifs from "../ListOfGifs/ListOfGifs";
import useNearScreen from "hooks/useNearScreen";

export default function SearchResult({ params }) {
  const { keyword } = params;
  const { loading, gifs, setPage } = useGifs({ keyword });
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
  });

  console.log(isNearScreen);
  const HandleNextPage = () => console.log("next page");
  /*const HandleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };*/

  useEffect(() => {
    if (isNearScreen) HandleNextPage();
  });
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
