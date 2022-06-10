import chalk from "chalk";
import bcrypt from "bcrypt";

export function validatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword)
        return res.status(422).send({ error: "Passwords do not match" });

    next();
}
