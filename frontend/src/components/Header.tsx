import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaUser, FaSignInAlt } from "react-icons/fa";

interface Props {
    isAuthenticated?: boolean;
    user?: {
      role: string;
    };
  }

const Header = ({ isAuthenticated = true   , user }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const logoutHandler = () => {
    // Add logout logic here
    setOpenDialog(false);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <nav className="h-14 bg-white shadow-md sticky top-0 z-50">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Left section - Logo/Home */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-500 hover:text-blue-600"
        >
         <img src="/logo.svg" alt="logo" className="w-32" />
        </Link>

        {/* Right section - Icons */}
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <Link to="/search" className="text-gray-600 hover:text-gray-800">
            <FaSearch size={20} />
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="text-gray-600 hover:text-gray-800 relative"
          >
            <FaShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          {/* User/Login Icon */}
          {isAuthenticated ? (
            <FaUser onClick={() => setOpenDialog(prev=>!prev)} />
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              <FaSignInAlt size={20} />
            </Link>
          )}
          {openDialog && (
            <div className="bg-white absolute top-14 right-5 dark:bg-white w-48 shadow-lg p-0 overflow-hidden">
              <div className="py-2">
                {user?.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100 flex items-center gap-2 w-full"
                    onClick={closeDialog}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/orders"
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100 flex items-center gap-2 w-full"
                  onClick={closeDialog}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    logoutHandler();
                    closeDialog();
                  }}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100 flex items-center gap-2 w-full text-red-500"
                >
                  Logout
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
