const mongoose = require('mongoose');
const Blog = require('../model/Blog');

// CRUD operations for blogs

const fetchListOfBlogs = async (req, res) => {
	let blogList;
	try {
		blogList = await Blog.find();
	} catch (err) {
		console.log(err);
	}
	if (!blogList) {
		return res.status(404).json({ message: 'No blogs found to fetch' });
	}
	return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
	const { title, description } = req.body;
	const currentDate = new Date();

	const newBlog = new Blog({
		title,
		description,
		data: currentDate,
	});
	try {
		await newBlog.save();
		return res.status(201).json({ message: 'Blog added successfully' });
	} catch (err) {
		console.log(`Error adding Blog ${err}`);
	}
	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await newBlog.save(session);
		await session.commitTransaction();
	} catch (err) {
		return res.status(500).json({ message: 'Failed to add blog' });
	}
	return res
		.status(200)
		.json({ message: `${newBlog} - Blog added successfully` });
};

const deleteBlog = async (req, res) => {
	const id = req.params.id;
	try {
		const blogToDelete = await Blog.findByIdAndDelete(id);
		if (!blogToDelete) {
			return res.status(404).json({ message: 'Blog to Delete not found' });
		}
		return res
			.status(200)
			.json({ message: `${blogToDelete} - Blog deleted successfully` });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Failed to delete blog' });
	}
};
const updateBlog = async (req, res) => {
	const id = req.params.id;
	const { title, description } = req.body;
	let blogToUpdate;
	try {
		blogToUpdate = await Blog.findByIdAndUpdate(id, { title, description });
	} catch (err) {
		return res.status(500).json({ message: 'Failed to update blog' });
	}
	if (!blogToUpdate) {
		return res.status(404).json({ message: 'Blog to update not found' });
	}
	return res
		.status(200)
		.json({ message: `${blogToUpdate} - Blog updated successfully` });
};

module.exports = { fetchListOfBlogs, addNewBlog, updateBlog, deleteBlog };
