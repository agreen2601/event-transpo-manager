import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import apiManager from "../api/apiManager";

const PlaceForm = (props) => {
  const getPlaces = props.getPlaces;
  const routes = props.routes;
  const [place, setPlace] = useState({
    name: "",
  });

  const [chosenRoute, setChosenRoute] = useState("");

  const handleChosenRouteChange = (e) => {
    const routeId = e.target.value;
    setChosenRoute(routeId);
  };

  place.route_id = chosenRoute;

  // update state of place upon form field change
  const handlePlaceChange = (e) => {
    const stateToChange = { ...place };
    stateToChange[e.target.id] = e.target.value;
    setPlace(stateToChange);
  };

  // post place, reset fields to empty "", provide user "success" alert
  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager.postType("places", place).then(() => {
      document.getElementById("name").value = "";
      setPlace({
        name: "",
      });
      getPlaces();
    });
    alert("Success!");
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Add New Location
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Name: </InputLabel>
            <TextField
              id="name"
              fullWidth
              required
              onChange={handlePlaceChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Route:</InputLabel>
            <Select
              id="id"
              native
              onChange={handleChosenRouteChange}
              fullWidth
              required
              value={chosenRoute}
            >
              <option aria-label="None" value="">
                Choose Route
              </option>
              {routes ? (
                routes.map((route) => (
                  <option key={route.id} value={route.id}>
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

export default PlaceForm;
