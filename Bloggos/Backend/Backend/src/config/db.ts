//since we are using cloudflare workers we want to have connection pooling as our backend can run from multiple places and our
//db will get connection req from multiple places
import { PrismaClient } from "@prisma/client/edge"
import {withAccelerate} from "@prisma/extension-accelerate"

//generate a prisma client
function getPrismaClient(database_url:string){
    try{
        let prisma = new PrismaClient({datasourceUrl:database_url}).$extends(withAccelerate());
        return prisma;
    }
    catch(err){
        console.log('not able to generate priam client');
        return null;
    }
}

export {getPrismaClient};