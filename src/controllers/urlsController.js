import connection from "../data/db.js";
import { searchUser } from "../repositories/authRepository.js";
import { nanoid } from "nanoid";
import { insertUrls, getUrl, addVisitCount } from "../repositories/urlsRepository.js";


export async function createShortUrl (req, res) {
    try {
        const {email } = res.locals.user;
        const {url} = req.body
        const shortUrl = nanoid(8);
        const searchuser = await searchUser(email);

        console.log(searchuser.rows)
        const userId = searchuser.rows[0].id; 
        
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

export async function openUrl (req,res){
    const {shortUrl}=req.params;
    if(!shortUrl) return res.sendStatus(400);

    try{

    const findShort= await getUrl("shortUrl", shortUrl);

    if(findShort.rowCount === 0) return res.sendStatus(404);

    let contador= findShort.rows[0].visitCount;
    contador++ 

    await addVisitCount("shortUrl", shortUrl)

    res.redirect(200,findShort.rows[0].url);
    } catch(e){
        res.sendStatus(400);
    }
}

export async function deleteUrl (req,res){
    const {email} = res.locals.user
    const ParamId=req.params.id;
    if(!ParamId) return res.sendStatus(400);
    try{
    const findUser= await connection.query(`
    SELECT  users.id as "mainId", short.id, short."userId" FROM "users"
    JOIN "shortUrls" su ON su."userId"=users.id
    JOIN "shortUrls" short ON short.id= $1
    WHERE email= $2
    LIMIT 1;
    `,[ParamId,email]);
    if(findUser.rowCount === 0) return res.sendStatus(404);
    if(findUser.rows[0].mainId !== findUser.rows[0].userId) return res.sendStatus(401);
    const deleteUrl= connection.query(`
    DELETE FROM "shortUrls"
    WHERE id=$1
    `,[ParamId])
    
    res.sendStatus(204);
    } catch(e){
        res.sendStatus(400);
    }
}

export async function findShortsUsers (req,res){
    const idUser=req.params.id;
    const ParamId= parseInt(idUser)
    if(!ParamId || typeof(ParamId) !== "number") return res.sendStatus(401);
    try{
    const  userData= await connection.query(`
    SELECT users.id,users.name, sum(su."visitCount") AS "visitCount" FROM "users"
    JOIN "shortUrls" su ON su."userId"=users.id
    WHERE users.id= $1
    GROUP BY users.id;
    `,[ParamId]);
    if(userData.rowCount === 0) return res.sendStatus(404);
    const userShorts= await connection.query(`
    SELECT "shortUrls".id, "shortUrls"."shortUrl",
    "shortUrls".url, "shortUrls"."visitCount"
    FROM "shortUrls"
    WHERE "userId"=$1;
    `,[ParamId]);

    let userInfo =  userData.rows[0] ;
    res.status(200).send({...userInfo,"shortenedUrls":userShorts.rows});
    }catch(e){
        res.sendStatus(500);
    }
}