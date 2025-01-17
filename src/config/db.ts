import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

// Configurar dotenv para cargar variables de entorno 
dotenv.config();
const strConecction = process.env.DATABASE_URL

//para evitar error de conexión SSL, se debe anexar a la cadena "?ssl=true"
const db = new Sequelize(strConecction)

/*otra variante en lugar de anexar "?ssl=true" sería incluir las opciones de configuración, así:
const db1 = new Sequelize(strConecction, {
    dialectOptions: {
        ssl: {
            required: false
        }
    }
}) */

export default db