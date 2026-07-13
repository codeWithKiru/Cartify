import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import API_URL from "../config/api";
import "./Orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const userId = localStorage.getItem("userId");

    if (!userId) return;

    fetch(`${API_URL}/orders/${userId}`)
      .then((response) => response.json())
      .then((data) => {

        setOrders(data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  function getStatusClass(status) {

    switch (status) {

      case "Placed":
        return "placed";

      case "Shipped":
        return "shipped";

      case "Delivered":
        return "delivered";

      default:
        return "";

    }

  }

  return (

    <>

      <Navbar />

      <section className="orders-page">

        <h1>📦 My Orders</h1>

        {

          orders.length === 0 ? (

            <div className="empty-orders">

              <h2>No Orders Yet 😔</h2>

              <p>
                Start shopping and your orders will appear here.
              </p>

            </div>

          ) : (

            orders.map((order) => (

              <div
                className="order-card"
                key={order.order_id}
              >

                <div className="order-header">

                  <div>

                    <h2>

                      Order #{order.order_id}

                    </h2>

                    <p>

                      Ordered on

                      <strong>

                        {" "}
                        {order.created_at}

                      </strong>

                    </p>

                  </div>

                  <span
                    className={`status ${getStatusClass(order.status)}`}
                  >

                    {order.status}

                  </span>

                </div>

                {/* Timeline */}

                <div className="timeline">

                  <div
                    className={
                      order.status === "Placed" ||
                      order.status === "Shipped" ||
                      order.status === "Delivered"
                        ? "step active"
                        : "step"
                    }
                  >

                    <div className="circle"></div>

                    <p>Placed</p>

                  </div>

                  <div className="line"></div>

                  <div
                    className={
                      order.status === "Shipped" ||
                      order.status === "Delivered"
                        ? "step active"
                        : "step"
                    }
                  >

                    <div className="circle"></div>

                    <p>Shipped</p>

                  </div>

                  <div className="line"></div>

                  <div
                    className={
                      order.status === "Delivered"
                        ? "step active"
                        : "step"
                    }
                  >

                    <div className="circle"></div>

                    <p>Delivered</p>

                  </div>

                </div>

                <div className="products">

                  {

                    order.products.map((product, index) => (

                      <div
                        className="product-card"
                        key={index}
                      >

                        <img
                          src={`${API_URL}/images/${product.image}`}
                          alt={product.name}
                        />

                        <div className="product-details">

                          <h3>

                            {product.name}

                          </h3>

                          <p>

                            Quantity :
                            {" "}
                            {product.quantity}

                          </p>

                          <p>

                            ₹{product.price}

                          </p>

                        </div>

                      </div>

                    ))

                  }

                </div>

                <div className="order-total">

                  <h3>

                    Total Paid

                  </h3>

                  <h2>

                    ₹{order.total_amount}

                  </h2>

                </div>

              </div>

            ))

          )

        }

      </section>

      <Footer />

    </>

  );

}

export default Orders;