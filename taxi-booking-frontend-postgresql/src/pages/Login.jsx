import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const user = await authService.login({ email, password });
      localStorage.setItem("taxi-user", JSON.stringify(user));
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "DRIVER") {
        navigate("/driver");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-3"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-3"
                type="password"
                placeholder="Password"
              />
              <button className="btn btn-primary w-100" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
