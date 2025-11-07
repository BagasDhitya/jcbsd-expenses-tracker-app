import express from 'express'
import { ExpenseController } from '../controllers/expense.controller'

const router = express.Router()

router.get('/', ExpenseController.getAll)
router.get('/:id', ExpenseController.getById)
router.post('/', ExpenseController.create)
router.put('/:id', ExpenseController.update)
router.delete('/:id', ExpenseController.delete)
router.get('/report/date-range/total', ExpenseController.getTotalByDateRange)
router.get('/report/date-range/category', ExpenseController.getTotalByCategory)

export default router