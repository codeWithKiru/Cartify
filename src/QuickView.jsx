import "./QuickView.css";

function QuickView({
  product,
  closeModal,
  addToCart,
  toggleWishlist,
  wishlistItems,
}) {
  if (!product) return null;

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  return (
    <div className="modal-overlay">

      <div className="modal">

        <button
          className="close-btn"
          onClick={closeModal}
        >
          ✖
        </button>

        <img
          src={product.image}
          alt={product.name}
        />

        <h2>{product.name}</h2>

        <p className="brand">
          {product.brand}
        </p>

        <p className="rating">
          ⭐ {product.rating}
        </p>

        <p className="price">
          ₹{product.price}
        </p>

        <p className="original-price">
          ₹{product.originalPrice}
        </p>

        <p className="discount">
          {product.discount}% OFF
        </p>

        <p>
          {product.description}
        </p>

        <div className="modal-buttons">

          <button
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            onClick={() => toggleWishlist(product)}
          >
            {isWishlisted
              ? "❤️ Wishlisted"
              : "🤍 Wishlist"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default QuickView;