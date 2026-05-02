import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName]   = useState(user.lastName || "");
  const [photourl, setPhotourl]   = useState(user.photourl || "");
  const [age, setAge]             = useState(user.age || "");
  const [gender, setGender]       = useState(user.gender || "");
  const [about, setAbout]         = useState(user.about || "");
  const [skills, setSkills]       = useState(user.skills?.join(", ") || "");
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false); // ✅ added
  const [showToast, setShowToast] = useState(false); // ✅ added
  const dispatch = useDispatch();

  const previewSrc = photourl ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const saveProfile = async () => { // ✅ consistent name
    setError("");
    setLoading(true); // ✅ added
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photourl,
          age,
          gender,
          about,
          skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data)); // ✅ correct path
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false); // ✅ added
    }
  };

  return (
    <>
      <style>{`
        .ep-page {
          min-height: calc(100vh - 64px);
          background: #080810;
          font-family: 'DM Sans', sans-serif;
          padding: 40px 20px;
          display: flex;
          gap: 32px;
          align-items: flex-start;
          justify-content: center;
          flex-wrap: wrap;
        }
        .toast-wrap {
          position: fixed;
          top: 80px;
          right: 24px;
          z-index: 100;
          animation: slideIn 0.3s ease forwards;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .toast {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 18px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        .toast-success {
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.3);
          color: #86efac;
        }
        .ep-form-card {
          background: #0f0f1a;
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 24px;
          padding: 36px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
          animation: fadeInUp 0.4s ease forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ep-form-title { font-size: 22px; font-weight: 700; color: #f4f4f8; letter-spacing: -0.4px; margin-bottom: 6px; }
        .ep-form-subtitle { color: #6b7280; font-size: 13px; margin-bottom: 28px; }
        .ep-section { font-size: 10px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 1.2px; margin: 22px 0 12px; display: flex; align-items: center; gap: 8px; }
        .ep-section::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.05); }
        .ep-row { display: flex; gap: 14px; }
        .ep-row .ep-group { flex: 1; }
        .ep-group { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
        .ep-label { font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.8px; }
        .ep-input, .ep-select, .ep-textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px 15px; color: #f4f4f8; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: all 0.2s; width: 100%; box-sizing: border-box; }
        .ep-input:focus, .ep-select:focus, .ep-textarea:focus { border-color: rgba(139,92,246,0.5); background: rgba(139,92,246,0.05); box-shadow: 0 0 0 3px rgba(139,92,246,0.1); }
        .ep-input::placeholder, .ep-textarea::placeholder { color: #374151; }
        .ep-select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
        .ep-select option { background: #0f0f1a; color: #f4f4f8; }
        .ep-textarea { resize: vertical; min-height: 90px; line-height: 1.5; }
        .ep-hint { font-size: 11px; color: #4b5563; margin-top: -10px; margin-bottom: 6px; }
        .photo-preview-row { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
        .photo-preview-img { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(139,92,246,0.3); flex-shrink: 0; }
        .ep-save-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; border: none; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; box-shadow: 0 4px 20px rgba(139,92,246,0.3); margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .ep-save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(139,92,246,0.5); }
        .ep-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ep-error { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); color: #fca5a5; padding: 11px 14px; border-radius: 10px; font-size: 13px; margin-bottom: 12px; }
        .ep-preview-wrap { position: sticky; top: 80px; width: 100%; max-width: 340px; }
        .ep-preview-label { font-size: 11px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 1px; text-align: center; margin-bottom: 14px; }
        .preview-card { border-radius: 22px; overflow: hidden; background: #0f0f1a; border: 1px solid rgba(139,92,246,0.2); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
        .preview-img-wrap { position: relative; height: 260px; background: #1a1a2e; overflow: hidden; }
        .preview-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .preview-img-overlay { position: absolute; bottom: 0; left: 0; right: 0; height: 60%; background: linear-gradient(to top, #0f0f1a, transparent); }
        .preview-badge { position: absolute; top: 12px; right: 12px; background: rgba(139,92,246,0.85); color: white; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; }
        .preview-body { padding: 16px 18px 20px; }
        .preview-name { font-size: 18px; font-weight: 700; color: #f4f4f8; margin-bottom: 4px; }
        .preview-meta { color: #a78bfa; font-size: 12px; margin-bottom: 10px; }
        .preview-about { color: #9ca3af; font-size: 13px; line-height: 1.5; margin-bottom: 12px; }
        .preview-skills { display: flex; flex-wrap: wrap; gap: 5px; }
        .preview-skill { background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.25); color: #c4b5fd; padding: 3px 9px; border-radius: 20px; font-size: 10px; font-weight: 500; }
        @media (max-width: 900px) { .ep-preview-wrap { display: none; } }
        @media (max-width: 480px) { .ep-form-card { padding: 24px 18px; } .ep-row { flex-direction: column; gap: 0; } }
      `}</style>

      {/* ✅ Toast — uses showToast not toast */}
      {showToast && (
        <div className="toast-wrap">
          <div className="toast toast-success">
            ✅ Profile saved successfully!
          </div>
        </div>
      )}

      <div className="ep-page">
        <div className="ep-form-card">
          <div className="ep-form-title">Edit Profile ✏️</div>
          <div className="ep-form-subtitle">Changes appear live in the preview →</div>

          <div className="ep-section">Basic Info</div>
          <div className="ep-row">
            <div className="ep-group">
              <label className="ep-label">First Name</label>
              <input className="ep-input" placeholder="Shubham" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="ep-group">
              <label className="ep-label">Last Name</label>
              <input className="ep-input" placeholder="Agrawal" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="ep-row">
            <div className="ep-group">
              <label className="ep-label">Age</label>
              <input className="ep-input" type="number" placeholder="22" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="ep-group">
              <label className="ep-label">Gender</label>
              <select className="ep-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="ep-section">Profile Photo</div>
          <div className="photo-preview-row">
            <img className="photo-preview-img" src={previewSrc} alt="preview"
              onError={(e) => { e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"; }} />
            <div className="ep-group" style={{ marginBottom: 0, flex: 1 }}>
              <label className="ep-label">Photo URL</label>
              <input className="ep-input" placeholder="https://example.com/photo.jpg" value={photourl} onChange={(e) => setPhotourl(e.target.value)} />
            </div>
          </div>

          <div className="ep-section">About</div>
          <div className="ep-group">
            <label className="ep-label">Bio</label>
            <textarea className="ep-textarea" placeholder="Tell other AI builders about yourself..." value={about} onChange={(e) => setAbout(e.target.value)} />
          </div>

          <div className="ep-section">Skills</div>
          <div className="ep-group">
            <label className="ep-label">Skills</label>
            <input className="ep-input" placeholder="React, Python, LLMs, RAG" value={skills} onChange={(e) => setSkills(e.target.value)} />
          </div>
          <p className="ep-hint">Separate skills with commas</p>

          {/* ✅ error display */}
          {error && <div className="ep-error">⚠️ {error}</div>}

          {/* ✅ onClick is saveProfile, disabled uses loading */}
          <button className="ep-save-btn" onClick={saveProfile} disabled={loading}>
            {loading ? (<><div className="spinner" /> Saving...</>) : ("Save Profile →")}
          </button>
        </div>

        {/* Live Preview */}
        <div className="ep-preview-wrap">
          <div className="ep-preview-label">Live Preview</div>
          <div className="preview-card">
            <div className="preview-img-wrap">
              <img src={previewSrc} alt="preview"
                onError={(e) => { e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"; }} />
              <div className="preview-img-overlay" />
              <span className="preview-badge">🤖 AI Builder</span>
            </div>
            <div className="preview-body">
              <div className="preview-name">{firstName || "First"} {lastName || "Last"}</div>
              {(age || gender) && (
                <div className="preview-meta">
                  {[age && `${age}y`, gender].filter(Boolean).join(" · ")}
                </div>
              )}
              {about && <p className="preview-about">{about}</p>}
              <div className="preview-skills">
                {skills.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4).map((skill, i) => (
                  <span key={i} className="preview-skill">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;