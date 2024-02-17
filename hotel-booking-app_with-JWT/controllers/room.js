import Room from '../models/Room';
import Hotel from '../models/Hotel';
import { createError } from '../utils/error';

//CRUD operations for rooms === createRoom , getRoom, getRooms, updateRoom, deleteRoom, updateRoomAvailability
export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	const newRoom = new Room(req.body);
	try {
		const savedRoom = await newRoom.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom._id },
			});
		} catch (err) {
			next(err);
		}
		res
			.status(200)
			.json({ message: `Room ${savedRoom.name} created successfully` });
	} catch (err) {
		next(err);
	}
};

export const getRoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch (err) {
		next(err);
	}
};
export const getRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		next(err);
	}
};

export const updateRoom = async (req, res, next) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{
				// $set operator used in MongoDB to modify values of specified fields in a document. If the field does not exist it will be added with the value from req.body. If field is specified only that field will be updated/modified (others will not)
				$set: req.body,
			},
			{ new: true }, // default would return original document before update, setting to true returns updated document
		);
		res
			.status(200)
			.json({ message: `Room ${updatedRoom.name} updated successfully` });
	} catch (err) {
		next(err);
	}
};

export const deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;

	try {
		const deletedRoom = await Room.findByIdAndDelete(req.params.id);
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$pull: { rooms: deletedRoom._id },
			});
		} catch (err) {
			next(err);
		}

		res
			.status(200)
			.json({ message: `Room ${deletedRoom.name} has been deleted` });
	} catch (err) {
		next(err);
	}
};

export const updateRoomAvailability = async (req, res, next) => {
	try {
		const room = await Room.findOne(req.params.id);
		await Room.updateOne(
			{
				'roomsNumbers._id': req.params.id,
			},
			{ $push: { 'roomsNumbers.$.unavailableDatas': req.body.dates } },
		);
		res.status(200).json({
			message: `Room ${room.name} status has been updated`,
		});
	} catch (err) {
		next(err);
	}
};
