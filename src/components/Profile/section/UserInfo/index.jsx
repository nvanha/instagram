import { ReactComponent as SettingIcon } from "assets/profile/setting.svg";
import { ReactComponent as MoreIcon } from "assets/profile/more.svg";
import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isUserFollowingProfile, toggleFollow } from "services/firebase";

const UserInfo = ({
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername,
  },
  photosCount,
  followerCount,
  setFollowerCount,
  loggedInUsername,
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  const activeBtnFollow = user.username && user.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [profileUserId, user.username]);

  return (
    <div className="user-info--wrapper">
      <Row>
        <Col>
          <div className="user-info--avt">
            <img
              src={`/images/avatars/${profileUsername}.jpg`}
              alt={`${profileUsername} profile`}
            />
          </div>
        </Col>
        <Col>
          <div className="user-info--details">
            <div>
              <h2 className="username">{profileUsername}</h2>
              {activeBtnFollow ? (
                <>
                  <button
                    type="button"
                    onClick={handleToggleFollow}
                    className={`btn-follow ${
                      isFollowingProfile ? "unfollow" : ""
                    }`}
                  >
                    {isFollowingProfile ? "Unfollow" : "Follow"}
                  </button>
                  <button type="button" className="setting-icon">
                    <MoreIcon />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/accounts/edit" className="link-edit">
                    Edit Profile
                  </Link>
                  <button type="button" className="setting-icon">
                    <SettingIcon />
                  </button>
                </>
              )}
            </div>
            <div>
              <div className="interactive-list">
                <div className="interactive-item">
                  <span>{photosCount}</span>{" "}
                  {photosCount === 1 ? "post" : "posts"}
                </div>
                <div className="interactive-item">
                  <span>{followerCount}</span>{" "}
                  {followerCount === 1 ? "follower" : "followers"}
                </div>
                <div className="interactive-item">
                  <span>{following.length}</span> following
                </div>
              </div>
            </div>
            <div>
              <h1 className="fullName">{fullName}</h1>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
