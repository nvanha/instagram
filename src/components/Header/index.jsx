import { ReactComponent as ActivityIcon } from "assets/header/activity.svg";
import { ReactComponent as CreatePostIcon } from "assets/header/create-post.svg";
import { ReactComponent as DirectIcon } from "assets/header/direct.svg";
import { ReactComponent as ExploreIcon } from "assets/header/explore.svg";
import { ReactComponent as HomeIcon } from "assets/header/home.svg";
import { ReactComponent as ProfileIcon } from "assets/header/profile.svg";
import { ReactComponent as SavedIcon } from "assets/header/saved.svg";
import { ReactComponent as SettingIcon } from "assets/header/settings.svg";
import { ReactComponent as SwitchAccountIcon } from "assets/header/switch-account.svg";
import HeaderLogo from "assets/logo.png";
import * as ROUTES from "constants/routes";
import FirebaseContext from "context/firebase";
import UserContext from "context/user";
import React, { useContext, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, NavLink, useHistory } from "react-router-dom";

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [history, user]);

  return (
    <header className="dashboard-header">
      <div className="container">
        <div className="dashboard-header--inner">
          <div className="dashboard-header--logo">
            <Link
              to={ROUTES.DASHBOARD}
              style={{ backgroundImage: `url(${HeaderLogo})` }}
            />
          </div>
          <div className="dashboard-header--nav">
            {user ? (
              <>
                <NavLink
                  exact
                  to={ROUTES.DASHBOARD}
                  aria-label="Dashboard"
                  className="dashboard-header--nav__item"
                  activeClassName="selected"
                >
                  <HomeIcon />
                </NavLink>
                <NavLink
                  to={ROUTES.DIRECT}
                  aria-label="Direct"
                  className="dashboard-header--nav__item"
                  activeClassName="selected"
                >
                  <DirectIcon />
                </NavLink>
                <NavLink
                  to={ROUTES.CREATEPOST}
                  aria-label="CreatePost"
                  className="dashboard-header--nav__item"
                  activeClassName="selected"
                >
                  <CreatePostIcon />
                </NavLink>
                <NavLink
                  to={ROUTES.EXPLORE}
                  aria-label="Explore"
                  className="dashboard-header--nav__item"
                  activeClassName="selected"
                >
                  <ExploreIcon />
                </NavLink>
                <NavLink
                  to={ROUTES.ACTIVITY}
                  aria-label="Activity"
                  className="dashboard-header--nav__item"
                  activeClassName="selected"
                >
                  <ActivityIcon />
                </NavLink>
                <Dropdown className="dashboard-header--nav__dropdown dashboard-header--nav__item">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <div className="dashboard-header--nav__avt">
                      <img
                        src={`/images/avatars/${user.displayName}.jpg`}
                        alt={`${user.displayName} profile`}
                      />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/p/${user.displayName}`}>
                      <ProfileIcon />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/saved`}>
                      <SavedIcon />
                      Saved
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/settings`}>
                      <SettingIcon />
                      Settings
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/switch-accounts`}>
                      <SwitchAccountIcon />
                      Switch Accounts
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => firebase.auth().signOut()}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          firebase.auth().signOut();
                        }
                      }}
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <div className="dashboard-header--nav__no-user">
                <Link to={ROUTES.LOGIN} className="login">
                  Log In
                </Link>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
