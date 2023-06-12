import React from "react";
import style from "./ImageOverlay.module.scss";

const ImageOverlay = (props) => {
  const image = props.image ? process.env.PUBLIC_URL + props.image : "";
  return (
    <div className={style.container}>
      <img className={style.image} src={image} alt="" />
    </div>
  );
};

export default ImageOverlay;
