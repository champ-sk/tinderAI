const express = require('express');
const { validatorEditProfile } = require('../utils/validator');
const profileRouter = express.Router();
const auth = require('../middlewares/auth');

// GET profile
profileRouter.get('/profile/view', auth, async (req, res) => {
  try {
    res.json(req.user); // ✅ return user directly
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// PATCH edit profile
profileRouter.patch('/profile/edit', auth, async (req, res) => {
  try {
    if (!validatorEditProfile(req)) {
      return res.status(400).json({ error: 'Invalid fields in request body' });
    }

    const loggedInUser = req.user;
    const allowedFields = [
      'firstName', 'lastName', 'age',
      'photourl', 'skills', 'gender', 'about'
    ];

    allowedFields.forEach((field) => {
      const value = req.body[field];

      // ✅ skip empty — don't wipe existing data
      if (value === undefined || value === null || value === '') return;

      if (field === 'age') {
        const parsed = Number(value);
        if (!isNaN(parsed) && parsed > 0) loggedInUser[field] = parsed;
        return;
      }

      if (field === 'skills') {
        if (Array.isArray(value) && value.length > 0) {
          loggedInUser[field] = value;
        }
        return;
      }

      loggedInUser[field] = value;
    });

    await loggedInUser.save();
    res.json(loggedInUser); // ✅ return user directly
  } catch (error) {
    console.error('Profile edit error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = profileRouter;