import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Pricing from "../pages/Pricing";
import Success from "../pages/Success";
import PaddleListener from "../listeners/PaddleListener";
import ProtectedRoute from "../components/ProtectedRoutes.jsx";

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