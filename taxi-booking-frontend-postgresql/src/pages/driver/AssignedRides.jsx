import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";

function AssignedRides() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("taxi-user") || "null");

  const loadRides = async () => {
    try {
      const all = await bookingService.getBookings();
      setRides(all.filter((b) => b.driverName === user?.name));
    } catch (err) {
      setError(err.message || "Unable to load assigned rides.");
    }
  };

  useEffect(() => {
    loadRides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComplete = async (id) => {
    setError("");
    try {
      await bookingService.updateStatus(id, "COMPLETED");
      loadRides();
    } catch (err) {
      setError(err.message || "Unable to update ride.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Assigned Rides</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Ride ID</th>
            <th>Pickup</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rides.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No rides assigned yet.
              </td>
            </tr>
          ) : (
            rides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.pickupLocation}</td>
                <td>{ride.destination}</td>
                <td>{ride.status}</td>
                <td>
                  {ride.status !== "COMPLETED" && ride.status !== "CANCELLED" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleComplete(ride.id)}
                    >
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AssignedRides;
