import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ caption, username }) => {
  return (
    <div className="post-caption">
      <Link to={`/p/${username}`}>{username}</Link>&nbsp;
      {caption}
    </div>
  );
};

export default Footer;
