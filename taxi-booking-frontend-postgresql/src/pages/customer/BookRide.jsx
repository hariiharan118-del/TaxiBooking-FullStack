import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService";

function BookRide() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState(250);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    const user = JSON.parse(localStorage.getItem("taxi-user") || "null");

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await bookingService.createBooking({
        pickupLocation,
        destination,
        customerEmail: user.email,
        driverName: "",
        status: "REQUESTED",
        fare,
      });
      setMessage("Ride booked successfully. Check your booking history.");
      setPickupLocation("");
      setDestination("");
      setFare(250);
    } catch (err) {
      setError(err.message || "Unable to book the ride.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2>Book Ride</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Pickup Location"
            required
          />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Destination"
            required
          />
          <div className="mb-3">
            <label className="form-label">Estimated Fare</label>
            <input
              value={fare}
              onChange={(e) => setFare(Number(e.target.value))}
              type="number"
              className="form-control"
              min="50"
            />
          </div>
          <button className="btn btn-primary">Book Ride</button>
        </form>
      </div>
    </div>
  );
}

export default BookRide;
