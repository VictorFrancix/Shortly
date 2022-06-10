import express from "express";
import cors from "cors";
import chalk from "chalk";

import authRouter from "./routers/authRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);


app.listen(process.env.PORT, () => {
    console.log(chalk.blue("Server running on port 4000"));
});