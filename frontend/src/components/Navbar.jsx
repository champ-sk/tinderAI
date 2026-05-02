import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const navLinks = [
    { to: "/", label: "Discover", icon: "⚡" },
    { to: "/connections", label: "Connections", icon: "🤝" },
    { to: "/requests", label: "Requests", icon: "📬" },
  ];

  return (
    <>
      <style>{`
        .navbar-root {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(8, 8, 16, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.12);
          padding: 0 28px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Space Mono', monospace;
          font-size: 18px;
          font-weight: 700;
          color: #a78bfa;
          text-decoration: none;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .nav-logo:hover { color: #c4b5fd; }

        .nav-center {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 10px;
          color: #9ca3af;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #f4f4f8;
        }
        .nav-link.active {
          background: rgba(139, 92, 246, 0.15);
          color: #a78bfa;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .nav-greeting {
          font-size: 13px;
          color: #6b7280;
        }
        .nav-greeting strong {
          color: #d8b4fe;
          font-weight: 600;
        }

        /* Avatar + Dropdown */
        .avatar-wrapper {
          position: relative;
        }
        .avatar-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(139, 92, 246, 0.4);
          overflow: hidden;
          cursor: pointer;
          background: #1f1f30;
          transition: border-color 0.2s, transform 0.2s;
        }
        .avatar-btn:hover {
          border-color: #a78bfa;
          transform: scale(1.05);
        }
        .avatar-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: #0f0f1a;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 14px;
          padding: 8px;
          min-width: 190px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: all 0.2s ease;
        }
        .dropdown-open .dropdown-menu {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          color: #9ca3af;
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #f4f4f8;
        }
        .dropdown-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.07);
          margin: 6px 0;
        }
        .logout-item:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #fca5a5;
        }

        @media (max-width: 640px) {
          .nav-center { display: none; }
          .nav-greeting { display: none; }
          .navbar-root { padding: 0 16px; }
        }
      `}</style>

      <nav className="navbar-root">

        {/* LEFT — Logo */}
        <Link to="/" className="nav-logo">
          ⚡ TinderAI
        </Link>

        {/* CENTER — Nav Links (only when logged in) */}
        {user && (
          <div className="nav-center">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${location.pathname === to ? "active" : ""}`}
              >
                <span>{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* RIGHT — Avatar or Sign In */}
        {user ? (
          <div className="nav-right">
            <span className="nav-greeting">
              Hi, <strong>{user?.firstName}</strong>
            </span>

            <div
              className={`avatar-wrapper ${menuOpen ? "dropdown-open" : ""}`}
            >
              <div
                className="avatar-btn"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img
                  src={
                    user?.photourl ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="avatar"
                  onError={(e) => {
                    e.target.src =
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                  }}
                />
              </div>

              <div className="dropdown-menu">
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setMenuOpen(false)}
                >
                  👤 Profile
                </Link>
                <Link
                  to="/connections"
                  className="dropdown-item"
                  onClick={() => setMenuOpen(false)}
                >
                  🤝 Connections
                </Link>
                <Link
                  to="/requests"
                  className="dropdown-item"
                  onClick={() => setMenuOpen(false)}
                >
                  📬 Requests
                </Link>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            style={{
              color: "#a78bfa",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              padding: "8px 16px",
              background: "rgba(139,92,246,0.1)",
              borderRadius: "10px",
              border: "1px solid rgba(139,92,246,0.25)",
              transition: "all 0.2s",
            }}
          >
            Sign In →
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navbar;