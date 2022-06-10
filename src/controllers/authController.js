import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { searchUser, insertToken } from "./../repositories/authRepository.js";

dotenv.config();


export async function signIn (req,res){
   try{
        const {email,password}=req.body;

        const verifyUser= await searchUser(email);
        console.log(verifyUser.rows)

        if(verifyUser.rows.length === 0){
            res.status(401).send("Usuário Inexistente")
        }

        if(!bcrypt.compareSync(password, verifyUser.rows[0].password)){
            res.status(401).send("email ou senha incorretos...");
            return;
        }

        

        const data = {id: verifyUser.rows[0].id, name: verifyUser.rows[0].name}

        const config = { expiresIn: 60*60*24*3} 
        const token= jwt.sign(data ,process.env.ENCRYPTPASSWORD, config);

        await insertToken(verifyUser.rows[0].id,token);

        res.status(200).send(token);
    }
    catch(e){
        console.log(e)
        res.sendStatus(400);
    }
}