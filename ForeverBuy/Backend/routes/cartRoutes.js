import express from 'express'
import { updateCart, getCartData } from '../controllers/cartController.js';
import {authenticate} from '../middleware/auth.js'

const cartRouter = express.Router();

cartRouter.put('/update', authenticate, updateCart);
cartRouter.get('/get', authenticate, getCartData);

export {cartRouter}