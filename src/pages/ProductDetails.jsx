import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import API_URL from "../config/api";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    fetch(`${API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((data) => {

        setProduct(data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, [id]);

  async function handleAddToCart() {

    const userId = localStorage.getItem("userId");

    if (!userId) {

      alert("Please login first.");

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

        alert(data.message);

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  }

  if (!product) {

    return (

      <>

        <Navbar />

        <h2
          style={{
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          Loading...
        </h2>

        <Footer />

      </>

    );

  }

  return (

    <>

      <Navbar />

      <section className="product-details">

        <div className="product-image">

          <img
            src={`${API_URL}/images/${product.image}`}
            alt={product.name}
          />

        </div>

        <div className="product-info">

          <h1>{product.name}</h1>

          <h3>{product.brand}</h3>

          <h2>₹{product.price}</h2>

          <p>
            ⭐ {product.rating}
          </p>

          <p>
            Stock : {product.stock}
          </p>

          <button
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default ProductDetails;