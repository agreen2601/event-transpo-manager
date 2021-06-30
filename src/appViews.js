import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import NavBar from "./navbar";
import EventTranspoTracker from "./eventTranspoTracker";
import EventTranspoManager from "./eventTranspoManager";
import Login from "./auth/login";
import Register from "./auth/register";
import apiManager from "./api/apiManager";
import "./styles.css";

const AppViews = (props) => {
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated());
  const [isSupervisor, setIsSupervisor] = useState(Boolean);
  const [isStaff, setIsStaff] = useState(Boolean);

  const findSupervisor = () => {
    apiManager
      .getSingleType("users", sessionStorage.getItem("userID"))
      .then((r) => {
        setIsSupervisor(r.is_superuser);
        setIsStaff(r.is_staff);
      });
  };

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    sessionStorage.setItem("userID", resp.user_id);
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
    setIsSupervisor(false);
    setIsStaff(false);
    setChosenRoute("");
  };

  const [mode, setMode] = useState(false);
  const handleModeChange = () => {
    setMode(!mode);
    findSupervisor();
  };

  // places routes and shuttles fill the dropdown menus
  // places filter based on chosenRoute
  // chosenPlace chosenRoute and chosenShuttle are the choices made from the dropdowns
  const [dates, setDates] = useState([]);
  const [shuttles, setShuttles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [places, setPlaces] = useState([]);
  // const [assignments, setAssignments] = useState([]);
  const [entries, setEntries] = useState([]);
  const [chosenDateId, setChosenDateId] = useState("");
  const [chosenDateName, setChosenDateName] = useState("");
  const [chosenShuttleId, setChosenShuttleId] = useState("");
  const [chosenShuttleName, setChosenShuttleName] = useState("");
  const [chosenRoute, setChosenRoute] = useState("");
  const [chosenPlaceId, setChosenPlaceId] = useState("");
  const [chosenPlaceName, setChosenPlaceName] = useState("");
  // const [chosenVehicle, setChosenVehicle] = useState("");

  // get and sort all dropdowns
  const getDates = () => {
    apiManager.getAllType("dates").then((r) => {
      r.sort((a, b) => a.date.localeCompare(b.date));
      setDates(r);
    });
  };

  const getShuttles = () => {
    apiManager.getAllType("shuttles").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setShuttles(r);
    });
  };

  const getRoutes = () => {
    apiManager.getAllType("routes").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setRoutes(r);
    });
  };

  const getPlaces = () => {
    apiManager.getAllType("places").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setPlaces(r);
    });
  };

  // const getAssignments = () => {
  //   apiManager.getAllType("assignments").then((r) => {
  //     r.sort((a, b) => a.vehicle.number.localeCompare(b.vehicle.number));
  //     setAssignments(r);
  //   });
  // };

  const getEntries = () => {
    apiManager.getAllType("entries").then((r) => {
      setEntries(r);
    });
  };

  // set chosenPlace based on choice from dropdown menu
  const handleChosenPlaceChange = (e) => {
    setChosenPlaceId(e.target.value);
    setChosenPlaceName(e.target.options[e.target.selectedIndex].dataset.name);
    if (e.target.value !== "") {
    } else {
      apiManager.getAllType("routes").then((r) => {
        r.sort((a, b) => a.name.localeCompare(b.name));
        setRoutes(r);
      });
    }
  };

  // // set choseroute based on choice from dropdown menu on form log and graph
  const handleChosenRouteChange = (e) => {
    const routeId = e.target.value;
    setChosenRoute(routeId);
    setChosenPlaceId("");
    setChosenPlaceName("");
    apiManager.getAllType("places").then((r) => {
      if (routeId !== "") {
        setPlaces(
          r
            .filter((each) => each.route.name === routeId)
            .sort((a, b) => a.name.localeCompare(b.name))
        );
      } else {
        setPlaces(r.sort((a, b) => a.name.localeCompare(b.name)));
      }
    });
  };

  // setChosenVehicle("");
  // apiManager.getAllType("assigments").then((r) => {
  //   setAssignments(
  //     r.sort((a, b) => a.vehicle.number.localeCompare(b.vehicle.number))
  //   );
  // });

  // set chosenShuttleId based on choice from dropdown menu
  const handleChosenShuttleChange = (e) => {
    setChosenShuttleId(e.target.value);
    setChosenShuttleName(e.target.options[e.target.selectedIndex].dataset.name);
  };

  // set chosenDate based on choice from dropdown menu
  const handleChosenDateChange = (e) => {
    setChosenDateId(e.target.value);
    setChosenDateName(e.target.options[e.target.selectedIndex].dataset.name);
  };

  // const handleChosenVehicleChange = (e) => {
  //   setChosenVehicle(e.target.value);
  // };

  useEffect(() => {
    getDates();
    getShuttles();
    getRoutes();
    getPlaces();
    // getVehicles();
  }, []);

  return (
    <BrowserRouter>
      <>
        {hasUser ? (
          <>
            <NavBar
              hasUser={hasUser}
              clearUser={clearUser}
              isSupervisor={isSupervisor}
              isStaff={isStaff}
              mode={mode}
              handleModeChange={handleModeChange}
              {...props}
            />
            <>
              {mode === false ? (
                <EventTranspoTracker
                  hasUser={hasUser}
                  isSupervisor={isSupervisor}
                  dates={dates}
                  shuttles={shuttles}
                  routes={routes}
                  places={places}
                  // vehicles={vehicles}
                  entries={entries}
                  chosenDateId={chosenDateId}
                  chosenDateName={chosenDateName}
                  chosenShuttleId={chosenShuttleId}
                  chosenShuttleName={chosenShuttleName}
                  chosenRoute={chosenRoute}
                  chosenPlaceId={chosenPlaceId}
                  chosenPlaceName={chosenPlaceName}
                  // chosenVehicle={chosenVehicle}
                  getEntries={getEntries}
                  handleChosenPlaceChange={handleChosenPlaceChange}
                  handleChosenRouteChange={handleChosenRouteChange}
                  handleChosenShuttleChange={handleChosenShuttleChange}
                  handleChosenDateChange={handleChosenDateChange}
                  // handleChosenVehicleChange={handleChosenVehicleChange}
                  {...props}
                />
              ) : (
                <EventTranspoManager
                  hasUser={hasUser}
                  isSupervisor={isSupervisor}
                  isStaff={isStaff}
                  dates={dates}
                  routes={routes}
                  chosenDateId={chosenDateId}
                  chosenDateName={chosenDateName}
                  chosenRoute={chosenRoute}
                  handleChosenRouteChange={handleChosenRouteChange}
                  handleChosenDateChange={handleChosenDateChange}
                  getDates={getDates}
                  getShuttles={getShuttles}
                  getRoutes={getRoutes}
                  getPlaces={getPlaces}
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
                <Login
                  setUserToken={setUserToken}
                  findSupervisor={findSupervisor}
                  {...props}
                />
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
