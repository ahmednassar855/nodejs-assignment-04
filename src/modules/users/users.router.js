import express  from "express";
import { getAllUsers, signin, signup } from './users.controller.js';

const router = express.Router();

router.post('/users/signup' , signup)
router.post('/users/signin' , signin)
router.post('/users/getAllUsers' , getAllUsers)


export default router;