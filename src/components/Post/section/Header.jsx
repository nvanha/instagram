import { ReactComponent as MoreIcon } from "assets/post/more.svg";
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ username }) => {
  return (
    <div className="post-header">
      <div className="post-header--avt">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile`}
        />
      </div>
      <div className="post-header--info">
        <div className="info-username">
          <Link to={`/p/${username}`}>{username}</Link>
        </div>
        <div className="info-fullname">Ha Nguyen</div>
      </div>
      <div className="post-header--action">
        <MoreIcon />
      </div>
    </div>
  );
};

export default Header;
