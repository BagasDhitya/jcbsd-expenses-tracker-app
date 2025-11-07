import fs from 'fs'
import path from 'path'
import { Expense } from '../dto/expense.dto'

const dataPath = path.join(__dirname, '../../dummy/expenses.json')

// helper : read data
export function readData(): Expense[] {
    const data = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(data)
}

// helper : write data
export function writeData(expense: Expense[]): void {
    fs.writeFileSync(dataPath, JSON.stringify(expense, null, 2))
}

export const ExpenseService = {
    getAll(): Expense[] {
        return readData()
    },

    getById(id: number): Expense | undefined {
        const data = readData()
        return data.find((exp) => exp.id === id)
    },

    create(newExpense: Expense): Expense {
        const data = readData()
        data.push(newExpense)
        writeData(data)
        return newExpense
    },

    update(id: number, updatedExpense: Partial<Expense>): Expense | null {
        const data = readData()
        const index = data.findIndex((exp) => exp.id === id)

        // jika expense tidak ditemukan
        if (index === -1) {
            return null
        }

        data[index] = { ...data[index], ...updatedExpense }
        writeData(data)
        return data[index]
    },

    delete(id: number): boolean {
        const data = readData()
        const filtered = data.filter((exp) => exp.id !== id)

        // jika panjang data yang difilter sama dengan data aslinya
        if (filtered.length === data.length) {
            return false
        }

        writeData(filtered)
        return true
    },

    getTotalByDateRange(startDate: string, endDate: string): number {
        const data = readData()
        const total = data
            .filter((exp) => exp.type === 'expense')
            .filter((exp) => exp.date >= startDate && exp.date <= endDate)
            .reduce((sum, exp) => sum + exp.nominal, 0)

        return total
    },

    getTotalByCategory(category: string): number {
        const data = readData()
        const total = data
            .filter((exp) => exp.type === 'expense' && exp.category === category)
            .reduce((sum, exp) => sum + exp.nominal, 0)

        return total
    }

}