import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get('topic') ?? 'nba';

  if (!SPORT_QUERIES[topic]) {
    return NextResponse.json({ error: 'Unknown topic' }, { status: 400 });
  }

  const cacheKey = `tweets:sports:${topic}`;
  const cached = await cacheGet<Tweet[]>(cacheKey);
  if (cached) {
    return NextResponse.json({ tweets: cached, fromCache: true });
  }

  try {
    // Fetch 100 tweets from 12h ago to 1h ago, return top 20 by engagement
    const tweets = await searchRecentTweets(SPORT_QUERIES[topic], 100, 12, 1);
    const sorted = tweets
      .sort((a, b) => (b.metrics.likes + b.metrics.retweets) - (a.metrics.likes + a.metrics.retweets))
      .slice(0, 20);
    await cacheSet(cacheKey, sorted, CACHE_TTL);
    return NextResponse.json({ tweets: sorted, fromCache: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
