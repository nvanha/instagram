import { ReactComponent as CommentIcon } from "assets/post/comment.svg";
import { ReactComponent as LikeIcon } from "assets/post/like.svg";
import { ReactComponent as LikedIcon } from "assets/post/liked.svg";
import { ReactComponent as SaveIcon } from "assets/post/save.svg";
import { ReactComponent as ShareIcon } from "assets/post/share.svg";
import FirebaseContext from "context/firebase";
import UserContext from "context/user";
import React, { useContext, useState } from "react";

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="post-action">
        <div className="post-action-col">
          <button
            type="button"
            className="post-action--item"
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleToggleLiked();
              }
            }}
          >
            {toggleLiked ? <LikedIcon /> : <LikeIcon />}
          </button>
          <button
            type="button"
            className="post-action--item"
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleFocus();
              }
            }}
          >
            <CommentIcon />
          </button>
          <button type="button" className="post-action--item">
            <ShareIcon />
          </button>
        </div>
        <div className="post-action-col">
          <button type="button" className="post-action--item">
            <SaveIcon />
          </button>
        </div>
      </div>
      {likes > 0 && (
        <div className="post-liked">
          {likes} {likes === 1 ? "like" : "likes"}
        </div>
      )}
      {/* <div className="post-liked">100 likes</div> */}
    </>
  );
};

export default Actions;
