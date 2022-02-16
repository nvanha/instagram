import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "services/firebase";
import SuggestedProfile from "./SuggestedProfile";

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  // go ahead and get the suggested profiles
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  // hint: use the firebase service (call using userId)
  // getSuggestedProfiles
  // call the async function within useEffect
  // store it in state
  // go ahead and render (wait on the profiles as in 'skeleton')

  return (
    <div className="dashboard-sidebar--suggestions">
      <div className="dashboard-sidebar--suggestions__title">
        Suggestions For You
      </div>
      <div className="dashboard-sidebar--suggestions__list">
        {!profiles ? (
          <Skeleton
            count={5}
            height={48}
            className="sidebar-profile--skeleton"
          />
        ) : profiles.length > 0 ? (
          profiles.map((data) => (
            <SuggestedProfile
              key={data.docId}
              profileDocId={data.docId}
              userName={data.username}
              profileId={data.userId}
              userId={userId}
              fullName={data.fullName}
              loggedInUserDocId={loggedInUserDocId}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};

export default Suggestions;
