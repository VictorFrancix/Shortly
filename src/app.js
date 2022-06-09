import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());
app.use(express.json());


app.listen(process.env.PORT, () => {
    console.log("Server running on port 4000");
});