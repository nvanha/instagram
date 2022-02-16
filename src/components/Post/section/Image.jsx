import React from "react";

const Image = ({ imageSrc, caption }) => {
  return (
    <div className="post-main">
      <div className="post-main--img">
        <img src={imageSrc} alt={`${caption} post`} />
      </div>
      <div className="post-main--img-wrapper"></div>
    </div>
  );
};

export default Image;
