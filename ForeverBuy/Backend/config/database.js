import {PrismaClient} from '@prisma/client'
import { addProductsFirstTime } from '../controllers/productController.js';
const prisma = new PrismaClient();

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