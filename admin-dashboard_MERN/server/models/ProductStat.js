import mongoose from 'mongoose';

const ProductStatSchema = new mongoose.Schema(
	{
		productId: Number,
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
	},
	{ timestamps: true }, // mongoose auto adds createdAt/updatedAt fields to schema
);

const ProductStat = mongoose.model('ProductStat', ProductStatSchema);
export default ProductStat;
