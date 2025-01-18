import { Request, Response } from 'express'
import colors from 'colors'
import Product from '../models/Product.model'
import { check, validationResult } from 'express-validator'

export const createProduct = async (req: Request, resp: Response) => {
    //console.log(colors.bgBlue(req.body))
    await check('name').notEmpty().withMessage('El nombre del producto es obligatorio').run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() })
        /**OJO al definir esta función como async, devuelve una promise y esto provocaba error
         * si ejecutaba "return resp.status(400).json({ errors: errors.array() })"
         * Entonces 2 soluciones: Una mover "return" para la siguiente linea dejando el resto en esa
         * otra instalar la versión compatible de tipos para la versión de express(antes tipos 5.2.0 y express 4.21.2)
         * Desinstalar primero la que tenia: npm uninstall @types/express
         * instalar la compatible, este caso npm install @types/express@4.17.14
         * Ya con esto podía quedar el return junto a "resp.status..." 
         */
    }
    const product = await Product.create(req.body)
    resp.json({ data: product })
}