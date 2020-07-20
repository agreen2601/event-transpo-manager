import React from "react";
import { Route, Redirect } from "react-router-dom";
import DateForm from "./forms/dateForm";
import ShuttleForm from "./forms/shuttleForm";
import RouteForm from "./forms/routeForm";
import PlaceForm from "./forms/placeForm";
import DriverForm from "./forms/driverForm";
import DriverEditForm from "./forms/driverEditForm";
import VehicleForm from "./forms/vehicleForm";
import VehicleEditForm from "./forms/vehicleEditForm";
import AssignmentForm from "./forms/assignmentForm";
import AssignmentAddForm from "./forms/assignmentAddForm";
import AssignmentEditForm from "./forms/assignmentEditForm";
import RouteView from "./routeView/routeView";
import DriverList from "./drivers/driverList";
import "./styles.css";

const EventTranspoManager = (props) => {
  const hasUser = props.hasUser;
  const dates = props.dates;
  const routes = props.routes;
  const chosenDateId = props.chosenDateId;
  const chosenDateName = props.chosenDateName;
  const chosenRoute = props.chosenRoute;
  const handleChosenRouteChange = props.handleChosenRouteChange;
  const handleChosenDateChange = props.handleChosenDateChange;

  return (
    <>
      <Route exact path="/" render={() => <Redirect to="/route/view" />} />
      <Route
        exact
        path="/date/form"
        render={() => (hasUser ? <DateForm /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path="/shuttle/form"
        render={() => (hasUser ? <ShuttleForm /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path="/route/form"
        render={() => (hasUser ? <RouteForm /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path="/location/form"
        render={() =>
          hasUser ? (
            <PlaceForm routes={routes} {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/driver/form"
        render={(props) =>
          hasUser ? <DriverForm {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/driver/edit/:driverId(\d+)/:vehicleId(\d+)"
        render={(props) =>
          hasUser ? <DriverEditForm {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/vehicle/form"
        render={(props) =>
          hasUser ? <VehicleForm {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/vehicle/edit/:driverId(\d+)/:vehicleId(\d+)"
        render={(props) =>
          hasUser ? <VehicleEditForm {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/assignment/form"
        render={(props) =>
          hasUser ? (
            <AssignmentForm
              chosenRoute={chosenRoute}
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
        path="/assignment/add/:routeId(\d+)"
        render={(props) =>
          hasUser ? (
            <AssignmentAddForm
              chosenDate={chosenDateId}
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
        path="/assignment/edit/:assignmentId(\d+)/:routeId(\d+)/:driverId(\d+)/:vehicleId(\d+)"
        render={(props) =>
          hasUser ? <AssignmentEditForm {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/route/view"
        render={(props) =>
          hasUser ? (
            <RouteView
              dates={dates}
              routes={routes}
              chosenDate={chosenDateId}
              chosenRoute={chosenRoute}
              handleChosenDateChange={handleChosenDateChange}
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
        path="/driver/list"
        render={(props) =>
          hasUser ? (
            <DriverList
              dates={dates}
              routes={routes}
              chosenDateId={chosenDateId}
              chosenDateName={chosenDateName}
              chosenRoute={chosenRoute}
              handleChosenDateChange={handleChosenDateChange}
              handleChosenRouteChange={handleChosenRouteChange}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      {/* <Route
        exact
        path="/driver/search"
        render={(props) =>
          hasUser ? (
            <DriverSearch searchField={submittedSearchField} {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      /> */}
    </>
  );
};

export default EventTranspoManager;
