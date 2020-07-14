import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import RouteGraph from "./routeGraph";

const RouteReport = (props) => {
  const places = props.places;
  const routes = props.routes;
  const shuttles = props.shuttles;
  const dates = props.dates;
  const chosenPlaceId = props.chosenPlaceId;
  const chosenPlaceName = props.chosenPlaceName;
  const chosenRoute = props.chosenRoute;
  const chosenShuttleId = props.chosenShuttleId;
  const chosenShuttleName = props.chosenShuttleName;
  const chosenDateId = props.chosenDateId;
  const chosenDateName = props.chosenDateName;
  const handleChosenPlaceChange = props.handleChosenPlaceChange;
  const handleChosenRouteChange = props.handleChosenRouteChange;
  const handleChosenShuttleChange = props.handleChosenShuttleChange;
  const handleChosenDateChange = props.handleChosenDateChange;
  const allEntries = props.entries;
  const getEntries = props.getEntries;

  // filter entries based on dropdowns
  const filteredEntries = allEntries
  .filter((each1) => each1.shuttle.name.includes(chosenShuttleName))
  .filter((each2) => each2.place.name.includes(chosenPlaceName))
  .filter((each3) => each3.place.route.name.includes(chosenRoute))
  .filter((each4) => each4.date.date.includes(chosenDateName))
  .sort((a, b) => a.time.localeCompare(b.time))
  .sort((a, b) => a.date.date.localeCompare(b.date.date));

  let totalAttendeeCount = 0;
  if (filteredEntries.length !== 0) {
    totalAttendeeCount = filteredEntries
      .map((entry) => entry.attendee_count)
      .reduce((accumulator, runningTotal) => accumulator + runningTotal);
  }

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <>
      <Typography component="h1" variant="h5">
        Route Reports
      </Typography>
      <div className="drop-downs">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel>Date:</InputLabel>
            <Select
              id="dateId"
              native
              onChange={handleChosenDateChange}
              fullWidth
              required
              label="??"
              value={chosenDateId}
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
            <InputLabel>Shuttle:</InputLabel>
            <Select
              id="shuttleId"
              native
              onChange={handleChosenShuttleChange}
              fullWidth
              required
              label="??"
              value={chosenShuttleId}
            >
              <option aria-label="None" value="" data-name="">
                All Shuttles
              </option>
              {shuttles ? (
                shuttles.map((shuttle) => (
                  <option key={shuttle.id} value={parseInt(shuttle.id)} data-name={shuttle.name}>
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
          <Grid item xs={12} md={3}>
            <InputLabel>Location:</InputLabel>
            <Select
              id="placeId"
              native
              onChange={handleChosenPlaceChange}
              fullWidth
              required
              label="??"
              value={chosenPlaceId}
            >
              <option aria-label="None" value="" data-name="">
                All Locations
              </option>
              {places ? (
                places.map((place) => (
                  <option key={place.id} value={parseInt(place.id)} data-name={place.name}>
                    {place.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Grid>
        </Grid>
      </div>
      <Typography variant="h6">
        {totalAttendeeCount} attendees moved in {filteredEntries.length} trips.
      </Typography>
      <div>
        <RouteGraph
          filteredEntries={filteredEntries}
          chosenRoute={chosenRoute}
          chosenPlaceId={chosenPlaceId}
          getEntries={getEntries}
          {...props}
        />
      </div>
    </>
  );
};

export default RouteReport;
