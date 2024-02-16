import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		name: String,
		price: Number,
		description: String,
		category: String,
		rating: Number,
		supply: Number,
	},
	{ timestamps: true }, // mongoose auto adds createdAt/updatedAt fields to schema
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
