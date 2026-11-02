import { Link } from "react-router-dom";

function DriverDashboard() {
  const user = JSON.parse(localStorage.getItem("taxi-user") || "null");

  return (
    <div className="container mt-5">
      <h2>Welcome{user ? `, ${user.name}` : ""}</h2>

      <Link to="/driver/rides" className="btn btn-primary m-2">
        Assigned Rides
      </Link>

      <Link to="/driver/earnings" className="btn btn-success m-2">
        Earnings
      </Link>

      <Link to="/driver/profile" className="btn btn-warning m-2">
        Profile
      </Link>
    </div>
  );
}

export default DriverDashboard;
