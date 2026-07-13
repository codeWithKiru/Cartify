import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  async function handleLogin() {

    if (!email || !password) {

      toast.warning("Please fill all fields.");

      return;

    }

    try {

      const response = await fetch(

        `${API_URL}/admin/login`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            email,

            password

          })

        }

      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem(

          "adminToken",

          data.token

        );

        toast.success("Admin Login Successful!");

        navigate("/admin");

      }

      else {

        toast.error(

          data.message || "Login failed."

        );

      }

    }

    catch (error) {

      console.error(error);

      toast.error("Unable to connect to the server.");

    }

  }

  return (

    <section className="admin-login">

      <div className="admin-login-box">

        <h1>

          Cartify Admin

        </h1>

        <input

          type="email"

          placeholder="Admin Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

        />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

        />

        <button

          onClick={handleLogin}

        >

          Login

        </button>

      </div>

    </section>

  );

}

export default AdminLogin;