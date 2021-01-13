import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import apiManager from "../api/apiManager";

const DriverForm = (props) => {
  const [driver, setDriver] = useState({
    name: "",
    phone_number: "",
    notes: "",
  });

  var [isChecked, setIsChecked] = useState(false);
  const handleIsCheckedChange = () => {
    setIsChecked(!isChecked);
  };

  // update state of driver upon form field change
  const handleDriverChange = (e) => {
    const stateToChange = { ...driver };
    stateToChange[e.target.id] = e.target.value;
    setDriver(stateToChange);
  };

  // get all drivers, check if driver already in system, post if not, send to vehicle form
  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager.getAllType("drivers").then((allDrivers) => {
      driver.isLocal = isChecked;
      const driverA = allDrivers.find(
        (driverA) => driverA.name === driver.name
      );
      if (driverA === undefined) {
        apiManager
          .postType("drivers", driver)
          .then((result) => props.setDriverId(result.id));
        props.history.push(`/vehicle/form`);
      } else {
        alert("Driver already in database.");
      }
    });
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Add New Driver
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Name: </InputLabel>
            <TextField
              id="name"
              fullWidth
              required
              onChange={handleDriverChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Phone Number: </InputLabel>
            <TextField
              id="phone_number"
              fullWidth
              required
              onChange={handleDriverChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Notes: </InputLabel>
            <TextField id="notes" fullWidth onChange={handleDriverChange} />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleIsCheckedChange}
                  color="primary"
                />
              }
              label="Local driver?"
            />
          </Grid>
        </Grid>
        <div className="submit-button">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
        <div className="submit-button">
          <Link to="/vehicle/form" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Skip
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default DriverForm;
