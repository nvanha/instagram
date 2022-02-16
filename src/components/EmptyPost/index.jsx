import ListIcon1 from "assets/post/list-icon-1.png";
import ListIcon2 from "assets/post/list-icon-2.png";
import React, { useEffect, useState } from "react";

const EmptyPost = ({ type, description, children }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [classCustom, setClassCustom] = useState("");

  useEffect(() => {
    if (type === "post") {
      setBackgroundImage(ListIcon2);
      setClassCustom(type);
    } else if (type === "reel") {
      setBackgroundImage(ListIcon2);
      setClassCustom(type);
    } else if (type === "save") {
      setBackgroundImage(ListIcon1);
      setClassCustom(type);
    } else if (type === "tag") {
      setBackgroundImage(ListIcon1);
      setClassCustom(type);
    }
  }, [type]);

  return (
    <>
      {type === "save" && (
        <div className="desc-save">Only you can see what you've saved</div>
      )}
      <div className="posts-empty">
        <span
          className={classCustom}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <h1>{children}</h1>
        <p>{description}</p>
      </div>
    </>
  );
};

export default EmptyPost;
