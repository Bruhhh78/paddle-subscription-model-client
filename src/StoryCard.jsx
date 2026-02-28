import { useNavigate } from "react-router-dom";
import "./styles/subscription.css";

const StoryCard = () => {
  const navigate = useNavigate();

  return (
    <div className="story-container">
      <div className="story-card">
        <h2>Premium Stories</h2>
        <p>Unlock exclusive premium content and features.</p>
        <button onClick={() => navigate("/pricing")}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default StoryCard;