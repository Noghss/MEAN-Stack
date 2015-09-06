var Movie = require('../models/movie.js');

exports.index = function(req, res) {
    res.render('index');
};

exports.list = function(req, res) {
   Movie.find({}, function(err, movies) {
        if (err) {
        	return console.log(err);
        }	
        res.json({movies: movies});
    });
};    

exports.save = function(req, res) {
    var movie = new Movie(req.body);
    movie.save(function(error, movie) {
    	 res.send(movie);
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;
    Movie.findByIdAndRemove(id, function(err, movie) {
        res.send('Movie ' + movie.title + ' succesfully removed');
    });
};

exports.update = function(req, res) {
    var id = req.body._id;
    delete req.body._id;
    Movie.findByIdAndUpdate(id, req.body, function(err, movie) {
        res.send('Movie ' + movie.title + ' succesfully updated!');
    });
};