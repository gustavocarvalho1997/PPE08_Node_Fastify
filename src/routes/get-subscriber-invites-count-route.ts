import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count';

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
    async app => {
        // Define a route
        app.get(
            '/subscribers/:subscribeId/ranking/count',
            {
                schema: {
                    summary: 'Get subscriber invite count',
                    tags: ['referral'],
                    description:
                        'Get the count of how many times the invite link was used',
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

                const { count } = await getSubscriberInvitesCount({
                    subscribeId,
                });

                return { count };
            }
        );
    };
