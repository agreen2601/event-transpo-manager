import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import apiManager from "../api/apiManager";

const RouteForm = (props) => {
  const getRoutes = props.getRoutes;
  const [route, setRoute] = useState({
    name: "",
    color: "",
    description: "",
  });

  // update state of route upon form field change
  const handleRouteChange = (e) => {
    const stateToChange = { ...route };
    stateToChange[e.target.id] = e.target.value;
    setRoute(stateToChange);
  };

  // post route, reset fields to empty "", provide user "success" alert
  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager.postType("routes", route).then(() => {
      document.getElementById("name").value = "";
      document.getElementById("color").value = "";
      document.getElementById("description").value = "";
      setRoute({
        name: "",
        color: "",
        description: "",
      });
      getRoutes();
    });
    alert("Success!");
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Add New Route
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Name: </InputLabel>
            <TextField
              id="name"
              fullWidth
              required
              onChange={handleRouteChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Color: </InputLabel>
            <TextField
              id="color"
              fullWidth
              required
              onChange={handleRouteChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Description: </InputLabel>
            <TextField
              id="description"
              fullWidth
              required
              onChange={handleRouteChange}
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

export default RouteForm;
