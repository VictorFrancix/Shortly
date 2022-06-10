import chalk from "chalk";
import { getRankingQuery } from "../repositories/rankingRepository.js";

export async function getRanking(req,res){
    try{
        const ranking = await getRankingQuery();

        if(!ranking) return res.sendStatus(400);

        if(ranking.rowCount === 0) return res.sendStatus(404);
        res.status(200).send(ranking.row)
    }
    catch(e) {
        console.log(chalk.red(`${e}`));
        res.status(500).send(e.message)
    }
    

}