import { Hono } from "hono";
import { signin,signup } from "../controller/userController";
import { getPrismaClient } from "../config/db";
import { PrismaClient } from "@prisma/client";

type Env = {
    Bindings:{
        DATABASE_URL:string,
        DIRECT_URL:string,
        JWT_SECRET:string
    }
    Variables:{
        prisma:PrismaClient
    }
}

const userRouter = new Hono<Env>();

userRouter.use(async(c,next)=>{
    let prismaClient = getPrismaClient(c.env.DATABASE_URL);
    if(!prismaClient){
        return c.json({success:false, message:'server issue'})
    }
    c.set('prisma', prismaClient);
    await next();
})

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)

export default userRouter
export {Env};