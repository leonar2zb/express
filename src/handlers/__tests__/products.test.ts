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

describe('GET /api/products', () => {
    it('should exists url /api/products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    it('should get a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('error')
        //se espera 1 item pq cada test reinicia la BD quedando la del test createproduct
        expect(response.body.data).toHaveLength(1)
    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-existen product', async () => {
        //ID sepamos NO existe. La BD se reinicia cada vez; Id=1 siempre
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/notavalidurl')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id no válido")
    })

    it('get JSON response with the product ID 1', async () => {
        const id = 1
        const response = await request(server).get(`/api/products/${id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('id')
        expect(response.body.data.id).toBe(id)
    })
})

describe('PUT /api/products/:id', () => {
    it('Should display validation error when updating a product', async () => {
        const id = 1
        const response = await request(server).put(`/api/products/${id}`).send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
        expect(response.body).not.toHaveProperty('data')
    })

    it('Price should be positive', async () => {
        const id = 1
        const response = await request(server).put(`/api/products/${id}`).
            send({
                name: "La guitarra",
                price: -333,
                availability: true
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body).not.toHaveProperty('data')
        expect(response.body.errors[0].msg).toBe("Sólo números positivos aquí")
    })

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).put('/api/products/notavalidurl').
            send({
                name: "La guitarra",
                price: 333,
                availability: true
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id no válido")
    })

    it('Should return a 404 response for a non-existen product', async () => {
        //ID sepamos NO existe. La BD se reinicia cada vez; Id=1 siempre
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`).
            send({
                name: "La guitarra",
                price: 333,
                availability: true
            })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('Should update an existing product', async () => {
        //ID sepamos SI existe. La BD se reinicia cada vez; Id=1 siempre
        const productId = 1
        const newName = "Nuevo producto actualizado"
        const response = await request(server).put(`/api/products/${productId}`).
            send({
                name: newName,
                price: 333,
                availability: true
            })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.name).toBe(newName)
        expect(response.body).not.toHaveProperty('error')
    })


})
