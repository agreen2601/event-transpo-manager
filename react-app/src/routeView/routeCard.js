import React, { useEffect, useState } from "../../node_modules/react";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import apiManager from "../api/apiManager";
import AssignmentCard from "./assignmentCard";
import "../styles.css";

const RouteCard = (props) => {
  const route = props.route;
  const chosenDate = props.chosenDate;
  const chosenRoute = props.chosenRoute;
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    apiManager
      .getAssignmentsByDateRoute(parseInt(chosenDate), route.id)
      .then((r) => {
        r.sort((a, b) => (a.vehicle.number > b.vehicle.number ? -1 : 1))
          .sort((a, b) =>
            a.vehicle.number.length > b.vehicle.number.length ? 1 : -1
          )
          .sort((c, d) => c.vehicle.company.localeCompare(d.vehicle.company));
        setAssignments(r);
      });
  }, [chosenDate, route.id]);

  const removeAssignment = (id) => {
    const check = window.confirm(
      "Are you sure you want to delete this assignment? Deletion cannot be undone."
    );
    if (check === true) {
      apiManager.deleteTypeWithId("assignments", id).then(() =>
        apiManager
          .getAssignmentsByDateRoute(parseInt(chosenDate), route.id)
          .then((r) => {
            setAssignments(r);
          })
      );
    }
  };

  let routeName = "";
  parseInt(route.name) < 10
    ? (routeName = route.name.slice(1))
    : (routeName = route.name);

  const routeColor = {
    color: route.color,
    fontWeight: "600",
  };

  const routeBorder = {
    borderColor: route.color,
  };

  return (
    <>
      <div className="route_border" style={routeBorder}>
        {isNaN(route.name) === true ? (
          <Typography component="h6" className="route_name" style={routeColor}>
            {routeName} {route.description}
          </Typography>
        ) : (
          <Typography component="h6" className="route_name" style={routeColor}>
            Route {routeName} {route.description}
          </Typography>
        )}
        {props.isSupervisor === true || props.isStaff === true ? (
          <AddCircleOutlineIcon
            className="route_icon"
            onClick={() =>
              props.history.push(`/assignment/add/${props.route.id}`)
            }
            style={{ fontSize: 20 }}
            value={route.id}
          />
        ) : null}
        <div>
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              chosenRoute={chosenRoute}
              removeAssignment={removeAssignment}
              {...props}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RouteCard;
