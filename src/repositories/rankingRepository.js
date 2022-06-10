import connection from "../data/db.js";

export async function getRankingQuery() {
    await connection.query(`
        SELECT users.id, users.name, COUNT(su.url) as "linksCount",
        COALESCE(SUM(su."visitCount"),0) as "visitCount" FROM "users"
        LEFT JOIN "shortUrls" su
        ON su."userId"=users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;
        `)
}