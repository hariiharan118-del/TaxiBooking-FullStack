import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <div className="card shadow p-5 text-center">
        <h1>🚖 Taxi Booking Management System</h1>
        <p className="mt-3">Book your ride quickly, safely and easily.</p>
        <Link to="/register" className="btn btn-success mt-3 me-2">
          Create Account
        </Link>
        <Link to="/login" className="btn btn-primary mt-3">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
