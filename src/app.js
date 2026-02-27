const express = require('express');
const connectDB = require('./config/database');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const { validatorSignup } = require('./utils/validator');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/signup', async (req, res) => {

    try {

        validatorSignup(req);
        const { firstName, lastName, emailID } = req.body;
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashPassword);
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

            const token = await jwt.sign({ _id: validUser._id }, "asdfghjkl");
            console.log(token);
            res.cookie('token', token);

            res.json({ message: 'Login successful', user: validUser });

        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/profile', async (req, res) => {
    const cookie = req.cookies;
    //console.log(cookie);
    const { token } = cookie;   
    const decodedMessage = await jwt.verify(token, "asdfghjkl");
    console.log(decodedMessage);
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    res.json({ message: 'This is the profile page', user: user });

    res.json({ message: 'This is the profile page' });
    // if(token === 'hsdcvwhnfhwiufhwiefhi1231r4kjwdnch234ir52kfnw'){
    //     res.json({ message: 'This is the profile page' });
    // }else{
    //     res.status(401).json({ message: 'Unauthorized' });
    // }   
});
//get user by emailid
app.get('/user', async (req, res) => {

    const email = req.query.emailId;
    try {
        const user = await User.findOne({ emailId: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }


});

//get all users
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete user by emailid
app.delete('/user', async (req, res) => {
    const email = req.query.emailId;
    try {
        const deletedUser = await User.findOneAndDelete({ emailId: email });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully', user: deletedUser });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// update user by userid
app.patch('/user', async (req, res) => {
    const userId = req.query.userId;

    try {
        const AllowedUpdates = ['password', 'photourl', 'skills', 'gender'];
        const updates = Object.keys(req.body).every((k) => AllowedUpdates.includes(k));
        if (!updates) {
            return res.status(400).json({ message: 'Invalid updates!' });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User updated successfully', user: updatedUser });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
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

