import { Router } from "express"

const router = Router()

//Definición de las rutas
router.get('/', (req, resp) => {
    resp.send("Servidor corriendo")
})

router.post('/', (req, resp) => {
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

export default router