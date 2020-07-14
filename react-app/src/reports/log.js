import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";
import apiManager from "../api/apiManager";

const Log = (props) => {
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

  const deleteThisEntry = (id) => {
    const check = window.confirm(
      "Are you sure you want to delete this entry? Deletion cannot be undone."
    );
    if (check === true) {
      apiManager.deleteEntry(id).then(() => {
        getEntries();
      });
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <>
      <Typography component="h1" variant="h5">
        Logs
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
              value={chosenDateId}
            >
              <option aria-label="None" value="" data-name="">
                All Dates
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
              value={chosenPlaceId}
            >
              <option aria-label="None" value="" data-name="">
                All Locations
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
          </Grid>
        </Grid>
      </div>
      <Typography variant="h6">
        {totalAttendeeCount} attendees moved in {filteredEntries.length} trips.
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Vehicle #</TableCell>
              <TableCell align="right">Pax</TableCell>
              {/* {chosenDate === "" ? ( */}
              <TableCell align="right">Date</TableCell>
              {/* ) : null} */}
              {/* {chosenShuttleId === "" ? ( */}
              <TableCell align="right">Shuttle</TableCell>
              {/* ) : null} */}
              {/* {chosenRoute === "" ? ( */}
              <TableCell align="right">Route</TableCell>
              {/* // ) : null} */}
              {/* {chosenPlaceId === "" ? ( */}
              <TableCell align="right">Location</TableCell>
              {/* ) : null} */}
              <TableCell align="right">Entered By</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell component="th" scope="entry">
                  {entry.time.slice(0, -3)}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ textDecoration: "underline" }}
                  onClick={() =>
                    props.history.push(
                      `/assignment/finder/${entry.date_id}/${entry.vehicle_number}`
                    )
                  }
                >
                  {entry.vehicle_number}
                </TableCell>
                <TableCell align="right">{entry.attendee_count}</TableCell>
                {/* {chosenDate === "" ? ( */}
                <TableCell align="right">{entry.date.date.slice(5)}</TableCell>
                {/* ) : null} */}
                {/* {chosenShuttleId === "" ? ( */}
                <TableCell align="right">{entry.shuttle.name}</TableCell>
                {/* ) : null} */}
                {/* {chosenRoute === "" ? ( */}
                <TableCell align="right">{entry.place.route.name}</TableCell>
                {/* ) : null} */}
                {/* {chosenPlaceId === "" ? ( */}
                <TableCell align="right">{entry.place.name}</TableCell>
                {/* ) : null} */}
                <TableCell align="right">
                  {entry.user.first_name} {entry.user.last_name}
                </TableCell>
                <TableCell align="right">
                  {parseInt(window.sessionStorage.getItem("userID")) ===
                  entry.user_id ? (
                    <>
                      <span className="action-icon">
                        <EditIcon
                          onClick={() =>
                            props.history.push(`/entry/edit/form/${entry.id}`)
                          }
                        />
                      </span>
                      <span className="action-icon">
                        <DeleteOutlinedIcon
                          onClick={() => deleteThisEntry(entry.id)}
                        />
                      </span>
                    </>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Log;
