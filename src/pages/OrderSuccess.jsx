import Navbar from "../Navbar";
import Footer from "../Footer";
import "./OrderSuccess.css";
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {

  const location = useLocation();

  const {

    transactionId = "N/A",

    amount = 0

  } = location.state || {};

  return (

    <>

      <Navbar
        cartCount={0}
        wishlistCount={0}
      />

      <section className="success">

        <div className="success-box">

          <div className="success-icon">

            ✅

          </div>

          <h1>

            Payment Successful!

          </h1>

          <p>

            Thank you for shopping with Cartify.

          </p>

          <div className="payment-details">

            <div className="detail-row">

              <span>

                Transaction ID

              </span>

              <strong>

                {transactionId}

              </strong>

            </div>

            <div className="detail-row">

              <span>

                Amount Paid

              </span>

              <strong>

                ₹{amount}

              </strong>

            </div>

            <div className="detail-row">

              <span>

                Payment Status

              </span>

              <strong className="paid">

                Paid

              </strong>

            </div>

          </div>

          <div className="success-buttons">

            <Link to="/">

              <button className="continue-btn">

                Continue Shopping

              </button>

            </Link>

            <Link to="/orders">

              <button className="orders-btn">

                View My Orders

              </button>

            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default OrderSuccess;