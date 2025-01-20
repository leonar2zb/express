import request from "supertest"
import server from "../../server"

describe('POST /api/products', () => {
    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Teclado",
            price: 50
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('error')
    })

    it('should validate all fields passed', async () => {
        const response = await request(server).post('/api/products').send({
        })

        expect(response.status).toBe(400)
        expect(response.body).not.toHaveProperty('data')
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2) //2 errores si no pasa ningún argumento
    })

    it('should price be a positive number', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Probando',
            price: -2
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        // Comprobar si algún error tiene un value menor que cero 
        const hasNegativeValue = response.body.errors.some(error => error.value < 0);
        expect(hasNegativeValue).toBe(true);
        expect(response.body).not.toHaveProperty('data')
        expect(response.body.errors).toHaveLength(1)
    })

    it('should price be a number', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Probando',
            price: "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        // Cadena del mensaje de error recibido
        expect(response.body.errors).toContainEqual(expect.objectContaining({ msg: 'Sólo números positivos aquí' }));
        expect(response.body).not.toHaveProperty('data')
        expect(response.body.errors).toHaveLength(1)
    })
})
