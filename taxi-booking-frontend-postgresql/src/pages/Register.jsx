import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      await authService.register({
        name,
        email,
        phone,
        password,
        role: "CUSTOMER",
      });
      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-3"
                placeholder="Name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-3"
                placeholder="Email"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control mb-3"
                placeholder="Phone"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-3"
                type="password"
                placeholder="Password"
              />
              <button className="btn btn-success w-100" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
