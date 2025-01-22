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

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product by Id
 *          tags:
 *              - Products
 *          description: Updates the product´s information given its Id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to update
 *              required: true
 *              schema:
 *                 type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Teclado gamer RGB inalámbrico"
 *                              price:
 *                                  type: number
 *                                  example: 25.75
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

router.put('/:id',
    param('id').isInt({ min: 1 }).withMessage('Id no válido'),
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
        .exists().withMessage('El precio es obligatorio')
        .isFloat({ gt: 0 }).withMessage('Sólo números positivos aquí'),
    handleInputErrors,
    updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update a product availability by Id
 *          tags:
 *              - Products
 *          description: Updates availability of a product given its Id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to update its availability
 *              required: true
 *              schema:
 *                 type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              availability:
 *                                  type: boolean
 *                                  example: true
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
 */

router.patch('/:id',
    param('id').isInt({ min: 1 }).withMessage('Id no válido'),
    body('availability').isBoolean().withMessage('Campo availability de tipo boolean y obligatorio'),
    handleInputErrors,
    updateAvailability)


/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Creates and returns the new just created product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Teclado gamer RGB inalámbrico"
 *                              price:
 *                                  type: number
 *                                  example: 25.75
 *          responses:
 *              201:
 *                  description: Product created succesfuly
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/Product'
 *              400: 
 *                  description: Bad request - Invalid data              
 *   
 */

router.post('/',
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
        .exists().withMessage('El precio es obligatorio')
        .isFloat({ gt: 0 }).withMessage('Sólo números positivos aquí'),
    handleInputErrors,
    createProduct)

router.delete('/:id',
    param('id').isInt({ min: 1 }).withMessage('Id no válido'),
    handleInputErrors,
    deleteProduct)

export default router