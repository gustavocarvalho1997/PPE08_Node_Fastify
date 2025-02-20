import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invites-clicks';

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
    async app => {
        // Define a route
        app.get(
            '/subscribers/:subscribeId/ranking/clicks',
            {
                schema: {
                    summary: 'Get subscriber invite clicks count',
                    tags: ['referral'],
                    description:
                        'Get the count of how many times the invite link was accessed',
                    params: z.object({
                        subscribeId: z.string(),
                    }),
                    response: {
                        200: z.object({
                            count: z.number(),
                        }),
                    },
                },
            },
            async request => {
                const { subscribeId } = request.params;

                const { count } = await getSubscriberInviteClicks({
                    subscribeId,
                });

                return { count };
            }
        );
    };
