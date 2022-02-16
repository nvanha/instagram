import HeaderLogo from "assets/logo.png";
import Header from "components/Header";
import * as ROUTES from "constants/routes";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found - Instagram";
  }, []);

  return (
    <div id="notfound-page" className="notfound-wrapper">
      {/* <div className="notfound-header">
        <div
          className="notfound-header--logo"
          style={{ backgroundImage: `url(${HeaderLogo})` }}
        />
        <div className="notfound-header--nav">
          <Link to={ROUTES.LOGIN} className="login">
            Log In
          </Link>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </div>
      </div> */}
      <Header />
      <div className="notfound-main">
        <div className="notfound-main--title">
          Sorry, this page isn't available.
        </div>
        <div className="notfound-main--desc">
          The link you followed may be broken, or the page may have been
          removed. <Link to={ROUTES.DASHBOARD}>Go back to Instagram.</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
