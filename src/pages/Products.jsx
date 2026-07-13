import Navbar from "../Navbar";
import Product from "../Product";
import Footer from "../Footer";

function Products({
  cartItems,
  wishlistItems,
  addToCart,
  toggleWishlist,
}) {

  console.log("Products Page Rendered");

  return (

    <>
      <Navbar
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
      />

      <h1
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "red",
        }}
      >
        PRODUCTS PAGE
      </h1>

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