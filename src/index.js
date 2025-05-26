import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Swagger (documentación dummy por ahora)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup({}, { explorer: true }));

app.get("/", (req, res) => res.send("VitalShanti Backend Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
