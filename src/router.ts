import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/products"
import { body, param } from 'express-validator'
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The product´s name
 *                      example: Monitor curvo de 49 pulgadas
 *                  price: 
 *                      type: number
 *                      description: The product´s price
 *                      example: 250.60
 *                  availability: 
 *                      type: boolean
 *                      description: Whether the product is available or not
 *                      example: true 
 */




/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Returns a list of products registered on the system
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:                                   
 *                                  $ref: '#/components/schemas/Product'
 *   
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by Id
 *          tags:
 *              - Products
 *          description: Returns a product details by Id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve
 *              required: true
 *              schema:
 *                 type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:                               
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found 
 *              400: 
 *                  description: Bad request - Invalid ID              
 *   
 */
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

router.patch('/:id',
    param('id').isInt({ min: 1 }).withMessage('Id no válido'),
    body('availability').isBoolean().withMessage('Campo availability de tipo boolean y obligatorio'),
    handleInputErrors,
    updateAvailability)

router.post('/',
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price').isFloat({ gt: 0 }).withMessage('Sólo números positivos aquí'),
    handleInputErrors,
    createProduct)

router.delete('/:id',
    param('id').isInt({ min: 1 }).withMessage('Id no válido'),
    handleInputErrors,
    deleteProduct)

export default router