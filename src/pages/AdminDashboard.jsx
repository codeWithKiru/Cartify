import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({

    users: 0,
    products: 0,
    orders: 0,
    revenue: 0

  });

  useEffect(() => {

    fetch(`${API_URL}/admin/dashboard`)
      .then((response) => response.json())
      .then((data) => {

        setStats(data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  function logout() {

    localStorage.removeItem("adminToken");

    alert("Admin Logged Out Successfully.");

    navigate("/admin-login");

  }

  return (

    <div className="admin-dashboard">

      <aside className="sidebar">

        <h2>🛒 Cartify Admin</h2>

        <Link to="/admin">
          Dashboard
        </Link>

        <Link to="/admin/products">
          Products
        </Link>

        <Link to="/admin/orders">
          Orders
        </Link>

        <Link to="/admin/users">
          Users
        </Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </aside>

      <main className="dashboard-content">

        <h1>Dashboard Analytics</h1>

        <div className="cards">

          <div className="card">

            <h2>👤 Users</h2>

            <h1>{stats.users}</h1>

          </div>

          <div className="card">

            <h2>📦 Products</h2>

            <h1>{stats.products}</h1>

          </div>

          <div className="card">

            <h2>🛒 Orders</h2>

            <h1>{stats.orders}</h1>

          </div>

          <div className="card">

            <h2>💰 Revenue</h2>

            <h1>₹{stats.revenue}</h1>

          </div>

        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;