import Navbar from "../Navbar";
import Footer from "../Footer";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <>
      <Navbar
        cartCount={0}
        wishlistCount={0}
      />

      <section className="success">

        <div className="success-box">

          <h1>🎉</h1>

          <h2>Order Placed Successfully!</h2>

          <p>
            Thank you for shopping with Cartify.
            Your order has been placed successfully.
          </p>

          <Link to="/">
            <button>
              Continue Shopping
            </button>
          </Link>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default OrderSuccess;