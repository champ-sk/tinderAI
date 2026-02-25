const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');  
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/user', async (req,res)=>{
    const user = new User( {
        firstName: "Shubham" , 
        lastName: "Kumar" ,
        age: 22 ,
        emailID: "shubhamkumar3183@gmail.com", 
        password: "shubham123"

    });
    try{
        const savedUser = await user.save();
        res.status(201).json({message: "User created successfully", user: savedUser});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
connectDB().then(()=>{
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
}).catch((error)=>{
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});

