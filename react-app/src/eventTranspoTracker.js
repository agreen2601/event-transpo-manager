import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import EntryForm from "./forms/entryForm";
import EntryEditForm from "./forms/entryEditForm";
import apiManager from "./api/apiManager";
import RouteReport from "./reports/routeReport";
import AssignmentFinder from "./reports/assignmentFinder"
import Log from "./reports/log";

const EventTranspoTracker = (props) => {
  const hasUser = props.hasUser;

  // places routes and shuttles fill the dropdown menus
  // places filter based on chosenRoute
  // chosenPlace chosenRoute and chosenShuttle are the choices made from the dropdowns
  const [dates, setDates] = useState([]);
  const [shuttles, setShuttles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [places, setPlaces] = useState([]);
  const [entries, setEntries] = useState([]);
  const [chosenDateId, setChosenDateId] = useState("");
  const [chosenDateName, setChosenDateName] = useState("");
  const [chosenShuttleId, setChosenShuttleId] = useState("");
  const [chosenShuttleName, setChosenShuttleName] = useState("");
  const [chosenRoute, setChosenRoute] = useState("");
  const [chosenPlaceId, setChosenPlaceId] = useState("");
  const [chosenPlaceName, setChosenPlaceName] = useState("");

  // get and sort all dropdowns
  const getAllDropDowns = () => {
    return (
      apiManager.getAllType("dates").then((r) => {
        r.sort((a, b) => a.date.localeCompare(b.date));
        setDates(r);
      }),
      apiManager.getAllType("shuttles").then((r) => {
        r.sort((a, b) => a.name.localeCompare(b.name));
        setShuttles(r);
      }),
      apiManager.getAllType("routes").then((r) => {
        r.sort((a, b) => a.name.localeCompare(b.name));
        setRoutes(r);
      }),
      apiManager.getAllType("places").then((r) => {
        r.sort((a, b) => a.name.localeCompare(b.name));
        setPlaces(r);
      })
    );
  };

  const getEntries = () => {
    apiManager.getAllType("entries").then((r) => {
      setEntries(r);
    });
  };

  // set chosePlace based on choice from dropdown menu
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

  useEffect(() => {
    getAllDropDowns();
  }, []);

  return (
    <span>
      <Route exact path="/" render={() => <Redirect to="/entry/form" />} />
      <Route
        exact
        path="/entry/form"
        render={(props) =>
          hasUser ? (
            <EntryForm
              places={places}
              routes={routes}
              shuttles={shuttles}
              dates={dates}
              chosenPlaceId={chosenPlaceId}
              chosenRoute={chosenRoute}
              chosenShuttleId={chosenShuttleId}
              chosenDateId={chosenDateId}
              handleChosenPlaceChange={handleChosenPlaceChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenShuttleChange={handleChosenShuttleChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/entry/edit/form/:entryId(\d+)"
        render={(props) =>
          hasUser ? (
            <EntryEditForm
              places={places}
              routes={routes}
              shuttles={shuttles}
              dates={dates}
              chosenPlaceId={chosenPlaceId}
              chosenRoute={chosenRoute}
              chosenShuttleId={chosenShuttleId}
              chosenDateId={chosenDateId}
              handleChosenPlaceChange={handleChosenPlaceChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenShuttleChange={handleChosenShuttleChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/log"
        render={(props) =>
          hasUser ? (
            <Log
              getEntries={getEntries}
              dates={dates}
              shuttles={shuttles}
              routes={routes}
              places={places}
              entries={entries}
              chosenPlaceId={chosenPlaceId}
              chosenPlaceName={chosenPlaceName}
              chosenRoute={chosenRoute}
              chosenShuttleId={chosenShuttleId}
              chosenShuttleName={chosenShuttleName}
              chosenDateId={chosenDateId}
              chosenDateName={chosenDateName}
              handleChosenPlaceChange={handleChosenPlaceChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenShuttleChange={handleChosenShuttleChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/graph"
        render={(props) =>
          hasUser ? (
            <RouteReport
              getEntries={getEntries}
              dates={dates}
              shuttles={shuttles}
              routes={routes}
              places={places}
              entries={entries}
              chosenPlaceId={chosenPlaceId}
              chosenPlaceName={chosenPlaceName}
              chosenRoute={chosenRoute}
              chosenShuttleId={chosenShuttleId}
              chosenShuttleName={chosenShuttleName}
              chosenDateId={chosenDateId}
              chosenDateName={chosenDateName}
              handleChosenPlaceChange={handleChosenPlaceChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenShuttleChange={handleChosenShuttleChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/assignment/finder/:dateId(\d+)/:vehNum(\d+)"
        render={(props) =>
          hasUser ? (
            <AssignmentFinder
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </span>
  );
};

export default EventTranspoTracker;
