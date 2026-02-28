import { useEffect, useState } from "react";
import axios from "axios";
import StoryCard from "./StoryCard";

const Dashboard = () => {

  const PLAN_MAP = {
    "pri_01kjhpqk173gteddh49xr0w5ff": "Monthly",
    "pri_01kjhpvh54yw0efjdejtae7hd7": "Quarterly",
    "pri_01kjhpy7h5yp81skqz2zbvbf2y": "Annual"
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/auth/user", {
      withCredentials: true
    })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // 🔥 FIRST guard user
  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h3>Loading your dashboard...</h3>
      </div>
    );
  }

  // 🔥 THEN compute subscription UI
  const STATUS_STYLE = {
    active: { color: "green", label: "🟢 Active" },
    canceling: { color: "orange", label: "🟡 Will Cancel by Period End" },
    canceled: { color: "red", label: "🔴 Canceled" },
    past_due: { color: "orange", label: "🟠 Payment Issue" },
    inactive: { color: "gray", label: "⚪ Inactive" },
    pausing: { color: "blue", label: "🔵 Will Pause by Period End" },
    paused: { color: "darkblue", label: "🔷 Paused" },
  };

  const status = user.subscription?.status || "inactive";
  const statusDisplay = STATUS_STYLE[status] || STATUS_STYLE.inactive;


  return (
    <div style={{ padding: "40px" }}>
      <h2>Welcome {user.name}</h2>
      <img src={user.picture} width="60" alt="profile" />
      <p>{user.email}</p>

      {/* 🔥 ADD SUBSCRIPTION INFO HERE */}
      <hr />

      <h3>Subscription Details</h3>

      <p style={{ fontWeight: "bold", color: statusDisplay.color }}>
        Status: {statusDisplay.label}
      </p>


      <p>
        Plan: {PLAN_MAP[user.subscription?.plan] || "No active plan"}
      </p>

      <p>
        Paddle Customer ID: {user.subscription?.paddleCustomerId || "N/A"}
      </p>

      {user.subscription?.nextBillingDate && (
        <p>
          Next Billing:{" "}
          {new Date(user.subscription.nextBillingDate).toLocaleDateString()}
        </p>
      )}

      {user.subscription?.status === "active" && (
        <>
          <button
            onClick={async () => {
              try {
                await axios.post(
                  "http://localhost:5000/cancel-subscription",
                  {},
                  { withCredentials: true }
                );

                // Set canceling instead of canceled
                setUser(prev => ({
                  ...prev,
                  subscription: {
                    ...prev.subscription,
                    status: "canceling"
                  }
                }));

              } catch (err) {
                alert("Cancellation failed");
              }
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff4d4f",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "15px",
              marginRight: "10px"
            }}
          >
            Cancel Subscription
          </button>

          {/* 🔵 Add Pause Button */}
          <button
            onClick={async () => {
              try {
                await axios.post(
                  "http://localhost:5000/pause-subscription",
                  {},
                  { withCredentials: true }
                );

                setUser(prev => ({
                  ...prev,
                  subscription: {
                    ...prev.subscription,
                    status: "paused"
                  }
                }));

              } catch (err) {
                alert("Pause failed");
              }
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1677ff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "15px"
            }}
          >
            Pause Subscription
          </button>
        </>
      )}

      {user.subscription?.status === "paused" && (
        <button
          onClick={async () => {
            try {
              await axios.post(
                "http://localhost:5000/resume-subscription",
                {},
                { withCredentials: true }
              );

              setUser(prev => ({
                ...prev,
                subscription: {
                  ...prev.subscription,
                  status: "active"
                }
              }));

            } catch (err) {
              alert("Resume failed");
            }
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "15px"
          }}
        >
          Resume Subscription
        </button>
      )}

      {user.subscription?.status === "canceling" && (
        <p style={{ marginTop: "10px", fontStyle: "italic" }}>
          Your subscription will end at the end of this billing period.
        </p>
      )}


      <br />

      <StoryCard />

      <br />

      <a href="http://localhost:5000/auth/logout">Logout</a>
    </div>
  );
};

export default Dashboard;