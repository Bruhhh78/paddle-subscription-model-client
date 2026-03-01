import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API } from "../services/api";

const Success = () => {
    const navigate = useNavigate();
    useEffect(() => {

        let timeout;

        const checkActivation = async () => {
            try {
                const res = await API.get("/auth/user");

                const status = res.data.subscription?.status;

                if (status === "active" || status === "trialing") {
                    navigate("/dashboard");
                } else {
                    timeout = setTimeout(checkActivation, 1500);
                }

            } catch {
                timeout = setTimeout(checkActivation, 1500);
            }
        };

        checkActivation();

        return () => clearTimeout(timeout);

    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600">

            <div className="bg-white rounded-2xl shadow-2xl p-10 w-[400px] text-center animate-fadeIn">

                <div className="w-20 h-20 bg-green-500 text-white text-4xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    ✓
                </div>

                <h1 className="text-2xl font-bold mb-3">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mb-6">
                    Your subscription has been activated successfully.
                </p>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
                >
                    Go to Dashboard
                </button>

            </div>
        </div>
    );
};

export default Success;