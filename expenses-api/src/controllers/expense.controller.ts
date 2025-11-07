import { Request, Response } from "express";
import { ExpenseService, readData } from "../services/expense.service";
import { Expense } from "../dto/expense.dto";

export const ExpenseController = {
    getAll(req: Request, res: Response) {
        const data = ExpenseService.getAll()
        res.status(200).send({
            success: true,
            data: data
        })
    },

    getById(req: Request, res: Response) {
        const { id } = req.params
        const expense = ExpenseService.getById(Number(id))

        // jika expense tidak ditemukan
        if (!expense) {
            return res.status(404).send({
                success: false,
                message: 'Expense not found'
            })
        }

        res.status(200).send({
            success: true,
            data: expense
        })
    },

    create(req: Request, res: Response) {
        const { title, nominal, type, category, date }: Expense = req.body

        // validasi body request
        if (!title || !nominal || !type || !category || !date) {
            return res.status(400).send({
                success: false,
                message: 'Fields are required'
            })
        }

        const data = readData()

        const newExpense: Expense = {
            id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
            title: title,
            nominal: nominal,
            type: type,
            category: category,
            date: date
        }

        ExpenseService.create(newExpense)

        res.status(201).send({
            success: true,
            message: 'Success create expense'
        })
    },

    update(req: Request, res: Response) {
        const { id } = req.params
        const updated = ExpenseService.update(Number(id), req.body)

        // validasi jika expense tidak ada
        if (!updated) {
            return res.status(404).send({
                success: false,
                message: 'Expense not found'
            })
        }

        res.status(201).send({
            success: true,
            message: 'Success update expense'
        })
    },

    delete(req: Request, res: Response) {
        const { id } = req.params
        const deleted = ExpenseService.delete(Number(id))

        // validasi jika expense tidak ada
        if (!deleted) {
            return res.status(404).send({
                success: false,
                message: 'Expense not found'
            })
        }

        res.status(201).send({
            success: true,
            message: 'Success delete expense'
        })
    },

    getTotalByDateRange(req: Request, res: Response) {
        const { startDate, endDate } = req.query

        // validasi jika tidak diisi range datenya
        if (!startDate || !endDate) {
            return res.status(400).send({
                success: false,
                message: 'startDate and endDate are required'
            })
        }

        const total = ExpenseService.getTotalByDateRange(String(startDate), String(endDate))
        res.status(200).send({
            success: true,
            data: total
        })
    },

    getTotalByCategory(req: Request, res: Response) {
        const { category } = req.query

        // validasi jika category tidak diisi
        if (!category) {
            return res.status(400).send({
                success: false,
                message: 'Category is required'
            })
        }

        const total = ExpenseService.getTotalByCategory(String(category))
        res.status(200).send({
            success: true,
            data: total
        })
    }
}