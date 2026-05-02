<div align="center">

# ⚡ TinderAI

### Connect with AI Builders Worldwide

A full-stack **Tinder-style matching platform** for AI enthusiasts, researchers, and builders.  
Swipe through profiles, send connection requests, and grow your AI network.

<br/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

<br/>

[🌐 Live Demo](https://tinderai.netlify.app) · [🐛 Report Bug](https://github.com/champ-sk/tinderAI/issues) · [✨ Request Feature](https://github.com/champ-sk/tinderAI/issues)

</div>

---

## 📸 Screenshots

### 🔐 Login Page
> Secure login and signup with JWT authentication

![Login Page](https://raw.githubusercontent.com/champ-sk/tinderAI/main/frontend/public/screenshots/loginPage.png)

---

### ⚡ Discover Feed
> Browse AI builder profiles and send connection requests

![Feed Page](https://raw.githubusercontent.com/champ-sk/tinderAI/main/frontend/public/screenshots/feedPage.png)

---

### ✏️ Profile Page
> Edit your profile with a live preview card on the right

![Profile Page](https://raw.githubusercontent.com/champ-sk/tinderAI/main/frontend/public/screenshots/profilePage.png)

---

### 🤝 Connections Page
> View all the AI builders you have matched with

![Connections Page](https://raw.githubusercontent.com/champ-sk/tinderAI/main/frontend/public/screenshots/connectionPage.png)

---

### 📬 Requests Page
> Accept or reject incoming connection requests

![Requests Page](https://raw.githubusercontent.com/champ-sk/tinderAI/main/frontend/public/screenshots/requestPage.png)

---

## ✨ Features

- 🔐 **Auth System** — Secure signup and login with JWT + bcrypt password hashing
- 👤 **Profile Management** — Edit name, bio, photo, age, gender and AI skills with live preview
- ⚡ **Discover Feed** — Browse AI builder profiles one by one with smooth swipe animations
- 💜 **Connection Requests** — Send interested or pass decisions on each profile
- 🤝 **Connections Page** — View everyone you have matched with
- 📬 **Requests Page** — Accept or reject incoming connection requests
- 🌙 **Dark Theme UI** — Deep dark design with purple glassmorphism aesthetic
- 📱 **Responsive Design** — Works on mobile, tablet and desktop
- 🎞️ **Smooth Animations** — Swipe animations, skeleton loaders, staggered card entrances
- 🚀 **Deployed** — Backend on Render, Frontend on Netlify

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| bcrypt | Password hashing |
| JSON Web Tokens (JWT) | Auth and session management |
| cookie-parser | Cookie-based token handling |
| cors | Cross-origin request handling |
| dotenv | Environment variable management |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| Vite | Build tool and dev server |
| Tailwind CSS + DaisyUI | Styling |

---

## 📁 Project Structure

```
tinderAI/
│
├── backend/
│   ├── src/
│   │   ├── app.js                    # Express app entry point
│   │   ├── models/
│   │   │   ├── user.js               # User schema
│   │   │   └── connectionRequest.js  # Connection request schema
│   │   ├── routes/
│   │   │   ├── auth.js               # /signup, /login, /logout
│   │   │   ├── profile.js            # /profile/view, /profile/edit
│   │   │   ├── requests.js           # /request/send, /request/respond
│   │   │   └── user.js               # /user/feed, /user/connections
│   │   ├── middlewares/
│   │   │   └── auth.js               # JWT verification middleware
│   │   └── utils/
│   │       └── validator.js          # Input validation helpers
│   ├── .env                          # Environment variables (not committed)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx             # Sticky glassmorphism navbar
    │   │   ├── Login.jsx              # Login / signup page
    │   │   ├── Feed.jsx               # Discover feed page
    │   │   ├── UserCard.jsx           # Swipeable profile card
    │   │   ├── EditProfile.jsx        # Profile editor with live preview
    │   │   ├── Connections.jsx        # Matched connections list
    │   │   ├── Requests.jsx           # Pending requests list
    │   │   └── Body.jsx               # App shell / layout wrapper
    │   ├── utils/
    │   │   ├── constants.js           # BASE_URL config
    │   │   ├── userSlice.js           # Redux: logged-in user
    │   │   ├── feedSlice.js           # Redux: discover feed
    │   │   ├── ConnectionSlice.js     # Redux: connections
    │   │   └── requestSlice.js        # Redux: pending requests
    │   ├── App.jsx                    # Routes
    │   └── main.jsx                   # React entry point
    ├── public/
    │   └── screenshots/               # App screenshots
    ├── index.html
    └── package.json
```

---

## 🔌 API Reference

### Auth Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/signup` | Register a new user | ❌ |
| POST | `/login` | Login and receive JWT cookie | ❌ |
| POST | `/logout` | Clear auth cookie | ✅ |

### Profile Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile/view` | Get logged-in user profile | ✅ |
| PATCH | `/profile/edit` | Update profile fields | ✅ |
| PATCH | `/profile/password` | Change password | ✅ |

### Connection Request Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/request/send/interested/:userId` | Send a connection request | ✅ |
| POST | `/request/send/ignored/:userId` | Pass on a profile | ✅ |
| POST | `/request/respond/:requestId/accepted` | Accept a request | ✅ |
| POST | `/request/respond/:requestId/rejected` | Reject a request | ✅ |

### User Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/user/feed` | Get discover feed | ✅ |
| GET | `/user/connections` | Get matched connections | ✅ |
| GET | `/user/requests/recieved` | Get incoming requests | ✅ |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [npm](https://npmjs.com/) v9+
- A [MongoDB Atlas](https://cloud.mongodb.com/) account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/champ-sk/tinderAI.git
cd tinderAI
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start the backend:

```bash
npm start
```

Backend runs at → `http://localhost:3000`

### 3. Setup the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

### 4. Open in Browser

Visit `http://localhost:5173`, create an account and start discovering! 🎉

---

## 🌍 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Netlify | https://tinderai.netlify.app |
| Backend | Render | https://tinderai-wb2h.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

---

## 🔮 Future Roadmap

- [ ] 💬 Real-time chat between connections (Socket.io)
- [ ] 🔔 Push notifications for new requests
- [ ] 🔍 Filter feed by skills, age, location
- [ ] 🖼️ Cloudinary integration for photo uploads
- [ ] 🌐 OAuth login (Google / GitHub)
- [ ] 📊 Admin dashboard with user analytics
- [ ] 📱 React Native mobile app

---

## 🤝 Contributing

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/your-feature

# 3. Commit your changes
git commit -m "feat: add your feature"

# 4. Push and open a Pull Request
git push origin feature/your-feature
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Shubham Kumar Agrawal**

[![GitHub](https://img.shields.io/badge/GitHub-champ--sk-181717?style=flat&logo=github)](https://github.com/champ-sk)

---

<div align="center">

Made with 💜 for the AI community

⭐ **Star this repo if you found it helpful!**

</div>
