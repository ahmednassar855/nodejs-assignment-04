// const express = require('express')
import express from "express"
import userRouter from './src/modules/users/users.router.js'
import categoryRouter from './src/modules/categories/categories.router.js'
import productRouter from './src/modules/products/products.router.js'

const app = express()
const port = 3000

app.use(express.json());

app.use(userRouter)

app.use(categoryRouter)

app.use(productRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))