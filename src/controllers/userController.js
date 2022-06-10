import chalk from "chalk";
import { newUser } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
    const { name, email, password} = req.body;
    const hashPassword= bcrypt.hashSync(password,10);
    try{
       await newUser(name, email, hashPassword);
        res.status(201).send({message: "User created successfully"});
    } catch(err){
        console.log(chalk.red(`ERROR CREATING USER: ${err}`));

        if(err.message.includes("duplicate key value violates unique constraint"))
            return res.status(409).send({error: "User already exists"});

        res.status(500).send({error: err.message});
    }
}