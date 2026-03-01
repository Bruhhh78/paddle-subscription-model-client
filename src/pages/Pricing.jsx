import { useEffect, useState } from "react";
import { API } from "../services/api";
import { useAuth } from "../context/AuthContext";

const PLAN_LEVEL = {
    "pri_01kjhpqk173gteddh49xr0w5ff": 1, // Monthly
    "pri_01kjhpvh54yw0efjdejtae7hd7": 2, // Quarterly
    "pri_01kjhpy7h5yp81skqz2zbvbf2y": 3  // Annual
};

const Pricing = () => {

    const { user, fetchUser, loading } = useAuth();
    const [previewData, setPreviewData] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [couponStatus, setCouponStatus] = useState(null);
    const [couponValid, setCouponValid] = useState(false);

    const confirmUpgrade = async () => {
        try {
            await API.post("/upgrade-subscription", {
                newPriceId: selectedPrice
            });

            setShowModal(false);

            setTimeout(async () => {
                await fetchUser();
            }, 1500);;

            alert("Upgrade successful 🎉");

        } catch {
            alert("Upgrade failed ❌");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleApplyCoupon = async (priceId) => {
        try {
            const res = await API.post("/validate-coupon", {
                priceId,
                discountCode: coupon
            });

            setCouponStatus(
                "Coupon Applied ✅"
            );
            setCouponValid(true);

        } catch {
            setCouponStatus("Coupon expired or invalid ❌");
            setCouponValid(false);
        }
    };

    const handlePlan = async (priceId) => {
        try {

            const currentPlan = user?.subscription?.plan;
            const currentLevel = PLAN_LEVEL[currentPlan] || 0;
            const targetLevel = PLAN_LEVEL[priceId];

            // 🔥 Upgrade case
            if (currentLevel > 0 && targetLevel > currentLevel) {

                const res = await API.post("/preview-upgrade", {
                    newPriceId: priceId
                });

                setPreviewData(res.data);
                setSelectedPrice(priceId);
                setShowModal(true);

                return;  // 🔥 IMPORTANT
            }

            // 🔥 New subscription case
            if (currentLevel === 0) {
                const res = await API.post("/create-checkout", {
                    priceId,
                    discountCode: couponValid ? coupon : null
                });
                const transactionId = res.data.transactionId;

                window.Paddle.Checkout.open({
                    transactionId: transactionId
                });
            }

        } catch (error) {
            console.log(error);
            alert("Action failed ❌");
        }
    };

    const renderButton = (priceId) => {

        const currentPlan = user?.subscription?.plan || null;
        const currentLevel = PLAN_LEVEL[currentPlan] || 0;
        const targetLevel = PLAN_LEVEL[priceId];

        const isCurrentPlan = priceId === currentPlan;
        const hasSubscription = currentLevel > 0;
        const isTrialing = user?.subscription?.status === "trialing";

        const isUpgradeAllowed =
            hasSubscription &&
            targetLevel > currentLevel &&
            !isTrialing;

        // 🔴 Annual user → hide other plans
        if (currentLevel === 3 && !isCurrentPlan) {
            return null;
        }

        return (
            <button
                disabled={
                    isCurrentPlan ||
                    (hasSubscription && !isUpgradeAllowed)
                }
                onClick={() => handlePlan(priceId)}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${(isUpgradeAllowed || !hasSubscription)
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-600 cursor-not-allowed"
                    }`}
            >
                {isCurrentPlan
                    ? "Current Plan"
                    : !hasSubscription
                        ? "Choose Plan"
                        : isTrialing
                            ? "Upgrade Disabled During Trial"
                            : isUpgradeAllowed
                                ? "Upgrade Plan 🚀"
                                : "Not Available"}
            </button>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading plans...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6">

            <div className="mb-8 text-center space-x-3">
                <input
                    type="text"
                    placeholder="Enter discount code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="px-4 py-2 rounded-xl text-black"
                />

                <button
                    onClick={() =>
                        handleApplyCoupon("pri_01kjhpqk173gteddh49xr0w5ff")
                    }
                    className="bg-green-600 px-4 py-2 rounded-xl"
                >
                    Apply
                </button>

                {couponStatus && (
                    <p className="mt-3 text-sm">
                        {couponStatus}
                    </p>
                )}
            </div>

            <h1 className="text-4xl font-bold text-center mb-16">
                Choose Your Plan 🚀
            </h1>


            <div className="flex flex-wrap justify-center gap-10">

                {/* Monthly */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-[300px] text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <h3 className="text-xl font-semibold mb-3">Monthly</h3>
                    <h2 className="text-4xl font-bold mb-2">₹399</h2>
                    <p className="text-gray-300 mb-6 text-sm">Billed every month</p>
                    {renderButton("pri_01kjhpqk173gteddh49xr0w5ff")}
                </div>

                {/* Quarterly */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-[300px] text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <h3 className="text-xl font-semibold mb-3">Quarterly</h3>
                    <h2 className="text-4xl font-bold mb-2">₹1999</h2>
                    <p className="text-gray-300 mb-6 text-sm">Billed every 3 months</p>
                    {renderButton("pri_01kjhpvh54yw0efjdejtae7hd7")}
                </div>

                {/* Annual */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-[300px] text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <h3 className="text-xl font-semibold mb-3">Annual</h3>
                    <h2 className="text-4xl font-bold mb-2">₹3999</h2>
                    <p className="text-gray-300 mb-6 text-sm">Billed yearly</p>
                    {renderButton("pri_01kjhpy7h5yp81skqz2zbvbf2y")}
                </div>

            </div>
            {showModal && previewData && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                    <div className="bg-white text-black rounded-2xl p-8 w-[420px]">

                        <h2 className="text-xl font-bold mb-6">
                            Confirm Plan Upgrade
                        </h2>

                        <div className="space-y-3 mb-6">

                            <div className="flex justify-between">
                                <span>New Plan:</span>
                                <span>
                                    {previewData.description}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Full Plan Price:</span>
                                <span>
                                    {previewData.currency} {previewData.fullPlanPrice}
                                </span>
                            </div>

                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setPreviewData(null);
                                    setSelectedPrice(null);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmUpgrade}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                            >
                                Confirm Upgrade
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Pricing;