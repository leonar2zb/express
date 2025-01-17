import server from "./server";
import colors from 'colors';

server.listen(4000, () => {
    console.log(colors.bgGreen("Escuchando en el puerto 4000"))
})