import { Router } from "express"
import { createProduct } from "./handlers/products"

const router = Router()

//Definición de las rutas
router.get('/', (req, resp) => {
    resp.send("Servidor corriendo")
})

router.post('/', createProduct)

export default router