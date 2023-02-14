import express  from "express";
import { addCategory, DeleteCategory, getALlCategories, getAllCategoriesWithAllStores, gettAllCateoriesPerStore, updateCategory } from './categories.controller.js';


const router = express.Router();

router.post('/store/addCategory' , addCategory);
router.post('/store/updateCategory' , updateCategory);
router.post('/store/DeleteCategory' , DeleteCategory);
router.get('/getAllCategories' , getALlCategories);

router.post('/gettAllCateoriesPerStore' , gettAllCateoriesPerStore);
router.post('/getAllCategoriesWithAllStores' , getAllCategoriesWithAllStores);




export default router;