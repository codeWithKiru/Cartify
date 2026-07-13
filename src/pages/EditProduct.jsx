import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import API_URL from "../config/api";
import "./AddProduct.css";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");

  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {

    fetch(`${API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((data) => {

        setName(data.name);
        setCategory(data.category);
        setBrand(data.brand);
        setPrice(data.price);
        setRating(data.rating);
        setStock(data.stock);
        setOldImage(data.image);

      })
      .catch((error) => {

        console.error(error);

        toast.error("Failed to load product.");

      });

  }, [id]);

  async function updateProduct(e) {

    e.preventDefault();

    let imageName = oldImage;

    try {

      // ==========================
      // Upload New Image
      // ==========================

      if (newImage) {

        const formData = new FormData();

        formData.append("image", newImage);

        const uploadResponse = await fetch(

          `${API_URL}/upload`,

          {

            method: "POST",

            body: formData

          }

        );

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {

          toast.error(uploadData.message);

          return;

        }

        imageName = uploadData.filename;

      }

      // ==========================
      // Update Product
      // ==========================

      const response = await fetch(

        `${API_URL}/products/${id}`,

        {

          method: "PUT",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            name,

            category,

            brand,

            price: Number(price),

            rating: Number(rating),

            stock: Number(stock),

            image: imageName

          })

        }

      );

      const data = await response.json();

      if (response.ok) {

        toast.success(data.message);

        navigate("/admin/products");

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

  return (

    <div className="add-product">

      <h1>

        Edit Product

      </h1>

      <form onSubmit={updateProduct}>

        <input

          type="text"

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

          placeholder="Product Name"

        />

        <input

          type="text"

          value={category}

          onChange={(e) =>
            setCategory(e.target.value)
          }

          placeholder="Category"

        />

        <input

          type="text"

          value={brand}

          onChange={(e) =>
            setBrand(e.target.value)
          }

          placeholder="Brand"

        />

        <input

          type="number"

          value={price}

          onChange={(e) =>
            setPrice(e.target.value)
          }

          placeholder="Price"

        />

        <input

          type="number"

          step="0.1"

          value={rating}

          onChange={(e) =>
            setRating(e.target.value)
          }

          placeholder="Rating"

        />

        <input

          type="number"

          value={stock}

          onChange={(e) =>
            setStock(e.target.value)
          }

          placeholder="Stock"

        />

        <div
          style={{
            marginBottom: "15px"
          }}
        >

          <p>

            <strong>

              Current Image

            </strong>

          </p>

          <img

            src={`${API_URL}/images/${oldImage}`}

            alt="Current Product"

            width="150"

          />

        </div>

        <input

          type="file"

          accept="image/*"

          onChange={(e) =>
            setNewImage(e.target.files[0])
          }

        />

        <button type="submit">

          Update Product

        </button>

      </form>

    </div>

  );

}

export default EditProduct;