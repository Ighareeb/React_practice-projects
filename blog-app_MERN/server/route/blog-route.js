const express = require('express');
const blogRouter = express.Router();

const {
	fetchListOfBlogs,
	addNewBlog,
	updateBlog,
	deleteBlog,
} = require('../controller/blog-controller');

//could chain all routes in one blogRouter
blogRouter.get('/', fetchListOfBlogs); //'/api/blogs' is the endpoint
blogRouter.post('/add', addNewBlog); //'/api/blogs/add' is the endpoint
blogRouter.put('/update/:id', updateBlog); //'/api/blogs/update/:id' is the endpoint
blogRouter.delete('/delete/:id', deleteBlog); //'/api/blogs/delete/:id' is the endpoint

module.exports = blogRouter;
