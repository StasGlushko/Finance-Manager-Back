import OperationsModel from '../models/Operations.js'

export const getOperations = async (req, res) => {
	OperationsModel.find({
		user: req.userId,
	})
		.exec()
		.then(doc => {
			res.json(doc)
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Не получилось найти операції',
			})
		})
}

export const createOperations = async (req, res) => {
	try {
		const doc = new OperationsModel({
			nameCategories: req.body.nameCategories,
			typeOperations: req.body.typeOperations,
			sum: req.body.sum,
			description: req.body.description,
			date: req.body.date,
			user: req.userId,
		})

		const Operations = await doc.save()

		res.json(Operations)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не получилось створити операцію',
		})
	}
}

export const removeOperations = async (req, res) => {
	const OperationsId = req.params.id

	await OperationsModel.findOneAndDelete(
		{
			_id: OperationsId,
		},
		// (err, doc) => {
		// 	if (err) {
		// 		console.log(err)
		// 		return res.status(500).json({
		// 			message: 'Не получилось видалити категорію',
		// 		})
		// 	}

		// 	if (!doc) {
		// 		return res.status(404).json({
		// 			message: 'Категорія не знайдена',
		// 		})
		// 	}

		// 	res.json({
		// 		success: true,
		// 	})
		// },
	)
		.exec()
		.then(doc => {
			if (!doc) {
				return res.status(404).json({
					message: 'Операція не знайдена',
				})
			}

			res.status(200).json({
				success: true,
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Не получилось видалити операцію',
			})
		})
}

export const updateOperations = async (req, res) => {
	try {
		const OperationsId = req.params.id
		await OperationsModel.updateOne(
			{
				_id: OperationsId,
			},
			{
				nameCategories: req.body.nameCategories,
				typeOperations: req.body.typeOperations,
				sum: req.body.sum,
				description: req.body.description,
				date: req.body.date,
				user: req.userId,
			},
		)

		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не получилось обновити операцію',
		})
	}
}
