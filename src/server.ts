import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';
import { env } from './env';

// Create a Fastify instance
const app = fastify().withTypeProvider<ZodTypeProvider>();

// Register the compiler
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Enable CORS
app.register(fastifyCors, {
    origin: true,
});

// Enable Swagger
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'PPE08_API',
            version: '0.0.1',
        },
    },
    transform: jsonSchemaTransform,
});

// Enable Swagger UI
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

// Register the route
app.register(subscribeToEventRoute);

// Start the server
app.listen({port: env.PORT}).then(() => {
    console.log('HTTP server is running!')
});