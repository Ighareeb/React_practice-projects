import express from 'express';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
//cloudinary =cloud service solution for image and video management, including uploads, transformations, optimizations, and delivery.
//NOT SET UP -->  https://cloudinary.com/documentation/how_to_integrate_cloudinary

import Post from '../mongodb/models/post';

dotenv.config();

const router = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
	try {
		const posts = await Post.find({});
		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(500).json({ success: false, message: 'Fetching posts failed' });
	}
});

router.route('/').post(async (req, res) => {
	try {
		const { name, prompt, photo } = req.body;
		const photoUrl = await cloudinary.uploader.upload(photo);

		const newPost = await Post.create({
			name,
			prompt,
			photo: photoUrl.url,
		});
		res.status(200).json({ success: true, data: newPost });
	} catch (err) {
		res.status(500).json({ success: false, message: 'Unable to create post' });
	}
});
export default router;
