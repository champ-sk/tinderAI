const express = require('express');
const requestsRouter = express.Router();
const auth = require('../middlewares/auth');


requestsRouter.post('/connectionRequest', auth, async (req, res) => {
    try {
        const user = req.user;
        const { firstName } = user;
        res.send(`Connection request sent to ${firstName}`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = requestsRouter;
