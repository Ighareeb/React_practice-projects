import User from '../models/user';

//CRUD operations for user === getUser, getUsers, updateUser, deleteUser,

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json({ message: `User ${user.username} found`, user });
	} catch (err) {
		next(err);
	}
};
const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};
const updateUser = async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true },
		);
		res
			.status(200)
			.json({ message: `User ${updatedUser.username} updated successfully` });
	} catch (err) {
		next(err);
	}
};
const deleteUser = async (req, res, next) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		res
			.status(200)
			.json({ message: `User ${deletedUser.username} deleted successfully` });
	} catch (err) {
		next(err);
	}
};
