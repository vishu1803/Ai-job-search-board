import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <nav className="flex gap-6">
            <Link to="/" className="text-lg font-semibold hover:text-gray-200">
              Home
            </Link>
            {token && (
              <>
                <Link
                  to="/dashboard"
                  className="text-lg font-semibold hover:text-gray-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/post-job"
                  className="text-lg font-semibold hover:text-gray-200"
                >
                  Post Job
                </Link>
                <Link
                  to="/admin"
                  className="text-lg font-semibold hover:text-gray-200"
                >
                  Admin Panel
                </Link>
                <Link
                  to="/chat"
                  className="text-lg font-semibold hover:text-gray-200"
                >
                  Live Chat
                </Link>
              </>
            )}
          </nav>
          <div>
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 mr-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
