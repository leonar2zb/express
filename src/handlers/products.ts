import { Request, Response } from 'express'
import Product from '../models/Product.model'
import { Op } from 'sequelize'

export const createProduct = async (req: Request, resp: Response) => {
    try {
        const product = await Product.create(req.body)
        resp.json({ data: product })
    } catch (error) {
        console.log(error)
        resp.status(503).json({ error: "Error creando producto" })
    }
}

export const getProducts = async (req: Request, resp: Response) => {
    try {
        const products = await Product.findAll()
        resp.json({ data: products })
    } catch (error) {
        console.log(error)
        resp.status(503).json({ error: "Error listando productos" })
    }
}

/* El siguiente método es para ilustrar el uso de condiciones y opciones
Ver documentación en:
https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
*/
export const getProducts1 = async (req: Request, resp: Response) => {
    try {
        const products = await Product.findAll({
            //attributes: ['name', 'price'], // solo estos campos
            attributes: { exclude: ['createdAt', 'updatedAt'] }, // todos los campos excepto los especificados
            order: [['id', 'DESC']],
            where: {
                price: {
                    [Op.gt]: 100
                }
            }
        });
        resp.json({ data: products })
    } catch (error) {
        console.log(error)
        resp.status(503).json({ error: "Error listando productos" })
    }
}
