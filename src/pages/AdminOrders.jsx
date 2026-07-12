import { useEffect, useState } from "react";
import API_URL from "../config/api";
import "./AdminOrders.css";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    loadOrders();

  }, []);

  function loadOrders() {

    fetch(`${API_URL}/admin/orders`)
      .then((response) => response.json())
      .then((data) => {

        setOrders(data);

      })
      .catch((error) => {

        console.error(error);

      });

  }

  async function updateStatus(id, status) {

    try {

      const response = await fetch(

        `${API_URL}/admin/orders/${id}`,

        {

          method: "PUT",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            status

          })

        }

      );

      const data = await response.json();

      if (response.ok) {

        alert(data.message);

        loadOrders();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  }

  return (

    <div className="admin-orders">

      <h1>Manage Orders</h1>

      <table>

        <thead>

          <tr>

            <th>Order ID</th>

            <th>User ID</th>

            <th>Total Amount</th>

            <th>Status</th>

            <th>Created At</th>

            <th>Update Status</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id}>

              <td>{order.id}</td>

              <td>{order.user_id}</td>

              <td>₹{order.total_amount}</td>

              <td>{order.status}</td>

              <td>{order.created_at}</td>

              <td>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                >

                  <option value="Placed">
                    Placed
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminOrders;