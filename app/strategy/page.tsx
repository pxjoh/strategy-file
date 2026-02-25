'use client'
import Script from 'next/script'
import { useEffect } from 'react'

export default function StrategyPage() {
  useEffect(() => {
    // @ts-ignore
    if (window.instgrm?.Embeds) window.instgrm.Embeds.process()
  }, [])
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&display=swap');

        .strat-root *, .strat-root *::before, .strat-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .strat-root {
          --green:       #4ADE80;
          --green-light: rgba(74,222,128,.12);
          --green-dark:  #22C55E;
          --bg:          #0E1420;
          --surface:     #151C2C;
          --surface-2:   #1A2235;
          --border:      #2A3548;
          --text:        #FFFFFF;
          --text-2:      #FFFFFF;
          --text-3:      #FFFFFF;
          --radius:      12px;
          --shadow:      0 1px 3px rgba(0,0,0,.4), 0 4px 16px rgba(0,0,0,.25);
          --shadow-lg:   0 4px 24px rgba(0,0,0,.5);
          font-family: 'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;
          min-height: 100vh;
        }

        /* NAV */
        .strat-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(14,20,32,.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 64px;
        }
        .strat-brand {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
          color: var(--text); display: flex; align-items: center; gap: 2px;
        }
        .strat-brand .x { color: var(--green); }
        .strat-navlinks { display: flex; gap: 4px; list-style: none; }
        .strat-navlinks a {
          text-decoration: none; color: var(--text-2); font-size: 14px; font-weight: 500;
          padding: 6px 14px; border-radius: 8px; transition: all .15s;
        }
        .strat-navlinks a:hover { background: var(--surface-2); color: var(--text); }
        .strat-navlinks a.active { background: var(--green-light); color: var(--green); }

        /* HERO */
        .strat-hero {
          background: linear-gradient(145deg, #080d17 0%, #0e1420 60%, #111827 100%);
          border-bottom: 1px solid var(--border);
          padding: 96px 48px 88px; text-align: center;
        }
        .strat-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--green-light); color: var(--green);
          font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          padding: 4px 14px; border-radius: 100px; margin-bottom: 24px;
        }
        .strat-hero h1 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 64px; font-weight: 800; letter-spacing: 1px; line-height: 1.05; text-transform: uppercase;
          margin-bottom: 18px; color: var(--text);
        }
        .strat-hero h1 em { font-style: normal; color: var(--green); }
        .strat-hero p { font-size: 18px; color: var(--text-2); max-width: 520px; margin: 0 auto; }

        /* LAYOUT */
        .strat-container { max-width: 1120px; margin: 0 auto; padding: 80px 48px; }
        .strat-section-header { margin-bottom: 52px; }
        .strat-section-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          color: var(--green); margin-bottom: 10px; display: block;
        }
        .strat-section-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 38px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
          margin-bottom: 10px; color: var(--text);
        }
        .strat-section-desc { font-size: 16px; color: var(--text-2); max-width: 600px; }

        /* PLATFORM BLOCK */
        .strat-platform-block { margin-bottom: 72px; }
        .strat-platform-label { display: flex; align-items: center; gap: 14px; margin-bottom: 32px; }
        .strat-plat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .strat-plat-icon.x        { background: #fff; color: #000; font-weight: 800; font-size: 15px; }
        .strat-plat-icon.ig       { background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); color: #fff; }
        .strat-plat-icon.partners { background: var(--green); color: #0E1420; }
        .strat-plat-title { font-size: 22px; font-weight: 700; color: var(--text); }
        .strat-plat-sub   { font-size: 14px; color: var(--text-2); margin-top: 2px; }
        .strat-platform-sep { border: none; border-top: 1px solid var(--border); margin: 64px 0; }

        /* GRIDS */
        .strat-grid-2   { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .strat-grid-3   { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .strat-grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        /* CARD */
        .strat-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 28px;
          position: relative; overflow: hidden;
          transition: box-shadow .2s, transform .2s;
        }
        .strat-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
        .strat-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--green);
        }
        .strat-card-pct {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 42px; font-weight: 800; color: var(--green);
          letter-spacing: -1px; line-height: 1; margin-bottom: 4px;
        }
        .strat-card-title { font-size: 17px; font-weight: 700; margin-bottom: 18px; color: var(--text); }

        /* Embed / media wrapper */
        .strat-media { margin-bottom: 18px; overflow: hidden; border-radius: 8px; }
        .strat-media blockquote { margin: 0 !important; }
        .strat-media img { width: 100%; display: block; border-radius: 8px; }

        /* Image placeholder */
        .strat-img-ph {
          width: 100%; aspect-ratio: 16/9;
          background: var(--surface-2); border: 2px dashed var(--border);
          border-radius: 8px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; margin-bottom: 18px; color: var(--text-3);
        }
        .strat-img-ph svg { width: 28px; height: 28px; opacity: .4; }
        .strat-img-ph span { font-size: 12px; font-weight: 600; letter-spacing: .3px; }

        /* Card body */
        .strat-body { font-size: 14px; color: var(--text-2); line-height: 1.75; }
        .strat-body p  { margin-bottom: 10px; }
        .strat-body ul { padding-left: 16px; margin-bottom: 10px; }
        .strat-body ul ul { padding-left: 16px; margin-top: 4px; margin-bottom: 4px; }
        .strat-body li { margin-bottom: 4px; }
        .strat-body strong { color: var(--text); font-weight: 600; }
        .strat-callout {
          background: var(--green-light); color: var(--green);
          padding: 11px 14px; border-radius: 8px;
          font-size: 13px; font-weight: 500; line-height: 1.6; margin-top: 14px;
        }

        /* TIMELINE */
        .strat-timeline-section { background: var(--surface); border-top: 1px solid var(--border); }
        .strat-timeline { position: relative; margin-top: 56px; }
        .strat-timeline::before {
          content: ''; position: absolute;
          left: 50%; transform: translateX(-50%);
          top: 0; bottom: 0; width: 2px; background: var(--border);
        }
        .strat-month-marker { text-align: center; position: relative; z-index: 2; margin: 8px 0 28px; }
        .strat-month-label {
          display: inline-block; background: var(--green); color: #0E1420;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
          padding: 5px 18px; border-radius: 100px;
        }
        .strat-t-event { display: flex; align-items: flex-start; margin-bottom: 28px; position: relative; }
        .strat-t-event.left { flex-direction: row-reverse; }
        .strat-ecard {
          width: calc(50% - 44px);
          background: var(--bg); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 22px 24px;
          box-shadow: var(--shadow); transition: box-shadow .2s;
        }
        .strat-ecard:hover { box-shadow: var(--shadow-lg); }
        .strat-dot {
          position: absolute; left: 50%; transform: translateX(-50%);
          width: 14px; height: 14px;
          background: var(--green); border-radius: 50%;
          border: 3px solid var(--surface);
          box-shadow: 0 0 0 2px var(--green);
          top: 22px; z-index: 2;
        }
        .strat-e-date  { font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--green); margin-bottom: 5px; }
        .strat-e-title { font-size: 16px; font-weight: 700; margin-bottom: 10px; color: var(--text); }
        .strat-badge {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px; margin-bottom: 12px;
        }
        .strat-b-baseball { background: rgba(253,224,71,.12);  color: #FDE047; }
        .strat-b-college  { background: rgba(251,146,60,.12);  color: #FB923C; }
        .strat-b-football { background: rgba(96,165,250,.12);  color: #60A5FA; }
        .strat-b-golf     { background: rgba(74,222,128,.12);  color: #4ADE80; }
        .strat-b-nba      { background: rgba(248,113,113,.12); color: #F87171; }
        .strat-b-hockey   { background: rgba(192,132,252,.12); color: #C084FC; }
        .strat-e-body { font-size: 13px; color: var(--text-2); line-height: 1.65; }
        .strat-e-body p { margin-bottom: 8px; }
        .strat-e-body ul { padding-left: 14px; margin-top: 6px; margin-bottom: 6px; }
        .strat-e-body ul ul { padding-left: 14px; margin-top: 3px; margin-bottom: 3px; }
        .strat-e-body li { margin-bottom: 3px; }
        .strat-e-body strong { color: var(--text); font-weight: 600; }

        /* FOOTER */
        .strat-footer {
          text-align: center; padding: 32px 48px;
          font-size: 13px; color: var(--text-3);
          border-top: 1px solid var(--border);
          background: var(--bg);
        }
        .strat-footer strong { color: var(--text-2); }

        @media (max-width: 800px) {
          .strat-nav { padding: 0 20px; }
          .strat-hero { padding: 64px 24px; }
          .strat-hero h1 { font-size: 42px; }
          .strat-container { padding: 56px 24px; }
          .strat-grid-2, .strat-grid-3, .strat-grid-2x2 { grid-template-columns: 1fr; }
          .strat-timeline::before { left: 20px; }
          .strat-t-event, .strat-t-event.left { flex-direction: column; padding-left: 48px; }
          .strat-ecard { width: 100%; }
          .strat-dot { left: 20px; }
        }
      `}</style>

      <div className="strat-root">

        {/* NAV */}
        <nav className="strat-nav">
          <div className="strat-brand">Prophet<span className="x">X</span></div>
          <ul className="strat-navlinks">
            <li><a href="#strategy">Content Strategy</a></li>
            <li><a href="#calendar">Content Calendar</a></li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="strat-hero">
          <div className="strat-eyebrow">Q1 2026 &nbsp;·&nbsp; Strategy Presentation</div>
          <h1>Growth <em>Strategy</em><br />& Content Roadmap</h1>
          <p>Platform strategy across Twitter, Instagram, and partner channels — plus a calendar of key moments to capitalize on.</p>
        </div>

        {/* ── SECTION 1: CONTENT STRATEGY ── */}
        <section id="strategy">
          <div className="strat-container">
            <div className="strat-section-header">
              <span className="strat-section-eyebrow">Section 01</span>
              <h2 className="strat-section-title">Content Strategy</h2>
              <p className="strat-section-desc">How we show up on every platform — and why each piece of content needs to earn its place.</p>
            </div>

            {/* TWITTER */}
            <div className="strat-platform-block">
              <div className="strat-platform-label">
                <div className="strat-plat-icon x">𝕏</div>
                <div>
                  <div className="strat-plat-title">Twitter / X Strategy</div>
                  <div className="strat-plat-sub">The 1/4 Strategy — four equal pillars, each with a defined job</div>
                </div>
              </div>
              <div className="strat-grid-2x2">
                <ImgCard pct="25%" title='"Polymarket-Style" Posts' media={<TweetEmbed id="2016955923244130618" />}>
                  <p>The algorithm has recently rewarded side-by-side imagery. Our two best-performing posts in January were in this exact format.</p>
                  <p>This style forces the reader to stop and compare both visuals. It naturally grabs attention and increases dwell time.</p>
                  <p>Ideally, we pair:</p>
                  <ul>
                    <li>A strong, relevant photo</li>
                    <li>A graph or visual displaying our odds/market</li>
                  </ul>
                  <p>The goal is contrast. The image pulls them in, the odds/graph keeps them there.</p>
                  <p>We should be intentionally building these, not just occasionally posting them.</p>
                </ImgCard>
                <ImgCard pct="25%" title="Product Posts" media={<TweetEmbed id="2025970400887443554" />}>
                  <p>Examples:</p>
                  <ul>
                    <li>Odds</li>
                    <li>Big positions</li>
                    <li>Top traded markets</li>
                  </ul>
                  <p>I won&apos;t focus heavily on the content itself because that is self-explanatory. The focus needs to be on how we present it.</p>
                  <p>We need to:</p>
                  <ul>
                    <li>Constantly refresh graphics</li>
                    <li>Avoid repetitive templates</li>
                    <li>Hunt for engaging markets</li>
                    <li>Target markets our affiliates will naturally comment on</li>
                  </ul>
                  <p>Simply posting a market is not enough. It will not drive followers and it will not build engagement long term.</p>
                  <p>This category should also include value-driven messaging:</p>
                  <ul>
                    <li>Best odds compared to competitors</li>
                    <li>A market getting traction because of a storyline (ex: Kansas vs. Houston this Monday)</li>
                  </ul>
                  <p>The presentation and timing matter just as much as the market itself.</p>
                </ImgCard>
                <ImgCard pct="25%" title="Quote Tweets & Meme Posts" media={<TweetEmbed id="2019184634001539124" />}>
                  <p>There is no downside to quote tweeting:</p>
                  <ul>
                    <li>Our posts that are going viral</li>
                    <li>Partner posts that are going viral</li>
                  </ul>
                  <p>Doing this:</p>
                  <ul>
                    <li>Improves account health</li>
                    <li>Extends the life of viral posts</li>
                    <li>Encourages partners to tag us more</li>
                  </ul>
                  <p>If partners feel like they have a chance to get amplified by us, they will post more about our markets.</p>
                  <p>I want to be clear — memes are not reusing the same GIFs over and over.</p>
                  <p>They need to be:</p>
                  <ul>
                    <li>Fresh</li>
                    <li>Witty</li>
                    <li>New video or still imagery</li>
                    <li>Capable of going viral</li>
                  </ul>
                  <p>The only reason to post a meme is:</p>
                  <ul>
                    <li>To add voice to the brand</li>
                    <li>To try to go viral</li>
                  </ul>
                  <p>If it doesn&apos;t accomplish one of those two things, we shouldn&apos;t post it.</p>
                </ImgCard>
                <ImgCard pct="25%" title='"Storyline" Posts' media={<TweetEmbed id="2026035140066210243" />}>
                  <p>There are multiple types within this category.</p>
                  <p><strong>Breaking News</strong></p>
                  <ul>
                    <li>Major announcements</li>
                    <li>Trade rumors</li>
                  </ul>
                  <p><strong>Sound Bites</strong></p>
                  <ul>
                    <li>Quotes that spark conversation</li>
                  </ul>
                  <p><strong>Off-the-Court News</strong></p>
                  <ul>
                    <li>LaMelo crashing his car</li>
                    <li>LeBron trade rumors</li>
                    <li>Darryn Peterson situations</li>
                    <li>Player-related rumors</li>
                  </ul>
                  <p><strong>On-Court News</strong></p>
                  <ul>
                    <li>Injuries</li>
                    <li>Benchings</li>
                    <li>Poor performances</li>
                    <li>Team collapses</li>
                  </ul>
                  <p>In my opinion, we have not done a good enough job capitalizing on this type of content.</p>
                  <p>This is the category that:</p>
                  <ul>
                    <li>Goes viral</li>
                    <li>Builds followers</li>
                    <li>Positions us as plugged-in and culturally relevant</li>
                  </ul>
                  <p>We need to react faster and lean into these moments more aggressively.</p>
                </ImgCard>
              </div>
            </div>

            <hr className="strat-platform-sep" />

            {/* INSTAGRAM */}
            <div className="strat-platform-block">
              <div className="strat-platform-label">
                <div className="strat-plat-icon ig">📷</div>
                <div>
                  <div className="strat-plat-title">Instagram Strategy</div>
                  <div className="strat-plat-sub">Visual-first content built around scroll-stopping hooks</div>
                </div>
              </div>
              <div className="strat-grid-3">
                <ImgCard pct="60–70%" title="Carousel Posts (Strong Visual + Text Hooks)" media={<InstaEmbed url="https://www.instagram.com/p/DVHYM2Hjieu/" />}>
                  <p>This is where the industry is moving.</p>
                  <p>We&apos;ve done a better job cleaning up the grid visually, but over the past two months the majority of our carousels simply did not have strong enough hooks.</p>
                  <p>If the first slide doesn&apos;t stop the scroll, the rest of the carousel does not matter.</p>
                  <p>With a renewed emphasis on better graphics and stronger opening copy, this should improve.</p>
                  <p>We have signed 6 new collab partners and expect to consistently have 4–6 active partners throughout the spring.</p>
                  <p>Carousels need:</p>
                  <ul>
                    <li>A powerful first slide</li>
                    <li>Clear value</li>
                    <li>A reason to keep swiping</li>
                  </ul>
                </ImgCard>
                <ImgCard pct="10%" title="Single Image Posts" media={<img src="/bill-self.png" alt="Single image post example" />}>
                  <p>These are primarily for storylines.</p>
                  <p>We should be using:</p>
                  <ul>
                    <li>AI-generated visuals</li>
                    <li>Paid graphics</li>
                    <li>Clean, bold design</li>
                  </ul>
                  <p>These posts need to be timely and visually strong.</p>
                </ImgCard>
                <ImgCard pct="25%" title="Reels" media={null}>
                  <p>Reels will be hidden from our main grid.</p>
                  <p>They are used to:</p>
                  <ul>
                    <li>Boost engagement</li>
                    <li>Improve account health</li>
                    <li>Increase views</li>
                    <li>Drive profile visits</li>
                  </ul>
                  <p>Reels are top-of-funnel growth content.</p>
                </ImgCard>
              </div>
            </div>

            <hr className="strat-platform-sep" />

            {/* PARTNERS */}
            <div className="strat-platform-block">
              <div className="strat-platform-label">
                <div className="strat-plat-icon partners">🤝</div>
                <div>
                  <div className="strat-plat-title">Partners</div>
                  <div className="strat-plat-sub">Volume-driven CPA strategy built on quality relationships</div>
                </div>
              </div>
              <div className="strat-grid-2">
                <ImgCard title="Power in Numbers" media={null}>
                  <p>Over the last two months, as a team, we made a very intentional decision to prioritize CPA deals and move away from heavy flat fee structures.</p>
                  <p>In January alone, we signed 26 new contracts — all CPA.</p>
                  <p>As a result of this shift, we saw solid numbers across the board in:</p>
                  <ul>
                    <li>Conversion rate</li>
                    <li>Registrations</li>
                    <li>FTPs</li>
                  </ul>
                  <p>FTP numbers were very comparable to October and November — months where we were actively spending on flat fees and cash drops.</p>
                  <p>That is important.</p>
                  <p>It shows that volume on CPA can produce similar outcomes without the upfront risk of flat fee spend.</p>
                  <p>At the end of the day, this is a numbers game.</p>
                  <p>The more quality CPA deals we sign, the more total opportunities we create. Not every partner will convert at a high level, but if we stack enough of them, the aggregate results are strong.</p>
                  <p>The focus should be simple:<br />Sign as many quality CPA deals as possible.</p>
                </ImgCard>
                <ImgCard title="Frontloading the First 48 Hours" media={null}>
                  <p>The first two days after signing a deal are critical.</p>
                  <p>This is when momentum is highest. This is when the partner is most engaged and paying attention.</p>
                  <p>We need to immediately provide:</p>
                  <ul>
                    <li>Graphics</li>
                    <li>Clear promo language</li>
                    <li>Direction on how to post strong tickets</li>
                    <li>Clear expectations on engaging with our page</li>
                  </ul>
                  <p>Even though this may seem elementary, we saw in January that when we structure this correctly, results improve.</p>
                  <p>When partners know exactly what to post, how to post it, and how to interact with us, the relationship starts much stronger.</p>
                  <p>We cannot assume they know what works. We need to show them.</p>
                </ImgCard>
                <ImgCard title="Scaling Outreach" media={null}>
                  <p>We are currently working on a tool that should automate the first two steps of initial outreach.</p>
                  <p>If executed properly, this could increase our outreach volume by 4–10x.</p>
                  <p>That changes the scale of what we can do.</p>
                  <p>More outreach → more conversations → more signed deals → more total CPA volume.</p>
                  <p>Again, this is a numbers game.</p>
                </ImgCard>
                <ImgCard title="Targeting Discord & Telegram Influencers" media={null}>
                  <p>We are intentionally targeting influencers who run Discord or Telegram communities.</p>
                  <p>This has proven to work.</p>
                  <p>These influencers:</p>
                  <ul>
                    <li>Already have highly engaged audiences</li>
                    <li>Communicate directly with their communities</li>
                    <li>Can drive action quickly</li>
                  </ul>
                  <p>It is low lift for them, because they are already posting plays inside their communities.</p>
                  <p>But it can be a high earner for them when structured correctly.</p>
                  <p>For us, it is scalable, efficient, and aligned with CPA structure.</p>
                  <p>We should continue leaning into this channel.</p>
                </ImgCard>
                <ImgCard title="Selective Flat Fee & Cash Drops — Brand Ambassador Pipeline" media={null}>
                  <p>We will still do flat fee deals and cash drops in 2026 — but they will be rare and highly intentional.</p>
                  <p>This is not a volume play. It is a targeting play.</p>
                  <p>The criteria is simple:</p>
                  <ul>
                    <li>Influencers with a large, engaged, and sports-betting-aligned audience</li>
                    <li>Influencers whose personal brand is a natural fit with ProphetX</li>
                    <li>Influencers who have the potential to become long-term brand ambassadors</li>
                  </ul>
                  <p>The goal of these deals is not just a single post. It is to identify the right people and build a real relationship with them.</p>
                  <p>A well-placed flat fee deal with the right influencer can convert at a level that justifies the spend — and more importantly, it opens the door to an ongoing ambassador relationship that pays dividends well beyond the initial activation.</p>
                  <p>This is our paid influencer strategy for 2026. Selective, strategic, and focused on the long game.</p>
                </ImgCard>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CONTENT CALENDAR ── */}
        <section id="calendar" className="strat-timeline-section">
          <div className="strat-container">
            <div className="strat-section-header">
              <span className="strat-section-eyebrow">Section 02</span>
              <h2 className="strat-section-title">Content Calendar</h2>
              <p className="strat-section-desc">Key moments from March through April — and how we plan to show up for each one.</p>
            </div>

            <div className="strat-timeline">

              <div className="strat-month-marker">
                <span className="strat-month-label">March 2026</span>
              </div>

              <TEvent side="right" date="March 4" title="World Baseball Classic" badge="⚾ Baseball" badgeClass="strat-b-baseball">
                <p>Should really garner interest considering its right before all of the big conference tournaments, and in the dog days of NBA/NHL</p>
                <p>NRFI, K props, Futures markets is what we plan on promoting</p>
              </TEvent>

              <TEvent side="left" date="March 5 – 15" title="CBB Conference Tournament play begins:" badge="🏀 College Basketball" badgeClass="strat-b-college">
                <ul>
                  <li>Highlight the smaller markets, showing we have markets for those</li>
                  <li>Hopefully will have future markets up to promote</li>
                  <li>Highlight bubble teams in big conferences</li>
                  <li>Highlight potential cinderella stories for March</li>
                </ul>
              </TEvent>

              <TEvent side="right" date="March 9" title="NFL Free Agency Begins" badge="🏈 Football" badgeClass="strat-b-football">
                <ul>
                  <li>We can ramp up NFL posts here</li>
                  <li>Potentially parody markets</li>
                  <li>Graphs of teams to win superbowl</li>
                </ul>
              </TEvent>

              <TEvent side="left" date="March 12 – 15" title="Players Championship" badge="⛳ Golf" badgeClass="strat-b-golf">
                <ul>
                  <li>Top traded golfers</li>
                  <li>Scottie not to win market</li>
                  <li>Any storyline that happens between now and then</li>
                </ul>
              </TEvent>

              <TEvent side="right" date="March 17" title="March Madness starts" badge="🏀 College Basketball" badgeClass="strat-b-college">
                <ul>
                  <li>Pedal to the medal on this</li>
                  <li>Constant graphs of the futures market
                    <ul>
                      <li>After selection sunday</li>
                      <li>After round of 64/32/16/8</li>
                      <li>Final four</li>
                    </ul>
                  </li>
                  <li>Storylines for teams coming into the tournament</li>
                  <li>Player props of star players and get influencers to push</li>
                  <li>Highlighting marquee games to market with influencers</li>
                  <li>Highlighting our King of March giveaway CONSTANTLY</li>
                  <li>Potentially doing a sweet sixteen influencer bracket</li>
                  <li>Thoughts on this as a team</li>
                </ul>
              </TEvent>

              <TEvent side="left" date="March 26" title="MLB Opening Day" badge="⚾ Baseball" badgeClass="strat-b-baseball" />

              <div className="strat-month-marker" style={{ marginTop: 20 }}>
                <span className="strat-month-label">April 2026</span>
              </div>

              <TEvent side="right" date="April 9" title="The Masters" badge="⛳ Golf" badgeClass="strat-b-golf" />

              <TEvent side="left" date="April 14" title="NBA Playoffs" badge="🏀 NBA" badgeClass="strat-b-nba" />

              <TEvent side="right" date="April 18" title="NHL Playoffs" badge="🏒 Hockey" badgeClass="strat-b-hockey" />

              <TEvent side="left" date="April 23" title="NFL Draft" badge="🏈 Football" badgeClass="strat-b-football" />

            </div>
          </div>
        </section>

        <footer className="strat-footer">
          <strong>ProphetX</strong> &nbsp;·&nbsp; Q1 2026 Strategy Presentation
        </footer>

      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        // @ts-ignore
        onLoad={() => window.instgrm?.Embeds?.process()}
      />
    </>
  );
}

/* ── Helper components ── */

function PlaceholderImg() {
  return (
    <div className="strat-img-ph">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span>Insert Image</span>
    </div>
  );
}

function ImgCard({ pct, title, media, children }: {
  pct?: string; title: string;
  media?: React.ReactNode; // undefined = placeholder, null = nothing, element = that element
  children: React.ReactNode;
}) {
  return (
    <div className="strat-card">
      {pct && <div className="strat-card-pct">{pct}</div>}
      <div className="strat-card-title">{title}</div>
      {media === undefined
        ? <PlaceholderImg />
        : media
          ? <div className="strat-media">{media}</div>
          : null}
      <div className="strat-body">{children}</div>
    </div>
  );
}

function TweetEmbed({ id }: { id: string }) {
  return (
    <iframe
      src={`https://platform.twitter.com/embed/Tweet.html?id=${id}&theme=light&dnt=false&lang=en`}
      style={{ width: '100%', height: '420px', border: 'none', display: 'block', borderRadius: '8px' }}
      scrolling="no"
      title={`Tweet ${id}`}
    />
  );
}

function InstaEmbed({ url }: { url: string }) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{ minWidth: 0, width: '100%', margin: 0 }}
    >
      <a href={url}>View on Instagram</a>
    </blockquote>
  );
}

function TEvent({
  side, date, title, badge, badgeClass, children,
}: {
  side: 'left' | 'right'; date: string; title: string;
  badge: string; badgeClass: string; children?: React.ReactNode;
}) {
  return (
    <div className={`strat-t-event ${side}`}>
      <div className="strat-ecard">
        <div className="strat-e-date">{date}</div>
        <div className="strat-e-title">{title}</div>
        <span className={`strat-badge ${badgeClass}`}>{badge}</span>
        {children && <div className="strat-e-body">{children}</div>}
      </div>
      <div className="strat-dot" />
    </div>
  );
}
