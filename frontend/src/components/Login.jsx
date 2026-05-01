import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login fields
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  // Signup extra fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailID: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailID: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") isLoginForm ? handleLogin() : handleSignUp();
  };

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          background: #080810;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        /* Background blobs */
        .login-page::before {
          content: '';
          position: absolute;
          top: -120px;
          left: -120px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.12), transparent 70%);
          pointer-events: none;
        }
        .login-page::after {
          content: '';
          position: absolute;
          bottom: -120px;
          right: -120px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.1), transparent 70%);
          pointer-events: none;
        }

        .login-card {
          background: #0f0f1a;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 24px;
          padding: 48px 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.4s ease forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Logo */
        .login-logo {
          font-family: 'Space Mono', monospace;
          font-size: 30px;
          font-weight: 700;
          color: #a78bfa;
          text-align: center;
          letter-spacing: -1px;
          margin-bottom: 6px;
        }
        .login-tagline {
          text-align: center;
          color: #4b5563;
          font-size: 13px;
          margin-bottom: 36px;
          letter-spacing: 0.3px;
        }

        /* Tab switcher */
        .tab-switcher {
          display: flex;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 28px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .tab-btn {
          flex: 1;
          padding: 9px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .tab-btn.tab-active {
          background: rgba(139, 92, 246, 0.2);
          color: #a78bfa;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
        }

        /* Form fields */
        .form-row {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 16px;
          flex: 1;
        }
        .form-label {
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .form-input {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px 16px;
          color: #f4f4f8;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s;
          width: 100%;
        }
        .form-input:focus {
          border-color: rgba(139, 92, 246, 0.5);
          background: rgba(139, 92, 246, 0.05);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        .form-input::placeholder {
          color: #374151;
        }

        /* Error */
        .error-box {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #fca5a5;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 16px;
        }

        /* Submit button */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
          margin-top: 4px;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(139, 92, 246, 0.5);
        }
        .submit-btn:active:not(:disabled) {
          transform: translateY(0px);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Spinner */
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Footer note */
        .login-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #374151;
        }

        @media (max-width: 480px) {
          .login-card { padding: 36px 24px; }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">

          {/* Logo */}
          <div className="login-logo">⚡ TinderAI</div>
          <div className="login-tagline">Connect with AI builders worldwide</div>

          {/* Tab Switcher */}
          <div className="tab-switcher">
            <button
              className={`tab-btn ${isLoginForm ? "tab-active" : ""}`}
              onClick={() => { setIsLoginForm(true); setError(""); }}
            >
              Sign In
            </button>
            <button
              className={`tab-btn ${!isLoginForm ? "tab-active" : ""}`}
              onClick={() => { setIsLoginForm(false); setError(""); }}
            >
              Create Account
            </button>
          </div>

          {/* Signup Extra Fields */}
          {!isLoginForm && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Shubham"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Agrawal"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Error Message */}
          {error && <div className="error-box">⚠️ {error}</div>}

          {/* Submit */}
          <button
            className="submit-btn"
            onClick={isLoginForm ? handleLogin : handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <><div className="spinner" /> {isLoginForm ? "Signing in..." : "Creating account..."}</>
            ) : (
              isLoginForm ? "Sign In →" : "Create Account →"
            )}
          </button>

          <div className="login-footer">
            By continuing, you agree to our Terms of Service
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;