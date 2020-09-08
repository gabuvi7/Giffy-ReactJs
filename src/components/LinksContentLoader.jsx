import React from "react";
import ContentLoader from "react-content-loader";

const LinksContentLoader = (props) => (
  <ContentLoader
    speed={0.5}
    width="200px"
    viewBox="0 0 200 500"
    backgroundColor="#f5f5f5"
    foregroundColor="red"
    {...props}
  >
    <rect x="114" y="52" rx="6" ry="6" width="483" height="15" />
    <circle cx="77" cy="60" r="15" />

  </ContentLoader>
);

export default LinksContentLoader;
