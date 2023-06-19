import CategoriesModel from '../models/Categories.js'

export const getCategories = async (req, res) => {
	CategoriesModel.find({
		user: req.userId,
	})
		.exec()
		.then(doc => {
			res.json(doc)
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Не получилось найти категорії',
			})
		})
}

export const getCategoriesName = async (req, res) => {
	CategoriesModel.find({
		user: req.userId,
	})
		.exec()
		.then(doc => {
			res.json(doc.map(el => el.title))
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Не получилось найти категорії',
			})
		})
}

export const createCategories = async (req, res) => {
	try {
		const doc = new CategoriesModel({
			title: req.body.title,
			description: req.body.description,
			user: req.userId,
		})

		const categories = await doc.save()

		res.json(categories)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не получилось створити категорію',
		})
	}
}

export const removeCategories = async (req, res) => {
	const categoriesId = req.params.id

	await CategoriesModel.findOneAndDelete(
		{
			_id: categoriesId,
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
					message: 'Категорія не знайдена',
				})
			}

			res.status(200).json({
				success: true,
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Не получилось видалити категорію',
			})
		})
}

export const updateCategories = async (req, res) => {
	try {
		const categoriesId = req.params.id
		await CategoriesModel.updateOne(
			{
				_id: categoriesId,
			},
			{
				title: req.body.title,
				description: req.body.description,
				user: req.userId,
			},
		)

		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не получилось обновити категорію',
		})
	}
}
