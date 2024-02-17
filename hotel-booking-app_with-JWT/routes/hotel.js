import express from 'express';
import {
	createHotel,
	getHotel,
	getHotels,
	updateHotel,
	deleteHotel,
	countByCity,
	countByType,
	getHotelRooms,
} from '../controllers/hotel.js';
import Hotel from '../models/Hotel.js';
import { verifyAdmin } from '../utils/verifyToken';

const router = express.Router();

router.get('/find/:id', getHotel);
router.get('/', getHotels);
router.post('/', verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/', verifyAdmin, deleteHotel);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getHotelRooms);

export default router;
