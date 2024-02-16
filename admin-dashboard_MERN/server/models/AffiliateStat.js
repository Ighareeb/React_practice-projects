import mongoose from 'mongoose';

const AffiliateStatSchema = new mongoose.Schema(
	{
		//stores reference to User document from db - expects ObjectId (special type used by MongoDB for unique identifiers) and the reference collection (User)
		userId: { type: mongoose.Types.ObjectId, ref: 'User' },
		//stores array of references to Transaction documents - check type and ref
		affiliateSales: {
			type: [mongoose.Types.ObjectId],
			ref: 'Transaction',
		},
	},
	{ timestamps: true },
);

const AffiliateStat = mongoose.model('AffiliateStat', AffiliateStatSchema);
export default AffiliateStat;
