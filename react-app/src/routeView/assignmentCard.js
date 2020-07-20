import React from "../../node_modules/react";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { FaWheelchair } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

const AssignmentCard = (props) => {
  const assignment = props.assignment;
  const removeAssignment = props.removeAssignment;

  const localStyle = {
    color: "green",
    fontWeight: "600",
  };

  return (
    <div className="assignment_card">
      <span>{assignment.driver.name} </span>
      <span style={{ fontWeight: "bold" }}>
        {assignment.driver.phone_number}{" "}
      </span>
      {assignment.driver.isLocal === true ? (
        <span style={localStyle}>L</span>
      ) : null}
      <RemoveCircleOutlineIcon
        className="assignment_icon"
        onClick={() => removeAssignment(assignment.id)}
        style={{ fontSize: 20 }}
      />
      <FaExchangeAlt
        className="assignment_icon"
        onClick={() =>
          props.history.push(
            `/assignment/edit/${assignment.id}/${props.route.id}/${assignment.driver_id}/${assignment.vehicle_id}`
          )
        }
        style={{ fontSize: 17 }}
      />
      <FaRegEdit
        className="assignment_icon"
        onClick={() =>
          props.history.push(
            `/driver/edit/${assignment.driver_id}/${assignment.vehicle_id}`
          )
        }
        style={{ fontSize: 20 }}
      />
      <div>
        <span style={{ fontWeight: "bold" }}>{assignment.vehicle.number} </span>
        <span>{assignment.vehicle.company} </span>
        <span style={{ fontWeight: "bold" }}>
          {assignment.vehicle.capacity}{" "}
        </span>
        <span>{assignment.vehicle.kind} </span>
        {assignment.vehicle.isAda === true ? (
          <FaWheelchair style={{ color: "red" }} />
        ) : null}
      </div>
    </div>
  );
};

export default AssignmentCard;
