import Hotel from '../models/Hotel';
import Room from '../models/Room';

//CRUD operations for hotels === createHotel, getHotel, getHotels, updateHotel, deleteHotel, countByCity, countByType, getHotelRooms

export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);
	try {
		const savedHotel = await newHotel.save();
		res
			.status(201)
			.json({ message: `Hotel ${savedHotel.name} created successfully` });
	} catch (err) {
		next(err);
	}
};
export const getHotel = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
};
export const getHotels = async (req, res, next) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};
export const updateHotel = async (req, res, next) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{
				// $set operator used in MongoDB to modify values of specified fields in a document. If the field does not exist it will be added with the value from req.body. If field is specified only that field will be updated/modified (others will not)
				$set: req.body,
			},
			{ new: true }, // default would return original document before update, setting to true returns updated document
		);
		res
			.status(200)
			.json({ message: `Hotel ${updatedHotel.name} updated successfully` });
	} catch (err) {
		next(err);
	}
};
export const deleteHotel = async (req, res, next) => {
	try {
		const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
		res
			.status(200)
			.json({ message: `Hotel ${deletedHotel.name} deleted successfully` });
	} catch (err) {
		next(err);
	}
};
export const countByCity = async (req, res, next) => {
	//get cities list being searched for in query params
	const cities = req.query.cities.split(',');
	try {
		//count numbert of hotels in each city (Promise.all since countDocuments operation will be done for each city in the cities array)
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city });
			}),
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};
export const countByType = async (req, res, next) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
		const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
		const resortCount = await Hotel.countDocuments({ type: 'resort' });
		const villaCount = await Hotel.countDocuments({ type: 'villa' });
		const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

		res.status(200).json([
			{ type: 'hotel', count: hotelCount },
			{ type: 'apartments', count: apartmentCount },
			{ type: 'resorts', count: resortCount },
			{ type: 'villas', count: villaCount },
			{ type: 'cabins', count: cabinCount },
		]);
	} catch (err) {
		next(err);
	}
};
export const getHotelRooms = async (req, res, next) => {
	try {
		const hotelRooms = await Hotel.findById(req.params.id);
		const list = await Promise.all(
			hotelRooms.rooms.map((room) => {
				return Room.findById(room);
			}),
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};
