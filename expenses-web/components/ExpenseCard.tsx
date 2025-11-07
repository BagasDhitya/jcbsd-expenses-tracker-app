'use client'
import { Expense } from "@/lib/interface"

export default function ExpenseCard({ expense, onDelete }: { expense: Expense, onDelete: (id: number) => void }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center border">
            <div>
                <h3 className="font-semibold">{expense.title}</h3>
                <p className="text-sm text-gray-600">{expense.category} - {expense.date}</p>
            </div>
            <div className="text-right">
                <p className={`font-bold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {expense.type === 'income' ? '+' : '-'}${expense.nominal}
                </p>
                <button onClick={() => onDelete(expense.id!)} className="text-xs text-red-500 hover:underline mt-1">
                    Delete
                </button>
            </div>
        </div>
    )
}