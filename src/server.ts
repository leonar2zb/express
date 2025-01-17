import express, { request } from "express";

const server = express()

server.get('/', (req, resp) => {
    resp.send("Servidor corriendo")
})

server.post('/', (req, resp) => {
    const datos = [{
        "nombre": "Leo",
        "edad": 48,
        "masculino": true
    }, {
        "nombre": "Betsy",
        "edad": 11,
        "masculino": false
    }]

    resp.json(datos)
})

export default server
