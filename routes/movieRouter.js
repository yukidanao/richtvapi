const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/all', movieController.getFullMovieList);
router.get('/search', movieController.searchMovie);
router.get('/logo/:movieId', movieController.getMovieTitleLogo);
router.get('/cast/:movieId', movieController.getMovieCast);
router.get('/details/:movieId', movieController.getMovieDetails);
router.get('/recommendations/:movieId', movieController.getMovieRecommendations);
router.get('/trailer/:movieId', movieController.getMovieTrailer);
router.get('/discover/movies', movieController.getMovies);
router.get('/nowplaying/movies', movieController.getNowPlayingMovies);
router.get('/getmoviebycategory/:category', movieController.getMovieByCategory)
router.get('/genre', movieController.getGenres);
router.get('/genre/tv', movieController.getTVGenres);
router.get('/discover/tv', movieController.getTV);

module.exports = router;