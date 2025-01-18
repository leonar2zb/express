import { Router } from "express"
import { createProduct, getProducts } from "./handlers/products"
import { body } from 'express-validator'
import { handleInputErrors } from "./middleware"

const router = Router()

//Definición de las rutas
router.get('/', getProducts)

router.post('/',
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price').isFloat({ gt: 0 }).withMessage('Sólo números positivos aquí'),
    handleInputErrors,
    createProduct)

export default router