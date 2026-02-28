import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Pricing from "./Pricing";
import Success from "./Success";

function PaddleListener() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Paddle) {
      window.Paddle.Environment.set("sandbox");

      window.Paddle.Initialize({
        token: "test_4da09617b5a38ddcca5bdbf393a",
        eventCallback: async (event) => {   // ✅ async added

          console.log("Paddle Event:", event.name);

          if (event.name === "checkout.completed") {

            if (!event.data || !event.data.id) return;

            try {
              await fetch("http://localhost:5000/save-subscription", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  transactionId: event.data.id,
                  subscriptionId: event.data.subscription_id,
                  priceId: event.data.items[0]?.price_id,
                })
              });

              window.Paddle.Checkout.close();
              navigate("/success");

            } catch (error) {
              console.error("Save subscription failed:", error);
            }
          }
        }
      });
    }
  }, []);

  return null;
}

// Protected Route
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    axios.get("http://localhost:5000/auth/user", {
      withCredentials: true
    })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) return <h3>Loading...</h3>;

  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <PaddleListener />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pricing"
          element={
            <ProtectedRoute>
              <Pricing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;