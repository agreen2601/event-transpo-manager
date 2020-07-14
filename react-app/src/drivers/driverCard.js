import React from "react";

const DriverCard = props => {

  let route = [];
  let noRoute = [];

  if (props.driver.assignments[0] !== undefined) {
    route = props.driver.assignments[0].routeId;
  }
  else {
    noRoute = "Not Assigned"
  }

  return (
    <div className="driver_border">
      <span className="list_name">{props.driver.name} {"\u00A0"}</span>
      <span className="list_phone">{props.driver.phoneNumber} {"\u00A0"} </span>
      <span className="list_notes">{props.driver.notes} {"\u00A0"}</span>
      <span className="is_local">{props.driver.local} {"\u00A0"}</span>
      <span>{"\u00A0"}{props.driver.assignments.routeId}</span>
      <span> {"\u00A0"} {route}</span>
      <span className="no_route">{"\u00A0"} {noRoute}</span>
    </div>
  );
};

export default DriverCard;
