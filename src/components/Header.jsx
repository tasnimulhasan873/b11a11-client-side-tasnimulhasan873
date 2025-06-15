import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthC";


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
      <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold underline" : "")}>Home</NavLink>
      <NavLink to="/available-foods" className={({ isActive }) => (isActive ? "font-bold underline" : "")}>Available Foods</NavLink>
      {user && (
        <>
          <NavLink to="/add-food" className={({ isActive }) => (isActive ? "font-bold underline" : "")}>Add Food</NavLink>
          <NavLink to="/manage-foods" className={({ isActive }) => (isActive ? "font-bold underline" : "")}>Manage My Foods</NavLink>
          <NavLink to="/my-requests" className={({ isActive }) => (isActive ? "font-bold underline" : "")}>My Food Request</NavLink>
        </>
      )}
      {!user && (
        <>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "font-bold underline" : "")}>Login</NavLink>
          <NavLink to="/signup" className={({ isActive }) => (isActive ? "font-bold underline" : "")}>Signup</NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-green-200 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={''} alt="Logo" className="w-8 h-8 object-cover" />
          <span className="text-xl font-bold text-green-800">Food Share</span>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 items-center text-green-700">
          {navLinks}
        </ul>

        {user && (
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group cursor-pointer" onClick={() => setShowLogout(!showLogout)}>
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-green-700"
                title={user.displayName}
              />
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-sm bg-white text-gray-800 border rounded px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition pointer-events-none">
                {user.displayName}
              </div>
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="absolute top-1 right-2/3 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded shadow"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 text-green-800">
          <ul className="flex flex-col space-y-2">{navLinks}</ul>

          {user && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowLogout(!showLogout)}>
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-green-700"
                  title={user.displayName}
                />
                <span>{user.displayName}</span>
              </div>
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded shadow"
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