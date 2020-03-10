const express = require('express')

const MovieController = require('../controller/movie_ctrl')

const router = express.Router()

router.post('/create', MovieController.createMovie)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)
router.get('/:id', MovieController.getMovieById)
router.get('/', MovieController.getMovies)

module.exports = router