import React, { useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import NavBar from "./navbar";
import EventTranspoTracker from "./eventTranspoTracker";
import EventTranspoManager from "./eventTranspoManager";
import Login from "./auth/login";
import Register from "./auth/register";
import "./styles.css";

const AppViews = (props) => {
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    sessionStorage.setItem("userID", resp.user_id);
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  };

  const [mode, setMode] = useState(true);
  const handleModeChange = () => {
    setMode(!mode);
  };

  return (
    <BrowserRouter>
      <>
        {hasUser ? (
          <>
            <NavBar
              hasUser={hasUser}
              clearUser={clearUser}
              mode={mode}
              handleModeChange={handleModeChange}
              {...props}
            />
            <>
              {mode === false ? (
                <EventTranspoTracker
                  hasUser={hasUser}
                  {...props}
                />
              ) : (
                <EventTranspoManager
                  hasUser={hasUser}
                  {...props}
                />
              )}
            </>
          </>
        ) : (
          <>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login setUserToken={setUserToken} {...props} />
              )}
            />
            <Route
              exact
              path="/register"
              render={(props) => (
                <Register setUserToken={setUserToken} {...props} />
              )}
            />
          </>
        )}
      </>
    </BrowserRouter>
  );
};

export default AppViews;
