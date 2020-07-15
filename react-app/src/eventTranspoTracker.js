import React from "react";
import { Route, Redirect } from "react-router-dom";
import EntryForm from "./forms/entryForm";
import EntryEditForm from "./forms/entryEditForm";
import RouteReport from "./reports/routeReport";
import AssignmentFinder from "./reports/assignmentFinder";
import Log from "./reports/log";

const EventTranspoTracker = (props) => {
  const hasUser = props.hasUser;
  const dates = props.dates;
  const shuttles = props.shuttles;
  const routes = props.routes;
  const places = props.places;
  const entries = props.entries;
  const chosenDateId = props.chosenDateId;
  const chosenDateName = props.chosenDateName;
  const chosenShuttleId = props.chosenShuttleId;
  const chosenShuttleName = props.chosenShuttleName;
  const chosenRoute = props.chosenRoute;
  const chosenPlaceId = props.chosenPlaceId;
  const chosenPlaceName = props.chosenPlaceName;
  const getEntries = props.getEntries;
  const handleChosenPlaceChange = props.handleChosenPlaceChange;
  const handleChosenRouteChange = props.handleChosenRouteChange;
  const handleChosenShuttleChange = props.handleChosenShuttleChange;
  const handleChosenDateChange = props.handleChosenDateChange;

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
              handleChosenPlaceChange={handleChosenPlaceChange}
              handleChosenRouteChange={handleChosenRouteChange}
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
          hasUser ? <AssignmentFinder {...props} /> : <Redirect to="/login" />
        }
      />
    </span>
  );
};

export default EventTranspoTracker;
