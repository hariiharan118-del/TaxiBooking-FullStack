import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("taxi-user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("taxi-user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🚖 Taxi Booking
        </Link>

        <div>
          <Link className="btn btn-light btn-sm me-2" to="/">
            Home
          </Link>

          {!user && (
            <>
              <Link className="btn btn-light btn-sm me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/register">
                Register
              </Link>
            </>
          )}

          {user && user.role === "CUSTOMER" && (
            <>
              <Link className="btn btn-light btn-sm me-2" to="/customer">
                Dashboard
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/bookride">
                Book Ride
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/history">
                History
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/profile">
                Profile
              </Link>
            </>
          )}

          {user && user.role === "DRIVER" && (
            <>
              <Link className="btn btn-light btn-sm me-2" to="/driver">
                Dashboard
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/driver/rides">
                Assigned Rides
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/driver/earnings">
                Earnings
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/driver/profile">
                Profile
              </Link>
            </>
          )}

          {user && user.role === "ADMIN" && (
            <>
              <Link className="btn btn-light btn-sm me-2" to="/admin">
                Dashboard
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/users">
                Users
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/drivers">
                Drivers
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/vehicles">
                Vehicles
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/bookings">
                Bookings
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/reports">
                Reports
              </Link>
            </>
          )}

          {user && (
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout ({user.name})
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
