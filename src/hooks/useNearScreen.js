import { useState, useEffect, useRef } from "react";

export default function useNearScreen({
  distance = "100px",
  externalRef,
  once = true,
} = {}) {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer;
    const element = externalRef ? externalRef.current : fromRef.current;
    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        //observer.unobserve(el); //Dejo de observar al elemento.
        once && observer.disconnect(); //Una vez realizada la interseccion con el elemento, desconecto el observador.
      } else {
        !once && setShow(false);
      }
    };

    Promise.resolve(
      typeof IntersectionObserver !== "undefined"
        ? IntersectionObserver
        : import("intersection-observer") //Import dinamico de polyfills.
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance,
      });
      if (element) observer.observe(element);
    });
    /*const observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });*/

    return () => observer && observer.disconnect(); //El hook retorna la desconexion del observer para que cuando este componente se deje de utilizar, limpia el evento.
  });

  return { isNearScreen, fromRef };
}
