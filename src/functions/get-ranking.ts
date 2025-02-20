import { inArray } from 'drizzle-orm';
import { db } from '../drizzle/client';
import { subscriptions } from '../drizzle/schema/subscriptions';
import { redis } from '../redis/client';

export async function getRanking() {
    const ranking = await redis.zrevrange(
        'referral:ranking',
        0,
        2,
        'WITHSCORES'
    );
    // Create a dictionary with the subscriber ID and the score
    const subscriberIdAndScore: Record<string, number> = {};

    // Fill the dictionary
    for (let i = 0; i < ranking.length; i += 2) {
        subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1]);
    }

    // Get the subscribers from the database that are in the ranking
    const subscribers = await db
        .select()
        .from(subscriptions)
        .where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)));

    // Create an ordered array with id, name and score
    const rankingWithScore = subscribers
        .map(subscriber => {
            return {
                id: subscriber.id,
                name: subscriber.name,
                score: subscriberIdAndScore[subscriber.id],
            };
        })
        .sort((sub1, sub2) => {
            return sub2.score - sub1.score;
        });

    return { rankingWithScore };
}
