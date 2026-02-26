const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');  
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/signup', async (req,res)=>{
    const user = new User( req.body);
    try{
        const savedUser = await user.save();
        res.status(201).json({message: "User created successfully", user: savedUser});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get user by emailid
app.get('/user', async (req, res) => {

   const email = req.query.emailId;
   try{
    const user = await User.findOne({ emailId: email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }   else {      
        res.json(user);
     }  
   }
    catch(error){
        res.status(500).json({ error: error.message });
    }

 
});

//get all users
app.get('/feed' , async (req, res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }   catch(error){   
        res.status(500).json({ error: error.message });
    }
});

//delete user by emailid
app.delete('/user', async(req, res)=>{
    const email =req.query.emailId;
    try{
        const deletedUser = await User.findOneAndDelete({ emailId: email });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully', user: deletedUser });
        }           
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }    
});
// update user by userid
app.patch('/user', async(req, res)=>{
    const userId =req.query.userId;
    
    try{
        const AllowedUpdates = [ 'password', 'photourl', 'skills', 'gender'];
        const updates  = Object.keys(req.body).every((k)=> AllowedUpdates.includes(k));
        if(!updates){
            return res.status(400).json({ message: 'Invalid updates!' });
        }
        
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });     
        } else {
            res.json({ message: 'User updated successfully', user: updatedUser });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
});


connectDB().then(()=>{
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
}).catch((error)=>{
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});

