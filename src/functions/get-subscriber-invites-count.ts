import { redis } from '../redis/client';

interface GetSubscriberInvitesCountParams {
    subscribeId: string;
}

export async function getSubscriberInvitesCount({
    subscribeId,
}: GetSubscriberInvitesCountParams) {
    // Get how many times the invite was used
    const count = await redis.zscore('referral:ranking', subscribeId);

    return {
        count: count ? Number.parseInt(count) : 0,
    };
}
