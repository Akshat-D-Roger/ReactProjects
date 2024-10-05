import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

//api endpoints

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

export {userRouter}