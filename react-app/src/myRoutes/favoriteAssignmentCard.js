import React, { useEffect, useState } from "../../node_modules/react";
import apiManager from "../apiManager/apiManager";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaWheelchair } from "react-icons/fa";

const FavoriteAssignmentCard = props => {
  const [assignment, setAssignment] = useState([]);

  const getAssignment = (dateId, routeId, driverId) => {
    apiManager
      .getAssignmentByDateRouteDriver(dateId, routeId, driverId)
      .then(APIResult => {
        setAssignment(APIResult);
      });
  };

  useEffect(() => {
    getAssignment(props.date.id, props.favoriteRouteID.routeId, props.assignment.driverId);
  }, [props.date.id, props.favoriteRouteID.routeId, props.assignment.driverId]);

  let realAssignment = {};
  let realDriver = {};
  let realVehicle = {};
  let pax = "";
  let ada = "";
  if (assignment[0] !== undefined) {
    realAssignment = assignment[0];
    realDriver = assignment[0].driver;
    realVehicle = assignment[0].vehicle;
    if (assignment[0].vehicle.capacity !== "") {
      pax = "pax ";
    }
    if (assignment[0].vehicle.isADA !== "") {
      ada = <FaWheelchair/>
    }
  }

  return (
    <>
      <section className="driver_info">
        <div>
          <div>
            <span className="driver_name">
              {realDriver.name} {"\u00A0"}
            </span>
            <span className="driver_phone_number">
              {realDriver.phoneNumber} {"\u00A0"}
            </span>
            <span>{realAssignment.endTime} {" "}</span>
            <span className="is_local">{realDriver.local}</span>
            <IoIosRemoveCircleOutline
              className="assignment_icon"
              onClick={() =>
                props.removeAssignment(
                  "assignments",
                  realAssignment.id,
                  props.date.id,
                  props.favRoute.id
                )
              }
            />
            <FaExchangeAlt
              className="assignment_icon"
              onClick={() =>
                props.history.push(
                  `/edit/${realAssignment.id}/${props.favRoute.id}/${realDriver.id}/${realVehicle.id}`
                )
              }
            />
            <FaRegEdit
              className="assignment_icon"
              onClick={() =>
                props.history.push(`/editdriver/${realDriver.id}/${realVehicle.id}`)
              }
            />
          </div>

          <div>
            <span>{realVehicle.number} </span>
            <span className="bold_driver_info">
              {realVehicle.company} {"\u00A0"}
            </span>
            <span>
              {realVehicle.capacity} {pax}
            </span>
            <span className="bold_driver_info">
              {realVehicle.type} {"\u00A0"}
            </span>
            <span className="is_ada">{ada} </span>
          </div>

          <div>
            <span className="driver_notes">{realDriver.notes}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default FavoriteAssignmentCard;
