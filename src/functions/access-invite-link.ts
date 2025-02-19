import { redis } from '../redis/client';

interface AccessInviteLinkParams {
    subscribeId: string;
}

export async function accessInviteLink({
    subscribeId,
}: AccessInviteLinkParams) {
    // Save a count of how many times the invite link was accessed
    await redis.hincrby('referral:access-count', subscribeId, 1);
}
