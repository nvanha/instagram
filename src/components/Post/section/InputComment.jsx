import { ReactComponent as EmojiIcon } from "assets/post/emoji.svg";
import FirebaseContext from "context/firebase";
import UserContext from "context/user";
import React, { useContext, useState } from "react";

const InputComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setComment("");
    // give me a new array []
    // put the new comment in there
    // add the old comments
    // then we have a new array with the new comment and the older comments

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className="post-input">
      <form
        method="POST"
        onSubmit={(event) =>
          comment.trim().length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <div className="post-input--emoji">
          <EmojiIcon />
        </div>
        <div className="post-input--control">
          <input
            aria-label="Add a comment ..."
            autoComplete="off"
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="Add a comment..."
            ref={commentInput}
          />
        </div>
        <div className="post-input--btn">
          <button
            type="button"
            className={`${comment.trim().length < 1 ? "disabled" : ""}`}
            disabled={comment.trim().length < 1}
            onClick={handleSubmitComment}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputComment;
