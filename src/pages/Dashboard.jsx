import { useEffect, useState } from "react";
import { API } from "../services/api";
import StoryCard from "../components/StoryCard.jsx";
import { PLAN_MAP, STATUS_STYLE } from "../constants/subscriptionConstants.js";


const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/user")
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

  const status = user.subscription?.status || "inactive";
  const statusDisplay = STATUS_STYLE[status] || STATUS_STYLE.inactive;


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-16 px-6">

      <div className="max-w-4xl mx-auto">

        {/* Welcome Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mb-10 transition-all duration-500 hover:shadow-purple-500/30">

          <div className="flex items-center gap-6">
            <img
              src={user.picture}
              alt="profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />

            <div>
              <h2 className="text-3xl font-bold">
                Welcome, {user.name} 👋
              </h2>
              <p className="text-white/70">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:scale-[1.02]">

          <h3 className="text-2xl font-semibold mb-6">
            Subscription Details
          </h3>

          {/* Status */}
          <div className="mb-4">
            <span className="text-white/70">Status:</span>
            <span
              className="ml-3 px-4 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: statusDisplay.color + "33",
                color: statusDisplay.color,
              }}
            >
              {statusDisplay.label}
            </span>
          </div>

          {/* Plan */}
          <p className="mb-2">
            <span className="text-white/70">Plan:</span>{" "}
            <span className="font-semibold">
              {PLAN_MAP[user.subscription?.plan] || "No active plan"}
            </span>
          </p>

          {/* Customer ID */}
          <p className="mb-2">
            <span className="text-white/70">Paddle Customer ID:</span>{" "}
            {user.subscription?.paddleCustomerId || "N/A"}
          </p>

          {/* Next Billing */}
          {user.subscription?.nextBillingDate && (
            <p className="mb-6">
              <span className="text-white/70">Next Billing:</span>{" "}
              {new Date(user.subscription.nextBillingDate).toLocaleDateString()}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">

            {user.subscription?.status === "active" && (
              <>
                <button
                  onClick={async () => {
                    try {
                      await API.post("/cancel-subscription");
                      setUser(prev => ({
                        ...prev,
                        subscription: {
                          ...prev.subscription,
                          status: "canceling"
                        }
                      }));
                    } catch {
                      alert("Cancellation failed");
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/40"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    try {
                      await API.post("/pause-subscription");
                      setUser(prev => ({
                        ...prev,
                        subscription: {
                          ...prev.subscription,
                          status: "paused"
                        }
                      }));
                    } catch {
                      alert("Pause failed");
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
                >
                  Pause
                </button>
              </>
            )}

            {user.subscription?.status === "paused" && (
              <button
                onClick={async () => {
                  try {
                    await API.post("/resume-subscription");
                    setUser(prev => ({
                      ...prev,
                      subscription: {
                        ...prev.subscription,
                        status: "active"
                      }
                    }));
                  } catch {
                    alert("Resume failed");
                  }
                }}
                className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/40"
              >
                Resume
              </button>
            )}
          </div>

          {user.subscription?.status === "canceling" && (
            <p className="mt-6 text-yellow-300 italic">
              Your subscription will end at the end of this billing period.
            </p>
          )}
        </div>

        {/* Premium Feature Card */}
        <div className="mt-12">
          <StoryCard />
        </div>

        {/* Logout */}
        <div className="text-center mt-10">
          <a
            href="http://localhost:5000/auth/logout"
            className="text-white/70 hover:text-white transition"
          >
            Logout
          </a>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;