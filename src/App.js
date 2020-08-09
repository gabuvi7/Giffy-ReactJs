import React from "react";
import "./App.css";
import { Route } from "wouter";
import Menu from "./components/Menu";
import SearchResult from "./components/SearchResult/SearchResult";

export default function App() {
  return (
    <>
      <Menu></Menu>
      <div className="App">
        <section className="App-content">
          <Route component={SearchResult} path="/gif/:keyword"></Route>
        </section>
      </div>
    </>
  );
}
