import { useNavigate } from "react-router-dom";

const StoryCard = ({ buttonText }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 
                    rounded-3xl p-8 w-full max-w-md 
                    shadow-2xl 
                    transition-all duration-500 
                    hover:scale-105 hover:shadow-purple-500/40">

        <h2 className="text-2xl font-bold text-white mb-3">
          Premium Stories ✨
        </h2>

        <p className="text-white/80 text-sm mb-6">
          Unlock exclusive premium content and advanced features.
        </p>

        <button
          onClick={() => navigate("/pricing")}
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl 
                   transition-all duration-300 
                   hover:bg-indigo-100 hover:scale-105 shadow-lg"
        >
          {buttonText}
        </button>

      </div>
    </div>
  );
};

export default StoryCard;