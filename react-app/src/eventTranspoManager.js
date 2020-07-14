import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import DateForm from "./forms/dateForm";
import ShuttleForm from "./forms/shuttleForm";
import RouteForm from "./forms/routeForm";
import PlaceForm from "./forms/placeForm";
import DriverForm from "./forms/driverForm";
import VehicleForm from "./forms/vehicleForm";
import AssignmentForm from "./forms/assignmentForm";
import AssignmentAddForm from "./forms/assignmentAddForm";
import RouteView from "./routeView/routeView";
import apiManager from "./api/apiManager";
import "./styles.css";

const EventTranspoManager = (props) => {
  const hasUser = props.hasUser;

  const [dates, setDates] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [chosenDate, setChosenDate] = useState(1);
  const [chosenRoute, setChosenRoute] = useState("");

  const getDates = () => {
    apiManager.getAllType("dates").then((r) => {
      r.sort((a, b) => (a.date > b.date ? 1 : -1));
      setDates(r);
    });
  };

  const getRoutes = () => {
    apiManager.getAllType("routes").then((r) => {
      r.sort((a, b) => (a.name > b.name ? 1 : -1));
      setRoutes(r);
    });
  };

  const handleChosenDateChange = (e) => {
    setChosenDate(e.target.value);
  };

  const handleChosenRouteChange = (e) => {
    setChosenRoute(e.target.value);
  };

  useEffect(() => {
    getDates();
    getRoutes();
  }, []);

  return (
    <span>
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
        path="/vehicle/form"
        render={(props) =>
          hasUser ? <VehicleForm {...props} /> : <Redirect to="/login" />
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
              chosenDate={chosenDate}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
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
              chosenDate={chosenDate}
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
    </span>
  );
};

export default EventTranspoManager;
