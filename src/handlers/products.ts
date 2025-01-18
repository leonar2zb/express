import { Request, Response } from 'express'
import colors from 'colors'

export const createProduct = (req: Request, resp: Response) => {
    console.log(colors.bgBlue(req.body))
    resp.json(req.body)
}