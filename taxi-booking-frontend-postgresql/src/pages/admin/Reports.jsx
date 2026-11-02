import { useEffect, useState } from "react";
import userService from "../../services/UserService";
import driverService from "../../services/driverService";
import bookingService from "../../services/bookingService";

function Reports() {
  const [stats, setStats] = useState({ customers: 0, drivers: 0, bookings: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [users, drivers, bookings] = await Promise.all([
          userService.getUsers(),
          driverService.getDrivers(),
          bookingService.getBookings(),
        ]);
        const customers = users.filter((u) => u.role === "CUSTOMER").length;
        setStats({
          customers,
          drivers: drivers.length,
          bookings: bookings.length,
        });
      } catch (err) {
        setError(err.message || "Unable to load reports.");
      }
    };
    loadStats();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Reports</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Total Customers</th>
            <th>Total Drivers</th>
            <th>Total Bookings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stats.customers}</td>
            <td>{stats.drivers}</td>
            <td>{stats.bookings}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
