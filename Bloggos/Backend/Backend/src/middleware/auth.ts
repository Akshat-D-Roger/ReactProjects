import { Context,Next } from "hono";
import { verify } from "hono/jwt";
import { Env } from "../routes/blogRoute";

async function authorization(c:Context<Env>, next:Next){
    //check if token is present
    let token = c.req.header('token');
    if(!token){
        return c.json({success:false, message:'token not present'}, 401)
    }
    //check if token is valid
    try{
        let {id} = await verify(token, c.env.JWT_SECRET);
        c.set('userId', id as string);
        await next();
    }
    catch(err){
        console.log(`${err}`);
        return c.json({success:false, message:`not able to authenticate:${err}`}, 401)
    }
}

export default authorization