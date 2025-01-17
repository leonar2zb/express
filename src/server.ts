import express, { request } from "express";
import router from "./router";

const server = express()

server.use('/api/products', router)

export default server
