const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');

const app = express();

//middleware
app.use(express.json()); // parses req with JSON payloads - allows access to req.body of incoming requests
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/products', productRoute);

mongoose
	.connect(
		//set up mongoDB connection and create URI variable in .env folder
		MONGO_URI,
	)
	.then(() => {
		console.log('Connected to MongoDB');
		//would create PORT variable in .env folder
		app.listen(3000, () => {
			console.log('Server is running on port 3000');
		});
	})
	.catch((err) => {
		console.log('Error: ', err.message);
	});
