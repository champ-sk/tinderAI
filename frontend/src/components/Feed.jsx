import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      if (feed) return;
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (err) {
        console.error(err);
      }
    };
    getFeed();
  }, []);

  // ── Loading state ──────────────────────────────
  if (!feed) {
    return (
      <>
        <style>{`
          .feed-page {
            min-height: calc(100vh - 64px);
            background: #080810;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'DM Sans', sans-serif;
          }
          .skeleton-card {
            width: 360px;
            max-width: 95vw;
            border-radius: 24px;
            overflow: hidden;
            background: #0f0f1a;
            border: 1px solid rgba(139, 92, 246, 0.1);
          }
          .skeleton-img {
            height: 340px;
            background: linear-gradient(
              90deg,
              #0f0f1a 25%,
              #1a1a2e 50%,
              #0f0f1a 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          .skeleton-body { padding: 22px; }
          .skeleton-line {
            border-radius: 8px;
            background: linear-gradient(
              90deg,
              #0f0f1a 25%,
              #1a1a2e 50%,
              #0f0f1a 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            margin-bottom: 12px;
          }
          @keyframes shimmer {
            0%   { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        <div className="feed-page">
          <div className="skeleton-card">
            <div className="skeleton-img" />
            <div className="skeleton-body">
              <div className="skeleton-line" style={{ height: 24, width: "60%" }} />
              <div className="skeleton-line" style={{ height: 14, width: "40%" }} />
              <div className="skeleton-line" style={{ height: 14, width: "80%" }} />
              <div className="skeleton-line" style={{ height: 14, width: "65%" }} />
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Empty state ────────────────────────────────
  if (feed.length === 0) {
    return (
      <>
        <style>{`
          .feed-page {
            min-height: calc(100vh - 64px);
            background: #080810;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'DM Sans', sans-serif;
            padding: 20px;
          }
          .empty-card {
            background: #0f0f1a;
            border: 1px solid rgba(139, 92, 246, 0.15);
            border-radius: 24px;
            padding: 60px 40px;
            text-align: center;
            max-width: 400px;
            width: 100%;
            animation: fadeInUp 0.4s ease forwards;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .empty-emoji {
            font-size: 56px;
            margin-bottom: 20px;
            display: block;
            animation: float 3s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-10px); }
          }
          .empty-title {
            font-size: 22px;
            font-weight: 700;
            color: #f4f4f8;
            margin-bottom: 10px;
            letter-spacing: -0.3px;
          }
          .empty-text {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 28px;
          }
          .empty-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(139, 92, 246, 0.1);
            border: 1px solid rgba(139, 92, 246, 0.2);
            color: #a78bfa;
            padding: 8px 18px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
          }
        `}</style>
        <div className="feed-page">
          <div className="empty-card">
            <span className="empty-emoji">🤖</span>
            <div className="empty-title">You've seen everyone!</div>
            <p className="empty-text">
              No more AI builders to discover right now.
              Check back later — new members join every day.
            </p>
            <span className="empty-badge">
              ⚡ Come back tomorrow
            </span>
          </div>
        </div>
      </>
    );
  }

  // ── Main feed ──────────────────────────────────
  return (
    <>
      <style>{`
        .feed-page {
          min-height: calc(100vh - 64px);
          background: #080810;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          padding: 32px 20px;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow behind card */
        .feed-page::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, 0.07),
            transparent 70%
          );
          pointer-events: none;
        }

        .feed-header {
          text-align: center;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .feed-title {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .feed-count {
          display: inline-block;
          margin-top: 6px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          color: #a78bfa;
          padding: 3px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .card-container {
          position: relative;
          z-index: 1;
          animation: cardEntrance 0.4s ease forwards;
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .feed-hint {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 24px;
          position: relative;
          z-index: 1;
        }
        .hint-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #4b5563;
        }
        .hint-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .hint-dot.pass    { background: #ef4444; opacity: 0.6; }
        .hint-dot.connect { background: #a855f7; opacity: 0.6; }
      `}</style>

      <div className="feed-page">

        {/* Header */}
        <div className="feed-header">
          <div className="feed-title">Discover AI Builders</div>
          <span className="feed-count">
            {feed.length} {feed.length === 1 ? "person" : "people"} to explore
          </span>
        </div>

        {/* Card */}
        <div className="card-container" key={feed[0]._id}>
          <UserCard user={feed[0]} />
        </div>

        {/* Bottom hints */}
        <div className="feed-hint">
          <span className="hint-item">
            <span className="hint-dot pass" /> Pass to skip
          </span>
          <span className="hint-item">
            <span className="hint-dot connect" /> Connect to match
          </span>
        </div>

      </div>
    </>
  );
};

export default Feed;