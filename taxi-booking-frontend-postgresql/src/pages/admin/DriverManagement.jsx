import { useEffect, useState } from "react";
import driverService from "../../services/driverService";
import vehicleService from "../../services/vehicleService";

function DriverManagement() {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [driverData, vehicleData] = await Promise.all([
        driverService.getDrivers(),
        vehicleService.getVehicles(),
      ]);
      setDrivers(driverData);
      setVehicles(vehicleData);
    } catch (err) {
      setError(err.message || "Unable to load drivers.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await driverService.addDriver({
        name,
        email,
        phone,
        vehicle: vehicleId ? { id: Number(vehicleId) } : null,
        available: true,
        rating: 5,
      });
      setName("");
      setEmail("");
      setPhone("");
      setVehicleId("");
      loadData();
    } catch (err) {
      setError(err.message || "Unable to add driver.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Driver Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-2 mb-3" onSubmit={handleAdd}>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
          >
            <option value="">No vehicle</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.model} ({v.licensePlate})
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">
            Add Driver
          </button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Driver ID</th>
            <th>Name</th>
            <th>Vehicle</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No drivers found.
              </td>
            </tr>
          ) : (
            drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.name}</td>
                <td>{driver.vehicle ? driver.vehicle.model : "—"}</td>
                <td>{driver.rating}</td>
                <td>{driver.available ? "Available" : "Busy"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DriverManagement;
