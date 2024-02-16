import mongoose from 'mongoose';

const OverallStatSchema = new mongoose.Schema(
	{
		totalCustomers: Number,
		yearlySalesTotal: Number,
		yearlyTotalSoldUnits: Number,
		year: Number,
		monthlyData: [
			{
				month: String,
				totalSales: Number,
				totalUnits: Number,
			},
		],
		dailyData: [
			{
				date: String,
				totalSales: Number,
				totalUnits: Number,
			},
		],
		salesByCatergory: {
			type: Map,
			of: Number,
		},
	},
	{ timestamps: true }, // mongoose auto adds createdAt/updatedAt fields to schema
);

const User = mongoose.model('OverallStat', OverallStatSchema);
export default OverallStat;
