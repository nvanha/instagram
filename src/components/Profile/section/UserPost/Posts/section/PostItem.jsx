import ListIcon from "assets/post/list-icon-1.png";
import React from "react";

const PostItem = ({ data, handleOnClick }) => {
  return (
    <div className="posts-item" onClick={() => handleOnClick(data)}>
      <div className="posts-item--photo">
        <img src={data.imageSrc} alt={`${data.caption} post`} />
      </div>
      <div className="posts-item--hover">
        <div>
          <span
            className="like"
            style={{ backgroundImage: `url(${ListIcon})` }}
          />{" "}
          {data.likes.length}
        </div>
        <div>
          <span
            className="comment"
            style={{ backgroundImage: `url(${ListIcon})` }}
          />{" "}
          {data.comments.length}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
