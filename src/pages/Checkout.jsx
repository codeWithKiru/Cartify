import Navbar from "../Navbar";
import Footer from "../Footer";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../config/api";

function Checkout({
  cartItems,
  wishlistItems,
}) {

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  async function placeOrder() {

    const userId = localStorage.getItem("userId");

    if (!userId) {

      toast.warning("Please login first.");

      navigate("/login");

      return;

    }

    if (cartItems.length === 0) {

      toast.warning("Your cart is empty.");

      return;

    }

    try {

      const response = await fetch(

        `${API_URL}/place-order`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            user_id: Number(userId)

          })

        }

      );

      const data = await response.json();

      if (response.ok) {

        toast.success("Order placed successfully!");

        navigate("/payment", {

          state: {

            orderId: data.order_id,

            amount: totalPrice

          }

        });

      }

      else {

        toast.error(data.message);

      }

    }

    catch (error) {

      console.error(error);

      toast.error("Server Error");

    }

  }

  return (

    <>

      <Navbar

        cartCount={cartItems.length}

        wishlistCount={wishlistItems.length}

      />

      <section className="checkout">

        <div className="checkout-left">

          <h2>

            Delivery Address

          </h2>

          <input

            type="text"

            placeholder="Full Name"

          />

          <input

            type="email"

            placeholder="Email"

          />

          <input

            type="tel"

            placeholder="Phone Number"

          />

          <textarea

            placeholder="Address"

          >

          </textarea>

          <input

            type="text"

            placeholder="City"

          />

          <input

            type="text"

            placeholder="Pincode"

          />

        </div>

        <div className="checkout-right">

          <h2>

            Order Summary

          </h2>

          {

            cartItems.map((item) => (

              <div

                className="summary-item"

                key={item.id}

              >

                <span>

                  {item.name}

                </span>

                <span>

                  ₹{item.price * item.quantity}

                </span>

              </div>

            ))

          }

          <hr />

          <h3>

            Total : ₹{totalPrice}

          </h3>

          <button

            onClick={placeOrder}

          >

            Proceed to Payment

          </button>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default Checkout;