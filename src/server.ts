import express, { request } from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'

//Conectar a la BD
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgGreen("Conexión exitosa a la BD"))
    } catch (error) {
        console.log(error)
        console.log(colors.bgRed("Ha ocurrido un error al conectar a la BD"))
    }
}
connectDB()

const server = express()

server.use('/api/products', router)

export default server
