import mongoose from 'mongoose'

const OperationsSchema = mongoose.Schema(
	{
		nameCategories: {
			type: String,
			required: true,
		},
		typeOperations: {
			type: String,
			required: true,
		},
		sum: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

export default mongoose.model('Operations', OperationsSchema)
