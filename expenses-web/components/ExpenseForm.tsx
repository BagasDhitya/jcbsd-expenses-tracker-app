'use client'

import { useState } from "react"
import { api } from "@/lib/api"
import { Expense } from "@/lib/interface"

export default function ExpenseForm({ onCreated }: { onCreated: () => void }) {
    const [form, setForm] = useState<Expense>({
        title: '',
        nominal: 0,
        type: 'expense',
        category: 'food',
        date: ''
    })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        await api.post('/', {
            title: form.title,
            nominal: Number(form.nominal),
            type: form.type,
            category: form.category,
            date: form.date
        })

        // reset form
        setForm({
            title: '',
            nominal: 0,
            type: 'expense',
            category: 'food',
            date: ''
        })

        // panggil callback untuk refresh data
        onCreated()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-6 space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-800 text-center">Add New Expense</h2>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Title</label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Makan Siang"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Nominal</label>
                <input
                    type="number"
                    value={form.nominal}
                    onChange={(e) => setForm({ ...form, nominal: Number(e.target.value) })}
                    placeholder="e.g. 50000"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Type</label>
                <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Category</label>
                <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as 'salary' | 'food' | 'transport' })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                >
                    <option value="salary">Salary</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                </select>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Date</label>
                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
                Save Expense
            </button>
        </form>
    )
}
