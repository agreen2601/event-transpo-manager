import React from "../../node_modules/react";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { FaWheelchair } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

const AssignmentCard = (props) => {
  const assignment = props.assignment;
  // const [assignment, setAssignment] = useState([]);

  // const getAssignment = (dateId, routeId, driverId) => {
  //   apiManager
  //     .getAssignmentByDateRouteDriver(dateId, routeId, driverId)
  //     .then(APIResult => {
  //       setAssignment(APIResult);
  //     });
  // };

  // useEffect(() => {
  //   getAssignment(props.date.id, props.route.id, props.assignment.driverId);
  // }, [props.date.id, props.route.id, props.assignment.driverId]);

  return (
    <div className="assignment_card">
      <span>{assignment.driver.name} </span>
      <span>{assignment.driver.phone_number} </span>
      {assignment.driver.isLocal === true ? <span>L</span> : null}
      <RemoveCircleOutlineIcon
        className="assignment_icon"
        // onClick={() => props.history.push(`/add/${props.route.id}`)}
        style={{ fontSize: 20 }}
      />
      <FaExchangeAlt
        className="assignment_icon"
        // onClick={() => props.history.push(`/add/${props.route.id}`)}
        style={{ fontSize: 17 }}
      />
      <FaRegEdit
        className="assignment_icon"
        // onClick={() => props.history.push(`/add/${props.route.id}`)}
        style={{ fontSize: 20 }}
      />
      <div>
        <span>{assignment.vehicle.number} </span>
        <span>{assignment.vehicle.company} </span>
        <span>{assignment.vehicle.capacity} </span>
        <span>{assignment.vehicle.kind} </span>
        {assignment.vehicle.isAda === true ? <FaWheelchair /> : null}
      </div>
    </div>
  );
};

export default AssignmentCard;
