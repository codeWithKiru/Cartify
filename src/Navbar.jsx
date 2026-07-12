import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar({
  cartCount = 0,
  wishlistCount = 0,
}) {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    alert("Logged out successfully!");

    navigate("/login");

  }

  return (

    <header className="navbar">

      <Link
        to="/"
        className="logo"
      >
        🛒 Cartify
      </Link>

      <div className="search-container">

        <input
          type="text"
          placeholder="Search products..."
        />

      </div>

      <nav>

        <ul className="nav-links">

          <li>

            <Link to="/">
              Home
            </Link>

          </li>

          <li>

            <Link to="/products">
              Products
            </Link>

          </li>

          {token && (

            <li>

              <Link to="/orders">
                📦 My Orders
              </Link>

            </li>

          )}

          <li>

            <Link to="/wishlist">
              ❤️ Wishlist ({wishlistCount})
            </Link>

          </li>

          <li>

            <Link to="/cart">
              🛒 Cart ({cartCount})
            </Link>

          </li>

          {token ? (

            <li>

              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                👤 Logout
              </button>

            </li>

          ) : (

            <li>

              <Link to="/login">
                👤 Login
              </Link>

            </li>

          )}

        </ul>

      </nav>

    </header>

  );

}

export default Navbar;