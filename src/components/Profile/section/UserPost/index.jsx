import { ReactComponent as PostsIcon1 } from "assets/profile/posts1.svg";
import { ReactComponent as PostsIcon2 } from "assets/profile/posts2.svg";
import { ReactComponent as ReelsIcon1 } from "assets/profile/reels1.svg";
import { ReactComponent as ReelsIcon2 } from "assets/profile/reels2.svg";
import { ReactComponent as SavedIcon1 } from "assets/profile/saved1.svg";
import { ReactComponent as SavedIcon2 } from "assets/profile/saved2.svg";
import { ReactComponent as TaggedIcon1 } from "assets/profile/tagged1.svg";
import { ReactComponent as TaggedIcon2 } from "assets/profile/tagged2.svg";
import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Posts from "./Posts";
import Reels from "./Reels";
import Saved from "./Saved";
import Tagged from "./Tagged";

const UserPost = ({ photosCollection, handleOpenModalsPostItem }) => {
  const [eventKey, setEventKey] = useState("posts");

  return (
    <div className="user-post--wrapper">
      <Tab.Container defaultActiveKey="posts">
        <div className="user-post--nav-link">
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey="posts" onClick={() => setEventKey("posts")}>
                {eventKey !== "posts" ? <PostsIcon1 /> : <PostsIcon2 />}POSTS
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="reels" onClick={() => setEventKey("reels")}>
                {eventKey !== "reels" ? <ReelsIcon1 /> : <ReelsIcon2 />}REELS
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saved" onClick={() => setEventKey("saved")}>
                {eventKey !== "saved" ? <SavedIcon1 /> : <SavedIcon2 />}SAVED
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tagged" onClick={() => setEventKey("tagged")}>
                {eventKey !== "tagged" ? <TaggedIcon1 /> : <TaggedIcon2 />}
                TAGGED
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="user-post--main">
          <Tab.Content>
            <Tab.Pane eventKey="posts">
              {eventKey === "posts" && (
                <Posts
                  photosCollection={photosCollection}
                  handleOpenModalsPostItem={handleOpenModalsPostItem}
                />
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="reels">
              {eventKey === "reels" && <Reels />}
            </Tab.Pane>
            <Tab.Pane eventKey="saved">
              {eventKey === "saved" && <Saved />}
            </Tab.Pane>
            <Tab.Pane eventKey="tagged">
              {eventKey === "tagged" && <Tagged />}
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
};

export default UserPost;
