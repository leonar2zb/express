import { Request, Response } from 'express'
import colors from 'colors'
import Product from '../models/Product.model'

export const createProduct = async (req: Request, resp: Response) => {
    //console.log(colors.bgBlue(req.body))
    const product = new Product(req.body)
    const savedProduct = await product.save()
    resp.json(savedProduct)
}