import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Default to false for non-admin

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.isAdmin === true); // Set isAdmin based on user data
    }
  }, []);

  const handleToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAdmin(false);
    navigate("/");
  };

  const navItems = [
    { path: "/", title: "Start a search", key: "start-search" },
    { path: "/salary", title: "Salary Estimate", key: "salary-estimate" },
    { path: "/applied-for", title: "Application", key: "application" },
  ];

  // Only show admin-related nav items if user is admin
  if (isAdmin) {
    navItems.push(
      { path: "/post-job", title: "Post Jobs", key: "post-jobs" },
      { path: "/admin-dashboard", title: "Dashboard", key: "admin-dashboard" },
      { path: "/my-job", title: "My Jobs", key: "my-jobs" }
    );
  }

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JobPortal</span>
        </a>
        {/* Nav items for larger devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title, key }) => (
            <li key={key} className="text-base text-black py-1">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* User profile or login/signup buttons */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {user ? (
            <>
              <span className="text-black">
                {user.FirstName} {user.LastName}
              </span>
              <button
                className="py-2 px-5 border rounded bg-red-500 text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="py-2 px-5 border rounded">
                Login
              </Link>
              <Link
                to={"/signup"}
                className="py-2 px-5 border rounded bg-blue-500 text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Menu button for smaller devices */}
        <div className="md:hidden block">
          <button onClick={handleToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>
      {/* Nav items for smaller devices */}
      <div
        className={`px-4 bg-black text-white py-5 rounded-sm ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white py-1">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        {user ? (
          <li className="text-white py-1">
            {user.FirstName} {user.LastName}
          </li>
        ) : (
          <>
            <li className="text-white py-1">
              <Link to={"/login"}>Login</Link>
            </li>
            <li className="text-white py-1">
              <Link to={"/signup"}>Signup</Link>
            </li>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
