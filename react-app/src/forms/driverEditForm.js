import React, { useState, useEffect } from "../../node_modules/react";
import apiManager from "../apiManager/apiManager";

const DriverEditForm = props => {
  const [driver, setDriver] = useState({
    name: "",
    phoneNumber: "",
    local: "",
    notes: ""
  });

  const handleDriverChange = event => {
    const stateToChange = { ...driver };
    stateToChange[event.target.id] = event.target.value;
    setDriver(stateToChange);
  };

  useEffect(() => {
    apiManager
      .getTypeWithId("drivers", props.match.params.driverId)
      .then(driver => {
        setDriver(driver);
      });
  }, [props.match.params.driverId]);

  const submit = () => {
    const editedDriver = {
      id: props.match.params.driverId,
      name: driver.name,
      phoneNumber: driver.phoneNumber,
      local: driver.local,
      notes: driver.notes
    };

    apiManager
      .updateType("drivers", editedDriver)
      .then(() =>
        props.history.push(
          `/editvehicle/${props.match.params.driverId}/${props.match.params.vehicleId}`
        )
      );
  };

  return (
    <>
      <form>
        <h3>Edit Details</h3>
        <fieldset className="form">
          <div>
            <label>Driver Name: </label>
            <input
              type="text"
              required
              onChange={handleDriverChange}
              id="name"
              value={driver.name}
            />
          </div>

          <div>
            <label>Phone Number: </label>
            <input
              type="text"
              required
              onChange={handleDriverChange}
              id="phoneNumber"
              value={driver.phoneNumber}
            />
          </div>

          <div>
            <label>Local? </label>
            <label>Yes</label>
            <input
              type="radio"
              name="local"
              onChange={handleDriverChange}
              id="local"
              value="L"
            />
            <label>No</label>
            <input
              type="radio"
              name="local"
              onChange={handleDriverChange}
              id="local"
              value=""
              defaultChecked
            />
          </div>

          <div>
            <label>Notes: </label>
            <textarea
              type="text"
              onChange={handleDriverChange}
              id="notes"
              value={driver.notes}
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

export default DriverEditForm;
