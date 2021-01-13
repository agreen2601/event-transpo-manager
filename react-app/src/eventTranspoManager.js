import React, { useState } from "react";
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
import StaffEditForm from "./forms/editStaffForm";
import StaffList from "./drivers/staffList";
import RouteView from "./routeView/routeView";
import DriverList from "./drivers/driverList";
import "./styles.css";

const EventTranspoManager = (props) => {
  const hasUser = props.hasUser;
  const isSupervisor = props.isSupervisor;
  const isStaff = props.isStaff;
  const dates = props.dates;
  const routes = props.routes;
  const chosenDateId = props.chosenDateId;
  const chosenDateName = props.chosenDateName;
  const chosenRoute = props.chosenRoute;
  const handleChosenRouteChange = props.handleChosenRouteChange;
  const handleChosenDateChange = props.handleChosenDateChange;
  const getDates = props.getDates;
  const getShuttles = props.getShuttles;
  const getRoutes = props.getRoutes;
  const getPlaces = props.getPlaces;
  const [driverId, setDriverId] = useState(1);
  const [vehicleId, setVehicleId] = useState(1);

  return (
    <>
      <Route exact path="/" render={() => <Redirect to="/route/view" />} />
      <Route
        exact
        path="/date/form"
        render={() =>
          hasUser ? (
            <DateForm getDates={getDates} {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/shuttle/form"
        render={() =>
          hasUser ? (
            <ShuttleForm getShuttles={getShuttles} {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/route/form"
        render={() =>
          hasUser ? (
            <RouteForm getRoutes={getRoutes} {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/location/form"
        render={() =>
          hasUser ? (
            <PlaceForm routes={routes} getPlaces={getPlaces} {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/driver/form"
        render={(props) =>
          hasUser ? (
            <DriverForm setDriverId={setDriverId} {...props} />
          ) : (
            <Redirect to="/login" />
          )
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
          hasUser ? (
            <VehicleForm setVehicleId={setVehicleId} {...props} />
          ) : (
            <Redirect to="/login" />
          )
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
              chosenDate={chosenDateId}
              handleChosenDateChange={handleChosenDateChange}
              driverId={driverId}
              vehicleId={vehicleId}
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
        path="/staff/edit/:userId(\d+)"
        render={(props) =>
          hasUser ? <StaffEditForm {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/route/view"
        render={(props) =>
          hasUser ? (
            <RouteView
              isStaff={isStaff}
              isSupervisor={isSupervisor}
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
      <Route
        exact
        path="/staff/list"
        render={(props) =>
          hasUser ? (
            <StaffList
              isStaff={isStaff}
              isSupervisor={isSupervisor}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </>
  );
};

export default EventTranspoManager;
