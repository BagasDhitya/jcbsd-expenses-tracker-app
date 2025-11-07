import express from 'express'
import cors from 'cors'
import ExpenseRouter from './routers/expense.router'

const app = express()
const PORT = 8000

app.use(cors({
    origin: '*'
}))
app.use(express.json())

app.use('/api/expenses', ExpenseRouter)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})