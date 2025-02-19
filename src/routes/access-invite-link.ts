import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { env } from '../env';
import { accessInviteLink } from '../functions/access-invite-link';

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
    // Define a route
    app.get(
        '/invites/:subscribeId',
        {
            schema: {
                summary: 'Access invite link and redirects user',
                tags: ['referral'],
                description:
                    'Subscribe someone to an event by providing their name and email address',
                params: z.object({
                    subscribeId: z.string(),
                }),
                response: {
                    201: z.object({
                        subscriberId: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { subscribeId } = request.params;

            // Access the invite link and redirect user
            await accessInviteLink({ subscribeId });

            const redirectUrl = new URL(env.WEB_URL);
            redirectUrl.searchParams.set('referrer', subscribeId);

            // 301: redirect permanente (portanto o navegador fará cache e pode interferir na lógica de negócio)
            // 302: redirect temporário (não faz cache)

            return reply.redirect(redirectUrl.toString(), 302);
        }
    );
};
