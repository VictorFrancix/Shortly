import chalk from "chalk";
import { loginSchema } from "../schemas/authSchema.js";

export async function validateSignIn(req, res, next) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });
    next();
  } catch (err) {
    console.log(chalk.red(`ERROR VALIDATING DATA: ${err}`));
    res.status(500).send({ error: err.message });
  }
}
