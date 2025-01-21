import request from "supertest"
import server, { connectDB } from "../server"
import db from "../config/db"

describe('Primer test', () => {

    it('Verificar 1+1 sea 2', () => {
        expect(1 + 1).toBe(2)
    })

    it('Verificar 1+1 no sea 3', () => {
        expect(1 + 1).not.toBe(3)
    })

})

describe('GET /api', () => {

    it('Should send back a json response', async () => {
        const res = await request(server).get('/api')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')
    })

})

jest.mock('../config/db')

describe('Test ConnectDB', () => {
    it('Should handle database error connection', async () => {
        jest.spyOn(db, 'authenticate').
            mockRejectedValueOnce(new Error('Hubo un error en la conexión'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error en la conexión')
        )
    })
})