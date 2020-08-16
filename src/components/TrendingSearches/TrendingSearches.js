import React, { useState, useEffect } from "react";
import Category from "../Category/Category";
import getTrendingTerms from "services/getTrendingTermsService";

export default function TrendingSearches() {
  const [trends, setTrends] = useState([]);
  
  /* Seteo isSubscribe = true dentro del useEffect para que, luego si el componente es demontado, 
  no trate de suscribirse indefinidamente generando memory leaks. Al final del hook siempre retorno false.
  */

  useEffect(function () {
    let isSuscribed = true;
    getTrendingTerms().then((trends) =>
      isSuscribed ? setTrends(trends) : null
    );
    return () => (isSuscribed = false);
  }, []);

  return <Category options={trends}></Category>;
}
