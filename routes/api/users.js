const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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

module.exports = router;
