import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const createProduct = async (req: Request, resp: Response) => {
    try {
        const product = await Product.create(req.body)
        resp.json({ data: product })
    } catch (error) {
        console.log(error)
        resp.status(503).json({ error: "Error creando producto" })
    }
}