const mongoose = require('mongoose');

const UserMoviesSchema = new mongoose.Schema({
	movie_id: {
		type: Number,
		required: true
	},
	user_id: {
		type: String,
		required: true
	},
	rate: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	poster_path: {
		type: String
	},
	genres: []
});

module.exports = UserMovies = mongoose.model('userMovies', UserMoviesSchema);
