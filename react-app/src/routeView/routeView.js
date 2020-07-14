import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import RouteCard from "./routeCard";

const RouteView = (props) => {
  const dates = props.dates;
  const routes = props.routes;
  const chosenDate = props.chosenDate;
  const handleChosenDateChange = props.handleChosenDateChange;

  return (
    <>
      <Grid item xs={12} md={3}>
        <InputLabel>Date:</InputLabel>
        <Select
          id="date_id"
          native
          onChange={handleChosenDateChange}
          fullWidth
          required
          value={chosenDate}
        >
          <option aria-label="None" value="" data-name="">
            Choose Date
          </option>
          {dates ? (
            dates.map((date) => (
              <option
                key={date.id}
                value={parseInt(date.id)}
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
      {chosenDate !== "" ? (
        <div className="date_card">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              chosenDate={chosenDate}
              {...props}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default RouteView;
