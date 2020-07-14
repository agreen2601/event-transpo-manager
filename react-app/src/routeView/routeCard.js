import React, { useEffect, useState } from "../../node_modules/react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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

  // const removeAssignment = (type, id, dateId, routeId) => {
  //   apiManager.deleteTypeWithId(type, id).then(() =>
  //     apiManager
  //       .getAssignmentsByDateRoute(dateId, routeId)
  //       .then((APIResult) => {
  //         setAssignments(APIResult);
  //       })
  //   );
  // };

  // const routeHeader = {
  //   color: props.route.color,
  //   fontSize: "larger",
  //   fontWeight: 600,
  //   marginRight: "20px"
  // };

  let routeName = "";
  parseInt(route.name) < 10
    ? (routeName = route.name.slice(1))
    : (routeName = route.name);

    const routeColor = {
      color: route.color,
      fontWeight: "600"
    };

  return (
    <>
      <Grid container spacing={2} className="route_border">
        <Grid item xs={12}>
          <Box border={2} borderColor={route.color}>
              <Typography component="h6" className="route_name" style={routeColor}>
                Route {routeName} {route.description}
              </Typography>
              <AddCircleOutlineIcon
                className="route_icon"
                onClick={() => props.history.push(`/assignment/add/${props.route.id}`)}
                style={{ fontSize: 20 }}
              />
              <div>
                {assignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    // removeAssignment={removeAssignment}
                    {...props}
                  />
                ))}
              </div>
          </Box>
        </Grid>
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
      </Grid>
    </>
  );
};

export default RouteCard;
