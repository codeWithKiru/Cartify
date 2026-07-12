import Navbar from "../Navbar";
import Hero from "../Hero";
import Category from "../Category";
import Product from "../Product";
import Offer from "../Offer";
import Newsletter from "../Newsletter";
import Footer from "../Footer";

function Home({
  cartItems,
  wishlistItems,
  addToCart,
  toggleWishlist,
}) {
  return (
    <>
      <Navbar
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
      />

      <Hero />

      <Category />

      <Product
        addToCart={addToCart}
        wishlistItems={wishlistItems}
        toggleWishlist={toggleWishlist}
      />

      <Offer />

      <Newsletter />

      <Footer />
    </>
  );
}

export default Home;