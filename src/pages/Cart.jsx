import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import API_URL from "../config/api";
import "./Cart.css";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    fetchCart();

  }, []);

  async function fetchCart() {

    try {

      const response = await fetch(
        `${API_URL}/cart/${userId}`
      );

      const data = await response.json();

      setCartItems(data);

    } catch (error) {

      console.error(error);

    }

  }

  async function increaseQuantity(cartId, currentQuantity) {

    await fetch(
      `${API_URL}/cart/${cartId}`,
      {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          quantity: currentQuantity + 1,
        }),

      }
    );

    fetchCart();

  }

  async function decreaseQuantity(cartId, currentQuantity) {

    if (currentQuantity === 1) {

      removeFromCart(cartId);

      return;

    }

    await fetch(
      `${API_URL}/cart/${cartId}`,
      {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          quantity: currentQuantity - 1,
        }),

      }
    );

    fetchCart();

  }

  async function removeFromCart(cartId) {

    await fetch(
      `${API_URL}/cart/${cartId}`,
      {

        method: "DELETE",

      }
    );

    fetchCart();

  }

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (

    <>

      <Navbar
        cartCount={cartItems.length}
        wishlistCount={0}
      />

      <section className="cart-page">

        <h1>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (

          <h2>Your cart is empty.</h2>

        ) : (

          <>

            <div className="cart-container">

              {cartItems.map((item) => (

                <div
                  className="cart-card"
                  key={item.id}
                >

                  <img
                    src={`${API_URL}/images/${item.image}`}
                    alt={item.name}
                  />

                  <h3>{item.name}</h3>

                  <p className="price">
                    ₹{item.price}
                  </p>

                  <p className="rating">
                    ⭐ {item.rating}
                  </p>

                  <p className="brand">
                    {item.brand}
                  </p>

                  <div className="quantity-box">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id,
                          item.quantity
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id,
                          item.quantity
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <p className="subtotal">
                    Subtotal : ₹{item.price * item.quantity}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            <div className="cart-summary">

              <h2>
                Total : ₹{totalPrice}
              </h2>

              <Link to="/checkout">

                <button className="checkout-btn">
                  Proceed to Checkout
                </button>

              </Link>

            </div>

          </>

        )}

      </section>

      <Footer />

    </>

  );

}

export default Cart;