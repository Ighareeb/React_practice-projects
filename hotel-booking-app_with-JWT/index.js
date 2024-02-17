import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/bookings.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log(`Error: ${err} - Could not connect to MongoDB`));
//connect to MongoDB
mongoose.connection.on('disconnected', () => {
	console.log('MongoDB disconnected');
});

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//error handling middleware
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong';
	return res.status(errorStatus).json({
		success: false,
		message: errorMessage,
		status: errorStatus,
		stack: err.stack,
	});
});

//routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.listen(PORT, () => {
	connect();
	console.log(`Server is running on port ${PORT}`);
});
