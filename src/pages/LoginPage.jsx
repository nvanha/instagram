import LoginBanner from "assets/iphone-with-profile.jpg";
import HeaderLogo from "assets/logo.png";
import * as ROUTES from "constants/routes";
import FirebaseContext from "context/firebase";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const passwordRef = useRef(null);

  const handleShowPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
    alert(`
      Account Test:
      - email: nvha1120@gmail.com
      - password: haTest123@
    `);
  }, []);

  return (
    <div id="login-page" className="login-wrapper">
      <div className="login-container">
        <div
          className="login-col-left"
          style={{ backgroundImage: `url(${LoginBanner})` }}
        />

        <div className="login-col-right">
          <div className="login-col-right--wrapper-item">
            <div
              className="login-col-right--header-logo"
              style={{ backgroundImage: `url(${HeaderLogo})` }}
            />
            {error && <p className="login-col-right--error-msg">{error}</p>}

            <form
              action="POST"
              onSubmit={handleLogin}
              className="login-col-right--form-login"
            >
              <div className="input-control">
                <input
                  type="text"
                  aria-label="Enter your email address"
                  placeholder="Email address"
                  onChange={({ target }) => setEmailAddress(target.value)}
                />
              </div>
              <div className="input-control">
                <input
                  ref={passwordRef}
                  type="password"
                  aria-label="Enter your password"
                  placeholder="Password"
                  className="password"
                  onChange={({ target }) => setPassword(target.value)}
                />
                <span className="show-password" onClick={handleShowPassword}>
                  Show
                </span>
              </div>
              <button
                className={`input-submit ${isInvalid ? "disabled" : ""}`}
                type="submit"
                disabled={isInvalid}
              >
                Log In
              </button>
            </form>
          </div>
          <div className="login-col-right--wrapper-item">
            <p className="login-col-right--register">
              Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
