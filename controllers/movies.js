const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Movies = require('../models/movies.js');
const router = express.Router();

// ========== Public Routes ===========


router.get('/', async (req, res) => {
    try {
      const movies = await Movie.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json(error);
    }
  });



module.exports = router;