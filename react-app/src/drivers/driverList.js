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
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { FaRegEdit } from "react-icons/fa";
import apiManager from "../api/apiManager";

const DriverList = (props) => {
  const dates = props.dates;
  const routes = props.routes;
  const chosenDateId = props.chosenDateId;
  const chosenDateName = props.chosenDateName;
  const chosenRoute = props.chosenRoute;
  const handleChosenDateChange = props.handleChosenDateChange;
  const handleChosenRouteChange = props.handleChosenRouteChange;

  let [assignments, setAssignments] = useState([]);

  const getAssignments = () => {
    apiManager.getAllType("assignments").then((r) => {
      // r.sort((a, b) => a.driver.name.localeCompare(b.driver.name));
      setAssignments(r);
    });
  };

  const [searchField, setSearchField] = useState("");

  const handleSearchChange = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };

  const [sortField, setSortField] = useState(null);

  let filteredAssignments = assignments
    .filter((each) => each.route.name.includes(chosenRoute))
    .filter((each1) => each1.date.date.includes(chosenDateName))
    .filter(
      (each2) =>
        each2.driver.name.toLowerCase().includes(searchField) ||
        each2.driver.notes.toLowerCase().includes(searchField) ||
        each2.vehicle.company.toLowerCase().includes(searchField) ||
        each2.vehicle.number.includes(searchField)
    )
    .sort((a, b) => a.route.name.localeCompare(b.route.name))
    .sort((a, b) => a.vehicle.company.localeCompare(b.vehicle.company))
    .sort((a, b) => a.date.date.localeCompare(b.date.date));

  if (sortField === "date") {
    filteredAssignments.sort((a, b) =>
      a.date.date.localeCompare(b.date.date));
  } else if (sortField === "driver") {
    filteredAssignments.sort((a, b) =>
      a.driver.name.localeCompare(b.driver.name)
    );
  } else if (sortField === "company") {
    filteredAssignments.sort((a, b) =>
      a.vehicle.company.localeCompare(b.vehicle.company)
    );
  } else if (sortField === "route") {
    filteredAssignments.sort((a, b) =>
      a.route.name.localeCompare(b.route.name)
    );
  }

  useEffect(() => {
    getAssignments();
  }, []);

  let totalDriverCount = 0;
  if (filteredAssignments.length !== 0) {
    totalDriverCount = filteredAssignments.length;
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Driver List
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
      <Typography variant="h6">{totalDriverCount} drivers</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {chosenDateId === "" ? (
                <TableCell
                  style={{ fontWeight: 600 }}
                  onClick={() => setSortField("date")}
                >
                  Date
                </TableCell>
              ) : null}
              <TableCell
                style={{ fontWeight: 600 }}
                onClick={() => setSortField("driver")}
              >
                Name
                <div>Number</div>
              </TableCell>
              <TableCell
                style={{ fontWeight: 600 }}
                onClick={() => setSortField("company")}
              >
                Company<div>Vehicle #</div>
              </TableCell>
              {chosenRoute === "" ? (
                <TableCell
                  style={{ fontWeight: 600 }}
                  onClick={() => setSortField("route")}
                >
                  Route
                </TableCell>
              ) : null}
              <TableCell style={{ fontWeight: 600 }}>Local</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Notes</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id} className="table_rows">
                {chosenDateId === "" ? (
                  <TableCell>{assignment.date.date.slice(5)}</TableCell>
                ) : null}
                <TableCell className="list_name">
                  {assignment.driver.name}
                  <div>{assignment.driver.phone_number}</div>
                </TableCell>
                <TableCell className="list_phone">
                  {assignment.vehicle.company}
                  <div>{assignment.vehicle.number}</div>
                </TableCell>
                {chosenRoute === "" ? (
                  <>
                    {parseInt(assignment.route.name) < 10 ? (
                      <TableCell>{assignment.route.name.slice(1)}</TableCell>
                    ) : (
                      <TableCell>{assignment.route.name}</TableCell>
                    )}
                  </>
                ) : null}
                {assignment.driver.isLocal === true ? (
                  <TableCell className="is_local">Local</TableCell>
                ) : (
                  <TableCell></TableCell>
                )}
                <TableCell className="list_notes">
                  {assignment.driver.notes}
                </TableCell>
                <TableCell>
                  <span className="action-icon">
                    <FaRegEdit
                      style={{ fontSize: 20 }}
                      onClick={() =>
                        props.history.push(
                          `/driver/edit/${assignment.driver_id}/${assignment.vehicle_id}`
                        )
                      }
                    />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DriverList;
