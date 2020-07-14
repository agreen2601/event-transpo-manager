import React, { useState, useEffect } from "../../node_modules/react";
import apiManager from "../apiManager/apiManager";

const VehicleEditForm = props => {
  const [vehicle, setVehicle] = useState({
    company: "",
    number: "",
    type: "",
    capacity: "",
    isADA: ""
  });

  const handleVehicleChange = event => {
    const stateToChange = { ...vehicle };
    stateToChange[event.target.id] = event.target.value;
    setVehicle(stateToChange);
  };

  useEffect(() => {
    apiManager
      .getTypeWithId("vehicles", props.match.params.vehicleId)
      .then(vehicle => {
        setVehicle(vehicle);
      });
  }, [props.match.params.vehicleId]);

  const submit = () => {
    const editedVehicle = {
      id: props.match.params.vehicleId,
      company: vehicle.company,
      number: vehicle.number,
      type: vehicle.type,
      capacity: vehicle.capacity,
      isADA: vehicle.isADA
    };

    apiManager
      .updateType("vehicles", editedVehicle)
      .then(() =>
        props.history.push(`/routeview`)
      );
  };

  return (
    <>
      <form>
        <h3>Edit Vehicle Info</h3>
        <fieldset className="form">
          <div>
            <label>Company: </label>
            <input
              type="text"
              onChange={handleVehicleChange}
              id="company"
              value={vehicle.company}
            />
          </div>

          <div>
            <label>Vehicle Number: </label>
            <input
              type="text"
              onChange={handleVehicleChange}
              id="number"
              value={vehicle.number}
            />
          </div>

          <div>
            <label>Vehicle Type: </label>
            <input
              type="text"
              onChange={handleVehicleChange}
              id="type"
              value={vehicle.type}
            />
          </div>

          <div>
            <label>Capacity: </label>
            <input
              type="text"
              onChange={handleVehicleChange}
              id="capacity"
              value={vehicle.capacity}
            />
          </div>

          <div>
            <label>ADA accesible? Yes</label>
            <input
              type="radio"
              name="ADA"
              onChange={handleVehicleChange}
              id="isADA"
              value="ADA"
            />
            <label>No</label>
            <input
              type="radio"
              name="ADA"
              onChange={handleVehicleChange}
              id="isADA"
              value=""
              defaultChecked
            />
          </div>

          <button type="button" onClick={submit}>
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default VehicleEditForm;
