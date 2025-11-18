import express from "express";
import cors from "cors";
import ExpenseRouter from "./routers/expense.router";

// untuk dokumentasi API menggunakan SWAGGER
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/expenses", ExpenseRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // endpoint untuk akses Swagger

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
