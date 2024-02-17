const Product = require('../models/product.model');

const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (err) {
		res
			.status(500)
			.json({ message: `Error: ${err} - Could not retrieve products` });
	}
};
const getProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (err) {
		res
			.status(500)
			.json({ message: `Error: ${err} - Could not retrieve product` });
	}
};
const createProduct = async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);
		res.status(201).json(newProduct);
	} catch (err) {
		res
			.status(500)
			.json({ message: `Error: ${err} - Could not create product` });
	}
};
const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
		res.status(200).json(updatedProduct);
	} catch (err) {
		res
			.status(500)
			.json({ message: `Error: ${err} - Could not update product` });
	}
};
const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedProduct = await Product.findByIdAndDelete(id);
		res.status(200).json(deletedProduct);
	} catch (err) {
		res
			.status(500)
			.json({ message: `Error: ${err} - Could not delete product` });
	}
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
