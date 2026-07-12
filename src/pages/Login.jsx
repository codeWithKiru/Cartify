import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import API_URL from "../config/api";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {

      alert("Please enter email and password.");

      return;

    }

    try {

      const response = await fetch(
        `${API_URL}/login`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),

        }
      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);

        alert("Login Successful!");

        navigate("/");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error("Login Error:", error);

      alert("Server Error");

    }

  };

  return (

    <>

      <Navbar
        cartCount={0}
        wishlistCount={0}
      />

      <section className="login-page">

        <div className="login-box">

          <h2>Welcome Back 👋</h2>

          <p className="login-subtitle">
            Login to continue shopping
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>

          </div>

          <div className="login-options">

            <label>

              <input type="checkbox" />

              Remember Me

            </label>

            <a href="#">
              Forgot Password?
            </a>

          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Login
          </button>

          <button className="google-btn">
            Continue with Google
          </button>

          <p className="signup-link">

            Don't have an account?

            <Link to="/signup">
              {" "}Sign Up
            </Link>

          </p>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default Login;