import React from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as MoreIcon } from "assets/modals-post-item/more.svg";
import { ReactComponent as CloseIcon } from "assets/modals-post-item/close.svg";
import { ReactComponent as LikeIcon } from "assets/modals-post-item/like.svg";
import { ReactComponent as CommentIcon } from "assets/modals-post-item/comment.svg";
import { ReactComponent as ShareIcon } from "assets/modals-post-item/share.svg";
import { ReactComponent as SaveIcon } from "assets/modals-post-item/save.svg";
import { ReactComponent as EmojiIcon } from "assets/modals-post-item/emoji.svg";
import { formatDistance } from "date-fns";
import { useState } from "react";
import FirebaseContext from "context/firebase";
import UserContext from "context/user";
import { useContext } from "react";
import { useRef } from "react";

const ModalsPostItem = ({ show, data, profile, handleClose }) => {
  const { username } = profile;
  const { caption, imageSrc, comments, likes, dateCreated, docId } = data;
  const [allComments, setAllComments] = useState(comments);
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);
  const commentInput = useRef(null);
  const CommentListRef = useRef(null);

  const handleFocus = () => commentInput.current.focus();

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setAllComments([...allComments, { displayName, comment }]);
    setComment("");
    // give me a new array []
    // put the new comment in there
    // add the old comments
    // then we have a new array with the new comment and the older comments

    CommentListRef.current.scrollIntoView(false);

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="modals-post-item"
    >
      <Modal.Body>
        <div className="modals-post-item__left">
          <div className="post__img">
            <img src={imageSrc} alt={`${caption} post`} />
          </div>
          <div className="post__img-wrapper"></div>
        </div>
        <div className="modals-post-item__right">
          <div className="modals-post-item__right-header">
            <div className="modals-post-item__right-header--avt">
              <img
                src={`/images/avatars/${username}.jpg`}
                alt={`${username} profile`}
              />
            </div>
            <div className="modals-post-item__right-header--username">
              {username}
            </div>
            <div className="modals-post-item__right-header--more">
              <button>
                <MoreIcon />
              </button>
            </div>
          </div>
          <div className="modals-post-item__right-main">
            <div className="comments-list">
              {allComments.map((item, index) => (
                <div key={index} className="comments-item">
                  <div className="comments-item__avt">
                    <img
                      src={`/images/avatars/${item.displayName}.jpg`}
                      alt={`${item.displayName} profile`}
                    />
                  </div>
                  <div className="comments-item__username">
                    <p>{item.displayName}</p>
                  </div>
                  <div className="comments-item__content">
                    <p>{item.comment}</p>
                  </div>
                  <div className="comments-item__like">
                    <button>
                      <LikeIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p ref={CommentListRef} />
          </div>
          <div className="modals-post-item__right-action">
            <div className="post-action">
              <button type="button">
                <LikeIcon />
              </button>
              <button type="button" onClick={handleFocus}>
                <CommentIcon />
              </button>
              <button type="button">
                <ShareIcon />
              </button>
              <div />
              <button type="button">
                <SaveIcon />
              </button>
            </div>
            {likes.length > 0 && (
              <div className="post-liked">
                {likes.length} {likes.length === 1 ? "like" : "likes"}
              </div>
            )}
            <div className="post-created">
              {formatDistance(dateCreated, new Date())} ago
            </div>
          </div>
          <div className="modals-post-item__right-footer">
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
          </div>
        </div>
        <button
          className="modals-post-item__btn-close"
          type="button"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalsPostItem;
