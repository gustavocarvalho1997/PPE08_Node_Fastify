import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod';

// Create a Fastify instance
const app = fastify().withTypeProvider<ZodTypeProvider>();

// Enable CORS
app.register(fastifyCors, {
    origin: true,
});

// Register the compiler
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Define a route
app.post('/subscriptions', {
    schema: {
        body: z.object({
            name: z.string(),
            email: z.string().email(),
        }),
        response: {
            201: z.object({
                name: z.string(),
                email: z.string()
            })
        },
    },
}, async (request, reply) => {
    const { name, email } = request.body;

    // Save the subscription to the database

    return reply.status(201).send({
        name,
        email,
    })
})


// Start the server
app.listen({port: 3333}).then(() => {
    console.log('HTTP server is running!')
});