import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect';
import postRoutes from './routes/postRoutes';
import dalleRoutes from './routes/dalleRoutes';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
	res.status(200).json({ message: 'Welcome to AI Image Generation App' });
});

//.env and mongoDB has not been set up - but code is correct
const startServer = async () => {
	try {
		connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
};

startServer();
