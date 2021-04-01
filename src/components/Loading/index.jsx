import React from 'react';
import LoadingGIF from "./loading.gif";
import "./style.scss";

function Loading(props) {
  return (
    <div className="Loading">
      <img src={LoadingGIF} alt="Loading..."/>
    </div>
  );
}

export default Loading;