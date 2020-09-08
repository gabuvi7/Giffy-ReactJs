import React from "react";
import { useGifs } from "hooks/useGifs";
import Spinner from "components/Spinner/Spinner";
import ListOfGifs from "components/ListOfGifs/ListOfGifs";
import "./HomePage.css";
import Sidebar from "components/Sidebar/Sidebar";
import { Helmet } from "react-helmet";

export default function HomePage() {
  const { loading, gifs } = useGifs();

  return (
    <>
      <Helmet>
        <title>Home | Giffy</title>
        <meta name="description" content="Home | Giffy" />
      </Helmet>
      <div id="idHomeContainer">
        <div>
          <h2>Última visita</h2>
        </div>
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <div>
            <div>
              <ListOfGifs gifs={gifs}></ListOfGifs>
            </div>
            <div>
              <Sidebar></Sidebar>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
