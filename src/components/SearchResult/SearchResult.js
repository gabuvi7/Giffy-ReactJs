import React from "react";
import { useGifs } from "../../hooks/useGifs";
import Spinner from "../Spinner/Spinner";
import ListOfGifs from "../ListOfGifs/ListOfGifs";

export default function SearchResult({ params }) {
  const { keyword } = params;
  const { loading, gifs } = useGifs({ keyword });
  console.log('search result')
  console.log({keyword})

  return <>{loading ? <Spinner /> : <ListOfGifs gifs={gifs} />}</>;
}
