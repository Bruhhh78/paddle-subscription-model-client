// import "../styles/subscription.css"

const Login = () => {

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 w-[380px] text-center transition-all duration-500 hover:scale-105">

        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
          Welcome Back 👋
        </h2>

        <p className="text-white/80 mb-8 text-sm">
          Continue to access your premium dashboard
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-800 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Continue with Google
        </button>

      </div>
    </div>
  );
};

export default Login;