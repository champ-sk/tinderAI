const express = require('express');
const connectDB = require('./config/database');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const { validatorSignup } = require('./utils/validator');
const auth = require('./middlewares/auth');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser());
app.use(express.json());


app.post('/signup', async (req, res) => {
    try {
        validatorSignup(req);
        const { firstName, lastName, emailID } = req.body;
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        //   console.log(hashPassword);
        const user = new User({ firstName, lastName, emailID, password: hashPassword });
        const savedUser = await user.save();
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { emailID, password } = req.body;
        const validUser = await User.findOne({ emailID: emailID });
        if (!validUser) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, validUser.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: 'Invalid credentials' });
        } else {

            const token = await jwt.sign({ _id: validUser._id }, "asdfghjkl", { expiresIn: new Date().getTime() + 24 * 60 * 60 * 1000 });
            //  console.log(token);
            res.cookie('token', token);

            res.json({ message: 'Login successful', user: validUser });

        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/profile', auth, async (req, res) => {
    try {
        const user = req.user;
        res.json({ message: 'This is the profile page', user: user });
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
});
app.post('/connectionRequest', auth, async (req, res) => {
    try {
        const user = req.user;
        const { firstName } = user;
        res.send(`Connection request sent to ${firstName}`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});

