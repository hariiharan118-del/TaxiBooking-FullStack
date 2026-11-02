import { useEffect, useState } from "react";
import vehicleService from "../../services/vehicleService";

function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [capacity, setCapacity] = useState(4);
  const [error, setError] = useState("");

  const loadVehicles = async () => {
    try {
      const data = await vehicleService.getVehicles();
      setVehicles(data);
    } catch (err) {
      setError(err.message || "Unable to load vehicles.");
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleAdd = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await vehicleService.addVehicle({
        model,
        licensePlate,
        capacity: Number(capacity),
        available: true,
      });
      setModel("");
      setLicensePlate("");
      setCapacity(4);
      loadVehicles();
    } catch (err) {
      setError(err.message || "Unable to add vehicle.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Vehicle Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-2 mb-3" onSubmit={handleAdd}>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="License Plate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            type="number"
            min="1"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">
            Add Vehicle
          </button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Model</th>
            <th>License Plate</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No vehicles found.
              </td>
            </tr>
          ) : (
            vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.licensePlate}</td>
                <td>{vehicle.capacity}</td>
                <td>{vehicle.available ? "Available" : "Busy"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleManagement;
