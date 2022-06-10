import connection from "../data/db.js";

export async function insertUrls(userId, url, shortUrl){
    await connection.query(`
    INSERT INTO "shortUrls"
    ("userId",url,"shortUrl")
    VALUES ($1,$2,$3)
    `,[userId,url,shortUrl]);
}

export function getUrl(param, value) {
    return connection.query(`SELECT * FROM "shortUrls" 
    WHERE "${param}" = $1`, [value]);
  }

  export function addVisitCount(param, value) {
    return connection.query(`UPDATE "shortUrls" SET "visitCount" = "visitCount" + 1 WHERE "${param}" = $1`, [value]);
  }