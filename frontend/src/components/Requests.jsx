import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const respondRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/respond/" + requestId + "/" + status,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/recieved", {
          withCredentials: true,
        });
        dispatch(addRequests(res.data.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, []);

  // ── Loading ────────────────────────────────────
  if (!requests) {
    return (
      <>
        <style>{`
          .req-page {
            min-height: calc(100vh - 64px);
            background: #080810;
            font-family: 'DM Sans', sans-serif;
            padding: 40px 20px;
          }
          .req-list { max-width: 640px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
          .skel {
            border-radius: 8px;
            background: linear-gradient(
              90deg, #0f0f1a 25%, #1a1a2e 50%, #0f0f1a 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          @keyframes shimmer {
            0%   { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .req-card-skel {
            background: #0f0f1a;
            border: 1px solid rgba(139,92,246,0.1);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .skel-circle { width: 54px; height: 54px; border-radius: 50%; flex-shrink: 0; }
          .skel-lines { flex: 1; }
          .skel-btns { display: flex; gap: 8px; }
          .skel-btn { width: 60px; height: 36px; border-radius: 10px; }
        `}</style>
        <div className="req-page">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="skel" style={{ height: 28, width: 220, margin: "0 auto 8px" }} />
            <div className="skel" style={{ height: 14, width: 140, margin: "0 auto" }} />
          </div>
          <div className="req-list">
            {[1, 2, 3].map((i) => (
              <div key={i} className="req-card-skel">
                <div className="skel skel-circle" />
                <div className="skel-lines">
                  <div className="skel" style={{ height: 16, width: "60%", marginBottom: 8 }} />
                  <div className="skel" style={{ height: 12, width: "40%" }} />
                </div>
                <div className="skel-btns">
                  <div className="skel skel-btn" />
                  <div className="skel skel-btn" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ── Empty state ──────────────────────────────
  if (requests.length === 0) {
    return (
      <>
        <style>{`
          .req-page {
            min-height: calc(100vh - 64px);
            background: #080810;
            font-family: 'DM Sans', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .empty-card {
            background: #0f0f1a;
            border: 1px solid rgba(139,92,246,0.15);
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
            font-size: 52px;
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
          }
          .empty-text {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
          }
        `}</style>
        <div className="req-page">
          <div className="empty-card">
            <span className="empty-emoji">📭</span>
            <div className="empty-title">No pending requests</div>
            <p className="empty-text">
              When someone is interested in connecting
              with you, their request will appear here.
            </p>
          </div>
        </div>
      </>
    );
  }

  // ── Main list ────────────────────────────────
  return (
    <>
      <style>{`
        .req-page {
          min-height: calc(100vh - 64px);
          background: #080810;
          font-family: 'DM Sans', sans-serif;
          padding: 40px 20px;
        }
        .req-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .req-title {
          font-size: 26px;
          font-weight: 700;
          color: #f4f4f8;
          letter-spacing: -0.4px;
          margin-bottom: 8px;
        }
        .req-subtitle { color: #6b7280; font-size: 14px; }
        .req-count {
          display: inline-block;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.2);
          color: #a78bfa;
          padding: 3px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          margin-top: 8px;
        }
        .req-list {
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .req-card {
          background: #0f0f1a;
          border: 1px solid rgba(139,92,246,0.12);
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.2s ease;
          animation: fadeInUp 0.35s ease forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .req-card:hover {
          border-color: rgba(139,92,246,0.25);
          box-shadow: 0 6px 24px rgba(0,0,0,0.25);
        }
        .req-avatar {
          width: 54px; height: 54px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(139,92,246,0.25);
          flex-shrink: 0;
        }
        .req-info { flex: 1; min-width: 0; }
        .req-name {
          font-size: 15px;
          font-weight: 600;
          color: #f4f4f8;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .req-meta {
          color: #a78bfa;
          font-size: 12px;
          margin-bottom: 3px;
        }
        .req-about {
          color: #6b7280;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .req-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        .req-btn {
          padding: 9px 16px;
          border-radius: 10px;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .req-btn:hover { transform: translateY(-1px); }
        .req-btn:active { transform: translateY(0) scale(0.97); }
        .btn-reject {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          color: #9ca3af;
        }
        .btn-reject:hover {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.3);
          color: #fca5a5;
        }
        .btn-accept {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          box-shadow: 0 4px 14px rgba(139,92,246,0.3);
        }
        .btn-accept:hover {
          box-shadow: 0 6px 20px rgba(139,92,246,0.5);
        }
      `}</style>

      <div className="req-page">
        <div className="req-header">
          <div className="req-title">📬 Connection Requests</div>
          <div className="req-subtitle">People who want to connect with you</div>
          <span className="req-count">
            {requests.length} pending {requests.length === 1 ? "request" : "requests"}
          </span>
        </div>

        <div className="req-list">
          {requests.map((request, index) => {
            const { _id, firstName, lastName, photourl, age, gender, about } =
              request.fromUserId;
            return (
              <div
                key={request._id}
                className="req-card"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <img
                  className="req-avatar"
                  src={photourl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                  alt={firstName}
                  onError={(e) => {
                    e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                  }}
                />
                <div className="req-info">
                  <div className="req-name">{firstName} {lastName}</div>
                  {(age || gender) && (
                    <div className="req-meta">
                      {[age && `${age}y`, gender].filter(Boolean).join(" · ")}
                    </div>
                  )}
                  {about && <div className="req-about">{about}</div>}
                </div>
                <div className="req-actions">
                  <button
                    className="req-btn btn-reject"
                    onClick={() => respondRequest("rejected", request._id)}
                  >
                    ✕
                  </button>
                  <button
                    className="req-btn btn-accept"
                    onClick={() => respondRequest("accepted", request._id)}
                  >
                    ✓ Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Requests;