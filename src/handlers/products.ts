import { Request, Response } from 'express'
import colors from 'colors'
import Product from '../models/Product.model'
import { check, validationResult } from 'express-validator'

export const createProduct = async (req: Request, resp: Response) => {
    //console.log(colors.bgBlue(req.body))
    await check('name').notEmpty().withMessage('El nombre del producto es obligatorio').run(req)
    await check('price').isFloat({ gt: 0 }).withMessage('Sólo números positivos aquí').run(req)
    /* se pueden usar validaciones personalizadas si fuera necesario como en esta
    await check('price').custom(value => value > 0).withMessage('Sólo número mayor que cero').run(req)
    
    las validaciones se pueden concatenar una tras otra y cada una con su mensaje. Por legibilidad se puede separar en lineas ejemplo:
    await check('name').isAlpha('es-ES').withMessage("Solo letras de español. No espacio ni otro")
    .isLength({ min: 3, max: 10 }).withMessage("de 3 a 10 caracteres")
    .isUppercase().withMessage("Solo en mayúsculas").run(req)

    Existe gran número de validacione como para emails, etc además de poder usar expresiones regulares con matches
    */

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