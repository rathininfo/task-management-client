import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

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
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  const handleLoginGoogle = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;

        // Extract user information (name, email, and photoURL)
        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        // Send user data to your backend (server)
        fetch("https://visa-navigator-server-plum.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((response) => response.json())
          .then(() => {
            navigate(location?.state ? location.state : "/");
          })
          .catch((error) => {
            console.error("Error sending user data:", error);
          });
      })
      .catch((err) => {
        console.error("Google login failed:", err);
      });
  };

  const navigateToForgotPassword = () => {
    navigate("/auth/forget-password", { state: { email } });
  };

  return (
    <div className="flex justify-center items-center bg-base-200">
      <div className="hero-content flex-col">
        <div>
          <h1 className="text-2xl font-semibold">Login your account</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-xl shrink-0 rounded-none p-6">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <span
                  className="label-text-alt link link-hover text-blue-500"
                  onClick={navigateToForgotPassword}
                  style={{ cursor: "pointer" }}
                >
                  Forgot password?
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary rounded-none">Login</button>
            </div>
          </form>

          <button
            className="border-2 border-gray-200 rounded-md py-2 mb-3"
            onClick={handleLoginGoogle}
          >
            Login With Google
          </button>
          <p className="text-center font-semibold text-sm">
            Don’t Have An Account?{" "}
            <Link to="/auth/register" className="text-red-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
