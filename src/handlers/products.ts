import { Request, Response } from 'express'
import Product from '../models/Product.model'
import { validationResult } from 'express-validator'

export const createProduct = async (req: Request, resp: Response) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() })
    }
    const product = await Product.create(req.body)
    resp.json({ data: product })
}