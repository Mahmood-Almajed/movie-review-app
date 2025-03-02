const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Movies = require('../models/movies.js');
const router = express.Router();

// ========== Public Routes ===========





//=============Protected routes==================
router.use(verifyToken);

//create
router.post('/', async (req, res) => {
  try {
    
    req.body.author = req.user._id;
    const movie = await Movies.create(req.body);
    movie._doc.author = req.user;
    res.status(201).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//index
router.get('/', async (req, res) => {
    try {
      const movies = await Movies.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//show
  router.get('/:movieId', async (req, res) => {
    try {
      const movie = await Movies.findById(req.params.movieId).populate(['author','reviews.author']);
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  });



  //Update movie 
  router.put('/:movieId', async (req, res) => {
    try {
      const movie = await Movies.findById(req.params.movieId);
  
      if (!movie.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to Update this movie");
      }
  
      const updatedMovie = await Movies.findByIdAndUpdate(
        req.params.movieId,
        req.body,
        { new: true }
      );
  
      updatedMovie._doc.author = req.user;
  
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }

    
  });
  









  //Delete Movie
  router.delete('/:movieId', async (req, res) => {
    try {
      const movie = await Movies.findById(req.params.movieId);
  
      if (!movie.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do Delete this movie");
      }
  
      const deletedMovie = await Movies.findByIdAndDelete(req.params.movieId);
      res.status(200).json(deletedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  });



  //reviews-Create

  router.post('/:movieId/reviews', async (req, res) => {

    try {
        req.body.author = req.user._id;
        const movie = await Movies.findById(req.params.movieId);
        movie.reviews.push(req.body);
        await movie.save();
    
       
        const newReview = movie.reviews[movie.reviews.length - 1];
    
        newReview._doc.author = req.user;
    
       
        res.status(201).json(newReview);
      } catch (error) {
        res.status(500).json(error);
      }
});

//reviews-Update  
router.put('/:movieId/reviews/:reviewsID', async (req, res) => {
    try {
        req.body.author = req.user._id;
      const movie = await Movies.findById(req.params.movieId);
  
      if (!movie.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to Update this review");
      }
  
      const revIndex = parseInt(req.params.reviewsID);

      movie.reviews[revIndex] = req.body


     /* const updatedMovie = await Movies.findByIdAndUpdate(
        req.params.movieId,
        req.body,
        { new: true }
      );*/
  
      //updatedreview._doc.author = req.user;
      movie.reviews[revIndex]._doc.author = req.user;
      await Movies.findByIdAndUpdate(
        req.params.movieId,
        movie
      )
      res.status(200).json(movie.reviews[revIndex]);
    } catch (error) {
      res.status(500).json(error);
    }

    
  });


  //reviews-Delete
  router.delete('/:movieId/reviews/:reviewsID', async (req, res) => {
    try {
        req.body.author = req.user._id;
      const movie = await Movies.findById(req.params.movieId);
  
      if (!movie.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to Update this review");
      }
  
      const revIndex = parseInt(req.params.reviewsID);
      movie.reviews = movie.reviews.filter((review, idx) => {
        return idx != revIndex
      })
      
      await Movies.findByIdAndUpdate(
        req.params.movieId,
        movie
      )
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;