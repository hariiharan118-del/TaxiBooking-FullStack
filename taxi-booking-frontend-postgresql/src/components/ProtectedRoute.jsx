import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const storedUser = localStorage.getItem("taxi-user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
