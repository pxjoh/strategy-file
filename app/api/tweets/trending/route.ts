import { NextResponse } from 'next/server';
import { searchRecentTweets } from '@/lib/twitter';
import { cacheGet, cacheSet } from '@/lib/cache';
import type { Tweet } from '@/lib/twitter';

const SPORT_QUERIES: Record<string, string> = {
  nba: '(NBA OR basketball) -is:retweet lang:en',
  nfl: '(NFL OR football) -is:retweet lang:en',
  mlb: '(MLB OR baseball) -is:retweet lang:en',
  pga: '("PGA Tour" OR golf) -is:retweet lang:en',
  ncaab: '(NCAAB OR "college basketball") -is:retweet lang:en',
  ncaaf: '(NCAAF OR "college football") -is:retweet lang:en',
  betting: '("sports betting" OR sportsbook OR "betting odds") -is:retweet lang:en',
};

const CACHE_TTL = 60 * 60; // 60 minutes

async function fetchSport(topic: string): Promise<Tweet[]> {
  const cacheKey = `tweets:sports:${topic}`;
  const cached = await cacheGet<Tweet[]>(cacheKey);
  if (cached) return cached;

  const tweets = await searchRecentTweets(SPORT_QUERIES[topic], 100, 12, 1);
  const sorted = tweets
    .sort((a, b) => (b.metrics.likes + b.metrics.retweets) - (a.metrics.likes + a.metrics.retweets))
    .slice(0, 20);
  await cacheSet(cacheKey, sorted, CACHE_TTL);
  return sorted;
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      Object.keys(SPORT_QUERIES).map(fetchSport)
    );

    const allTweets: Tweet[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allTweets.push(...result.value);
      }
    }

    // Deduplicate by tweet ID
    const seen = new Set<string>();
    const unique = allTweets.filter((t) => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });

    const top30 = unique
      .sort((a, b) => (b.metrics.likes + b.metrics.retweets) - (a.metrics.likes + a.metrics.retweets))
      .slice(0, 30);

    return NextResponse.json({ tweets: top30 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
