import React, { useState, useEffect } from "../../node_modules/react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import apiManager from "../api/apiManager";

const StaffEditForm = (props) => {
  const [staff, setStaff] = useState({
    first_name: "",
    is_staff: Boolean,
  });

  var [isChecked, setIsChecked] = useState(false);
  const handleIsCheckedChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    apiManager
      .getSingleType("users", props.match.params.userId)
      .then((staff) => {
        setStaff(staff);
        setIsChecked(staff.is_staff);
      });
  }, [props.match.params.userId]);

  const handleStaffChange = (e) => {
    const stateToChange = { ...staff };
    stateToChange[e.target.id] = e.target.value;
    setStaff(stateToChange);
  };

  const editedStaff = {
    id: parseInt(props.match.params.userId),
    is_staff: isChecked,
    last_login: staff.last_login,
    username: staff.username,
    first_name: staff.first_name,
    last_name: staff.last_name,
    email: staff.email,
    date_joined: staff.date_joined,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager
      .updateType("users", editedStaff)
      .then(() => props.history.push("/staff/list"));
  };

  const skip = () => {
    props.history.push("/staff/list");
  };

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Edit Staff Authentication Level
      </Typography>
      <form className="drop-downs" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">First Name: </InputLabel>
            <TextField
              id="first_name"
              fullWidth
              required
              onChange={handleStaffChange}
              value={staff.first_name}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Last Name: </InputLabel>
            <TextField
              id="last_name"
              fullWidth
              required
              onChange={handleStaffChange}
              value={staff.last_name}
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
              label="Supervisor?"
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

export default StaffEditForm;
