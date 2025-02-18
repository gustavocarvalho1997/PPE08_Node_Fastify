import { z } from 'zod';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
    // Define a route
    app.post('/subscriptions', {
        schema: {
            summary: 'Subscribe someone to an event',
            tags: ['subscriptions'],
            description: 'Subscribe someone to an event by providing their name and email address',
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
}