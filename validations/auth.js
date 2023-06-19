import { body } from 'express-validator'

export const registerValidation = [
	body('email', 'Не правильний формат пошти').isEmail(),
	body('password', 'Не коректний пароль').isLength({ min: 8 }),
	body('userName', "Коротке ім'я користувача").isLength({ min: 3 }),
	body('avatarUrl', 'Силка на аватар не правильного формату')
		.optional()
		.isURL(),
]

export const loginValidation = [
	body('email', 'Не правильний формат пошти').isEmail(),
	body('password', 'Не коректний пароль').isLength({ min: 8 }),
]
