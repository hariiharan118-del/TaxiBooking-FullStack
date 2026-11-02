import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      <Link to="/users" className="btn btn-primary m-2">
        Manage Users
      </Link>

      <Link to="/drivers" className="btn btn-success m-2">
        Manage Drivers
      </Link>

      <Link to="/vehicles" className="btn btn-warning m-2">
        Manage Vehicles
      </Link>

      <Link to="/bookings" className="btn btn-info m-2">
        Bookings
      </Link>

      <Link to="/reports" className="btn btn-danger m-2">
        Reports
      </Link>
    </div>
  );
}

export default AdminDashboard;
