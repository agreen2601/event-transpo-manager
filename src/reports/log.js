import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { FaRegEdit } from "react-icons/fa";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
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

  const [searchField, setSearchField] = useState("");

  const handleSearchChange = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };

  // filter entries based on dropdowns
  const filteredEntries = allEntries
    .filter((a) => a.shuttle.name.includes(chosenShuttleName))
    .filter((b) => b.place.name.includes(chosenPlaceName))
    .filter((c) => c.place.route.name.includes(chosenRoute))
    .filter((d) => d.date.date.includes(chosenDateName))
    .filter(
      (e) =>
        e.vehicle_number.includes(searchField) ||
        e.time.includes(searchField) ||
        e.attendee_count.toString().includes(searchField) ||
        e.user.first_name.toLowerCase().includes(searchField) ||
        e.user.last_name.toLowerCase().includes(searchField)
    )
    .sort((f, g) => f.time.localeCompare(g.time))
    .sort((h, i) => h.date.date.localeCompare(i.date.date));

  const [sortField, setSortField] = useState(null);

  if (sortField === "time") {
    filteredEntries.sort((a, b) => a.time.localeCompare(b.time));
  } else if (sortField === "vehicle") {
    filteredEntries.sort((a, b) =>
      a.vehicle_number.localeCompare(b.vehicle_number)
    );
  } else if (sortField === "date") {
    filteredEntries.sort((a, b) => a.date.date.localeCompare(b.date.date));
  } else if (sortField === "shuttle") {
    filteredEntries.sort((a, b) =>
      a.shuttle.name.localeCompare(b.shuttle.name)
    );
  } else if (sortField === "route") {
    filteredEntries.sort((a, b) =>
      a.place.route.name.localeCompare(b.place.route.name)
    );
  } else if (sortField === "location") {
    filteredEntries.sort((a, b) => a.place.name.localeCompare(b.place.name));
  } else if (sortField === "user") {
    filteredEntries.sort((a, b) =>
      a.user.first_name.localeCompare(b.user.first_name)
    );
  }

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
      apiManager.deleteTypeWithId("entries", id).then(() => {
        getEntries();
      });
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  const editIconStyle = {
    fontSize: 20,
    paddingBottom: 2,
  };

  const [arrow, setArrow] = useState(null);

  return (
    <>
      <Typography component="h1" variant="h5">
        Ridership Logs
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
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Search:</InputLabel>
            <TextField
              type="text"
              id="keyword"
              fullWidth
              onChange={handleSearchChange}
              value={searchField}
            />
          </Grid>
        </Grid>
      </div>
      <Typography variant="h6">
        {totalAttendeeCount} attendees moved in {filteredEntries.length} trips
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: 600 }}
                onClick={() => setSortField("time")}
                onMouseEnter={() => setArrow("time")}
                onMouseLeave={() => setArrow("")}
              >
                Time {arrow === "time" ? <ArrowDropDownIcon /> : null}
              </TableCell>
              <TableCell
                style={{ fontWeight: 600 }}
                onClick={() => setSortField("vehicle")}
                onMouseEnter={() => setArrow("vehicle")}
                onMouseLeave={() => setArrow("")}
              >
                Vehicle # {arrow === "vehicle" ? <ArrowDropDownIcon /> : null}
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>Pax</TableCell>
              {chosenDateId === "" ? (
                <TableCell
                  style={{ fontWeight: 600 }}
                  onClick={() => setSortField("date")}
                  onMouseEnter={() => setArrow("date")}
                  onMouseLeave={() => setArrow("")}
                >
                  Date {arrow === "date" ? <ArrowDropDownIcon /> : null}
                </TableCell>
              ) : null}
              {chosenShuttleId === "" ? (
                <TableCell
                  style={{ fontWeight: 600 }}
                  onClick={() => setSortField("shuttle")}
                  onMouseEnter={() => setArrow("shuttle")}
                  onMouseLeave={() => setArrow("")}
                >
                  Shuttle {arrow === "shuttle" ? <ArrowDropDownIcon /> : null}
                </TableCell>
              ) : null}
              {chosenRoute === "" ? (
                <TableCell
                  style={{ fontWeight: 600 }}
                  onClick={() => setSortField("route")}
                  onMouseEnter={() => setArrow("route")}
                  onMouseLeave={() => setArrow("")}
                >
                  Rt {arrow === "route" ? <ArrowDropDownIcon /> : null}
                </TableCell>
              ) : null}
              {chosenPlaceId === "" ? (
                <TableCell
                  style={{ fontWeight: 600 }}
                  onClick={() => setSortField("location")}
                  onMouseEnter={() => setArrow("location")}
                  onMouseLeave={() => setArrow("")}
                >
                  Location {arrow === "location" ? <ArrowDropDownIcon /> : null}
                </TableCell>
              ) : null}
              <TableCell
                style={{ fontWeight: 600 }}
                onClick={() => setSortField("user")}
                onMouseEnter={() => setArrow("user")}
                onMouseLeave={() => setArrow("")}
              >
                Entered By {arrow === "user" ? <ArrowDropDownIcon /> : null}
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEntries.map((entry) => (
              <TableRow key={entry.id} className="table_rows">
                <TableCell component="th" scope="entry">
                  {entry.time.slice(0, -3)}
                </TableCell>
                <TableCell
                  style={{ textDecoration: "underline" }}
                  className="action-icon"
                  onClick={() =>
                    props.history.push(
                      `/assignment/finder/${entry.date_id}/${entry.vehicle_number}`
                    )
                  }
                >
                  {entry.vehicle_number}
                </TableCell>
                <TableCell>{entry.attendee_count}</TableCell>
                {chosenDateId === "" ? (
                  <TableCell>{entry.date.date.slice(5)}</TableCell>
                ) : null}
                {chosenShuttleId === "" ? (
                  <TableCell>{entry.shuttle.name}</TableCell>
                ) : null}
                {chosenRoute === "" ? (
                  <>
                    {parseInt(entry.place.route.name) < 10 ? (
                      <TableCell>{entry.place.route.name.slice(1)}</TableCell>
                    ) : (
                      <TableCell>{entry.place.route.name}</TableCell>
                    )}
                  </>
                ) : null}
                {chosenPlaceId === "" ? (
                  <TableCell>{entry.place.name}</TableCell>
                ) : null}
                <TableCell>
                  {entry.user.first_name} {entry.user.last_name}
                </TableCell>
                <TableCell>
                  {props.isSupervisor === true ||
                  parseInt(window.sessionStorage.getItem("userID")) ===
                    entry.user_id ? (
                    <>
                      <span className="action-icon">
                        <FaRegEdit
                          onClick={() =>
                            props.history.push(`/entry/edit/form/${entry.id}`)
                          }
                          style={editIconStyle}
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
