import EmptyPost from "components/EmptyPost";
import React from "react";
import Skeleton from "react-loading-skeleton";
import PostItem from "./section/PostItem";

const Posts = ({ photosCollection, handleOpenModalsPostItem }) => {
  return (
    <>
      <div className="posts-wrapper">
        {!photosCollection ? (
          <Skeleton className="skeleton-post-wrapper" count={12} />
        ) : photosCollection.length > 0 ? (
          <article className="posts-list">
            {photosCollection.map((photo, index) => (
              <PostItem
                key={index}
                data={photo}
                handleOnClick={handleOpenModalsPostItem}
              />
            ))}
          </article>
        ) : (
          <EmptyPost type="post">No Post Yet</EmptyPost>
        )}
      </div>
    </>
  );
};

export default Posts;
