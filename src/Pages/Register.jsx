import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile, googleLogin, setRefacth } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState("");

  // Password validation function
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase)
      return "Password must contain at least one uppercase letter.";
    if (!hasLowercase)
      return "Password must contain at least one lowercase letter.";
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

    setPasswordError(""); // Clear any previous error

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        // Send user data to the server
        fetch("https://visa-navigator-server-plum.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            photoURL: photo,
          }),
        });

        // Update the user's profile and show success alert
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            setRefacth(true);
            Swal.fire({
              title: "Registration Successful!",
              text: "Your account has been created successfully.",
              icon: "success",
              confirmButtonText: "Go to Home",
            });
            navigate("/"); // Navigate to home page after the alert
          })
          .catch((err) => console.error("Error updating profile:", err));
      })
      .catch((error) => console.error(error.code, error.message));
  };

  const handleLoginGoogle = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;

        // Extract necessary data from Firebase user object
        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        // Send user data to the server
        fetch("https://visa-navigator-server-plum.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((response) => response.json())
          .then(() => {
            navigate("/"); // Redirect to home page
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
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className="flex gap-4 flex-col">
        <h1 className="text-2xl font-semibold">Register your account</h1>
        <div className="bg-base-100 w-96 p-4">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Enter your Photo URL"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div className="form-control flex flex-row items-center gap-2 mt-5">
              <input type="checkbox" className="checkbox" required />
              <span>Accept Terms & Conditions</span>
            </div>

            <div className="form-control mt-4">
              <button className="btn btn-primary rounded-none" type="submit">
                Register
              </button>
            </div>
          </form>

          <button
            className="border-2 border-gray-200 rounded-md py-2 mb-3 w-full"
            onClick={handleLoginGoogle}
          >
            Login With Google
          </button>

          <p className="text-center font-semibold text-sm">
            Already Have An Account?{" "}
            <Link to="/auth/login" className="text-red-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
