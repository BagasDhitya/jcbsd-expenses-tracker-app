import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense API Documentation",
      version: "1.0.0",
      description: "Dokumentasi API untuk manajemen pengeluaran (Expense)",
    },
  },
  apis: ["./src/routers/*.ts"], // lokasi router
};

export const swaggerSpec = swaggerJSDoc(options);
