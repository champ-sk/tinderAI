import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photourl, age, gender, about, skills } = user;
  const dispatch = useDispatch();
  const [swipeDir, setSwipeDir] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRequest = async (status) => {
    if (isAnimating) return;
    setSwipeDir(status === "interested" ? "right" : "left");
    setIsAnimating(true);
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => {
      dispatch(removeUserFromFeed(_id));
      setIsAnimating(false);
      setSwipeDir(null);
    }, 450);
  };

  return (
    <>
      <style>{`
        .card-wrap {
          width: 360px;
          max-width: 95vw;
          border-radius: 24px;
          overflow: hidden;
          background: #0f0f1a;
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(139, 92, 246, 0.05);
          transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      opacity 0.45s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .card-wrap.swipe-right {
          transform: translateX(140%) rotate(18deg);
          opacity: 0;
        }
        .card-wrap.swipe-left {
          transform: translateX(-140%) rotate(-18deg);
          opacity: 0;
        }

        /* Image section */
        .card-img-wrap {
          position: relative;
          height: 340px;
          overflow: hidden;
          background: #1a1a2e;
        }
        .card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .card-wrap:hover .card-img-wrap img {
          transform: scale(1.03);
        }
        .card-img-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 65%;
          background: linear-gradient(
            to top,
            #0f0f1a 0%,
            rgba(15, 15, 26, 0.6) 50%,
            transparent 100%
          );
        }
        .card-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(139, 92, 246, 0.85);
          backdrop-filter: blur(8px);
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.15);
        }

        /* Swipe hint labels */
        .hint-connect {
          position: absolute;
          top: 24px;
          left: 18px;
          background: rgba(34, 197, 94, 0.9);
          color: white;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: 2px solid rgba(255,255,255,0.3);
          opacity: 0;
          transition: opacity 0.15s;
        }
        .hint-pass {
          position: absolute;
          top: 24px;
          right: 18px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: 2px solid rgba(255,255,255,0.3);
          opacity: 0;
          transition: opacity 0.15s;
        }
        .swipe-right .hint-connect { opacity: 1; }
        .swipe-left  .hint-pass    { opacity: 1; }

        /* Body */
        .card-body {
          padding: 20px 22px 24px;
        }
        .card-name {
          font-size: 22px;
          font-weight: 700;
          color: #f4f4f8;
          letter-spacing: -0.4px;
          margin-bottom: 5px;
        }
        .card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a78bfa;
          font-size: 13px;
          margin-bottom: 12px;
        }
        .card-meta-dot {
          width: 3px;
          height: 3px;
          background: #4b5563;
          border-radius: 50%;
        }
        .card-about {
          color: #9ca3af;
          font-size: 14px;
          line-height: 1.55;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Skills */
        .skills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .skill-tag {
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.25);
          color: #c4b5fd;
          padding: 4px 11px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        /* Divider */
        .card-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin-bottom: 18px;
        }

        /* Action buttons */
        .action-row {
          display: flex;
          gap: 12px;
        }
        .action-btn {
          flex: 1;
          padding: 13px 10px;
          border-radius: 14px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          letter-spacing: 0.2px;
          font-family: 'DM Sans', sans-serif;
        }
        .action-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .action-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.97);
        }
        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-pass {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #9ca3af;
        }
        .btn-pass:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }
        .btn-connect {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          box-shadow: 0 4px 18px rgba(139, 92, 246, 0.4);
        }
        .btn-connect:hover:not(:disabled) {
          box-shadow: 0 6px 26px rgba(139, 92, 246, 0.6);
        }
      `}</style>

      <div
        className={`card-wrap ${
          swipeDir === "right"
            ? "swipe-right"
            : swipeDir === "left"
            ? "swipe-left"
            : ""
        }`}
      >
        {/* Image */}
        <div className="card-img-wrap">
          <img
            src={
              photourl ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt={`${firstName}'s photo`}
            onError={(e) => {
              e.target.src =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
            }}
          />
          <div className="card-img-overlay" />
          <span className="card-badge">🤖 AI Builder</span>

          {/* Swipe hint labels */}
          <span className="hint-connect">✓ Connect</span>
          <span className="hint-pass">✕ Pass</span>
        </div>

        {/* Body */}
        <div className="card-body">

          {/* Name */}
          <div className="card-name">
            {firstName} {lastName}
          </div>

          {/* Meta */}
          {(age || gender) && (
            <div className="card-meta">
              {age && <span>📅 {age} yrs</span>}
              {age && gender && <span className="card-meta-dot" />}
              {gender && <span>👤 {gender}</span>}
            </div>
          )}

          {/* About */}
          {about && <p className="card-about">{about}</p>}

          {/* Skills */}
          <div className="skills-row">
            {(skills?.length > 0 ? skills : ["AI Enthusiast"])
              .slice(0, 4)
              .map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
          </div>

          <div className="card-divider" />

          {/* Action Buttons */}
          <div className="action-row">
            <button
              className="action-btn btn-pass"
              onClick={() => handleRequest("ignored")}
              disabled={isAnimating}
            >
              ✕ Pass
            </button>
            <button
              className="action-btn btn-connect"
              onClick={() => handleRequest("interested")}
              disabled={isAnimating}
            >
              ♥ Connect
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserCard;