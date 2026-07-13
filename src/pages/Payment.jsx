import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import API_URL from "../config/api";
import "./Payment.css";

function Payment() {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    orderId,
    amount
  } = location.state || {};

  const userId = localStorage.getItem("userId");

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  async function handlePayment() {

    if (!orderId) {

      toast.error("Order not found.");

      return;

    }

    setLoading(true);

    try {

      const response = await fetch(

        `${API_URL}/payment`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            user_id: Number(userId),

            order_id: orderId,

            payment_method: paymentMethod,

            amount: amount

          })

        }

      );

      const data = await response.json();

      setLoading(false);

      if (response.ok) {

        toast.success("Payment Successful!");

        navigate("/order-success", {

          state: {

            transactionId: data.transaction_id,

            amount: amount

          }

        });

      }

      else {

        toast.error(data.message);

      }

    }

    catch (error) {

      console.error(error);

      setLoading(false);

      toast.error("Server Error");

    }

  }

  return (

    <section className="payment-page">

      <div className="payment-card">

        <h1>

          💳 Cartify Payment

        </h1>

        <h2>

          Amount : ₹{amount}

        </h2>

        <div className="payment-methods">

          <label>

            <input

              type="radio"

              value="UPI"

              checked={paymentMethod === "UPI"}

              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }

            />

            UPI

          </label>

          <label>

            <input

              type="radio"

              value="Card"

              checked={paymentMethod === "Card"}

              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }

            />

            Credit / Debit Card

          </label>

          <label>

            <input

              type="radio"

              value="Net Banking"

              checked={paymentMethod === "Net Banking"}

              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }

            />

            Net Banking

          </label>

          <label>

            <input

              type="radio"

              value="Cash On Delivery"

              checked={paymentMethod === "Cash On Delivery"}

              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }

            />

            Cash On Delivery

          </label>

        </div>

        <button

          className="pay-btn"

          onClick={handlePayment}

          disabled={loading}

        >

          {

            loading

              ? "Processing..."

              : `Pay ₹${amount}`

          }

        </button>

      </div>

    </section>

  );

}

export default Payment;