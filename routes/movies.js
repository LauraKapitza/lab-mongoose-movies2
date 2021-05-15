const express = require('express');
const router = express.Router();

const Movie = require('../models/movie.js');
const Celebrity = require('../models/celebrity.js');

router.get('/', (req, res, next) => {
    Movie.find()
        .then(data => {
            res.render('movies/index', {movies: data})
        })
        .catch(err => next(err));
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    const newMovie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    });

    newMovie.save()
        .then(() => res.redirect('/movies'))
        .catch(err => res.render('movies/new'));
});

router.get('/new', (req, res, next) => {
    Celebrity.find()
        .then(data => {
            res.render('movies/new', {celebrities: data})
        })
        .catch(err => next(err))
});

router.post('/:id/delete', (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/movies'))
        .catch(err => next(err));
})

router.get('/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(movie => {
            Celebrity.find()
                .then(celebrities => {
                    celebrities.forEach((celebrity, i) => {
                        if (movie.cast.includes(celebrity.id)) {
                            celebrities[i].selected = true;
                        }
                    })
                    
                    const data = {
                        movie: movie,
                        celebrities: celebrities
                    }
                    res.render('movies/edit', data)
                })
                .catch(err => next(err))  
        })
        .catch(err => next(err))
})

router.post('/:id', (req, res, next) => {
    let id = req.params.id

    Movie.findById(id)
        .then(movie => {
            movie.title = req.body.title,
            movie.genre = req.body.genre,
            movie.plot = req.body.plot,
            movie.cast = req.body.cast
            
            movie.save()
                .then(() => res.redirect(`/movies/${id}`))
                .catch(err => next(err))
        }

        )
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then(movie => {
            if (!movie) {
                return res.status(404).render('not-found');
            }
            res.render('movies/show', {movie})
        })
        .catch(err => next(err))
})

module.exports = router;