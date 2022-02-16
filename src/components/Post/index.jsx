import PropTypes from "prop-types";
import React, { useRef } from "react";
import Actions from "./section/Actions";
import Comments from "./section/Comments";
import Footer from "./section/Footer";
import Header from "./section/Header";
import Image from "./section/Image";

const Post = ({ data }) => {
  const commentInput = useRef(null);

  const handleFocus = () => commentInput.current.focus();

  /**
   * components
   *  -> header, image, actions (like & comment icons), footer, comments
   */

  return (
    <div className="post-wrapper">
      <Header username={data.username} />
      <Image imageSrc={data.imageSrc} caption={data.caption} />
      <Actions
        docId={data.docId}
        totalLikes={data.likes.length}
        likedPhoto={data.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={data.caption} username={data.username} />
      <Comments
        docId={data.docId}
        comments={data.comments}
        posted={data.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

Post.propTypes = {
  data: PropTypes.object,
};

export default Post;
