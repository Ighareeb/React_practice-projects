import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import getCountryIso3 from 'country-iso-2-to-3'; //eg getCoutryIso3('us') returns 'USA'

//--------------get Products and stats response array === [ {product, stat}, {product2, stat2} etc ]----------------
export const getProducts = async (req, res) => {
	try {
		//fetch all documents from the Products collection
		const products = await Product.find();
		//Promise.all since we need to fetch stats for all products before response is sent
		const productsWithStats = await Promise.all(
			products.map(async (product) => {
				const stat = await ProductStat.findOne({
					productId: product._id,
				});
				//return new object for each product that includes corresponding stats for it from ProductStat document
				return { ...product._doc, stat };
			}),
		);
		res.status(200).json(productsWithStats);
	} catch (err) {
		res.status(404).json({ message: `Error getting products: ${err.message}` });
	}
};

//--------------get all Customers----------------
export const getCustomers = async (req, res) => {
	try {
		const customers = await User.find({ role: 'user' }).select('-password');
		res.status(200).json(customers);
	} catch (err) {
		res
			.status(404)
			.json({ message: `Error getting customers: ${err.message}` });
	}
};

//--------------get Transactions----------------
export const getTransactions = async (req, res) => {
	try {
		//sort should look like {'field': 'userId', 'sort': 'desc'}
		const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;

		//formatted sort should look like {userId: -1}
		const generateSort = () => {
			const sortParsed = JSON.parse(sort);
			const sortFormatted = {
				[sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1,
			};
			return sortFormatted; //sort object that can be used in mongoose query
		};
		const sortFormatted = Boolean(sort) ? generateSort() : {};
		const transactions = await Transaction.find({
			$or: [
				{ cost: { $regex: new RegExp(search, 'i') } },
				{ userId: { $regex: new RegExp(search, 'i') } },
			],
		})
			.sort(sortFormatted)
			.skip(page * pageSize)
			.limit(pageSize);

		//query on the Transaction model to get the total number of documents that match the search string.
		const total = await Transaction.countDocuments({
			name: { $regex: search, $options: 'i' },
		});

		res.status(200).json({ transactions, total });
	} catch (err) {
		res
			.status(404)
			.json({ message: `Error getting transactions: ${err.message}` });
	}
};

//----get User Location === result is an object where the keys are ISO3 country codes and the values are the counts of users from each country.-----
export const getGeography = async (req, res) => {
	try {
		const users = await User.find();

		const mappedLocations = users.reduce((acc, { country }) => {
			const countryISO3 = getCountryIso3(country);
			//If acc[countryISO3] doesn't exist (which means this is the first user from this country), it's initialized to 0.
			if (!acc[countryISO3]) {
				acc[countryISO3] = 0;
			}
			acc[countryISO3]++;
			return acc;
		}, {});
		//convert mappedLocations object into array of arrays where each sub-array === key:value pair from the object
		const formattedLocations = Object.entries(mappedLocations).map(
			([country, count]) => {
				return { id: country, value: count }; //return new object
			},
		);
		res.status(200).json(formattedLocations);
	} catch (err) {
		res.status(404).json({ message: `Error getting location: ${err.message}` });
	}
};
