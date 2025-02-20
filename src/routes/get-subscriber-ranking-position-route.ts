import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position';

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
    async app => {
        // Define a route
        app.get(
            '/subscribers/:subscribeId/ranking/position',
            {
                schema: {
                    summary: 'Get subscriber ranking position',
                    tags: ['referral'],
                    description:
                        'Get the position of the subscriber in the ranking',
                    params: z.object({
                        subscribeId: z.string(),
                    }),
                    response: {
                        200: z.object({
                            position: z.number().nullable(),
                        }),
                    },
                },
            },
            async request => {
                const { subscribeId } = request.params;

                const { position } = await getSubscriberRankingPosition({
                    subscribeId,
                });

                return { position };
            }
        );
    };
