import User from '../models/User.js';
import OverallStat from '../models/OverallStat.js';
import Transaction from '../models/Transaction.js';

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: `Error getting user: ${err.message}` });
	}
};

export const getDashboardStats = async (req, res) => {
	try {
		//hardcoded values
		const currentMonth = 'July';
		const currentYear = 2023;
		const currentDay = '2023-07-18';

		// recent transactions
		const transactions = await Transaction.find()
			.limit(50)
			.sort({ createdOn: -1 }); //sort in descending order

		//overall stats
		const overallStat = await OverallStat.find({ year: currentYear });

		const {
			totalCustomers,
			yearlyTotalSoldUnits,
			yearlySalesTotal,
			monthlyData,
			salesByCategory,
		} = overallStat[0];

		const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
			return month === currentMonth;
		});
		const todayStats = overallStat[0].dailyData.find(({ month }) => {
			return date === currentDay;
		});

		res.status(200).json({
			totalCustomers,
			yearlyTotalSoldUnits,
			yearlySalesTotal,
			monthlyData,
			thisMonthStats,
			todayStats,
			transactions,
			salesByCategory,
		});
	} catch (err) {
		res
			.status(404)
			.json({ message: `Error getting dashboard stats: ${err.message}` });
	}
};
