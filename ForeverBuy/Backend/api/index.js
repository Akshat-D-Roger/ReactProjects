//npm install express, cors, validator (input validation from user), jsonwebtoken, dotenv (to access environment variables), 
//bcrypt(encrypt password), nodemon (restart server on changes), cloudinary (for image storage on cloud)

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectToDb } from '../config/database.js';
import { connectToCloudinary } from '../config/cloudinary.js';
import { userRouter } from '../routes/userRouter.js';
import { productRouter } from '../routes/productRoutes.js';
import { cartRouter } from '../routes/cartRoutes.js';
dotenv.config()

const app = express();  
// const port = process.env.PORT || 3000;
connectToDb();
connectToCloudinary();

//middleware
app.use(express.json())
app.use(cors());
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

// app.listen(port, ()=>{console.log('listening on port '+ port)}) 

export default app