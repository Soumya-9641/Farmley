import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
import connectDB from "./config/db"; 
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import contactRoutes from "./routes/contact.routes";
app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from Vite frontend
      methods: "GET,POST,PUT,DELETE",
      credentials: true, // Allows cookies (if needed)
    })
  );

// Connect to MongoDB
connectDB();


app.get("/", (req, res) => {
    res.send("Welcome to Farmley API");
});
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/contact", contactRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
