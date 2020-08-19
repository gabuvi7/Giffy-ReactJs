import React, { Suspense } from "react";
import useNearScreen from "hooks/useNearScreen";

const TrendingSearches = React.lazy(() => import("./TrendingSearches")); //Import dinamico de componentes.

export default function LazyTrending() {
  const { isNearScreen, elementRef } = useNearScreen({distance: "5px"});
  return (
    <Suspense fallback={null}>
      <div ref={elementRef}>{isNearScreen ? <TrendingSearches /> : null}</div>
    </Suspense>
  );
}
