import { API } from "../services/api";

const Pricing = () => {

    const handlePlan = async (priceId) => {
        try {
            const res = await API.post("/create-checkout", { priceId });

            const transactionId = res.data.transactionId;

            window.Paddle.Checkout.open({
                transactionId: transactionId
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6">

            <h1 className="text-4xl font-bold text-center mb-16">
                Choose Your Plan 🚀
            </h1>

            <div className="flex flex-wrap justify-center gap-10">

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-[300px] text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl">

                    <h3 className="text-xl font-semibold mb-3">Monthly</h3>
                    <h2 className="text-4xl font-bold mb-2">₹399</h2>
                    <p className="text-gray-300 mb-6 text-sm">Billed every month</p>

                    <button
                        onClick={() => handlePlan("pri_01kjhpqk173gteddh49xr0w5ff")}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl transition-all duration-300 font-semibold"
                    >
                        Choose Plan
                    </button>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-[300px] text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl">

                    <h3 className="text-xl font-semibold mb-3">Quaterly</h3>
                    <h2 className="text-4xl font-bold mb-2">₹1999</h2>
                    <p className="text-gray-300 mb-6 text-sm">Billed every 3 month</p>

                    <button
                        onClick={() => handlePlan("pri_01kjhpvh54yw0efjdejtae7hd7")}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl transition-all duration-300 font-semibold"
                    >
                        Choose Plan
                    </button>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-[300px] text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl">

                    <h3 className="text-xl font-semibold mb-3">Annually</h3>
                    <h2 className="text-4xl font-bold mb-2">₹3999</h2>
                    <p className="text-gray-300 mb-6 text-sm">Billed yearly</p>

                    <button
                        onClick={() => handlePlan("pri_01kjhpy7h5yp81skqz2zbvbf2y")}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl transition-all duration-300 font-semibold"
                    >
                        Choose Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;