import express, { request } from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'

//Conectar a la BD
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        /**
         * comenté la salida a consola porque interfiere con los test Jest y las
         * llamadas que son asíncronas
         * console.log(colors.bgGreen("Conexión exitosa a la BD")) 
         */

    } catch (error) {
        console.log('Hubo un error en la conexión')
    }
}
connectDB()

const server = express()

// uso del middleware de express para interpretar JSON
server.use(express.json())

server.use('/api/products', router)

// Esta ruta es para practicar con Jest y hacer testing
server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' })
})

export default server
