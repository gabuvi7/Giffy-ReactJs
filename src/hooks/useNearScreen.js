import { useState, useEffect, useRef } from "react";

export default function useNearScreen() {
  const [isNearScreen, setShow] = useState(false);
  const elementRef = useRef();

  useEffect(function ({ distance = "100px" }) {
    let observer;

    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        observer.disconnect(); //Una vez realizada la interseccion con el elemento, dejo de observarlo.
      }
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    Promise.resolve(
      typeof IntersectionObserver !== "undefined"
        ? IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: "100px",
      });
      console.log("element");
      console.log(elementRef);
      console.log("el de arriba pa");
      observer.observe(elementRef.current);
    });

    observer.observe(elementRef.current);

    return () => observer && observer.disconnect(); //El hook retorna la desconexion del observer para que cuando este componente se deje de utilizar, limpia el evento.
  });

  return { isNearScreen, elementRef };
}
