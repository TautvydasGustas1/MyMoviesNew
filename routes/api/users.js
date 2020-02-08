const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const UserMovies = require('../../models/UserMovies');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Review = require('../../models/Reviews');

// @route   POST api/users
// @desc    Register user
// @acess   Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password, username } = req.body;

		//See if user exists
		try {
			let userEmail = await User.findOne({ email });

			if (userEmail) {
				return res.status(400).json({
					errors: [
						{ msg: 'Email already exists' }
					]
				});
			}

			let userUsername = await User.findOne({ username });
			//See if username exists
			if (userUsername) {
				return res.status(400).json({
					errors: [
						{ msg: 'Username already exists' }
					]
				});
			}

			let user = new User({
				email,
				password,
				username
			});

			//Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			//Return jsonwebtoken
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 }, // Change in the future
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route   GET api/users/:username
// @desc    Find user by username
// @acess   Public
router.get('/:username', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username }).select('-password -_id');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   GET api/users/movies
// @desc    Get user watched movies
// @acess   Private
// @todo 	Make private
router.get('/movies/:user_id', async (req, res) => {
	try {
		const movies = await UserMovies.find({ user_id: req.params.user_id }).select();
		res.json(movies);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   POST api/users/movies
// @desc    Add user watched movie
// @acess   Private
// @todo 	Make private
router.post('/movies', async (req, res) => {
	const { movie_id, user_id, rate, title, poster_path, genres } = req.body;

	try {
		let movie = new UserMovies({
			movie_id,
			user_id,
			rate,
			title,
			poster_path,
			genres
		});

		await movie.save();
		res.sendStatus(200);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   POST api/users/movies/:id/review
// @desc    Add user review
// @acess   Private
// @todo 	Make private
router.post('/movies/:movie_id/review', async (req, res) => {
	const { username, comment, rate } = req.body;
	const movie_id = req.params.movie_id;
	try {
		let review = new Review({
			movie_id,
			username,
			comment,
			rate
		});

		await review.save();
		res.send(review);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   GET api/users/movies/:movie_id/review
// @desc    Get all reviews for the particular movie
// @acess   Public
router.get('/movies/:movie_id/review', async (req, res) => {
	try {
		const reviews = await Review.find({ movie_id: req.params.movie_id }).select();
		res.json(reviews);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   PUT api/users/movies/:movie_id/review
// @desc    Get all reviews for the particular movie
// @acess   Private
// @todo 	Make private
router.put('/movies/review/likes/:id', async (req, res) => {
	try {
		const { user_id } = req.body;
		let exist = false;
		let arrayEl = 0;
		//Find review by id
		let review = await Review.findById(req.params.id).select();
		//Check if user already liked it
		for (let el of review.likes) {
			if (el.user_id === user_id) {
				exist = true;
				break;
			}
			arrayEl++;
		}

		if (exist) {
			//if user already liked remove rom array
			await review.likes.splice(arrayEl, 1);
		} else {
			// else add to like to array
			await review.likes.push({ user_id: user_id });
		}

		//Add user_id to likes
		await review.save();
		res.json(review);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});
module.exports = router;
