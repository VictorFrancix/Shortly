import connection from "../data/db.js";
import { nanoid } from "nanoid";
import { insertUrls, getUrl } from "../repositories/urlsRepository.js";


export async function createShortUrl (req, res) {
    try {
        const {email } = res.locals.user;
        const {url} = req.body
        const shortUrl = nanoid(8);
        const searchUser = await connection.query(`
        SELECT users.id FROM "users" 
        WHERE email= $1
        `,[email]);

        console.log(searchUser.rows)
        const userId = searchUser.rows[0].id; 
        
        await insertUrls(userId, url, shortUrl);
        
        res.status(201).send({ shortUrl })
    }
    catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}

export async function findShortUrl (req,res){
    const {id}=req.params;
    if(!id) return res.sendStatus(409);
    
    try{
    
        const findShort= await getUrl("id", id)

        if(findShort.rowCount === 0) return res.sendStatus(404);
        res.status(200).send(findShort.rows[0]);

    }
    catch(e){
        console.log(e.message)
        res.status(400).send(e.message);
    }
}