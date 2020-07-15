import React, { useState, useEffect } from "../../node_modules/react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import apiManager from "../api/apiManager";

const VehicleEditForm = (props) => {
  const [vehicle, setVehicle] = useState({
    company: "",
    number: "",
    kind: "",
    capacity: "",
    isAda: Boolean,
  });

  var [isChecked, setIsChecked] = useState(false);
  const handleIsCheckedChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    apiManager
      .getSingleType("vehicles", props.match.params.vehicleId)
      .then((vehicle) => {
        setVehicle(vehicle);
        setIsChecked(vehicle.isAda);
      });
  }, [props.match.params.vehicleId]);

  const handleVehicleChange = (event) => {
    const stateToChange = { ...vehicle };
    stateToChange[event.target.id] = event.target.value;
    setVehicle(stateToChange);
  };

  const editedVehicle = {
    id: props.match.params.vehicleId,
    company: vehicle.company,
    number: vehicle.number,
    kind: vehicle.kind,
    capacity: vehicle.capacity,
    isAda: isChecked,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager
      .updateType("vehicles", editedVehicle)
      .then(() => props.history.push("/route/view"));
  };

  const skip = () => {
    props.history.push("/route/view");
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Edit Vehicle Info
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
              value={vehicle.company}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Number: </InputLabel>
            <TextField
              id="number"
              fullWidth
              required
              onChange={handleVehicleChange}
              value={vehicle.number}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Type: </InputLabel>
            <TextField
              id="kind"
              fullWidth
              onChange={handleVehicleChange}
              value={vehicle.kind}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Capacity: </InputLabel>
            <TextField
              id="capacity"
              fullWidth
              onChange={handleVehicleChange}
              value={vehicle.capacity}
            />
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
          <Button variant="contained" color="primary" onClick={skip}>
            Skip
          </Button>
        </div>
      </form>
    </>
  );
};

export default VehicleEditForm;
