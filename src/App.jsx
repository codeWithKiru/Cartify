import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ScrollToTop from "./ScrollToTop";

function App() {

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  function addToCart(product) {

    const existingProduct = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);

    }

  }

  function increaseQuantity(id) {

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  }

  function decreaseQuantity(id) {

    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  }

  function removeFromCart(indexToRemove) {

    setCartItems(
      cartItems.filter(
        (_, index) => index !== indexToRemove
      )
    );

  }

  function toggleWishlist(product) {

    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (exists) {

      setWishlistItems(
        wishlistItems.filter(
          (item) => item.id !== product.id
        )
      );

    } else {

      setWishlistItems([
        ...wishlistItems,
        product,
      ]);

    }

  }

  return (

    <BrowserRouter>

      <ScrollToTop />

      <Routes>

        {/* ===========================
             CUSTOMER ROUTES
        =========================== */}

        <Route
          path="/"
          element={
            <Home
              cartItems={cartItems}
              wishlistItems={wishlistItems}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/products"
          element={
            <Products
              cartItems={cartItems}
              wishlistItems={wishlistItems}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              cartItems={cartItems}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart
                cartItems={cartItems}
                wishlistItems={wishlistItems}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist
                cartItems={cartItems}
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout
                cartItems={cartItems}
                wishlistItems={wishlistItems}
              />
            </ProtectedRoute>
          }
        />

        {/* NEW PAYMENT ROUTE */}

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* ===========================
             ADMIN ROUTES
        =========================== */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminProducts />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminProtectedRoute>
              <AddProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminProtectedRoute>
              <EditProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminUsers />
            </AdminProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;