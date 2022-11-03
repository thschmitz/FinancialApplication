import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import subRoutes from "./routes/subtitle.js";
import actionRoutes from "./routes/transaction.js";

const PORT = process.env.PORT || 5000
const app = express();

dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB!")
    }).catch((err) => {
        throw err;
    })
}

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cookieParser());
app.use(express.json()); // Allow the application to see the request with json format

app.use("/api/auth", authRoutes);
app.use("/api/sub", subRoutes);
app.use("/api/action", actionRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(PORT, () => {
    connect();
    console.log("Application running on port", PORT)
})