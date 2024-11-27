import { Hono } from "hono";
import authorization from "../middleware/auth";
import { getPrismaClient } from "../config/db";
import { PrismaClient } from "@prisma/client";
import { createBlog,updateBlog, getBlog, getAllBlogs, publishBlog, getPublishedBlogs } from "../controller/blogController";

type Env = {
    Bindings:{
        DATABASE_URL:string,
        DIRECT_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string,
        prisma:PrismaClient
    }
}

const blogRouter = new Hono<Env>();

blogRouter.use(async (c, next)=>{
    let prismaClient = getPrismaClient(c.env.DATABASE_URL);
    if(!prismaClient){
        return c.json({success:false, message:'server issue'})
    }
    c.set('prisma', prismaClient);
    await next();
})

blogRouter.post('/', authorization, createBlog)
blogRouter.put('/', authorization, updateBlog)
blogRouter.put('/publish', authorization, publishBlog)
blogRouter.get('/bulk', authorization, getAllBlogs)
blogRouter.get('/publishedBlogs', getPublishedBlogs);
blogRouter.get('/:id', getBlog)

export default blogRouter;
export {Env};