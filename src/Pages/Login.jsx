import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc"; // Google Icon

const Login = () => {
  const { userLogin, setUser, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  const handleLoginGoogle = () => {
    googleLogin()
      .then((result) => {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };

        fetch("http://localhost:4000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        })
          .then(() => navigate(location?.state ? location.state : "/"))
          .catch((error) => console.error("Error sending user data:", error));
      })
      .catch((err) => console.error("Google login failed:", err));
  };

  navigate("/")

  const navigateToForgotPassword = () => {
    navigate("/auth/forget-password", { state: { email } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Login to Your Account
        </h1>

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
              required
            />
            <p
              className="text-sm text-blue-500 hover:underline cursor-pointer mt-1"
              onClick={navigateToForgotPassword}
            >
              Forgot password?
            </p>
          </div>

          {/* Login Button */}
          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-300">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleLoginGoogle}
          className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium text-gray-700">Login with Google</span>
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
