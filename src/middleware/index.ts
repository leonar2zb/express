import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const handleInputErrors = (req: Request, resp: Response, next: NextFunction) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() })
    }
    next()
}