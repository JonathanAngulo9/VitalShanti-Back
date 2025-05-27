import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'VitalShanti API',
        version: '1.0.0',
        description: 'API para pacientes, instructores y yoga terapéutico'
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Servidor local'
        },
        {
            url: 'https://vitalshanti-back.onrender.com/api',
            description: 'Enlace de despliegue en Render',
        },
    ]
};

const DIR = path.join(__dirname).replace(/\\/g, '/');

console.log(DIR)
const swaggerOptions = {
    swaggerDefinition,
    apis: [`${DIR}/*.yml`]
}

export default swaggerJSDoc(swaggerOptions)
