import "./styles/subscription.css";
import axios from "axios";

const Pricing = () => {

    const handlePlan = async (priceId) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/create-checkout",
                { priceId },
                { withCredentials: true }   // 🔥 THIS IS REQUIRED
            );

            const transactionId = res.data.transactionId;

            window.Paddle.Checkout.open({
                transactionId: transactionId
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="pricing-container">
            <h1>Select Your Plan</h1>

            <div className="pricing-grid">

                <div className="pricing-card">
                    <h3>Monthly</h3>
                    <h2>₹399</h2>
                    <p>Billed every month</p>
                    <button onClick={() => handlePlan("pri_01kjhpqk173gteddh49xr0w5ff")}>
                        Choose Plan
                    </button>
                </div>

                <div className="pricing-card">
                    <h3>Quarterly</h3>
                    <h2>₹1999</h2>
                    <p>Billed every 3 months</p>
                    <button onClick={() => handlePlan("pri_01kjhpvh54yw0efjdejtae7hd7")}>
                        Choose Plan
                    </button>
                </div>

                <div className="pricing-card">
                    <h3>Annual</h3>
                    <h2>₹3999</h2>
                    <p>Billed yearly</p>
                    <button onClick={() => handlePlan("pri_01kjhpy7h5yp81skqz2zbvbf2y")}>
                        Choose Plan
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Pricing;