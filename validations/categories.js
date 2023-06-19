import { body } from 'express-validator'

export const categoriesValidation = [
	body('title', 'Коротка довжина заголовку').isLength({ min: 3 }).isString(),
	body('description', 'Закороткий опис').isLength({ min: 5 }).isString(),
]
