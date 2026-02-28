import { useNavigate } from "react-router-dom";
import "./styles/subscription.css";
import { useEffect } from "react";

const Success = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="success-container">
            <div className="success-card">

                <div className="success-icon">✓</div>

                <h1>Payment Successful!</h1>
                <p>Your subscription has been activated successfully.</p>

                <div className="success-details">
                    <p><strong>Status:</strong> Active</p>
                    <p><strong>Plan:</strong> Premium Subscription</p>
                </div>

                <button onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                </button>

            </div>
        </div>
    );
};

export default Success;