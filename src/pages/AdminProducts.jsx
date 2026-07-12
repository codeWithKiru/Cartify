import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import "./AdminProducts.css";

function AdminProducts() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    loadProducts();

  }, []);

  function loadProducts() {

    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {

        setProducts(data);

      })
      .catch((error) => {

        console.error(error);

      });

  }

  async function deleteProduct(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {

      return;

    }

    try {

      const response = await fetch(

        `${API_URL}/products/${id}`,

        {
          method: "DELETE",
        }

      );

      const data = await response.json();

      if (response.ok) {

        alert(data.message);

        loadProducts();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  }

  return (

    <div className="admin-products">

      <div className="top-bar">

        <h1>Manage Products</h1>

        <Link to="/admin/add-product">

          <button className="add-btn">

            + Add Product

          </button>

        </Link>

      </div>

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Image</th>

            <th>Name</th>

            <th>Category</th>

            <th>Brand</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td>{product.id}</td>

              <td>

                <img
                  src={`${API_URL}/images/${product.image}`}
                  alt={product.name}
                  width="70"
                />

              </td>

              <td>{product.name}</td>

              <td>{product.category}</td>

              <td>{product.brand}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>

                <button
                  onClick={() =>
                    navigate(`/admin/edit-product/${product.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminProducts;