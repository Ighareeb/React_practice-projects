import jwt from 'jsonwebtoken';
import { createError } from './error';

export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) {
		return next(createError(401, 'Access Denied'));
	}

	jwt.verify(token, process.env.JWT, (err, user) => {
		if (err) return next(createError(403, 'Invalid Token'));
		req.user = user;
		next();
	});
};

export const verifyUser = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return next(
				createError(403, 'You are not authorized to perform this action'),
			);
		}
	});
};

export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			return next(
				createError(
					403,
					'You do not have admin authorization so you cannot perform this action',
				),
			);
		}
	});
};
