import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Coins, Clock, Swords, Skull, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

type PlayerStats = {
  minecraft_nick: string;
  balance: number;
  playtime_minutes: number;
  player_kills: number;
  mob_kills: number;
};

type Tab = 'balance' | 'playtime_minutes' | 'player_kills' | 'mob_kills';

const tabs: {
  key: Tab;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: 'balance', label: 'Nejbohatší', icon: <Coins size={16} /> },
  { key: 'playtime_minutes', label: 'Čas', icon: <Clock size={16} /> },
  { key: 'player_kills', label: 'PvP killy', icon: <Swords size={16} /> },
  { key: 'mob_kills', label: 'Mob killy', icon: <Skull size={16} /> },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('balance');
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true);

      const { data } = await supabase
        .from('minecraft_player_stats')
        .select('minecraft_nick, balance, playtime_minutes, player_kills, mob_kills')
        .order(activeTab, { ascending: false })
        .limit(10);

      setPlayers(data ?? []);
      setLoading(false);
    }

    loadLeaderboard();
  }, [activeTab]);

  function formatValue(player: PlayerStats) {
    if (activeTab === 'balance') {
      return `${Number(player.balance ?? 0).toLocaleString('cs-CZ')} $`;
    }

    if (activeTab === 'playtime_minutes') {
      const minutes = player.playtime_minutes ?? 0;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }

    if (activeTab === 'player_kills') {
      return `${Number(player.player_kills ?? 0).toLocaleString('cs-CZ')} zabití`;
    }

    return `${Number(player.mob_kills ?? 0).toLocaleString('cs-CZ')} mobů`;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 bg-stone-950/90">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="font-minecraft text-sm text-stone-100">
            KukyynSMP
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={14} />
            Zpět
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="text-forest-400" size={28} />
            <h1 className="font-minecraft text-2xl text-forest-400">
              Leaderboard
            </h1>
          </div>

          <p className="text-stone-400 text-sm">
            Nejlepší hráči na KukyynSMP podle statistik ze serveru.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs transition-all ${
                activeTab === tab.key
                  ? 'bg-forest-900/50 border-forest-600 text-forest-300'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <section className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-6 text-stone-400 text-sm">
              Načítám leaderboard...
            </div>
          ) : players.length === 0 ? (
            <div className="p-6 text-stone-400 text-sm">
              Pro načtení leaderboardu se přihlaš.
            </div>
          ) : (
            <div className="divide-y divide-stone-800">
              {players.map((player, index) => (
                <div
                  key={player.minecraft_nick}
                  className="flex items-center justify-between gap-4 p-4 hover:bg-stone-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-minecraft text-xs ${
                        index === 0
                          ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700'
                          : index === 1
                          ? 'bg-stone-700 text-stone-200 border border-stone-600'
                          : index === 2
                          ? 'bg-orange-900/40 text-orange-300 border border-orange-700'
                          : 'bg-stone-950 text-stone-400 border border-stone-800'
                      }`}
                    >
                      #{index + 1}
                    </div>

                    <img
                      src={`https://mc-heads.net/avatar/${encodeURIComponent(
                        player.minecraft_nick
                      )}/48`}
                      alt={player.minecraft_nick}
                      className="w-10 h-10 rounded-lg border border-stone-700"
                      style={{ imageRendering: 'pixelated' }}
                    />

                    <div>
                      <div className="font-minecraft text-forest-400 text-sm">
                        {player.minecraft_nick}
                      </div>
                      <div className="text-stone-500 text-xs">
                        Hráč KukyynSMP
                      </div>
                    </div>
                  </div>

                  <div className="font-minecraft text-forest-400 text-sm text-right">
                    {formatValue(player)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}