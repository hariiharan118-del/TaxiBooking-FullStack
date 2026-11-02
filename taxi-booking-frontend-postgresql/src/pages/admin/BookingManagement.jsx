import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";

const STATUSES = ["REQUESTED", "CONFIRMED", "ONGOING", "COMPLETED", "CANCELLED"];

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message || "Unable to load bookings.");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    setError("");
    try {
      await bookingService.updateStatus(id, status);
      loadBookings();
    } catch (err) {
      setError(err.message || "Unable to update booking status.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Booking Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Driver</th>
            <th>Fare</th>
            <th>Status</th>
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
                <td>{booking.customerEmail}</td>
                <td>{booking.driverName || "Unassigned"}</td>
                <td>{booking.fare}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking.id, e.target.value)
                    }
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookingManagement;
