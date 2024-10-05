import {prisma} from '../config/database.js'

//update cart
async function updateCart(req, res){
    let userId = req.body.id;
    let {cartItems} = req.body.data;
    try{
        let update = await prisma.user.update({
            where:{id:userId},
            data:{cartData:JSON.stringify(cartItems)}
        })
        return res.json({success:true})
    }
    catch(err){
        return res.json({success:false, message:`not able to update cart right now :( : ${err}`})
    }
}

//get cart data
async function getCartData(req, res){
    let userId = req.body.id;
    try{
        let user = await prisma.user.findUnique({
            where:{id:userId}
        })
        if(!user){
            return res.json({success:false, message:`user does not exist`})
        }
        let cartItems = user.cartData;
        if(cartItems===null)
            cartItems = {};
        else        
        cartItems = JSON.parse(cartItems);
        return res.json({success:true, cartItems});
    }
    catch(err){
        return res.json({success:false, message:`not able to fetch cart right now :( : ${err}`})
    }
}

export {updateCart, getCartData}

