import express from 'express';
import dotenv from 'dotenv';
import { Configuration, OpenAI } from 'openai';

dotenv.config();

const router = express.Router();

//OpenAI not set up
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

router.route('/').get((req, res) => {
	res.status(200).json({ message: 'Welcome to AI Image Generation App' });
});

router.route('/').post(async (req, res) => {
	try {
		const { prompt } = req.body;

		//note openai.createImage function does not work with newer versions of openai
		//https://platform.openai.com/docs/api-reference/images/create
		const aiResponse = await openai.createImage({
			prompt,
			n: 1,
			size: '1024x1024',
			response_format: 'b64_json',
		});

		// const image = aiResponse.data.data[0].b64_json;
		const image = aiResponse.data[0].b64_json;
		res.status(200).json({ photo: image });
	} catch (err) {
		console.error(err);
		//need to double check error handling
		//const errorMessage = err.res && err.res.data && err.res.data.err ? err.res.data.err.message : 'Something went wrong';
		res.status(500).send(err?.res.data.err.message || 'Something went wrong');
	}
});

export default router;
