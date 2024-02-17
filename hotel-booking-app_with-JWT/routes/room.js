import express from 'express';
import {
	createRoom,
	getRoom,
	getRooms,
	updateRoom,
	deleteRoom,
	updateRoomAvailability,
} from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken';

const router = express.Router();

router.get('/', getRoom);
router.get('/:id', getRooms);
router.post('/:hotelId', verifyAdmin, createRoom);
router.put('/:id', verifyAdmin, updateRoom);
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);
router.put('/availability/:id', verifyAdmin, updateRoomAvailability);

export default router;
