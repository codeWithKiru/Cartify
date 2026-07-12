import Navbar from "../Navbar";
import Footer from "../Footer";
import API_URL from "../config/api";
import "./Cart.css";

function Wishlist({
  wishlistItems,
  cartItems,
  toggleWishlist,
  addToCart,
}) {

  return (

    <>

      <Navbar
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
      />

      <section className="cart-page">

        <h1>❤️ My Wishlist</h1>

        {wishlistItems.length === 0 ? (

          <h2>Your wishlist is empty.</h2>

        ) : (

          <div className="cart-container">

            {wishlistItems.map((item) => (

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

                <button
                  className="cart-btn"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() => toggleWishlist(item)}
                >
                  Remove ❤️
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

      <Footer />

    </>

  );

}

export default Wishlist;