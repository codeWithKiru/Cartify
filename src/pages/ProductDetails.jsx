import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../Navbar";
import Footer from "../Footer";
import API_URL from "../config/api";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => {

    loadProduct();
    loadReviews();

  }, [id]);

  function loadProduct() {

    fetch(`${API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((data) => {

        setProduct(data);

      })
      .catch((error) => {

        console.error(error);
        toast.error("Failed to load product.");

      });

  }

  function loadReviews() {

    fetch(`${API_URL}/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {

        setReviews(data.reviews);
        setAverageRating(data.average_rating);
        setTotalReviews(data.total_reviews);

      })
      .catch((error) => {

        console.error(error);
        toast.error("Failed to load reviews.");

      });

  }

  async function handleAddToCart() {

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

  async function submitReview() {

    const userId = localStorage.getItem("userId");

    if (!userId) {

      toast.warning("Please login first.");

      return;

    }

    if (review.trim() === "") {

      toast.warning("Please enter your review.");

      return;

    }

    try {

      const response = await fetch(

        `${API_URL}/reviews`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            user_id: Number(userId),

            product_id: Number(id),

            rating,

            review

          })

        }

      );

      const data = await response.json();

      if (response.ok) {

        toast.success(data.message);

        setReview("");
        setRating(5);

        loadReviews();

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

  if (!product) {

    return (

      <>

        <Navbar />

        <h2
          style={{
            textAlign: "center",
            marginTop: "100px"
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

            ⭐ {totalReviews > 0 ? averageRating : product.rating}

            {" "}({totalReviews} Reviews)

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

      <section className="reviews-section">

        <h2>

          Customer Reviews

        </h2>

        <div className="review-form">

          <h3>

            Write a Review

          </h3>

          <label>

            Rating

          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
          >

            <option value={5}>★★★★★ (5)</option>
            <option value={4}>★★★★☆ (4)</option>
            <option value={3}>★★★☆☆ (3)</option>
            <option value={2}>★★☆☆☆ (2)</option>
            <option value={1}>★☆☆☆☆ (1)</option>

          </select>

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
          />

          <button
            onClick={submitReview}
          >
            Submit Review
          </button>

        </div>

        <div className="reviews-list">

          {

            reviews.length === 0 ?

              (

                <h3>

                  No Reviews Yet.

                </h3>

              )

              :

              (

                reviews.map((item) => (

                  <div
                    className="review-card"
                    key={item.id}
                  >

                    <h3>

                      {item.name}

                    </h3>

                    <p>

                      {"⭐".repeat(item.rating)}

                    </p>

                    <p>

                      {item.review}

                    </p>

                    <small>

                      {new Date(item.created_at).toLocaleDateString()}

                    </small>

                  </div>

                ))

              )

          }

        </div>

      </section>

      <Footer />

    </>

  );

}

export default ProductDetails;