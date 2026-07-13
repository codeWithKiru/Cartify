import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar({

  cartCount = 0,

  wishlistCount = 0

}) {

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("userId");

  function logout() {

    localStorage.removeItem("userId");

    navigate("/login");

  }

  return (

    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        🛒 Cartify
      </Link>

      <ul className="nav-links">

        <li>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

        </li>

        <li>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Products
          </NavLink>

        </li>

        <li>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Wishlist

            {

              wishlistCount > 0 && (

                <span className="badge">

                  {wishlistCount}

                </span>

              )

            }

          </NavLink>

        </li>

        <li>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Cart

            {

              cartCount > 0 && (

                <span className="badge">

                  {cartCount}

                </span>

              )

            }

          </NavLink>

        </li>

        {

          isLoggedIn ? (

            <>

              <li>

                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive ? "active" : ""
                  }
                >
                  My Orders
                </NavLink>

              </li>

              <li>

                <button
                  className="logout-nav"
                  onClick={logout}
                >
                  Logout
                </button>

              </li>

            </>

          ) : (

            <li>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Login
              </NavLink>

            </li>

          )

        }

        <li>

          <NavLink
            to="/admin-login"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Admin
          </NavLink>

        </li>

      </ul>

    </nav>

  );

}

export default Navbar;