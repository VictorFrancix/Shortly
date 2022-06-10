import connection from "../data/db.js";
import { nanoid } from "nanoid";
import { insertUrls } from "../repositories/urlsRepository.js";


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