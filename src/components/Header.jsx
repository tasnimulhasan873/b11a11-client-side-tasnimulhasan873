import { useContext, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthC";
import logo from "../assets/logo.png";

const Header = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signoutUser();
      setShowLogout(false);
      setMenuOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-orange-600 underline"
            : "hover:text-orange-500"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/available-foods"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-orange-600 underline"
            : "hover:text-orange-500"
        }
      >
        Available Foods
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/add-food"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-orange-600 underline"
                : "hover:text-orange-500"
            }
          >
            Add Food
          </NavLink>
          <NavLink
            to="/manage-foods"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-orange-600 underline"
                : "hover:text-orange-500"
            }
          >
            Manage My Foods
          </NavLink>
          <NavLink
            to="/requested-foods"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-orange-600 underline"
                : "hover:text-orange-500"
            }
          >
            My Requests
          </NavLink>
        </>
      )}
      {!user && (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-orange-600 underline"
                : "hover:text-orange-500"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-orange-600 underline"
                : "hover:text-orange-500"
            }
          >
            Signup
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-yellow-200 via-orange-100 to-yellow-200 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-45 h-20 rounded-full shadow"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-700">
            
          </h1>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center text-orange-700 text-lg font-semibold">
          {navLinks}
        </ul>

        {/* Right Side */}
        <div className="relative flex items-center gap-3" ref={dropdownRef}>
          {user && (
            <>
              <img
                src={user.photoURL}
                alt="User"
                onClick={() => setShowLogout(!showLogout)}
                className="w-10 h-10 rounded-full border-2 border-orange-500 cursor-pointer"
              />
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="absolute top-12 right-0 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded shadow"
                >
                  Logout
                </button>
              )}
            </>
          )}

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-orange-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-50 border-t border-orange-300 px-4 py-3">
          <ul className="flex flex-col space-y-3 text-orange-700 text-lg font-semibold">
            {navLinks}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
