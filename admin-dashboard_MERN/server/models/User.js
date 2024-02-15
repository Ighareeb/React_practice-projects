import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			min: 2,
			max: 100,
		},
		email: {
			type: String,
			required: true,
			min: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 5,
		},
		city: String,
		state: String,
		country: String,
		occupation: String,
		phoneNumber: String,
		transaction: Array,
		role: {
			type: String,
			enum: ['user', 'admin', 'superadmin'], //enmum used in mongoose to restrict a field to a specific set of values (in this case no other roles can be added)
			default: 'admin',
		},
	},
	{ timestamps: true }, // mongoose auto adds createdAt/updatedAt fields to schema
);

const User = mongoose.model('User', UserSchema);
export default User;
