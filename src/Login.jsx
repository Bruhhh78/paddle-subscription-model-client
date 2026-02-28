import "./styles/subscription.css"

const Login = () => {

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <button onClick={handleGoogleLogin}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;