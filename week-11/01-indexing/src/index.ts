import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const FindUser = async(firstname:string, lastname:string)=>{
    const before = Date.now();
    const res = await client.user.findMany({
        where: {firstname,lastname}
    })
    const after = Date.now();
    console.log(`Time to find this id : ${after - before}ms (With Indexing)`);
}

FindUser('Shiva','Gupta');