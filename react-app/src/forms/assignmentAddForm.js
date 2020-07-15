import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import apiManager from "../api/apiManager";
import moment from "moment";

const AssignmentAddForm = (props) => {
  const chosenDate = props.chosenDate;
  const handleChosenDateChange = props.handleChosenDateChange;
  const [assignment, setAssignment] = useState({
    start_time: moment().format("HH:mm"),
    end_time: "23:59",
  });

  assignment.route_id = props.match.params.routeId;
  assignment.date_id = chosenDate;

  const [route, setRoute] = useState([]);
  const getRoute = () => {
    apiManager
      .getSingleType("routes", props.match.params.routeId)
      .then((r) => setRoute(r));
  };

  console.log(route);

  const [dates, setDates] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const getAllDropDowns = () => {
    return (
      apiManager.getType("dates").then((r) => {
        r.sort((a, b) => (a.date > b.date ? 1 : -1));
        setDates(r);
      }),
      apiManager.getType("routes").then((r) => {
        r.sort((a, b) => (a.name > b.name ? 1 : -1));
        setRoutes(r);
      }),
      apiManager.getType("drivers").then((r) => {
        r.sort((a, b) => a.name.localeCompare(b.name));
        setDrivers(r);
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
    getAllDropDowns();
    getRoute();
  }, []);

  // get all drivers, check if driver already in system, post if not, send to route view
  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager
      .getAssignmentsByDateDriver(assignment.date_id, assignment.driver_id)
      .then((assignments) => {
        if (assignments.length > 0) {
          alert(`This driver has already been assigned on this day.`);
        } else {
          apiManager
            .addType("assignments", assignment)
            .then(() => props.history.push(`/route/view`));
        }
      });
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Create New Assignment for Route {route.name} {route.description}
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel>Date:</InputLabel>
            <Select
              id="date_id"
              native
              onChange={handleChosenDateChange}
              fullWidth
              required
              value={chosenDate}
            >
              <option aria-label="None" value="" data-name="">
                Choose Date
              </option>
              {dates ? (
                dates.map((date) => (
                  <option key={date.id} value={parseInt(date.id)}>
                    {date.date}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Driver:</InputLabel>
            <Select
              id="driver_id"
              native
              onChange={handleAssignmentChange}
              fullWidth
              required
            >
              <option aria-label="None" value="" data-name="">
                Choose Driver
              </option>
              {drivers ? (
                drivers.map((driver) => (
                  <option key={driver.id} value={parseInt(driver.id)}>
                    {driver.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Vehicle:</InputLabel>
            <Select
              id="vehicle_id"
              native
              onChange={handleAssignmentChange}
              fullWidth
              required
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
            <InputLabel htmlFor="age-native-simple">Start Time: </InputLabel>
            <TextField
              id="start_time"
              type="time"
              fullWidth
              value={assignment.start_time}
              onChange={handleAssignmentChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">End Time: </InputLabel>
            <TextField
              id="end_time"
              type="time"
              fullWidth
              value={assignment.end_time}
              onChange={handleAssignmentChange}
            />
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

export default AssignmentAddForm;
