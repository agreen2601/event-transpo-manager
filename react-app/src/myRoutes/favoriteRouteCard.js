import React, { useEffect, useState } from "../../node_modules/react";
import apiManager from "../apiManager/apiManager";
import FavoriteAssignmentCard from "./FavoriteAssignmentCard";
import { IoIosStar } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";

const FavoriteRouteCard = props => {
  const [assignments, setAssignments] = useState([]);

  const getAssignments = (dateId, routeId) => {
    apiManager.getAssignmentsByDateRoute(dateId, routeId).then(APIResult => {
      setAssignments(APIResult);
    });
  };

  const removeAssignment = (type, id, dateId, routeId) => {
    apiManager.deleteTypeWithId(type, id).then(() =>
      apiManager.getAssignmentsByDateRoute(dateId, routeId).then(APIResult => {
        setAssignments(APIResult);
      })
    );
  };

  useEffect(() => {
    getAssignments(props.date.id, props.favRoute.id);
  }, [props.date.id, props.favRoute.id]);

  const routeStyle = {
    color: props.favRoute.color,
    fontSize: "larger",
    fontWeight: 600,
    marginRight: "15px"
  };

  const routeBorder = {
    borderColor: props.favRoute.color
  };

  return (
    <>
      <div style={routeBorder} className="fav_route_border">
        <div className="route_heading">
          <span style={routeStyle}>Route {props.favRoute.number} </span>
          <span className="route_name">
            {props.favRoute.description} {"\u00A0"}{" "}
          </span>
          <IoIosStar
            className="route_icon"
            onClick={() =>
              props.unStar("favoriteRoutes", props.favoriteRouteID.id)
            }
          />
          <div className="assigned">
            ({assignments.length} assigned -{"\u00A0"}
            {props.favRoute.numOfVehNeeded - assignments.length} needed)
          </div>
        </div>
        <IoMdAddCircleOutline
          className="add_driver_icon"
          onClick={() => props.history.push(`/add/${props.favRoute.id}`)}
        />
        <div>
          {assignments.map(assignment => (
            <FavoriteAssignmentCard
              key={assignment.id}
              assignment={assignment}
              removeAssignment={removeAssignment}
              {...props}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoriteRouteCard;
