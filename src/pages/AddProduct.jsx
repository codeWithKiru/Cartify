import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import "./AddProduct.css";

function AddProduct() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !name ||
      !category ||
      !brand ||
      !price ||
      !rating ||
      !stock ||
      !image
    ) {

      alert("Please fill all fields.");

      return;

    }

    try {

      // ==========================
      // Upload Image
      // ==========================

      const formData = new FormData();

      formData.append("image", image);

      const uploadResponse = await fetch(
        `${API_URL}/upload`,
        {

          method: "POST",

          body: formData,

        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {

        alert(uploadData.message);

        return;

      }

      // ==========================
      // Save Product
      // ==========================

      const response = await fetch(
        `${API_URL}/products`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            name,
            category,
            brand,
            price: Number(price),
            rating: Number(rating),
            stock: Number(stock),
            image: uploadData.filename

          }),

        }
      );

      const data = await response.json();

      if (response.ok) {

        alert(data.message);

        navigate("/admin/products");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  }

  return (

    <div className="add-product">

      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>

  );

}

export default AddProduct;