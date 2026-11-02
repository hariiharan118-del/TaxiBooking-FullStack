import { Link } from "react-router-dom";

function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem("taxi-user") || "null");

  return (
    <div className="container mt-5">
      <h2>Welcome{user ? `, ${user.name}` : ""}</h2>

      <Link to="/bookride" className="btn btn-primary m-2">
        Book Ride
      </Link>

      <Link to="/history" className="btn btn-success m-2">
        Booking History
      </Link>

      <Link to="/profile" className="btn btn-warning m-2">
        Profile
      </Link>
    </div>
  );
}

export default CustomerDashboard;
