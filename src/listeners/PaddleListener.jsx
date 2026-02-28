import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaddleListener() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.Paddle) {
            window.Paddle.Environment.set("sandbox");

            window.Paddle.Initialize({
                token: "test_4da09617b5a38ddcca5bdbf393a",
                eventCallback: (event) => {

                    console.log("Paddle Event:", event.name);

                    if (event.name === "checkout.completed") {

                        if (!event.data || !event.data.id) return;

                        window.Paddle.Checkout.close();
                        navigate("/success");
                    }
                }
            });
        }
    }, []);

    return null;
}

export default PaddleListener;