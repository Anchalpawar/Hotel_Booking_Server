import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


dotenv.config({ path: "./.env" });


const port = process.env.PORT || 5500;

const server = app.listen(port, () => {
    console.log(`App is listening on port: ${port}👌`);
});



//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack, // its gonna give more details about our error
    });
});


//mongodb connection status
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected❌");
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected✔️");
})
//mongodb password and username 
const DB_LINK = process.env.DB.replace("<password>", process.env.DB_Password);
const DB = mongoose.connect(DB_LINK).then(() => {
    console.log('Connected to DB💞');
});
