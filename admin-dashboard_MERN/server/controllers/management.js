import mongoose from 'mongoose';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const getAdmins = async (req, res) => {
	try {
		const admins = await User.find({ role: 'admin' }).select('-password');
		res.status(200).json(admins);
	} catch (err) {
		res.status(404).json({ message: `Error getting admins: ${err.message}` });
	}
};

export const getUserPerformance = async (req, res) => {
	try {
		const { id } = req.params;

		//userWithStats === array of user documents, each with its corresponding affiliate stats. If the affiliateStats array has multiple elements, there will be multiple documents for the same user, each with a different affiliate stat.
		const userWithStats = await User.aggregate([
			//filter to only include user with specific id
			{ $match: { _id: new mongoose.Types.ObjectId(id) } },
			//left outer join to affiliatestats collection. The matching documents from the affiliatestats collection are added into an array in the User document under the affiliateStats field.
			{
				$lookup: {
					from: 'affiliatestats',
					localField: '_id',
					foreignField: 'userId',
					as: 'affiliateStats',
				},
			},
			//deconstructs the affiliateStats array field from the input documents to output a document for each element. Each output document replaces the array with an element value.
			{ $unwind: '$affiliateStats' },
		]);

		const saleTransactions = await Promise.all(
			userWithStats[0].affiliateStats.affiliateSales.map((id) => {
				return Transaction.findById(id);
			}),
		);
		const filteredSaleTransactions = saleTransactions.filter(
			(transaction) => transaction !== null,
		);

		res
			.status(200)
			.json({ user: userWithStats[0], sales: filteredSaleTransactions });
	} catch (err) {
		res
			.status(404)
			.json({ message: `Error getting user performance: ${err.message}` });
	}
};
