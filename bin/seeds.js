const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.js');
const Movie = require('../models/movie.js');

mongoose.connect('mongodb://localhost/lab-mongoose-movies2', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => {
    console.log('🔌 Connected to Mongo!');
  })
  .catch(err => console.error('Error connecting to mongo', err))
;

//
// Celebrities
//

var data = [
  {
      name: 'Kim Kardashian',
      occupation: 'Unknown',
      catchPhrase: "I'm a vegan",
  },
  {
      name: 'Melz',
      occupation: 'unemployed',
      catchPhrase: "Is this a thing?",
  },
  {
      name: 'Patrick Star',
      occupation: 'Krusty Krab',
      catchPhrase: "Noooo, this is PATRICK",
  }
];


//
// Movies
//

var fakeMovies = [
  {
    title: 'A Star is born',
    genre: 'Comedy',
    plot: 'A humoristic portait of a starfish that wants to become a famous Broadway star.'
  },
  {
    title: 'A Vegan eats Meat',
    genre: 'Drama',
    plot: 'A drama by and with Kim Kardashian.',
  },
  {
    title: `That's a thing!`,
    genre: 'Fantasy',
    plot: 'Is it a thing?. If yes, how many? Accompany Thomas Thingy on his journey to find out what is the thing.'
  }
]

const p1 = Celebrity.create(datas);
p1.then(celebrities => console.log(`${celebrities.length} celebrities created!`))

const p2 = Movie.create(fakeMovies);
p2.then(movies => console.log(`${movies.length} movies created!`))