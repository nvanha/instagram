import { ReactComponent as LikeIcon } from "assets/post/like.svg";
import { formatDistance } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputComment from "./InputComment";

const Comments = ({ docId, comments: allComments, posted, commentInput }) => {
  const [comments, setComments] = useState(allComments);
  console.log("comments: ", comments);

  return (
    <>
      <div className="post-comments">
        {comments.length >= 4 ? (
          <>
            <div className="post-comments--view-all">
              View all {comments.length} comments
            </div>
            {comments.slice(0, 3).map((comment, index) => (
              <div key={index} className="post-comments--item">
                <Link to={`/p/${comment.displayName}`}>
                  {comment.displayName}
                </Link>
                &nbsp;
                {comment.comment}
                <button type="button">
                  <LikeIcon />
                </button>
              </div>
            ))}
          </>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="post-comments--item">
              <Link to={`/p/${comment.displayName}`}>
                {comment.displayName}
              </Link>
              &nbsp;
              {comment.comment}
              <button type="button">
                <LikeIcon />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="post-created">
        {formatDistance(posted, new Date())} ago
      </div>
      <InputComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

export default Comments;
