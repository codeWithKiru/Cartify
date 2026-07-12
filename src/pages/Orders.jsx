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

  return (

    <>

      <Navbar />

      <section className="orders-page">

        <h1>My Orders</h1>

        {orders.length === 0 ? (

          <h2>No Orders Yet.</h2>

        ) : (

          orders.map((order) => (

            <div
              className="order-card"
              key={order.order_id}
            >

              <div className="order-header">

                <h2>
                  Order #{order.order_id}
                </h2>

                <span>
                  {order.status}
                </span>

              </div>

              <p>
                Date : {order.created_at}
              </p>

              <p>
                Total : ₹{order.total_amount}
              </p>

              <div className="order-products">

                {order.products.map((product, index) => (

                  <div
                    className="order-product"
                    key={index}
                  >

                    <img
                      src={`${API_URL}/images/${product.image}`}
                      alt={product.name}
                    />

                    <div>

                      <h4>{product.name}</h4>

                      <p>
                        Quantity : {product.quantity}
                      </p>

                      <p>
                        ₹{product.price}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))

        )}

      </section>

      <Footer />

    </>

  );

}

export default Orders;