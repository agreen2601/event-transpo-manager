import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import apiManager from "../api/apiManager";

const AssignmentEditForm = (props) => {
  const [assignment, setAssignment] = useState({
    driver_id: props.match.params.driverId,
    vehicle_id: props.match.params.vehicleId,
    route_id: props.match.params.routeId,
  });

  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const getAssignment = (assignId) => {
    apiManager.getSingleType("assignments", assignId).then((assignment) => {
      setAssignment(assignment);
    });
  };

  let driverName = "";
  assignment.driver === undefined
    ? (driverName = "")
    : (driverName = assignment.driver.name);

  const getAllDropDowns = () => {
    return (
      apiManager.getType("routes").then((r) => {
        r.sort((a, b) => (a.name > b.name ? 1 : -1));
        setRoutes(r);
      }),
      apiManager.getType("vehicles").then((r) => {
        r.sort((a, b) => (a.number > b.number ? 1 : -1)).sort((a, b) =>
          a.company.localeCompare(b.company)
        );
        setVehicles(r);
      })
    );
  };

  const handleAssignmentChange = (e) => {
    const stateToChange = { ...assignment };
    stateToChange[e.target.id] = e.target.value;
    setAssignment(stateToChange);
  };

  useEffect(() => {
    getAssignment(props.match.params.assignmentId);
    getAllDropDowns();
  }, [props.match.params.assignmentId]);

  const editedAssignment = {
    id: props.match.params.assignmentId,
    start_time: assignment.start_time,
    end_time: assignment.end_time,
    driver_id: assignment.driver_id,
    vehicle_id: assignment.vehicle_id,
    route_id: assignment.route_id,
    date_id: assignment.date_id,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager
      .updateType("assignments", editedAssignment)
      .then(() => props.history.push(`/route/view`));
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Edit Assignment for {driverName}
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel>Vehicle:</InputLabel>
            <Select
              id="vehicle_id"
              native
              onChange={handleAssignmentChange}
              fullWidth
              required
              value={assignment.vehicle_id}
            >
              <option aria-label="None" value="" data-name="">
                Choose Vehicle
              </option>
              {vehicles ? (
                vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={parseInt(vehicle.id)}>
                    {vehicle.company} {vehicle.number}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Route:</InputLabel>
            <Select
              id="route_id"
              native
              onChange={handleAssignmentChange}
              fullWidth
              required
              value={assignment.route_id}
            >
              <option aria-label="None" value="" data-name="">
                Choose Route
              </option>
              {routes ? (
                routes.map((route) => (
                  <option key={route.id} value={parseInt(route.id)}>
                    {route.name} {route.description}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Grid>
        </Grid>
        <div className="submit-button">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default AssignmentEditForm;
