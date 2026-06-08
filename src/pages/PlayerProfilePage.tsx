import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Shield,
  Clock,
  Castle,
  Swords,
  Skull,
  CalendarDays,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

type PlayerStats = {
  minecraft_nick: string;
  land_name: string | null;
  rank_name: string | null;
  playtime_minutes: number;
  online: boolean;
  first_join: string | null;
  player_kills: number;
  mob_kills: number;
};

export default function PlayerProfilePage() {
  const { nick } = useParams();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);

  const playerNick = nick ?? '';

  useEffect(() => {
    async function loadPlayer() {
      setLoading(true);

      const { data } = await supabase
        .from('minecraft_player_stats')
        .select('*')
        .ilike('minecraft_nick', playerNick)
        .maybeSingle();

      setStats(data);
      setLoading(false);
    }

    if (playerNick) loadPlayer();
  }, [playerNick]);

  const rank =
    stats?.rank_name === 'default'
      ? 'SETTLER'
      : (stats?.rank_name || 'HRÁČ').toUpperCase();

  const land =
    !stats?.land_name || stats.land_name === '§8None'
      ? 'Žádný land'
      : stats.land_name.replace(/§./g, '');

  const playtime = (() => {
    const minutes = stats?.playtime_minutes ?? 0;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  })();

  const firstJoin = stats?.first_join
    ? new Date(stats.first_join).toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Neznámé';

  const playerKills = Number(stats?.player_kills ?? 0).toLocaleString('cs-CZ');
  const mobKills = Number(stats?.mob_kills ?? 0).toLocaleString('cs-CZ');

  const skinUrl = playerNick
    ? `https://mc-heads.net/body/${encodeURIComponent(playerNick)}/140`
    : '';

  const avatarUrl = playerNick
    ? `https://mc-heads.net/avatar/${encodeURIComponent(playerNick)}/80`
    : '';

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 bg-stone-950/90">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="font-minecraft text-sm text-stone-100">
            KukyynSMP
          </Link>

          <Link
            to="/leaderboard"
            className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={14} />
            Zpět
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-10">
        {loading ? (
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 text-stone-400 text-sm">
            Načítám profil hráče...
          </div>
        ) : !stats ? (
          <div className="bg-red-950/30 border border-red-900 rounded-xl p-6 text-red-300 text-sm">
            Hráč <span className="text-forest-400">{playerNick}</span> nebyl nalezen.
          </div>
        ) : (
          <>
            <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 h-44 flex items-end justify-center">
                <img
                  src={skinUrl}
                  alt={`${playerNick} skin`}
                  className="h-36 w-auto"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex justify-center sm:justify-start mb-4">
                  <img
                    src={avatarUrl}
                    alt={`${playerNick} avatar`}
                    className="w-14 h-14 rounded-lg border border-stone-700"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <p className="text-stone-500 text-xs mb-2">Veřejný profil hráče</p>

                <h1 className="font-minecraft text-2xl text-forest-400 mb-3">
                  {playerNick}
                </h1>

                <div className="inline-flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-full px-3 py-1 text-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      stats.online ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  />
                  <span className={stats.online ? 'text-green-400' : 'text-red-400'}>
                    {stats.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-stone-900 border border-stone-800 rounded-xl p-6">
              <h2 className="font-minecraft text-sm text-stone-200 mb-5">
                Statistiky
              </h2>

              <div className="space-y-4">
                <InfoRow icon={<User size={16} />} label="Minecraft nick" value={playerNick} />
                <InfoRow icon={<Shield size={16} />} label="Rank" value={rank} />
                <InfoRow icon={<Castle size={16} />} label="Land" value={land} />
                <InfoRow icon={<Clock size={16} />} label="Odehraný čas" value={playtime} />
                <InfoRow icon={<CalendarDays size={16} />} label="První připojení" value={firstJoin} />
                <InfoRow icon={<Swords size={16} />} label="Zabití hráči" value={playerKills} />
                <InfoRow icon={<Skull size={16} />} label="Zabití mobové" value={mobKills} />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-stone-800 pb-3 last:border-b-0">
      <div className="flex items-center gap-2 text-stone-500 text-sm">
        {icon}
        {label}
      </div>

      <div className="font-minecraft text-forest-400 text-sm sm:text-base font-bold text-right">
        {value}
      </div>
    </div>
  );
}