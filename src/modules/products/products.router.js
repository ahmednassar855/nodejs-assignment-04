import express  from "express";
import { addProduct, deleteProduct, getAllProductsWithUserAndCategory, searchProductByName, updateProduct } from './products.controller.js';

const router = express.Router();


router.post('/addProduct' , addProduct)
router.post('/deleteProduct' , deleteProduct)
router.post('/updateProduct' , updateProduct)
router.post('/searchProductByName' , searchProductByName)
router.get('/getAllProductsWithUserAndCategory' , getAllProductsWithUserAndCategory)




export default router;