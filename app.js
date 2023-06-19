import express from 'express'
import mongoose from 'mongoose'
import { loginValidation, registerValidation } from './validations/auth.js'
import { categoriesValidation } from './validations/categories.js'
import { operationsValidation } from './validations/operations.js'
import handleValidationErrors from './utils/handleValidationErrors.js'
import cors from 'cors'

import checkAuth from './utils/checkAuth.js'
import { login, register, authMe } from './controllers/UserController.js'
import {
	createCategories,
	removeCategories,
	updateCategories,
	getCategories,
	getCategoriesName,
} from './controllers/CategoriesController.js'
import {
	createOperations,
	getOperations,
	removeOperations,
	updateOperations,
} from './controllers/OperationsController.js'

mongoose
	.connect(
		'mongodb+srv://stanislavshlushko:Stas2004G@cluster0.lz8201q.mongodb.net/?retryWrites=true&w=majority',
	)
	.then(() => {
		console.log('DB ok')
	})
	.catch(err => {
		console.log(`DB error - ${err}`)
	})

const PORT = 3001

const app = express()

app.use(express.json())
app.use(cors())

// Auth
app.post('/auth/login', loginValidation, login)
app.post('/auth/register', registerValidation, register)
app.get('/auth/me', checkAuth, authMe)

// Categories
app.get('/categories', checkAuth, getCategories)
app.get('/categories-name', checkAuth, getCategoriesName)
app.post(
	'/categories',
	checkAuth,
	categoriesValidation,
	// handleValidationErrors,
	createCategories,
)
app.delete('/categories/:id', checkAuth, removeCategories)
app.patch(
	'/categories/:id',
	checkAuth,
	categoriesValidation,
	// handleValidationErrors,
	updateCategories,
)
// Operations
app.get('/operations', checkAuth, getOperations)

app.post(
	'/operations',
	checkAuth,
	operationsValidation,
	// handleValidationErrors,
	createOperations,
)
app.delete('/operations/:id', checkAuth, removeOperations)
app.patch(
	'/operations/:id',
	checkAuth,
	operationsValidation,
	// handleValidationErrors,
	updateOperations,
)

//

app.listen(PORT, err => {
	console.log(err ? err : `Server started on port ${PORT}`)
})
