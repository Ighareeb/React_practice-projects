const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('Connected to mongoDB'))
	.catch((e) => console.log(e));
