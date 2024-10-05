import {products} from "../assets/assets.js";
import path from 'path';
import { fileURLToPath } from 'url';
import {v2 as cloudinary} from 'cloudinary'
import { prisma } from "../config/database.js";

//add Product
async function addProduct(req, res){
    let {name, description, price, category, subCategory, bestSeller, sizes} = req.body;
    //assume you got the images through mutler and have their full path in body
    let {image} = req.body;
    //upload image to cloudinary
    image = await Promise.all(image.map((item)=>uploadToCloudinary(item)));
    image = image.filter(item=>item!==null);
    //upload to db
    try{
        let upload = await prisma.product.create({
            data:{name, description, price, category, subCategory, bestSeller, sizes, image, date:Date.now()},
            select:{id:true}
        })
        return res.json({success:true})
    }
    catch(err){
        return res.json({success:false, message:`unable to upload to db: ${err}`})
    }
}

//listProduct
async function listProducts(_, res){
    try{
        //returns empty array if no product found
        let allProducts = await prisma.product.findMany({
            where:{}
        })
        return res.json({products:allProducts, success:true})
    }
    catch(e){
        return res.status(200).json({success:false, message:`Error in retrieving products: ${e}`})
    }
}

//deleteProduct
async function deleteProduct(req, res){
    try{
        let id = req.query.id
        //throws an exception if not found
        let deletedProduct = await prisma.product.delete({
            where:{id}
        })
        return res.json({success:true, deletedProduct})
    }
    catch(e){
        res.status(200).json({success:false, message:`Error in deleting product: ${e}`})
    }
}

//getProduct
async function getProduct(req, res){
    try{
        let id = req.query.id;
        //throws exception if not found
        let product = await prisma.product.findUniqueOrThrow({
            where:{id}
        })
        return res.json({success:true, product});
    }
    catch(e){
        return res.status(200).json({success:false, message:`Error in finding product: ${e}`})
    }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function uploadToCloudinary(path){
    try{
        let url = await cloudinary.uploader.upload(path, {resource_type:'image'});
        return url.secure_url
    }
    catch(e){
        console.log(`not able to upload ${path} on cloudinary: ${e}`);
        return null;
    }
}

async function getProductsWithImageLinks(products){
    return Promise.all(products.map(async (product)=>{
        let {image} = product;
        let imagePath = image.map(item=>{
            const __filename = fileURLToPath(import.meta.url);
            let dirName = path.dirname(path.dirname(__filename));
            let imagePath = path.join(dirName, 'assets', item)
            return imagePath;
        })
        let imageLinks = await Promise.all(imagePath.map((path)=>uploadToCloudinary(path)));
        image = imageLinks.filter(link=>link!==null);
        let productCopy = {...product, image};
        return productCopy;
    }))
}

async function uploadToDb(products){
    try{
        products = products.map(product=>{
            product.date = Date.now().toString();
            return product;
        })
        let upload = await prisma.product.createManyAndReturn({
            data:products,
            select:{id:true}
        });
        console.log(upload)
        console.log(upload.length);
    }
    catch(e){
        console.log(`not able to upload products to db: ${e}`);
    }
}

async function addProductsFirstTime(){
    let productsWithImageLinks = await getProductsWithImageLinks(products);
    await uploadToDb(productsWithImageLinks)
}


export {listProducts, deleteProduct, getProduct, addProductsFirstTime}

