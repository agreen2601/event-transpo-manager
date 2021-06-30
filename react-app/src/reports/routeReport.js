import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RouteGraph from "./routeGraph";
import TestGraph from "./testGraph";
import AllRoutesGraph from "./allRoutesGraph";
import AllPlacesGraph from "./allPlacesGraph";
import apiManager from "../api/apiManager";

const RouteReport = (props) => {
  const routes = props.routes;
  const shuttles = props.shuttles;
  const dates = props.dates;
  const chosenShuttleId = props.chosenShuttleId;
  const chosenShuttleName = props.chosenShuttleName;
  const chosenDateId = props.chosenDateId;
  const chosenDateName = props.chosenDateName;
  const handleChosenShuttleChange = props.handleChosenShuttleChange;
  const handleChosenDateChange = props.handleChosenDateChange;
  const allEntries = props.entries;
  const getEntries = props.getEntries;

  const [places, setPlaces] = useState([]);
  const getPlaces = () => {
    apiManager.getAllType("places").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setPlaces(r);
    });
  };

  // filter entries based on dropdowns
  const filteredEntries = allEntries
    .filter((each1) => each1.shuttle.name.includes(chosenShuttleName))
    .filter((each4) => each4.date.date.includes(chosenDateName))
    .sort((a, b) => a.time.localeCompare(b.time));

  const times = filteredEntries.map((entry) => entry.time.slice(0, 4));
  const counts = filteredEntries.map((entry) => entry.attendee_count);
  const entryRoutes = filteredEntries.map((entry) => entry.place.route.name);
  const entryPlaces = filteredEntries.map((entry) => entry.place_id);
  const placeNames = filteredEntries.map((entry) => entry.place.name);  
  const isolatedAll = [];
  const isolatedRoutes = [];
  const isolatedPlaces = [];

  for (let i = 0; i < filteredEntries.length; i++) {
    isolatedAll.push({ x: `${times[i]}0`, y: counts[i] });
    isolatedRoutes.push({ x: `${times[i]}${entryRoutes[i]}`, y: counts[i], z: entryRoutes[i]});
    isolatedPlaces.push({ x: `${times[i]}${entryPlaces[i]}`, y: counts[i], z: placeNames[i]});
  }

  const holderAll = {};
  const holderRoutes = {};
  const holderPlaces = {};

  // reduce duplicate times and accumulate attendee counts for those duplicate times
  isolatedAll.forEach(function (a) {
    if (holderAll.hasOwnProperty(a.x)) {
      holderAll[a.x] = holderAll[a.x] + a.y;
    } else {
      holderAll[a.x] = a.y;
    }
  });

  isolatedRoutes.forEach(function (a) {
    if (holderRoutes.hasOwnProperty(a.x)) {
      holderRoutes[a.x] = holderRoutes[a.x] + a.y;
    } else {
      holderRoutes[a.x] = a.y;
    }
  });

  isolatedPlaces.forEach(function (a) {
    if (holderPlaces.hasOwnProperty(a.x)) {
      holderPlaces[a.x] = holderPlaces[a.x] + a.y;
    } else {
      holderPlaces[a.x] = a.y;
    }
  });

  const accumulatedAll = [];
  const accumulatedRoutes = [];
  const accumulatedPlaces = [];

  for (const prop in holderAll) {
    accumulatedAll.push({ x: prop, y: holderAll[prop] });
  }

  for (const prop in holderRoutes) {
    accumulatedRoutes.push({ x: prop, y: holderRoutes[prop] });
  }

  for (const prop in holderPlaces) {
    accumulatedPlaces.push({ x: prop, y: holderPlaces[prop] });
  }

  let xMin = "";
  let xMax = "";
  if (accumulatedAll.length !== 0) {
    xMin = parseInt(accumulatedAll[0].x);
    xMax = parseInt(accumulatedAll[accumulatedAll.length - 1].x) + 1;
  }

  const xRange = (xMax - xMin + 1) * 2;
  const xRangeSmallGraphs = (xMax - xMin + 1);

  const timeSpanIntervals = [];
  for (let j = xMin; j < xMax; j++) {
    for (let i = 0; i < 6; i++) {
      if (j < 10) {
        timeSpanIntervals.push(`0${j}:${i}0`);
      } else {
        timeSpanIntervals.push(`${j}:${i}0`);
      }
    }
  }

  let yMaxRoutes = 0;
  let yMaxPlaces = 0;

  yMaxRoutes = Math.max.apply(
    Math,
    accumulatedRoutes.map(function (o) {
      return o.y;
    })
  );

  yMaxPlaces = Math.max.apply(
    Math,
    accumulatedPlaces.map(function (o) {
      return o.y;
    })
  );

  useEffect(() => {
    getEntries();
    getPlaces();
  }, []);

  const [mode, setMode] = useState(true);
  const handleModeChange = () => {
    setMode(!mode);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Ridership Graphs
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
        </Grid>
      </div>
      {filteredEntries.length !== 0 ? (
        <>
        {/* <div className="graph">
            <TestGraph
              filteredEntries={filteredEntries}
              accumulated={accumulatedAll}
              xRange={xRange}
              timeSpanIntervals={timeSpanIntervals}
              {...props}
            />
          </div> */}
          <div className="graph">
            <RouteGraph
              filteredEntries={filteredEntries}
              accumulated={accumulatedAll}
              xRange={xRange}
              timeSpanIntervals={timeSpanIntervals}
              {...props}
            />
          </div>
          <div style={{ marginBottom: 40 }}>
            {mode === true ? (
              <Button
                onClick={handleModeChange}
                variant="contained"
                color="primary"
              >
                View Location Graphs
              </Button>
            ) : (
              <Button
                onClick={handleModeChange}
                variant="contained"
                color="primary"
              >
                View Route Graphs
              </Button>
            )}
          </div>
          {mode === true ? (
            <div className="places_graph">
              {routes.map((route) => (
                <AllRoutesGraph
                  key={route.id}
                  route={route}
                  filteredEntries={isolatedRoutes}
                  times={times}
                  counts={counts}
                  chosenDateName={chosenDateName}
                  chosenShuttleName={chosenShuttleName}
                  xRange={xRangeSmallGraphs}
                  timeSpanIntervals={timeSpanIntervals}
                  yMax={yMaxRoutes}
                  {...props}
                />
              ))}
            </div>
          ) : (
            <div className="places_graph">
              {places
                .sort((a, b) => a.route.name.localeCompare(b.route.name))
                .map((place) => (
                  <AllPlacesGraph
                    key={place.id}
                    place={place}
                    filteredEntries={isolatedPlaces}
                    times={times}
                    counts={counts}
                    chosenDateName={chosenDateName}
                    chosenShuttleName={chosenShuttleName}
                    xRange={xRangeSmallGraphs}
                    timeSpanIntervals={timeSpanIntervals}
                    yMax={yMaxPlaces}
                    {...props}
                  />
                ))}
            </div>
          )}
        </>
      ) : (
        <Typography align="center">
          There is no ridership data for {chosenShuttleName}
          {chosenDateName !== "" ? <> on {chosenDateName}</> : null}
        </Typography>
      )}
    </>
  );
};

export default RouteReport;
