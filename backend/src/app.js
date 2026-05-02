const express = require('express');
const connectDB = require('./config/database');
const app = express();
app.set("trust proxy", 1);

const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 5000;



app.use(cors({
  origin: function(origin, callback) {
    // allowed origins list
    const allowedOrigins = [
      "https://tinderai.netlify.app",
      "http://localhost:5173",
    ];

    // allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);

    // strip trailing slash if present
    const cleanOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());



const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestsRouter = require('./routes/requests');
const userRouter = require('./routes/user');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestsRouter);
app.use('/', userRouter);
    


connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on the port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});

