import LoginBanner from "assets/iphone-with-profile.jpg";
import HeaderLogo from "assets/logo.png";
import * as ROUTES from "constants/routes";
import FirebaseContext from "context/firebase";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { doesUsernameExists } from "services/firebase";

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userNameExists = await doesUsernameExists(userName);
    if (!userNameExists.length) {
      try {
        const createUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createUserResult.user.updateProfile({
          displayName: userName,
        });

        const data = {
          userId: createUserResult.user.uid,
          username: userName.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        };

        // firebase user collection (create a document)
        await firebase.firestore().collection("users").add(data);

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setUserName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUserName("");
      setError("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
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
              onSubmit={handleSignUp}
              className="login-col-right--form-login"
            >
              <div className="input-control">
                <input
                  type="text"
                  aria-label="Enter your username"
                  placeholder="Username"
                  onChange={({ target }) => setUserName(target.value)}
                  value={userName}
                />
              </div>
              <div className="input-control">
                <input
                  type="text"
                  aria-label="Enter your full Name"
                  placeholder="Full Name"
                  onChange={({ target }) => setFullName(target.value)}
                  value={fullName}
                />
              </div>
              <div className="input-control">
                <input
                  type="text"
                  aria-label="Enter your email address"
                  placeholder="Email address"
                  onChange={({ target }) => setEmailAddress(target.value)}
                  value={emailAddress}
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
                  value={password}
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
                Sign Up
              </button>
            </form>
          </div>
          <div className="login-col-right--wrapper-item">
            <p className="login-col-right--register">
              Have an account? <Link to={ROUTES.LOGIN}>Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
