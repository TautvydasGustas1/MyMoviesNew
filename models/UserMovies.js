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
	}
});

module.exports = UserMovies = mongoose.model('userMovies', UserMoviesSchema);
