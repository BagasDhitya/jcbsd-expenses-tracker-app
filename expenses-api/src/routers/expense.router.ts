import express from "express";
import { ExpenseController } from "../controllers/expense.controller";

const router = express.Router();

/**
 * @openapi
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: Success get all expenses
 */
router.get("/", ExpenseController.getAll);

/**
 * @openapi
 * /api/expenses/{id}:
 *   get:
 *     summary: Get expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success get expense by ID
 *       404:
 *         description: Expense not found
 */
router.get("/:id", ExpenseController.getById);

/**
 * @openapi
 * /api/expenses:
 *   post:
 *     summary: Create new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - nominal
 *               - type
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *               nominal:
 *                 type: number
 *               type:
 *                 type: string
 *                 example: income
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Success create expense
 *       400:
 *         description: Fields are required
 */
router.post("/", ExpenseController.create);

/**
 * @openapi
 * /api/expenses/{id}:
 *   put:
 *     summary: Update expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               nominal:
 *                 type: number
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Success update expense
 *       404:
 *         description: Expense not found
 */
router.put("/:id", ExpenseController.update);

/**
 * @openapi
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Success delete expense
 *       404:
 *         description: Expense not found
 */
router.delete("/:id", ExpenseController.delete);

/**
 * @openapi
 * /api/expenses/report/date-range/total:
 *   get:
 *     summary: Get total expenses within date range
 *     tags: [Expense Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Total expense calculated
 *       400:
 *         description: startDate and endDate are required
 */
router.get("/report/date-range/total", ExpenseController.getTotalByDateRange);

/**
 * @openapi
 * /api/expenses/report/date-range/category:
 *   get:
 *     summary: Get total expenses by category
 *     tags: [Expense Reports]
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Total by category
 *       400:
 *         description: Category is required
 */
router.get("/report/date-range/category", ExpenseController.getTotalByCategory);

export default router;
