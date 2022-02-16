import PropTypes from "prop-types";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const User = ({ displayName, username, fullName }) => (
  <>
    {!username || !fullName || !displayName ? (
      <div>
        <Skeleton count={1} height={84} />
      </div>
    ) : (
      <div className="dashboard-sidebar--user">
        <div className="dashboard-sidebar--user__avt">
          <img
            src={`/images/avatars/${displayName}.jpg`}
            alt={`${displayName} profile`}
          />
        </div>
        <div className="dashboard-sidebar--user__info">
          <div className="info-username">
            <Link to={`/p/${displayName}`}>{username}</Link>
          </div>
          <div className="info-fullname">{fullName}</div>
        </div>
      </div>
    )}
  </>
);

User.propTypes = {
  displayName: PropTypes.string,
  username: PropTypes.string,
  fullName: PropTypes.string,
};

export default User;
