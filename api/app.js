import express from "express";
import connection from "./data/connection.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoute from "./routers/auth.js";
import userRoute from "./routers/user.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//connection to DB
await connection();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
