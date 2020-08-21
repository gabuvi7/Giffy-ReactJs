import { useState, useEffect, useRef } from "react";

export default function useNearScreen({ distance = "100px" } = {}) {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    // let observer;

    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        //observer.unobserve(el); //Dejo de observar al elemento.
        observer.disconnect(); //Una vez realizada la interseccion con el elemento, desconecto el observador.
      }
    };
    /*
    Promise.resolve(
      typeof IntersectionObserver !== "undefined"
        ? IntersectionObserver
        : import("intersection-observer") //Import dinamico de polyfills.
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance,
      });
    });*/
    const observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });
    observer.observe(fromRef.current);
    return () => observer && observer.disconnect(); //El hook retorna la desconexion del observer para que cuando este componente se deje de utilizar, limpia el evento.
  });

  return { isNearScreen, fromRef };
}