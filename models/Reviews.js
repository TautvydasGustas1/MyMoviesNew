const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
	movie_id: {
		type: Number,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	rate: {
		type: Number
	},
	likes: [
		{
			user_id: {
				type: Number
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Review = mongoose.model('review', ReviewsSchema);
