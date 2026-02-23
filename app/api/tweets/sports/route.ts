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

const CACHE_TTL = 4 * 60 * 60; // 4 hours - significantly reduce API calls

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get('topic') ?? 'nba';

  if (!SPORT_QUERIES[topic]) {
    return NextResponse.json({ error: 'Unknown topic' }, { status: 400 });
  }

  const cacheKey = `tweets:sports:${topic}`;
  const cached = await cacheGet<Tweet[]>(cacheKey);
  if (cached) {
    const response = NextResponse.json({ tweets: cached, fromCache: true });
    response.headers.set('Cache-Control', 'public, s-maxage=14400, stale-while-revalidate=3600');
    return response;
  }

  try {
    // Fetch 50 tweets from 6h ago to 1h ago, return top 20 by engagement (reduced to save API costs)
    const tweets = await searchRecentTweets(SPORT_QUERIES[topic], 50, 6, 1);
    const sorted = tweets
      .sort((a, b) => (b.metrics.likes + b.metrics.retweets) - (a.metrics.likes + a.metrics.retweets))
      .slice(0, 20);
    await cacheSet(cacheKey, sorted, CACHE_TTL);
    const response = NextResponse.json({ tweets: sorted, fromCache: false });
    response.headers.set('Cache-Control', 'public, s-maxage=14400, stale-while-revalidate=3600');
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
