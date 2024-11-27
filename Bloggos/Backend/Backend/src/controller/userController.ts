//signIn and signUp functins
import { Context } from "hono";
import { signinSchema, signupSchema } from "../../zodValidations";
import { sign } from "hono/jwt";
import { Env } from "../routes/userRoute";

async function signin(c:Context<Env>){
    //zod validation of inputs
    let {email, password} = await c.req.json();
    let validation = signinSchema.safeParse({email, password});
    if(!validation.success){
        return c.json({success:false, message:'validation failed'})
    }
    ({email, password} = validation.data);
    //check if email exists
    let prisma = c.get('prisma');

    let isPresent = null;
    try{
        isPresent = await prisma.user.findUnique({
            where:{email}
        })
    }
    catch(err){
        console.log(`${err}`)
        return c.json({success:false, message:`server issue:${err}`})
    }
    if(!isPresent){
        return c.json({success:false, message:'user does not exist'})
    }

    //check if password is correct
    if(isPresent.password!==password){
        return c.json({success:false, message:'incorrect password'})
    }
    try{
        let token = await sign({id:isPresent.id}, c.env.JWT_SECRET);
        return c.json({success:true, token, user:{name:isPresent.name, email:isPresent.email}})
    }
    catch(err){
        console.log(`${err}`);
        return c.json({success:false, message:`issue with jwt:${err}`})
    }
    //create a new token and send
}

async function signup(c:Context<Env>){
    //zod validation of inputs
    let {name, email, password} = await c.req.json();
    let validation = signupSchema.safeParse({name, email, password});
    if(!validation.success){
        return c.json({success:false, message:'validation failed'})
    }
    ({name, email, password} = validation.data);
    //check if email exists
    let prisma = c.get('prisma');

    let isPresent = null;
    try{
        isPresent = await prisma.user.findUnique({
            where:{email}
        })
    }
    catch(err){
        console.log(`${err}`)
        return c.json({success:false, message:`server issue:${err}`})
    }
    if(isPresent){
        return c.json({success:false, message:'user exists'})
    }

    //create account
    let id:string
    try{
        let newUser = await prisma.user.create({
            data:{name, email, password, posts:{create:[]}}
        })
        id = newUser.id;
    }
    catch(err){
        return c.json({success:false, message:`server issue: not able to create account: ${err}`})
    }
    //create a new token and send
    try{
        let token = await sign({id}, c.env.JWT_SECRET);
        return c.json({success:true, token, user:{name, email}})
    }
    catch(err){
        console.log(`${err}`);
        return c.json({success:false, message:`issue with jwt:${err}`})
    }
}


export {signin, signup}