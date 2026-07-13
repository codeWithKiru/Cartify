import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./Product.css";
import QuickView from "./QuickView";
import API_URL from "./config/api";

function Product({
  addToCart,
  wishlistItems,
  toggleWishlist,
}) {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {

    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {

        console.log("Products:", data);

        setProducts(data);

      })
      .catch((error) => {

        console.error("Error fetching products:", error);

        toast.error("Failed to load products.");

      });

  }, []);

  async function handleAddToCart(product) {

    const userId = localStorage.getItem("userId");

    if (!userId) {

      toast.warning("Please login first.");

      return;

    }

    try {

      const response = await fetch(
        `${API_URL}/cart`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: Number(userId),
            product_id: product.id,
          }),

        }
      );

      const data = await response.json();

      if (response.ok) {

        toast.success(data.message);

        addToCart(product);

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

  let filteredProducts = products.filter((item) => {

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  if (sortOption === "low-high") {

    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );

  }

  if (sortOption === "high-low") {

    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );

  }

  if (sortOption === "a-z") {

    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.name.localeCompare(b.name)
    );

  }

  if (sortOption === "z-a") {

    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.name.localeCompare(a.name)
    );

  }

  return (

    <>

      <section className="products">

        <h2>Featured Products</h2>

        <input
          className="search-box"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-buttons">

          <button onClick={() => setSelectedCategory("All")}>
            All
          </button>

          <button onClick={() => setSelectedCategory("Men")}>
            Men
          </button>

          <button onClick={() => setSelectedCategory("Women")}>
            Women
          </button>

          <button onClick={() => setSelectedCategory("Unisex")}>
            Unisex
          </button>

        </div>

        <div className="sort-container">

          <label>Sort By :</label>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >

            <option value="default">
              Default
            </option>

            <option value="low-high">
              Price : Low to High
            </option>

            <option value="high-low">
              Price : High to Low
            </option>

            <option value="a-z">
              Name : A-Z
            </option>

            <option value="z-a">
              Name : Z-A
            </option>

          </select>

        </div>

        <h2>Total Products: {products.length}</h2>

        <h2>Filtered Products: {filteredProducts.length}</h2>

        <div className="product-grid">

          {filteredProducts.map((item) => {

            const isWishlisted =
              wishlistItems.some(
                (wishItem) => wishItem.id === item.id
              );

            return (

              <div
                className="card"
                key={item.id}
              >

                <button
                  className="wishlist-btn"
                  onClick={() => toggleWishlist(item)}
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </button>

                <Link
                  to={`/product/${item.id}`}
                  className="product-link"
                >

                  <img
                    src={`${API_URL}/images/${item.image}`}
                    alt={item.name}
                  />

                  <h3>{item.name}</h3>

                  <p className="brand">
                    {item.brand}
                  </p>

                  <p className="rating">
                    ⭐ {item.rating}
                  </p>

                  <p className="price">
                    ₹{item.price}
                  </p>

                  <p
                    className={
                      item.stock > 0
                        ? "stock available"
                        : "stock unavailable"
                    }
                  >
                    {item.stock > 0
                      ? `In Stock (${item.stock})`
                      : "Out of Stock"}
                  </p>

                </Link>

                <button
                  className="cart-btn"
                  disabled={item.stock <= 0}
                  onClick={() => handleAddToCart(item)}
                >
                  {item.stock > 0
                    ? "Add to Cart"
                    : "Unavailable"}
                </button>

                <button
                  className="quick-view-btn"
                  onClick={() => setSelectedProduct(item)}
                >
                  Quick View
                </button>

              </div>

            );

          })}

        </div>

      </section>

      <QuickView
        product={selectedProduct}
        closeModal={() => setSelectedProduct(null)}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        wishlistItems={wishlistItems}
      />

    </>

  );

}

export default Product;