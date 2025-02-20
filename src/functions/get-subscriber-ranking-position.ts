import { redis } from '../redis/client';

interface GetSubscriberRankingPositionParams {
    subscribeId: string;
}

export async function getSubscriberRankingPosition({
    subscribeId,
}: GetSubscriberRankingPositionParams) {
    // Get how many times the invite was used
    const rank = await redis.zrevrank('referral:ranking', subscribeId);

    if (rank === null) {
        return {
            position: null,
        };
    }

    return {
        position: rank + 1,
    };
}
