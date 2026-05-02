const express = require('express');
const { validatorEditProfile } = require('../utils/validator');
const profileRouter = express.Router();
const auth = require('../middlewares/auth');



profileRouter.get('/profile/view', auth, async (req, res) => {
    try {
        const user = req.user;
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

profileRouter.patch('/profile/edit', auth, async (req, res) => {
  try {
    if (!validatorEditProfile(req)) {
      return res.status(400).json({ error: 'Invalid fields in request body' });
    }

    const loggedInUser = req.user;

    // ✅ Only update fields that are actually provided (not empty)
    const allowedFields = ['firstName', 'lastName', 'age', 'photourl', 'skills', 'gender', 'about'];

    allowedFields.forEach((field) => {
      const value = req.body[field];

      // Skip empty strings — don't overwrite existing data with blank
      if (value === undefined || value === '') return;

      // Skip age if it can't be converted to a valid number
      if (field === 'age') {
        const parsed = Number(value);
        if (!isNaN(parsed)) loggedInUser[field] = parsed;
        return;
      }

      loggedInUser[field] = value;
    });

    await loggedInUser.save();
    res.json(loggedInUser);

  } catch (error) {
    console.error('Profile edit error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = profileRouter;
