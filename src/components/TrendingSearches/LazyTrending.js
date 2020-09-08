import React, { Suspense } from "react";
import useNearScreen from "hooks/useNearScreen";
import LinksContentLoader from "components/LinksContentLoader";
import "./styles.css";

const TrendingSearches = React.lazy(() => import("./TrendingSearches")); //Import dinamico de componentes.

export default function LazyTrending() {
  const { isNearScreen, fromRef } = useNearScreen({ distance: "0px" });
  return (
    <div ref={fromRef} id="list">
      <Suspense fallback={<LinksContentLoader />}>
        {isNearScreen ? <TrendingSearches /> : <LinksContentLoader />}
      </Suspense>
    </div>
  );
}
