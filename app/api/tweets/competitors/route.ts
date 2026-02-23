import { NextResponse } from 'next/server';
import { getUserIdsByUsernames, getUserTweets } from '@/lib/twitter';
import { cacheGet, cacheSet } from '@/lib/cache';
import type { Tweet } from '@/lib/twitter';

const COMPETITOR_HANDLES = ['DraftKings', 'FanDuel', 'Kalshi', 'Polymarket', 'NovigSports'];
const CACHE_TTL = 2 * 60 * 60; // 2 hours - reduce API calls for competitors

export async function GET() {
  const cacheKey = 'tweets:competitors';
  const cached = await cacheGet<Tweet[]>(cacheKey);
  if (cached) {
    const response = NextResponse.json({ tweets: cached, fromCache: true });
    response.headers.set('Cache-Control', 'public, s-maxage=7200, stale-while-revalidate=1800');
    return response;
  }

  try {
    const userIds = await getUserIdsByUsernames(COMPETITOR_HANDLES);

    const results = await Promise.allSettled(
      COMPETITOR_HANDLES.map(async (handle) => {
        const id = userIds.get(handle.toLowerCase());
        if (!id) return [];
        return getUserTweets(id, 10);
      })
    );

    const allTweets: Tweet[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allTweets.push(...result.value);
      }
    }

    const sorted = allTweets.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    await cacheSet(cacheKey, sorted, CACHE_TTL);
    const response = NextResponse.json({ tweets: sorted, fromCache: false });
    response.headers.set('Cache-Control', 'public, s-maxage=7200, stale-while-revalidate=1800');
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
