import Loading from "components/Loading";
import React, { useEffect, useReducer, useState } from "react";
import { getUserByUsername, getUserPhotosByUsername } from "services/firebase";
import ModalsPostItem from "./section/ModalsPostItem";
import UserInfo from "./section/UserInfo";
import UserPost from "./section/UserPost";

const Profile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isShowModalsPostItem, setIsShowModalsPostItem] = useState(false);
  const [dataModalsPostItem, setDataModalsPostItem] = useState(null);
  const [resetData, setResetData] = useState(false);

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
      setIsLoading(false);
    }
    if (user.username || resetData) {
      getProfileInfoAndPhotos();
      setResetData(false);
    }
  }, [user, resetData]);

  const handleOpenModalsPostItem = (data) => {
    setDataModalsPostItem(data);
    setIsShowModalsPostItem(true);
  };

  const handleCloseModalsPostItem = () => {
    setDataModalsPostItem(null);
    setIsShowModalsPostItem(false);
    setResetData(true);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <UserInfo
            profile={profile}
            photosCount={photosCollection ? photosCollection.length : 0}
            followerCount={followerCount}
            setFollowerCount={dispatch}
          />
          <UserPost
            photosCollection={photosCollection}
            handleOpenModalsPostItem={handleOpenModalsPostItem}
          />
        </>
      )}
      {isShowModalsPostItem && (
        <ModalsPostItem
          show={isShowModalsPostItem}
          handleClose={handleCloseModalsPostItem}
          profile={profile}
          data={dataModalsPostItem}
        />
      )}
    </>
  );
};

export default Profile;
