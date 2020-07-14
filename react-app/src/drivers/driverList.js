import React, { useState, useEffect } from "react";
import DriverCard from "./DriverCard";
import apiManager from "../apiManager/apiManager";

const DriverList = props => {
  const [drivers, setDrivers] = useState([]);

  const getDrivers = (type) => {
    apiManager.getType(type).then(APIResult => {
      APIResult.sort((a, b) => a.name.localeCompare(b.name));
      setDrivers(APIResult);
    });
  };

  useEffect(() => {
    getDrivers("drivers");
  }, []);

  return (
    <div className="driver_card">
      {drivers.map(driver => (
        <DriverCard key={driver.id} driver={driver} {...props} />
      ))}
    </div>
  );
};

export default DriverList;
