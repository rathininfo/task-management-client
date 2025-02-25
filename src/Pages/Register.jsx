import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile, googleLogin, setRefacth } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase) return "Password must contain at least one uppercase letter.";
    if (!hasLowercase) return "Password must contain at least one lowercase letter.";
    if (!isValidLength) return "Password must be at least 6 characters long.";

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
    setPasswordError("");

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        fetch("https://visa-navigator-server-plum.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, photoURL: photo }),
        });

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            setRefacth(true);
            Swal.fire({
              title: "Registration Successful!",
              text: "Your account has been created successfully.",
              icon: "success",
              confirmButtonText: "Go to Home",
            });
            navigate("/");
          })
          .catch((err) => console.error("Error updating profile:", err));
      })
      .catch((error) => console.error(error.code, error.message));
  };

  const handleLoginGoogle = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        fetch("https://visa-navigator-server-plum.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }),
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.error("Error sending user data:", error);
          });
      })
      .catch((error) => {
        console.error("Google login failed:", error);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register your account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-md px-3 py-2">
            <FaImage className="text-gray-500 mr-2" />
            <input
              name="photo"
              type="text"
              placeholder="Photo URL"
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-md px-3 py-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-md px-3 py-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              required
            />
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" className="checkbox" required />
            <span className="text-gray-700">Accept Terms & Conditions</span>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md mt-3 transition"
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            className="flex items-center justify-center w-full border border-gray-300 text-gray-700 py-2 rounded-md transition hover:bg-gray-100"
            onClick={handleLoginGoogle}
          >
            <FcGoogle className="mr-2 text-red-500" />
            Login with Google
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
