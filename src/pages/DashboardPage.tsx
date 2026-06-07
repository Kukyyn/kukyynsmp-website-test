import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Coins, User, Shield, Clock, Castle, RefreshCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

type PlayerStats = {
  minecraft_nick: string;
  balance: number;
  land_name: string | null;
  rank_name: string | null;
  playtime_minutes: number;
  online: boolean;
};

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  const [nick, setNick] = useState('');
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackName = user?.email?.split('@')[0] ?? 'Hráč';

  useEffect(() => {
    if (!user) return;

    async function loadDashboard() {
      setLoading(true);

      const metadataNick = user.user_metadata?.minecraft_nick as string | undefined;

      const { data: profile } = await supabase
        .from('profiles')
        .select('minecraft_nick')
        .eq('id', user.id)
        .maybeSingle();

      const finalNick = profile?.minecraft_nick || metadataNick || '';

      if (finalNick) {
        setNick(finalNick);

        await supabase.from('profiles').upsert({
          id: user.id,
          minecraft_nick: finalNick,
        });

        const { data: statsData } = await supabase
          .from('minecraft_player_stats')
          .select('*')
          .ilike('minecraft_nick', finalNick)
          .maybeSingle();

        setStats(statsData);
      }

      setLoading(false);
    }

    loadDashboard();
  }, [user]);

  const money = Number(stats?.balance ?? 0).toLocaleString('cs-CZ', {
    maximumFractionDigits: 0,
  });

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

  const skinUrl = nick
    ? `https://mc-heads.net/body/${encodeURIComponent(nick)}/140`
    : '';

  const avatarUrl = nick
    ? `https://mc-heads.net/avatar/${encodeURIComponent(nick)}/80`
    : '';

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 bg-stone-950/90">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="font-minecraft text-sm text-stone-100">
            KukyynSMP
          </Link>

          <button
            onClick={signOut}
            className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs px-3 py-2 rounded-lg"
          >
            <LogOut size={14} />
            Odhlásit se
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-10">
        {loading ? (
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 text-stone-400 text-sm">
            Načítám dashboard...
          </div>
        ) : !nick ? (
          <div className="bg-red-950/30 border border-red-900 rounded-xl p-6 text-red-300 text-sm">
            Minecraft nick se nepodařilo načíst.
          </div>
        ) : (
          <>
            <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 h-44 flex items-end justify-center">
                <img
                  src={skinUrl}
                  alt={`${nick} skin`}
                  className="h-36 w-auto"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex justify-center sm:justify-start mb-4">
                  <img
                    src={avatarUrl}
                    alt={`${nick} avatar`}
                    className="w-14 h-14 rounded-lg border border-stone-700"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <p className="text-stone-500 text-xs mb-2">Minecraft hráč</p>

                <h1 className="font-minecraft text-2xl text-forest-400 mb-3">
                  {nick || fallbackName}
                </h1>

                <div className="inline-flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-full px-3 py-1 text-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      stats?.online ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  />
                  <span className={stats?.online ? 'text-green-400' : 'text-red-400'}>
                    {stats?.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </section>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <SmallCard icon={<Coins size={18} />} label="Peníze" value={money} />
              <SmallCard icon={<Shield size={18} />} label="Rank" value={rank} />
              <SmallCard icon={<Clock size={18} />} label="Čas" value={playtime} />
              <SmallCard icon={<Castle size={18} />} label="Land" value={land} />
            </div>

            <section className="bg-stone-900 border border-stone-800 rounded-xl p-6 mb-6">
              <h2 className="font-minecraft text-sm text-stone-200 mb-5">
                Informace
              </h2>

              <div className="space-y-4">
                <InfoRow icon={<User size={16} />} label="Minecraft nick" value={nick} />
                <InfoRow icon={<Shield size={16} />} label="Rank" value={rank} />
                <InfoRow icon={<Castle size={16} />} label="Land" value={land} />
                <InfoRow icon={<Clock size={16} />} label="Odehraný čas" value={playtime} />
              </div>

              {!stats && (
                <p className="text-stone-500 text-sm mt-6">
                  Pro nick <span className="text-forest-400">{nick}</span> zatím nejsou data.
                  Připoj se na server a počkej na sync.
                </p>
              )}
            </section>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <RefreshCcw size={14} />
              Data se načítají ze server databáze.
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function SmallCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
      <div className="flex items-center gap-2 text-stone-500 mb-3">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <div className="font-minecraft text-lg text-forest-400 truncate">
        {value}
      </div>
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
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-stone-800 pb-3 last:border-b-0">
      <div className="flex items-center gap-2 text-stone-500 text-sm">
        {icon}
        {label}
      </div>

      <div className="text-stone-200 text-sm font-medium text-right">
        {value}
      </div>
    </div>
  );
}