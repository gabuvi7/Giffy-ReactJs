import { useEffect, useRef } from "react";

export default function useTitle({ title, description }) {
  const prevTitle = useRef(document.title);
  const prevDescrition = useRef(
    document.querySelector('meta[name="description"]').getAttribute('content'));
  useEffect(() => {
    const previousTitle = prevTitle.current;
    if (title) {
      document.title = `${title} | Giffy`;
    }
    return () => (document.title = previousTitle);
  }, [title]);

  useEffect(() => {
    const previousDescription = prevDescrition.current;
    const metadataDescription = document.querySelector(
      'meta[name="description"]'
    );
    if (description) {
      metadataDescription.setAttribute("content", description);
    }
    return () =>
      metadataDescription.setAttribute("content", previousDescription);
  }, [description]);
}
