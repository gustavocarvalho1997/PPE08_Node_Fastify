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
import { accessInviteLinkRoute } from './routes/access-invite-link-route';
import { getRankingRoute } from './routes/get-ranking-route';
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route';
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route';
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route';
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
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);

// Start the server
app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP server is running!');
});
