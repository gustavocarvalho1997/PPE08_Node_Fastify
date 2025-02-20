import { redis } from '../redis/client';

interface GetSubscriberInviteClicksParams {
    subscribeId: string;
}

export async function getSubscriberInviteClicks({
    subscribeId,
}: GetSubscriberInviteClicksParams) {
    // Get the count of how many times the invite link was accessed
    const count = await redis.hget('referral:access-count', subscribeId);

    return {
        count: count ? Number.parseInt(count) : 0,
    };
}
