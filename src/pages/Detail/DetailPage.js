import React from "react";
import Gif from "components/Gif";
import useSingleGif from "hooks/useSingleGif";
import Spinner from "components/Spinner/Spinner";
import { Redirect } from "wouter";
import useTitle from "hooks/useTitle";
import "./DetailPage.css";

export default function Detail({ params }) {
  const { gif, isLoading, isError } = useSingleGif({ id: params.id });
  const title = gif ? gif.title : "";
  useTitle({ title });

  if (isLoading) return <Spinner />;
  if (isError) return <Redirect to="/404" />;

  if (!gif) return null;
  console.log(gif);
  return (
    <div id="idDetail">
      <Gif {...gif} />
    </div>
  );
}
