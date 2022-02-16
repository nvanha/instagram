import Post from "components/Post";
import usePhotos from "hooks/usePhotos";
import React from "react";
import Skeleton from "react-loading-skeleton";

const Timeline = () => {
  // we need to get the logged in user's photos (hook)
  const { photos } = usePhotos();
  // on loading the photos, we need to use react skeleton
  // if we have photos, render them (create a post component)
  // if the user has no photos, tell them to create some photos

  return (
    <div className="dashboard-timeline">
      {!photos ? (
        <>
          {[...new Array(4)].map((item, index) => (
            <Skeleton
              key={index}
              count={1}
              className="dashboard-timeline-skeleton"
            />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} data={content} />)
      ) : (
        <p>Follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
