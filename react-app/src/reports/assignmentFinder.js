import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import apiManager from "../api/apiManager";

const AssignmentFinder = (props) => {
  const [assignments, setAssignments] = useState([]);

  const filteredAssignments = assignments.filter((each) =>
    each.vehicle.number.includes(props.match.params.vehNum)
  );

  // something wrong with doing it by date
  // not sure now actually, seems fine on 07/16

  useEffect(() => {
    apiManager
      .getTypeByParam("assignments", "dateID", props.match.params.dateId)
      .then((r) => {
        setAssignments(r);
      });
  }, [props.match.params.dateId]);

  return (
    <>
      <Typography component="h1" variant="h5">
        Possible Matches
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Company</TableCell>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Driver Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Route</TableCell>
            </TableRow>
          </TableHead>
          {filteredAssignments.length !== 0 ? (
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.vehicle.company}</TableCell>
                  <TableCell>{assignment.vehicle.number}</TableCell>
                  <TableCell>{assignment.driver.name}</TableCell>
                  <TableCell>{assignment.driver.phone_number}</TableCell>
                  <TableCell>
                    {assignment.route.name} {assignment.route.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : null}
        </Table>
      </TableContainer>
    </>
  );
};

export default AssignmentFinder;
