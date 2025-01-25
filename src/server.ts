import express, { request } from "express";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";
import cors, { CorsOptions } from "cors";
import colors from 'colors'
import morgan from 'morgan'

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

// permitir conexiones CORS desde el frontend
const CorsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if ((origin === process.env.FRONTEND_URL) // desde la IP autorizada
            || !origin) // o no tiene un origin(otro backend, cliente REST como Thunderclient o Postman para pruebas)
            callback(null, true)
        else
            callback(new Error('Error origen de petición denegada'))
    }
}

const server = express()

// uso del middleware de express para logs
server.use(morgan('dev'))

// uso del middleware de express para habilitar CORS
server.use(cors(CorsOptions))

// uso del middleware de express para interpretar JSON
server.use(express.json())

server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server
