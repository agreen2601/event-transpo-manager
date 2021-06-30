import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import RouteCard from "./routeCard";

const RouteView = (props) => {
  const dates = props.dates;
  const routes = props.routes;
  const chosenDate = props.chosenDate;
  const chosenRoute = props.chosenRoute;
  const handleChosenDateChange = props.handleChosenDateChange;
  const handleChosenRouteChange = props.handleChosenRouteChange;

  const filteredRoutes = routes.filter((each) =>
    each.name.includes(chosenRoute)
  );

  return (
    <>
      <Typography component="h1" variant="h5" className="page-header">
        Route View
      </Typography>
      <div className="drop-downs">
        <Grid container spacing={3}>
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
          <Grid item xs={12} md={3}>
            <InputLabel>Route:</InputLabel>
            <Select
              id="routeId"
              native
              onChange={handleChosenRouteChange}
              fullWidth
              required
              value={chosenRoute}
            >
              <option aria-label="None" value="">
                All Routes
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
        </Grid>
      </div>
      {chosenDate !== "" ? (
        <div className="route_card">
          {filteredRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              chosenDate={chosenDate}
              chosenRoute={chosenRoute}
              {...props}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default RouteView;
