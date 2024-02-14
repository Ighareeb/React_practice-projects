const express = require('express');
const cors = require('cors'); //provides middleware for cross-origin resource sharing *see note below
const blogRouter = require('./route/blog-route');

require('./db');

const app = express();
app.use(cors());
app.use(express.json()); //based on body-parser middleware - parses incoming request with JSON payloads and stores parsed JSON in req.body
//i.e. everytime a request is sent to server, it will be parsed and stored in req.body which is necessary to send JSON data to server

app.use('/api/blogs', blogRouter);

app.use('/api', (req, res) => {
	res.status(200).json({ message: 'API is working...' });
});

app.listen(5000, () => console.log('App is running on port 5000'));

//NOTE: {CORS}
// https://expressjs.com/en/resources/middleware/cors.html#:~:text=CORS%20is%20a%20node.js,enable%20CORS%20with%20various%20options.
//cors: mecahanism that allows many resources on webpage (eg. JS, CSS, HTML) to be requested from another domain outside the domain where resource originated. CORS defines way in which browser and server can interact to determine whether it is safe to allow the cross-origin request.
//allows for more functionality/flexibilty than same-origin requests, but is more secure than allowing all-cross-origin requests since the server specifies who can access resources + which HTTP methods are allowed from each origin
//this is done by configuring CORS (standard is to create object corsOptions, and then pass it to cors() as an argument in app.use() function or a specific route )
