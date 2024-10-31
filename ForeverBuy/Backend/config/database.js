import {PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from "@prisma/extension-accelerate"
//import { addProductsFirstTime } from '../controllers/productController.js';

//can;t use process.env.DATABASE_URL. Wont be able to identify it. You can use that if you wrap client generation in a function and return prismaCLient from that function
const prisma = new PrismaClient({datasourceUrl:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNjcxYWU0MjgtNmE4ZC00ZDhjLWI3OGYtMTE0MjZkNTA2NmRjIiwidGVuYW50X2lkIjoiMThkOTM4ZjJhZWJkOGY5YzliMzcxOTZkOGFhYjYzNDRkOWMyYTcxNDk5MjVmYzQxY2I4NDQ4YjE5ODc5YzQ4YiIsImludGVybmFsX3NlY3JldCI6ImZiOWI4ZTU5LTc5ZmQtNDg1My04YTg2LWNmYmNkODFhZmQ3ZSJ9.Qbu3-_fJu3pSRgHJKDd0coJYE6dzmn9LzH2yyh7Q2eU"}).$extends(withAccelerate());

//prismaClient automatically connects or disconnects to your db when you run your first query or end node.js process
//you can explicity connect and disconnect also

async function connectToDb(){
    try{
        await prisma.$connect();
        console.log('connected to db')
    }
    catch(err){
        console.log('not able to connect to db')
    }
    //addProductsFirstTime();
}

export {connectToDb, prisma}