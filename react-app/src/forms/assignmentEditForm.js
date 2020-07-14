import React, { useState, useEffect } from "../../node_modules/react";
import apiManager from "../apiManager/apiManager";

const AssignmentEditForm = props => {
  const [assignment, setAssignment] = useState({
    startTime: "",
    endTime: "",
    driverId: props.match.params.driverId,
    vehicleId: props.match.params.vehicleId,
    routeId: 3,
    dateId: props.chosenDate
  });
  const [dates, setDates] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const handleAssignmentChange = event => {
    const stateToChange = { ...assignment };
    if (event.target.id === "startTime" || event.target.id === "endTime") {
      stateToChange[event.target.id] = event.target.value;
    } else {
      stateToChange[event.target.id] = parseInt(event.target.value);
    }
    setAssignment(stateToChange);
  };

  const getAssignment = (assignId) => {
    apiManager
      .getAssignmentById(assignId)
      .then(assignment => {
        setAssignment(assignment);
      });
  };

  const getAllDropDowns = () => {
    return (
      apiManager.getType("dates").then(datesFromApi => {
        datesFromApi.sort((a, b) => (a.number > b.number ? -1 : 1));
        setDates(datesFromApi);
      }),
      apiManager.getType("routes").then(routesFromApi => {
        routesFromApi.sort((a, b) => (a.number > b.number ? 1 : -1));
        setRoutes(routesFromApi);
      }),
      apiManager.getType("drivers").then(driversFromApi => {
        driversFromApi.sort((a, b) => a.name.localeCompare(b.name));
        setDrivers(driversFromApi);
      }),
      apiManager.getType("vehicles").then(vehiclesFromApi => {
        vehiclesFromApi.sort((a, b) => a.company.localeCompare(b.company));
        setVehicles(vehiclesFromApi);
      })
    );
  };

  useEffect(() => {
    getAssignment(props.match.params.assignmentId);
    getAllDropDowns();
  }, [props.match.params.assignmentId]);

  const submit = () => {
    const editedAssignment = {
      id: props.match.params.assignmentId,
      startTime: assignment.startTime,
      endTime: assignment.endTime,
      driverId: assignment.driverId,
      vehicleId: assignment.vehicleId,
      routeId: assignment.routeId,
      dateId: assignment.dateId
    };
    apiManager
      .updateType("assignments", editedAssignment)
      .then(() => props.history.push(`/routeview`));
  };

  return (
    <>
      <form>
      <h3>Edit Assignment</h3>
        <fieldset className="form">
          <div>
            <label>Driver: </label>
            <select
              id="driverId"
              onChange={handleAssignmentChange}
              value={assignment.driverId}
            >
              {drivers.map(driver => (
                <option
                  className="driver_option"
                  key={driver.id}
                  value={driver.id}
                >
                  {driver.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Vehicle: </label>
            <select
              id="vehicleId"
              onChange={handleAssignmentChange}
              value={assignment.vehicleId}
            >
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.company} {vehicle.number}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Route: </label>
            <select
              id="routeId"
              onChange={handleAssignmentChange}
              value={assignment.routeId}
            >
              {routes.map(route => (
                <option key={route.id} value={route.id}>
                  {route.number}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Date: </label>
            <select
              id="dateId"
              onChange={handleAssignmentChange}
              value={assignment.dateId}
            >
              {dates.map(date => (
                <option key={date.id} value={date.id}>
                  {date.date}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Start Time: </label>
            <input
              defaultValue={assignment.startTime}
              type="time"
              onChange={handleAssignmentChange}
              id="startTime"
            />
          </div>

          <div>
            <label>End Time: </label>
            <input
              defaultValue={assignment.endTime}
              type="time"
              onChange={handleAssignmentChange}
              id="endTime"
            />
          </div>

          <button type="button" onClick={submit}>
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default AssignmentEditForm;
