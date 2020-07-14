import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import apiManager from "../api/apiManager";
import moment from "moment";

// "places" and "shuttles" fill the dropdowns, both "handle...change"s change the 3 "chosen"s (route dependent upon place work together)
const EntryForm = (props) => {
  const places = props.places;
  const routes = props.routes;
  const shuttles = props.shuttles;
  const dates = props.dates;
  const chosenPlaceId = props.chosenPlaceId;
  const chosenRoute = props.chosenRoute;
  const chosenShuttleId = props.chosenShuttleId;
  const chosenDateId = props.chosenDateId;
  const handleChosenPlaceChange = props.handleChosenPlaceChange;
  const handleChosenRouteChange = props.handleChosenRouteChange;
  const handleChosenShuttleChange = props.handleChosenShuttleChange;
  const handleChosenDateChange = props.handleChosenDateChange;
  const [entry, setEntry] = useState({
    attendee_count: "",
    vehicle_number: "",
    time: moment().format("HH:mm"),
    // date_id: "",
  });

  console.log(chosenDateId);


  // set values for entry from state from dropdowns, which carry over from form to log and back without changing until user chooses new
  entry.place_id = chosenPlaceId;
  entry.shuttle_id = chosenShuttleId;

  var [isChecked, setIsChecked] = useState(false);
  const handleIsCheckedChange = () => {
    setIsChecked(!isChecked);
  };

  const today = dates.find(
    (each) => each.date === moment().format("YYYY-MM-DD")
  );
  if (today !== undefined) {
    entry.date_id = today.id;
  } else {
    isChecked = true;
  }

  // entry.date_id = chosenDateId;

  // update state of entry upon form field change
  const handleEntryChange = (e) => {
    const stateToChange = { ...entry };
    stateToChange[e.target.id] = e.target.value;
    setEntry(stateToChange);
  };

  // post entry, reset attendee count and vehicle number to empty "", provide user "success" alert
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChecked === false) {
      entry.date_id = today.id;
      entry.time = moment().format("HH:mm");
    } else {
      entry.date_id = chosenDateId;
    }
    setTimeout(() => {
      apiManager.postType("entries", entry).then(() => {
        document.getElementById("attendee_count").value = "";
        document.getElementById("vehicle_number").value = "";
        setEntry({
          attendee_count: "",
          vehicle_number: "",
          time: moment().format("HH:mm"),
        });
      });
    }, 100);
    alert("Success!");
    console.log(entry);
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Entry Form
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel>Shuttle:</InputLabel>
            <Select
              id="shuttle_id"
              native
              onChange={handleChosenShuttleChange}
              fullWidth
              required
              value={chosenShuttleId}
            >
              <option aria-label="None" value="" data-name="">
                Choose Shuttle
              </option>
              {shuttles ? (
                shuttles.map((shuttle) => (
                  <option
                    key={shuttle.id}
                    value={parseInt(shuttle.id)}
                    data-name={shuttle.name}
                  >
                    {shuttle.name}
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
              id="routeId"
              native
              onChange={handleChosenRouteChange}
              fullWidth
              value={chosenRoute}
            >
              <option aria-label="None" value="">
                Choose Route
              </option>
              {routes ? (
                routes.map((route) => (
                  <option key={route.id} value={route.name}>
                    {route.name} {route.description}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Location:</InputLabel>
            <Select
              id="place_id"
              native
              onChange={handleChosenPlaceChange}
              fullWidth
              required
              value={chosenPlaceId}
            >
              <option aria-label="None" value="" data-name="">
                Choose Location
              </option>
              {places ? (
                places.map((place) => (
                  <option
                    key={place.id}
                    value={parseInt(place.id)}
                    data-name={place.name}
                  >
                    {place.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">
              Attendee Count:{" "}
            </InputLabel>
            <TextField
              required
              type="number"
              id="attendee_count"
              fullWidth
              onChange={handleEntryChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">
              Vehicle Number:{" "}
            </InputLabel>
            <TextField
              id="vehicle_number"
              fullWidth
              onChange={handleEntryChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleIsCheckedChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="NOT LIVE? Click if not live to input past date and/or time."
            />
          </Grid>
          {isChecked === true ? (
            <>
              <Grid item xs={12} md={3}>
                <InputLabel>Date:</InputLabel>
                <Select
                  id="date_id"
                  native
                  onChange={handleChosenDateChange}
                  fullWidth
                  required
                  value={chosenDateId}
                >
                  <option aria-label="None" value="" data-name="">
                    Choose Date
                  </option>
                  {dates ? (
                    dates.map((date) => (
                      <option
                        key={date.id}
                        value={date.id}
                        data-name={date.date}
                      >
                        {date.date}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </Grid>
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="age-native-simple">Time: </InputLabel>
                <TextField
                  id="time"
                  type="time"
                  fullWidth
                  value={entry.time}
                  onChange={handleEntryChange}
                />
              </Grid>
            </>
          ) : (
            <></>
          )}
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

export default EntryForm;
