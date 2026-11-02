import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";

function Earnings() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("taxi-user") || "null");

  useEffect(() => {
    const loadEarnings = async () => {
      try {
        const all = await bookingService.getBookings();
        setRides(
          all.filter(
            (b) => b.driverName === user?.name && b.status === "COMPLETED",
          ),
        );
      } catch (err) {
        setError(err.message || "Unable to load earnings.");
      }
    };
    loadEarnings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = rides.reduce((sum, r) => sum + (r.fare || 0), 0);

  return (
    <div className="container mt-5">
      <h2>Earnings</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <p className="fs-5">
        Total earnings from completed rides: <strong>₹{total}</strong>
      </p>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Ride ID</th>
            <th>Pickup</th>
            <th>Destination</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
          {rides.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No completed rides yet.
              </td>
            </tr>
          ) : (
            rides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.pickupLocation}</td>
                <td>{ride.destination}</td>
                <td>{ride.fare}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Earnings;
