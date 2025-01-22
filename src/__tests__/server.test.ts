import { connectDB } from "../server"
import db from "../config/db"

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