import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="nav-link">Home</Link>
        {user && <Link to={`/profile/${user._id}`} className="nav-link">Profile</Link>}
      </div>
      <div>
        {user ? (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}