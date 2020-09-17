import React from "react";
import "./App.css";
import { Route } from "wouter";
import Menu from "./components/Menu/Menu";
import SearchResult from "./components/SearchResult/SearchResult";
import HomePage from "./pages/Home/HomePage";
import Detail from "./pages/Detail/DetailPage";
import { GifsContextProvider } from "./context/GifsContext";
import ErrorPage from "pages/Error/ErrorPage";
export default function App() {
  return (
    <>
      <Menu></Menu>
      <div className="App">
        <section className="App-content">
          <GifsContextProvider>
            <Route component={HomePage} path="/"></Route>
            <Route component={SearchResult} path="/gif/search/:keyword/:rating?/:lang?"></Route>
            <Route component={Detail} path="/gif/detail/:id"></Route>
            <Route component={ErrorPage} path="/404" />
          </GifsContextProvider>
        </section>
      </div>
    </>
  );
}
