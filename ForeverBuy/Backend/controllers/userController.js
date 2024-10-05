import { prisma } from "../config/database.js";
import bcrypt from 'bcrypt'
import {z} from 'zod'
import jwt from 'jsonwebtoken'

const newUserSchema = z.object({
    name: z.coerce.string(),
    email:z.string().email(),
    password:z.coerce.string().min(8)
})
const loginSchema = z.object({
    email:z.string().email(),
    password:z.coerce.string().min(8)
})

function createToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//loginUser
async function loginUser(req, res){
    try{
        let {email, password} = req.body
        //validate input
        let validation = loginSchema.safeParse({email, password});
        if(!validation.success){
            return res.status(200).json({success:false, message:'Please enter valid email or password'})
        }
        ({email, password} = validation.data);
        //check if user exists
        let user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return res.status(200).json({success:false, message:'user does not exist'})
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(200).json({success:false, message:'password is incorrect'})
        }
        let id = user.id;
        let token = createToken(id);
        return res.json({success:true,token});
    }
    catch(e){
        return res.status(200).json({success:false, message:`issue in logging in :( : ${e}`})
    }    
}

//registerUser
async function registerUser(req, res){
    try{
        let {name, email, password} = req.body
        //validate input
        let validation = newUserSchema.safeParse({name,email,password});
        if(!validation.success){
            return res.status(200).json({success:false, message:'Please enter valid email or password'})
        }
        ({name, email, password} = validation.data);
        //check if user  exists in db
        let userExisting = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(userExisting){
            return res.status(200).json({success: false, message:'user already exists'})
        }
        //encrypt the pwd
        let salt = await bcrypt.genSalt(10)
        let hashedpwd = await bcrypt.hash(password,salt);
        //register the user in db
        let user = await prisma.user.create({
            data:{
                name, email, password:hashedpwd
            }
        })
        let userId = user.id;
        let token = createToken(userId)
        return res.json({success:true, token})

    }
    catch(e){
        return res.status(200).json({success:false, message:`issue in registering user :( : ${e}`})
    }
} 

export {loginUser, registerUser}