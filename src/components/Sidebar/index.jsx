import React, { useContext } from "react";
import useUser from "hooks/useUser";
import User from "./section/User.jsx";
import Suggestions from "./section/Suggestions.jsx";
import UserContext from "context/user";

const Sidebar = () => {
  const {
    user: { displayName },
  } = useContext(UserContext);
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();

  return (
    <div className="dashboard-sidebar">
      <User displayName={displayName} username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
};

export default Sidebar;

Sidebar.whyDidYouRender = true;
