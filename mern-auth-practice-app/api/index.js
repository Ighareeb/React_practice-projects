import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import userRoutes from
// import authRoutes from
import cookieParser from 'cookie-parser';
import path from 'path';
import { json } from 'body-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log(`Error: ${err} - could not connect to MongoDB`);
	});

const __dirname = path.resolve(); // gets absolute path of current directory --> '/api'

app.use(express.static(path.join(__dirname, '/client/dist')));
//when you build app it transpiles source code, and bundles it into a dist (distribution) directory. The dist dir inside client are where the built files are being outputted

// any undefined routes will be directed to the index.html file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);

//error handling middleware --> will handle errors passed from other middleware in next(err)
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	return res.status(statusCode).json({
		success: false,
		message,
		statusCode,
	});
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
