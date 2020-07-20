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

const VehicleForm = (props) => {
  const [vehicle, setVehicle] = useState({
    company: "",
    number: "",
    kind: "",
    capacity: "",
  });

  var [isChecked, setIsChecked] = useState(false);
  const handleIsCheckedChange = () => {
    setIsChecked(!isChecked);
  };

  // update state of driver upon form field change
  const handleVehicleChange = (event) => {
    const stateToChange = { ...vehicle };
    stateToChange[event.target.id] = event.target.value;
    setVehicle(stateToChange);
  };

  // get all vehicles, check if vehicle already in system, post if not, send to assignment form

  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager.getAllType("vehicles").then((allVehicles) => {
      vehicle.isAda = isChecked;
      const vehicleA = allVehicles.find(
        (vehicleA) =>
          vehicleA.company === vehicle.company &&
          vehicleA.number === vehicle.number
      );
      if (vehicleA === undefined) {
        apiManager.postType("vehicles", vehicle);
        // .then((result) => props.setVehicleId(result.id));
      } else {
        alert("Vehicle already in database.");
      }
      setTimeout(() => {
        props.history.push("/assignment/form");
      }, 100);
    });
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Add New Vehicle
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Company: </InputLabel>
            <TextField
              id="company"
              fullWidth
              required
              onChange={handleVehicleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Number: </InputLabel>
            <TextField
              id="number"
              fullWidth
              required
              onChange={handleVehicleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Type: </InputLabel>
            <TextField id="kind" fullWidth onChange={handleVehicleChange} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Capacity: </InputLabel>
            <TextField id="capacity" fullWidth onChange={handleVehicleChange} />
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
              label="ADA vehicle?"
            />
          </Grid>
        </Grid>
        <div className="submit-button">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
        <div className="submit-button">
          <Link to="/assignment/form" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Skip
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default VehicleForm;
