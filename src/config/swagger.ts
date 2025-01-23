import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.Js / Express / Typescript',
            version: "1.0.0",
            description: 'API Docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerUiOptions: SwaggerUiOptions = {
    /**
     * Para el CSS, lo que se puede hacer es utilizar las herramientas del navegador para
     * inspeccionar los elementos buscando las clases y elementos HTML para luego redefinir 
     * el estilo de ellos según se desee. Ejemplo cambiar logo y color de fondo del header
     * acá utilicé mi imagen de perfil de Github
     */
    customCss: `
        .swagger-ui .topbar a {
            max-width: min-content;
        }
        .topbar-wrapper .link {
            content: url('https://avatars.githubusercontent.com/u/52085862?v=4');
            height: 120px;            
            max-width: auto;
        }
        .swagger-ui .topbar {
            background-color: cornflowerblue;
        }
    `,
    customSiteTitle: 'Docs for API Express / Typescript Products'
}

export {
    swaggerUiOptions
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec