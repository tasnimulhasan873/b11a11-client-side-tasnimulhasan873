import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthC";
import logo from '../assets/logo.png';

const Header = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signoutUser()
      .then(() => setShowLogout(false))
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "font-semibold underline text-orange-600" : "hover:text-orange-500 transition"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/available-foods"
        className={({ isActive }) =>
          isActive ? "font-semibold underline text-orange-600" : "hover:text-orange-500 transition"
        }
      >
        Available Foods
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/add-food"
            className={({ isActive }) =>
              isActive ? "font-semibold underline text-orange-600" : "hover:text-orange-500 transition"
            }
          >
            Add Food
          </NavLink>
          <NavLink
            to="/manage-foods"
            className={({ isActive }) =>
              isActive ? "font-semibold underline text-orange-600" : "hover:text-orange-500 transition"
            }
          >
            Manage My Foods
          </NavLink>
          <NavLink
            to="/my-requests"
            className={({ isActive }) =>
              isActive ? "font-semibold underline text-orange-600" : "hover:text-orange-500 transition"
            }
          >
            My Food Requests
          </NavLink>
        </>
      )}
      {!user && (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "font-semibold underline text-orange-600" : "hover:text-orange-500 transition"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "font-semibold underline text-orange-600" : "hover:text-orange-500 transition"
            }
          >
            Signup
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-yellow-200 via-orange-100 to-yellow-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="FoodShare Logo"
            className="w-55 h-20 object-cover rounded-full shadow-md"
          />
          <h1 className="text-2xl font-extrabold text-orange-700 select-none tracking-wide">
           
          </h1>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 text-orange-700 text-lg font-medium items-center">
          {navLinks}
        </ul>

        {/* User Avatar & Logout desktop */}
        {user && (
          <div className="hidden md:flex items-center space-x-4 relative">
            <div
              className="cursor-pointer group"
              onClick={() => setShowLogout(!showLogout)}
              tabIndex={0}
              onBlur={() => setShowLogout(false)}
            >
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-11 h-11 rounded-full border-2 border-orange-600 shadow-md"
                title={user.displayName}
              />
              <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-orange-200 text-orange-800 text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                {user.displayName}
              </span>
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded px-4 py-1 shadow-lg z-10"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-orange-700 hover:text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded"
          >
            {menuOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-50 border-t border-orange-300 shadow-inner px-6 py-4 space-y-4 text-orange-700 font-medium text-lg">
          <ul className="flex flex-col space-y-3">{navLinks}</ul>

          {user && (
            <div className="mt-4 border-t border-orange-300 pt-4">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setShowLogout(!showLogout)}
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-full border-2 border-orange-600 shadow-md"
                  title={user.displayName}
                />
                <span className="font-semibold">{user.displayName}</span>
              </div>
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold shadow-md"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
