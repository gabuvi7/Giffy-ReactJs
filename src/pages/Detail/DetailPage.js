import React from "react";
import Gif from "components/Gif";
import useSingleGif from "hooks/useSingleGif";
import Spinner from "components/Spinner/Spinner";
import { Redirect } from "wouter";
//import useTitle from "hooks/useSEO";
import "./DetailPage.css";
import { Helmet } from "react-helmet"; //Reemplazo a mi hook useSEO.

export default function Detail({ params }) {
  const { gif, isLoading, isError } = useSingleGif({ id: params.id });
  const title = gif ? gif.title : "";
  const description = gif
    ? `Descripcion de ${gif.title}`
    : "Descripcion del gif";
  /*useTitle({ title, description });*/

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>Cargando...</title>
        </Helmet>
        <Spinner />
      </>
    );
  if (isError) return <Redirect to="/404" />;

  if (!gif) return null;
  console.log(gif);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div id="idDetail">
        <Gif {...gif} />
      </div>
    </>
  );
}
