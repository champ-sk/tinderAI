const express = require('express');
const auth = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const userRouter = express.Router();

const requiredFields = 'firstName lastName age gender photourl skills';
//get all the pending connection requests received by the user
userRouter.get('/user/requests/recieved', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const pendingRequests = await ConnectionRequest.find({
            toUserId: userId,
            status: 'interested'
        }).populate('fromUserId', requiredFields);
        res.json({ message: 'Pending requests retrieved successfully', data: pendingRequests });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

// get all connections of the user
//status must be accepted and the user can be either fromUserId or toUserId

userRouter.get('/user/connections', auth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'accepted' },
                { toUserId: loggedInUser._id, status: 'accepted' }
            ]
        }).populate('fromUserId', requiredFields).populate('toUserId', requiredFields);

        const data = connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId

        })
        res.json({ data ,message:"thid"});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get the feed for the user 
// the feed should contain all the users who are not connected to the logged in user
//  and have not sent a connection request to the logged in user

userRouter.get('/user/feed', auth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const page = req.query.page || 1;
        let limit = req.query.limit || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
        // i need to find all the users who are not connected to the logged in user 
        // and have not sent a connection request to the logged in user and also we donot need the logged in user in the feed
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select('fromUserId toUserId');
        //now i need to create a set of user ids who are connected to the logged in user
        // or have sent a connection request to the logged in user and also add the logged in user id to the set
        const excludedUserIds = new Set();
        connections.forEach((req) => {
            excludedUserIds.add(req.fromUserId.toString());
            excludedUserIds.add(req.toUserId.toString());
        });
        const usersFeed = await User.find({
            $and: [
                { _id: { $nin: Array.from(excludedUserIds) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        })
            .select(requiredFields)
            .skip(skip)
            .limit(limit);

        res.json({ message: 'Feed retrieved successfully', data: usersFeed })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})




module.exports = userRouter;
