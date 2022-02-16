import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from "services/firebase";

const SuggestedProfile = ({
  profileDocId,
  userName,
  fullName,
  profileId,
  userId,
  loggedInUserDocId,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowed = async () => {
    setFollowed(true);

    // firebase: create 2 services (functions)
    // update the following array of the logged in user (in this case, my profile)
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    // update the followers array of the user who has been followed
    await updateFollowedUserFollowers(profileDocId, userId, false);
  };

  return !followed ? (
    <div className="sidebar-profile--item-wrapper">
      <div className="sidebar-profile--item-inner">
        <div className="sidebar-profile--item-avt">
          <img
            src={`/images/avatars/${userName}.jpg`}
            alt={`${userName} profile`}
          />
        </div>
        <div className="sidebar-profile--item-info">
          <div className="info-username">
            <Link to={`/p/${userName}`}>{userName}</Link>
          </div>
          <div className="info-fullname">{fullName}</div>
        </div>
        <div className="sidebar-profile--item-btn">
          <button type="button" onClick={handleFollowed}>
            Follow
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string,
  userName: PropTypes.string,
  fullName: PropTypes.string,
  profileId: PropTypes.string,
  userId: PropTypes.string,
  loggedInUserDocId: PropTypes.string,
};

export default SuggestedProfile;
