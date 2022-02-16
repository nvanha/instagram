import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "services/firebase";
import * as ROUTES from "constants/routes";
import Profile from "components/Profile";
import Header from "components/Header";

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
        setUserExists(true);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [history, username]);

  return userExists ? (
    <div id="profile-page" className="profile-wrapper">
      <Header />
      <div className="profile-inner">
        <div className="container">
          <Profile user={user} />
        </div>
      </div>
    </div>
  ) : null;
};

export default ProfilePage;
