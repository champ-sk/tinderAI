const express = require('express');
const mongoose = require('mongoose');
const requestsRouter = express.Router();
const auth = require('../middlewares/auth');
const { connection } = require('mongoose');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');


requestsRouter.post('/request/send/:status/:requestId', auth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        // Validate the status parameter
        const validStatuses = ['interested', 'ignored'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        // Check if the fromUserId and toUserId are the same
        if (fromUserId.toString() === toUserId) {
            return res.status(400).json({ error: 'You cannot send a connection request to yourself' });
        }

        // Check if the toUserId exists in the database
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ error: 'The user you are trying to connect with does not exist' });
        }

        // Check if a connection request already exists between the two users 
        const existingRequest = await connectionRequest.findOne({
            $or: [{
                fromUserId,
                toUserId
            }, {
                fromUserId: toUserId,
                toUserId: fromUserId
            }]
        })

        if (existingRequest) {
            return res.status(400).json({ error: 'A connection request already exists between these users' });
        }

        const newRequest = new connectionRequest({
            fromUserId,
            toUserId,
            status
        });


        await newRequest.save();
        res.json({ message: `Connection request sent successfully with status: ${status}`, request: newRequest });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

requestsRouter.post('/request/respond/:requestId/:status', auth, async (req, res) => {
    try {
        const {requestId ,status} = req.params;
        const loggedInUserId = req.user._id;

        // Validate the status parameter
        const validStatuses = ['accepted', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        //check the valid request
        const validConnectionRequest = await ConnectionRequest.findOne({      
            _id: requestId, 
            toUserId: loggedInUserId,
            status: 'interested'    
        });
        
        if (!validConnectionRequest) {
            return res.status(404).json({ error: 'The connection request you are trying to respond to does not exist' });
        }

        validConnectionRequest.status = status;
        await validConnectionRequest.save();
            res.json({ message: `Connection request ${status} successfully`, request: validConnectionRequest });
       
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = requestsRouter;
