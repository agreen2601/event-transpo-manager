import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import apiManager from "../api/apiManager";

const ShuttleForm = () => {
  const [shuttle, setShuttle] = useState({
    name: "",
  });

  // update state of shuttle upon form field change
  const handleShuttleChange = (e) => {
    const stateToChange = { ...shuttle };
    stateToChange[e.target.id] = e.target.value;
    setShuttle(stateToChange);
  };

  // post shuttle, reset name count to empty "", provide user "success" alert
  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager.postType("shuttles", shuttle).then(() => {
      document.getElementById("name").value = "";
      setShuttle({
        name: "",
      });
    });
    alert("Success!");
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Shuttle Form
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Name: </InputLabel>
            <TextField id="name" required fullWidth onChange={handleShuttleChange} />
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

export default ShuttleForm;
