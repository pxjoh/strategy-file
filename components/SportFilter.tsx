'use client';

const SPORTS = [
  { id: 'nba', label: 'NBA' },
  { id: 'nfl', label: 'NFL' },
  { id: 'mlb', label: 'MLB' },
  { id: 'pga', label: 'PGA Tour' },
  { id: 'ncaab', label: 'NCAAB' },
  { id: 'ncaaf', label: 'NCAAF' },
  { id: 'betting', label: 'Sports Betting' },
] as const;

export type Sport = (typeof SPORTS)[number]['id'];

interface SportFilterProps {
  activeSport: Sport;
  onSportChange: (sport: Sport) => void;
}

export default function SportFilter({ activeSport, onSportChange }: SportFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {SPORTS.map((sport) => {
        const isActive = activeSport === sport.id;
        return (
          <button
            key={sport.id}
            onClick={() => onSportChange(sport.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? 'bg-sky-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
            }`}
          >
            {sport.label}
          </button>
        );
      })}
    </div>
  );
}
