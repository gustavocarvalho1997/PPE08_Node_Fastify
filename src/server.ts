import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';

// Create a Fastify instance
const app = fastify();

// Enable CORS
app.register(fastifyCors, {
    origin: true,
});

// Define a route
app.get('/hello', () => {
    return 'Hello World!';
})


// Start the server
app.listen({port: 3333}).then(() => {
    console.log('HTTP server is running!')
});