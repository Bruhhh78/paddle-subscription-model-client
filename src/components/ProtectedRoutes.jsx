import { Navigate } from "react-router-dom";
import { API } from "../services/api";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
   API.get("/auth/user")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) return <h3>Loading...</h3>;

  return user ? children : <Navigate to="/" />;
}
export default ProtectedRoute;