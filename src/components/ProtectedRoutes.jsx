import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h3>Loading...</h3>;

  return user ? children : <Navigate to="/" />;
}

export default ProtectedRoute;