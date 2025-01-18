import { Router } from "express"
import { createProduct, getProductById, getProducts, updateProduct } from "./handlers/products"
import { body, param } from 'express-validator'
import { handleInputErrors } from "./middleware"

const router = Router()

//Definición de las rutas
router.get('/', getProducts)

router.get('/:id',
    param('id').isInt({ min: 1 }).withMessage('Id no válido'),
    handleInputErrors,
    getProductById)

router.put('/:id',
    param('id').isInt({ min: 1 }).withMessage('Id no válido'),
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price').isFloat({ gt: 0 }).withMessage('Sólo números positivos aquí'),
    handleInputErrors,
    updateProduct)

router.post('/',
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price').isFloat({ gt: 0 }).withMessage('Sólo números positivos aquí'),
    handleInputErrors,
    createProduct)

export default router