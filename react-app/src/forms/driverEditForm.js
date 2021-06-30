import React, { useState, useEffect } from "../../node_modules/react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import apiManager from "../api/apiManager";

const DriverEditForm = (props) => {
  const [driver, setDriver] = useState({
    name: "",
    phone_number: "",
    notes: "",
    isLocal: Boolean,
    area: "",
    area_id: ""
  });

  var [isChecked, setIsChecked] = useState(false);
  const handleIsCheckedChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    apiManager
      .getSingleType("drivers", props.match.params.driverId)
      .then((driver) => {
        setDriver(driver);
        setIsChecked(driver.isLocal);
        console.log(driver)
      });
  }, [props.match.params.driverId]);

  const handleDriverChange = (event) => {
    const stateToChange = { ...driver };
    stateToChange[event.target.id] = event.target.value;
    setDriver(stateToChange);
  };

  const editedDriver = {
    id: props.match.params.driverId,
    name: driver.name,
    phone_number: driver.phone_number,
    isLocal: isChecked,
    notes: driver.notes,
    area: driver.area,
    area_id: driver.area_id
  };

  const handleSubmit = (e) => {
    console.log(editedDriver)
    e.preventDefault();
    apiManager
      .updateType("drivers", editedDriver)
      .then(() =>
        props.history.push(
          `/vehicle/edit/${props.match.params.driverId}/${props.match.params.vehicleId}`
        )
      );
  };

  const skip = () => {
    props.history.push(
      `/vehicle/edit/${props.match.params.driverId}/${props.match.params.vehicleId}`
    );
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Edit Driver Info
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
              value={driver.name}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Phone Number: </InputLabel>
            <TextField
              id="phone_number"
              fullWidth
              required
              onChange={handleDriverChange}
              value={driver.phone_number}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Notes: </InputLabel>
            <TextField
              id="notes"
              fullWidth
              onChange={handleDriverChange}
              value={driver.notes}
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
          <Button variant="contained" color="primary" onClick={skip}>
            Skip
          </Button>
        </div>
      </form>
    </>
  );
};

export default DriverEditForm;
