import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-400">
            Twitter Clone
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-gray-300 hover:text-blue-400 transition">
                <FaHome className="text-xl" />
              </Link>
              <Link to={`/profile/${user._id}`} className="text-gray-300 hover:text-blue-400 transition">
                <FaUser className="text-xl" />
              </Link>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-blue-400 transition"
              >
                <FaSignOutAlt className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;