const express = require('express');
const { validatorEditProfile } = require('../utils/validator');
const profileRouter = express.Router();
const auth = require('../middlewares/auth');



profileRouter.get('/profile/view', auth, async (req, res) => {
    try {
        const user = req.user;
        res.json({ message: 'This is the profile page', user: user });
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

profileRouter.patch('/profile/edit', auth, async (req, res) => {
    console.log(req);
    try{
        console.log("Request Body:", req.body);
        if(!validatorEditProfile(req)){
            return res.status(400).json({ error: 'Invalid fields in request body' });
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((field) => {
            loggedInUser[field] = req.body[field];
        });
        await loggedInUser.save();
        res.json({ message: 'Profile updated successfully', user: loggedInUser });

    }catch(error){
          console.error("Error Message:", error.message);
        res.status(401).json({ error: 'Unauthorized ,coming in catch ' });
    }
});

module.exports = profileRouter;
