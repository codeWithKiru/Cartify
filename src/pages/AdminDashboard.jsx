import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API_URL from "../config/api";

import RevenueChart from "../charts/RevenueChart";
import OrdersChart from "../charts/OrdersChart";

import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({

    users: 0,

    products: 0,

    orders: 0,

    revenue: 0,

    low_stock: 0

  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {

    loadDashboard();

    loadRecentOrders();

  }, []);

  function loadDashboard() {

    fetch(`${API_URL}/admin/dashboard`)
      .then((response) => response.json())
      .then((data) => {

        setStats(data);

      })
      .catch((error) => {

        console.error(error);

      });

  }

  function loadRecentOrders() {

    fetch(`${API_URL}/admin/orders`)
      .then((response) => response.json())
      .then((data) => {

        setRecentOrders(data.slice(0, 5));

      })
      .catch((error) => {

        console.error(error);

      });

  }

  function logout() {

    localStorage.removeItem("adminToken");

    navigate("/admin-login");

  }

  return (

    <div className="admin-dashboard">

      <aside className="sidebar">

        <h2>🛒 Cartify Admin</h2>

        <Link to="/admin">
          📊 Dashboard
        </Link>

        <Link to="/admin/products">
          📦 Products
        </Link>

        <Link to="/admin/orders">
          🛒 Orders
        </Link>

        <Link to="/admin/users">
          👤 Users
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

            <h3>👤 Users</h3>

            <h1>{stats.users}</h1>

          </div>

          <div className="card">

            <h3>📦 Products</h3>

            <h1>{stats.products}</h1>

          </div>

          <div className="card">

            <h3>🛒 Orders</h3>

            <h1>{stats.orders}</h1>

          </div>

          <div className="card">

            <h3>💰 Revenue</h3>

            <h1>₹{stats.revenue}</h1>

          </div>

          <div className="card">

            <h3>⚠️ Low Stock</h3>

            <h1>{stats.low_stock}</h1>

          </div>

        </div>

        {/* ==========================
              CHARTS
        ========================== */}

        <div className="charts">

          <RevenueChart
            revenue={stats.revenue}
          />

          <OrdersChart
            orders={stats.orders}
          />

        </div>

        {/* ==========================
            RECENT ORDERS
        ========================== */}

        <div className="recent-orders">

          <h2>🛒 Recent Orders</h2>

          <table>

            <thead>

              <tr>

                <th>Order ID</th>

                <th>Customer</th>

                <th>Amount</th>

                <th>Status</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {

                recentOrders.length === 0 ?

                (

                  <tr>

                    <td

                      colSpan="5"

                      style={{

                        textAlign: "center",

                        padding: "20px"

                      }}

                    >

                      No Orders Found

                    </td>

                  </tr>

                )

                :

                (

                  recentOrders.map((order) => (

                    <tr

                      key={order.id}

                    >

                      <td>

                        #{order.id}

                      </td>

                      <td>

                        {order.customer_name}

                      </td>

                      <td>

                        ₹{order.total_amount}

                      </td>

                      <td>

                        <span
                          className={`status ${order.status.toLowerCase()}`}
                        >

                          {order.status}

                        </span>

                      </td>

                      <td>

                        {order.created_at}

                      </td>

                    </tr>

                  ))

                )

              }

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;