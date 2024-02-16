import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

//data imports
// import User from './models/User.js';
// import { dataUser } from './data/index.js';

// configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); //security/some control over which origins can load resources from your site
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/client', clientRoutes); //sidebar menu routes (products, customers, transactions, geography)
app.use('/general', generalRoutes); //user and dashboard/UI
app.use('/management', managementRoutes); //sidebar menu routes (admin, performance)
app.use('/sales', salesRoutes); //sidebar menu routes (overview, daily, monthly, yearly)

// Mongoose setup
const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
		// only need to add data one time so you aren't duplicating/creating errors (reason it is commented out after first connect)
		// User.insertMany(dataUser);
	})
	.catch((err) => {
		console.log(`Error: ${err} ${err.message} - Server did not connect`);
	});
