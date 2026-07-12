import Navbar from "../Navbar";
import Product from "../Product";
import Footer from "../Footer";

function Products({
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

      <Product
        addToCart={addToCart}
        wishlistItems={wishlistItems}
        toggleWishlist={toggleWishlist}
      />

      <Footer />
    </>
  );
}

export default Products;