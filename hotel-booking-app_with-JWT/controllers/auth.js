import User from '../models/user';
import bcrypt from 'bcrypt';
import { createError } from '../utils/error';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const newUser = new User({
			...req.body,
			password: hash,
		});

		await newUser.save();
		res.status(201).send(`User ${newUser.username} created successfully`);
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) return next(createError(404, 'User not found'));

		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password,
		);

		if (!isPasswordValid) return next(createError(400, 'Invalid password'));
		//create new JWT (unique to each user session to authenticate requests) using payload and secret key
		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT,
		);

		const { password, isAdmin, ...rest } = user.toObject();
		res
			.cookie('access_token', token, { httpOnly: true })
			.status(200)
			.json({ details: { ...rest }, isAdmin });
	} catch (err) {
		next(err);
	}
};
