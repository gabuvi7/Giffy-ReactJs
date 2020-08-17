import React, { useState, useEffect, useRef } from "react";
import Category from "../Category/Category";
import getTrendingTerms from "services/getTrendingTermsService";

function TrendingSearches() {
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

export default function LazyTrending() {
  const [show, setShow] = useState(false);
  const elementRef = useRef();

  useEffect(function () {
    const onChange = (entries, observer) => {
      const el = entries[0];
      console.log(el.isIntersecting);
      if (el.isIntersecting) {
        setShow(true);
        observer.disconnect(); //Una vez realizada la interseccion con el elemento, dejo de observarlo.
      }
    };
    const observer = new IntersectionObserver(onChange, {
      rootMargin: "100px",
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect(); //El hook retorna la desconexion del observer para que cuando este componente se deje de utilizar, limpia el evento.
    };
  });

  return <div ref={elementRef}>{show ? <TrendingSearches /> : null}</div>;
}
