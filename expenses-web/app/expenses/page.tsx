'use client'
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Expense } from "@/lib/interface"
import ExpenseCard from "@/components/ExpenseCard"
import ExpenseForm from "@/components/ExpenseForm"

export default function Expenses() {
    const [expenses, setExpense] = useState<Expense[]>([])

    async function getExpense() {
        const response = await api.get('/')
        setExpense(response.data.data)
    }

    async function handleDelete(id: number) {
        await api.delete(`/${id}`)
        getExpense()
    }

    useEffect(() => {
        getExpense()
    }, [])


    return (
        <div className="space-y-6">
            <ExpenseForm onCreated={getExpense} />
            <div className="space-y-6">
                {expenses && expenses?.map((exp) => (
                    <ExpenseCard
                        key={exp.id}
                        expense={exp}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    )
}
