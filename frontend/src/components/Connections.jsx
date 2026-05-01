import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/ConnectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnection(res.data.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchConnections();
  }, []);

  // ── Loading ──────────────────────────────────
  if (!connections) {
    return (
      <>
        <style>{`
          .conn-page {
            min-height: calc(100vh - 64px);
            background: #080810;
            font-family: 'DM Sans', sans-serif;
            padding: 40px 20px;
          }
          .conn-header-skeleton {
            text-align: center;
            margin-bottom: 40px;
          }
          .skel {
            border-radius: 8px;
            background: linear-gradient(
              90deg, #0f0f1a 25%, #1a1a2e 50%, #0f0f1a 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            margin: 0 auto;
          }
          @keyframes shimmer {
            0%   { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .conn-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 16px;
            max-width: 960px;
            margin: 0 auto;
          }
          .conn-card-skel {
            background: #0f0f1a;
            border: 1px solid rgba(139,92,246,0.1);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            gap: 16px;
            align-items: center;
          }
          .skel-avatar {
            width: 56px; height: 56px;
            border-radius: 50%;
            flex-shrink: 0;
          }
          .skel-lines { flex: 1; }
        `}</style>
        <div className="conn-page">
          <div className="conn-header-skeleton">
            <div className="skel" style={{ height: 28, width: 200, marginBottom: 8 }} />
            <div className="skel" style={{ height: 14, width: 140, marginTop: 8 }} />
          </div>
          <div className="conn-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="conn-card-skel">
                <div className="skel skel-avatar" />
                <div className="skel-lines">
                  <div className="skel" style={{ height: 16, width: "70%", marginBottom: 8 }} />
                  <div className="skel" style={{ height: 12, width: "50%", marginBottom: 8 }} />
                  <div className="skel" style={{ height: 12, width: "80%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ── Empty state ──────────────────────────────
  if (connections.length === 0) {
    return (
      <>
        <style>{`
          .conn-page {
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
        <div className="conn-page">
          <div className="empty-card">
            <span className="empty-emoji">🤝</span>
            <div className="empty-title">No connections yet</div>
            <p className="empty-text">
              Start swiping on the Discover page to
              connect with AI builders around the world!
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
        .conn-page {
          min-height: calc(100vh - 64px);
          background: #080810;
          font-family: 'DM Sans', sans-serif;
          padding: 40px 20px;
        }
        .conn-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .conn-title {
          font-size: 26px;
          font-weight: 700;
          color: #f4f4f8;
          letter-spacing: -0.4px;
          margin-bottom: 8px;
        }
        .conn-subtitle {
          color: #6b7280;
          font-size: 14px;
        }
        .conn-count {
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
        .conn-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 14px;
          max-width: 960px;
          margin: 0 auto;
        }
        .conn-card {
          background: #0f0f1a;
          border: 1px solid rgba(139,92,246,0.12);
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          gap: 14px;
          align-items: center;
          transition: all 0.2s ease;
          animation: fadeInUp 0.35s ease forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .conn-card:hover {
          border-color: rgba(139,92,246,0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.3);
        }
        .conn-avatar {
          width: 54px; height: 54px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(139,92,246,0.25);
          flex-shrink: 0;
          transition: border-color 0.2s;
        }
        .conn-card:hover .conn-avatar {
          border-color: rgba(139,92,246,0.5);
        }
        .conn-info { flex: 1; min-width: 0; }
        .conn-name {
          font-size: 15px;
          font-weight: 600;
          color: #f4f4f8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 3px;
        }
        .conn-meta {
          color: #a78bfa;
          font-size: 12px;
          margin-bottom: 4px;
        }
        .conn-about {
          color: #6b7280;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 7px;
        }
        .conn-badge {
          display: inline-block;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.2);
          color: #c4b5fd;
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
        }
      `}</style>

      <div className="conn-page">
        <div className="conn-header">
          <div className="conn-title">🤝 Your Connections</div>
          <div className="conn-subtitle">People you've matched with</div>
          <span className="conn-count">
            {connections.length} {connections.length === 1 ? "connection" : "connections"}
          </span>
        </div>

        <div className="conn-grid">
          {connections.map((c, index) => {
            const { _id, firstName, lastName, photourl, age, gender, about } = c;
            return (
              <div
                key={_id}
                className="conn-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  className="conn-avatar"
                  src={photourl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                  alt={firstName}
                  onError={(e) => {
                    e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                  }}
                />
                <div className="conn-info">
                  <div className="conn-name">{firstName} {lastName}</div>
                  {(age || gender) && (
                    <div className="conn-meta">
                      {[age && `${age}y`, gender].filter(Boolean).join(" · ")}
                    </div>
                  )}
                  {about && <div className="conn-about">{about}</div>}
                  <span className="conn-badge">🤖 AI Builder</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Connections;