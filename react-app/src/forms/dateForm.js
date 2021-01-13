import React, { useState } from "../../node_modules/react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import apiManager from "../api/apiManager";

const DateForm = (props) => {
  const getDates = props.getDates;
  const [date, setDate] = useState({ date: "" });

  const handleDateChange = (event) => {
    const stateToChange = { ...date };
    stateToChange[event.target.id] = event.target.value;
    setDate(stateToChange);
  };

  // post date, reset input to empty "", provide user "success" alert
  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager.postType("dates", date).then(() => {
      document.getElementById("date").value = "";
      setDate({
        date: "",
      });
      getDates();
    });
    alert("Success!");
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Add New Date
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Date: </InputLabel>
            <TextField
              id="date"
              type="date"
              fullWidth
              onChange={handleDateChange}
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

export default DateForm;
