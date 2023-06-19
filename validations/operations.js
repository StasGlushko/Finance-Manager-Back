import { body } from 'express-validator'

export const operationsValidation = [
	body('nameCategories', 'Коротка довжина заголовку').isLength({ min: 3 }).isString(),
	body('typeOperations').isString(),
	body('sum', 'Число вказано не коректно').isInt(),
	body('description', 'Закороткий опис').isLength({ min: 5 }).isString(),
	body('date').isString(),
]