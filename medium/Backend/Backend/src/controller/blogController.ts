import { Context } from "hono";
import { createBlogSchema, updateBlogSchema } from "../../zodValidations";
import { Env } from "../routes/blogRoute";
import { Prisma } from "@prisma/client";
import { verify } from "hono/jwt";

async function createBlog(c:Context<Env>){
    //get title, content and userId and do their validation
    let {title, content} = await c.req.json();
    let userId = c.get('userId');
    let validation = createBlogSchema.safeParse({title, content});
    if(!validation.success){
        return c.json({success:false, message:'invalid title or content'})
    }
    //update the db and push the blog
    let prisma = c.get('prisma');
    try{
        let newPost = await prisma.post.create({
            data:{title, content, authorId:userId}
        })
        return c.json({success:true,blogData:{id:newPost.id, createdAt:newPost.createdAt}})
    }
    catch(err){
        console.log(`${err}`);
        return c.json({success:false, message:`server issue:${err}`})
    }
}

async function updateBlog(c:Context<Env>){
    //get title, content and blogId and authorId(userId) to update and validate them
    let {title, content, blogId} = await c.req.json();
    let initialObj = {};
    if(title)
    initialObj = {...initialObj, title};
    if(content)
    initialObj = {...initialObj, content};
    let validation = updateBlogSchema.safeParse(initialObj);
    if(!validation.success){
        return c.json({success:false, message:'Invalid title or content'})
    }
    let userId = c.get('userId');
    //update the db
    let prisma = c.get('prisma');
    try{
        let updatedPost = await prisma.post.update({
            where:{id:blogId, authorId:userId},
            data:initialObj
        })
        return c.json({success:true, id:updatedPost.id});
    }
    catch(err){
        console.log(`${err}`);
        return c.json({success:false, message:`Server issue:${err}`})
    }
}

async function publishBlog(c:Context<Env>){
    let userId = c.get('userId');
    let {blogId} = await c.req.json();
    let prisma = c.get('prisma');
    try{
        let updatedBlog = await prisma.post.update({
            where:{authorId:userId, id:blogId},
            data:{published:true}
        })
        return c.json({success:true})
    }
    catch(err){
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code==='P2025')
            return c.json({success:false, message:'Blog does not exist'}, 400)
        }
        else{
            console.error(err);
            return c.json({success:false, message:`Not able to publish blog: ${err}`}, 500);
        }
    }
}

async function getBlog(c:Context<Env>){
    //get blogId and authorId
    let blogId = c.req.param('id');
    let prisma = c.get('prisma');
    //get blog from db
    try{
        let blog = await prisma.post.findUnique({
            where:{id:blogId},
            select:{
                id:true,
                title:true,
                content:true,
                published:true,
                createdAt:true,
                authorId:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        if(!blog){
            //blog does not exist
            return c.json({success:false, message:'No such blog exists'}, 404);
        }
        else if(blog.published){
            return c.json({success:true, blog});
        }
        //blog is not published, get userId
        {
            let token = c.req.header('token');
            if(!token){
                return c.json({success:false, message:'This is an unpublished blog! Please authenticate'}, 401);
            }
            try{
                let {id} = await verify(token, c.env.JWT_SECRET);
                c.set('userId', id as string);
            }
            catch(err){
                return c.json({success:false, message:`Not able to authenticate:${err}`}, 401);
            }
        }
        if(blog.authorId===c.get('userId')){
            return c.json({success:true, blog});
        }
        else{
            //not authorised to view blog
            return c.json({success:false, message:'You are not authorised to view the blog'}, 403)
        }
    }   
    catch(err){
        console.error(err);
        return c.json({success:false, message:`Server issue:${err}`}, 500)
    }
}

async function getAllBlogs(c:Context<Env>){
    //get userid
    let userId = c.get('userId');
    let prisma = c.get('prisma');
    //get blogs from db
    try{
        let blogs = await prisma.post.findMany({
            where:{authorId:userId}
        })
        return c.json({success:true, blogs})
    }
    catch(err){
        console.error(err);
        return c.json({success:false, message:`Server issue:${err}`}, 500)
    }
}

async function getPublishedBlogs(c:Context<Env>){
    let prisma = c.get('prisma');
    try{
        let blogs = await prisma.post.findMany({
            where:{
                published:true
            },
            select:{
                id:true,
                title:true,
                content:true,
                published:true,
                createdAt:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({success:true, blogs})
    }
    catch(err){
        console.log(err);
        return c.json({success:false, message:`Server issue: ${err}`}, 500)
    }
}

export {createBlog, updateBlog, getBlog, getAllBlogs, publishBlog, getPublishedBlogs}