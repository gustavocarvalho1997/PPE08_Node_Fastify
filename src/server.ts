import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
    type ZodTypeProvider,
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';
import { env } from './env';
import { accessInviteLinkRoute } from './routes/access-invite-link';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';

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
app.register(accessInviteLinkRoute);

// Start the server
app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP server is running!');
});
