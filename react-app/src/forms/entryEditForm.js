import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import apiManager from "../api/apiManager";

// "places" and "shuttles" fill the dropdowns, both "handle...change"s change the 3 "chosen"s (route dependent upon location work together)
const EntryEditForm = (props) => {
  const places = props.places;
  const routes = props.routes;
  const shuttles = props.shuttles;
  const dates = props.dates;
  const chosenPlaceId = props.chosenPlaceId;
  const chosenRoute = props.chosenRoute;
  const handleChosenPlaceChange = props.handleChosenPlaceChange;
  const handleChosenRouteChange = props.handleChosenRouteChange;
  const [entry, setEntry] = useState({
    attendee_count: "",
    vehicle_number: "",
    time: "",
  });

  // update state of entry upon form field change
  const handleEntryChange = (e) => {
    const stateToChange = { ...entry };
    stateToChange[e.target.id] = e.target.value;
    setEntry(stateToChange);
  };

  // get the entry to be edited
  useEffect(() => {
    apiManager
      .getSingleType("entries", props.match.params.entryId)
      .then((entry) => {
        setEntry(entry);
      });
  }, [props.match.params.entryId]);

  const editedEntry = {
    id: parseInt(props.match.params.entryId),
    shuttle_id: entry.shuttle_id,
    date_id: entry.date_id,
    user_id: entry.user_id,
    attendee_count: entry.attendee_count,
    vehicle_number: entry.vehicle_number,
    time: entry.time,
  };

  chosenRoute === ""
    ? (editedEntry.place_id = entry.place_id)
    : (editedEntry.place_id = chosenPlaceId);

  const handleSubmit = (e) => {
    console.log(editedEntry);
    e.preventDefault();
    apiManager.updateType("entries", editedEntry).then(() => {
      props.history.push("/log");
    });
  };

  return (
    <>
      <div className="event-form-page">
        <Typography component="h1" variant="h5" className="page-header">
          Edit Entry
        </Typography>
        <form className="drop-downs" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InputLabel>Event:</InputLabel>
              <Select
                id="shuttle_id"
                native
                onChange={handleEntryChange}
                fullWidth
                required
                value={entry.shuttle_id}
              >
                {shuttles ? (
                  shuttles.map((shuttle) => (
                    <option key={shuttle.id} value={parseInt(shuttle.id)}>
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
                id="route_id"
                native
                onChange={handleChosenRouteChange}
                fullWidth
                value={chosenRoute}
              >
                <option aria-label="None" value="">
                  Choose Route (not required)
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
              {chosenRoute === "" ? (
                <Select
                  id="place_id"
                  native
                  onChange={handleEntryChange}
                  fullWidth
                  required
                  value={entry.place_id}
                >
                  <option aria-label="None" value="">
                    Choose Location
                  </option>
                  {places ? (
                    places.map((place) => (
                      <option key={place.id} value={parseInt(place.id)}>
                        {place.name}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              ) : (
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
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel>Date:</InputLabel>
              <Select
                id="date_id"
                native
                onChange={handleEntryChange}
                fullWidth
                required
                value={entry.date_id}
              >
                <option aria-label="None" value="" data-name="">
                  Choose Date
                </option>
                {dates ? (
                  dates.map((date) => (
                    <option key={date.id} value={date.id} data-name={date.date}>
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
                value={entry.attendee_count}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">
                Vehicle Number:{" "}
              </InputLabel>
              <TextField
                id="vehicle_number"
                fullWidth
                value={entry.vehicle_number}
                onChange={handleEntryChange}
              />
            </Grid>
          </Grid>
          <Grid>
            <div className="submit-button">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default EntryEditForm;
