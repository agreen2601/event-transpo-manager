import React, { useEffect, useState } from "../../node_modules/react";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import apiManager from "../api/apiManager";
import AssignmentCard from "./assignmentCard";
import "../styles.css";

const RouteCard = (props) => {
  const route = props.route;
  const chosenDate = props.chosenDate;
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    apiManager
      .getAssignmentsByDateRoute(parseInt(chosenDate), route.id)
      .then((r) => {
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

  // if (parseInt(route.name) !== "NaN") {
  //   console.log(typeof route.name);
  // } else {
  //   console.log("Non a number", route.name);
  // }

  return (
    <>
      <div className="route_border" style={routeBorder}>
        <Typography component="h6" className="route_name" style={routeColor}>
          Route {routeName} {route.description}
        </Typography>
        <AddCircleOutlineIcon
          className="route_icon"
          onClick={() =>
            props.history.push(`/assignment/add/${props.route.id}`)
          }
          style={{ fontSize: 20 }}
          value={route.id}
        />
        <div>
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              removeAssignment={removeAssignment}
              {...props}
            />
          ))}
        </div>
        {/* <div className="route_heading">
          {favoriteRouteIDs.length !== 0 ? (
            <span className="route_icon" id-="unStar" onClick={unStar}>
              unstar
            </span>
          ) : null}
          {favoriteRouteIDs.length === 0 ? (
            <span className="route_icon" id="star" onClick={star}>
              star
            </span>
          ) : null}
        </div> */}
      </div>
    </>
  );
};

export default RouteCard;
