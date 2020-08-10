import React from "react";
import { useGifs } from "../../hooks/useGifs";

export default function HomePage() {
  const { loading, gifs } = useGifs({ keyword: "" });
  return <></>;
}
