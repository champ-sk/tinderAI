const express = require('express');
const requestsRouter = express.Router();
const auth = require('../middlewares/auth');
const { connection } = require('mongoose');
const connectionRequest = require('../models/connectionRequest');
const User = require('../models/user');


requestsRouter.post('/request/send/:status/:toUserId', auth, async (req, res) => {
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

module.exports = requestsRouter;
