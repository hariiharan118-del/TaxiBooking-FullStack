import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      const user = JSON.parse(localStorage.getItem("taxi-user") || "null");
      if (!user) {
        setError("Please login to view your booking history.");
        return;
      }
      try {
        const data = await bookingService.getCustomerBookings(user.email);
        setBookings(data);
      } catch (err) {
        setError(err.message || "Unable to load booking history.");
      }
    };
    loadBookings();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Booking History</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Ride ID</th>
            <th>Pickup</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.pickupLocation}</td>
                <td>{booking.destination}</td>
                <td>{booking.status}</td>
                <td>{booking.fare}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookingHistory;
