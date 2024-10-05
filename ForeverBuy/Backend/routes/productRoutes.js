import express from 'express'
import {deleteProduct, listProducts, getProduct  } from '../controllers/productController.js';

const productRouter = express.Router();

//productRouter.post('/add', addProduct)
productRouter.post('/delete', deleteProduct)
productRouter.get('/get', getProduct)
productRouter.get('/list', listProducts)

export {productRouter}