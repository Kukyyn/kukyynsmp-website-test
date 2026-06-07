import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LogOut,
  Coins,
  User,
  Shield,
  Users,
  List,
  Clock,
  Castle,
  RefreshCcw,
  Save,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

type PlayerStats = {
  minecraft_nick: string;
  balance: number;
  land_name: string | null;
  nation_name: string | null;
  rank_name: string | null;
  playtime_minutes: number;
  online: boolean;
  updated_at?: string | null;
};

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const username = user?.email?.split('@')[0] ?? 'Hráč';

  const [minecraftNick, setMinecraftNick] = useState('');
  const [savedNick, setSavedNick] = useState('');
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const money = Number(stats?.balance ?? 0).toLocaleString('cs-CZ', {
    maximumFractionDigits: 0,
  });

  const displayRank =
    stats?.rank_name === 'default'
      ? 'SETTLER'
      : (stats?.rank_name || 'HRÁČ').toUpperCase();

  const playtime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const cleanLand = (land?: string | null) => {
    if (!land || land === '§8None') return 'Žádný land';
    return land.replace(/§./g, '');
  };

  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      setLoading(true);

      const { data: profile } = await supabase
        .from('profiles')
        .select('minecraft_nick')
        .eq('id', user.id)
        .maybeSingle();

      if (profile?.minecraft_nick) {
        setMinecraftNick(profile.minecraft_nick);
        setSavedNick(profile.minecraft_nick);
        await loadStats(profile.minecraft_nick);
      }

      setLoading(false);
    }

    loadProfile();
  }, [user]);

  const loadStats = async (nick: string) => {
    const { data } = await supabase
      .from('minecraft_player_stats')
      .select('*')
      .ilike('minecraft_nick', nick)
      .maybeSingle();

    setStats(data);
  };

  const saveMinecraftNick = async () => {
    if (!user || !minecraftNick.trim()) return;

    const nick = minecraftNick.trim();

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      minecraft_nick: nick,
    });

    if (error) {
      setMessage('Nepodařilo se uložit Minecraft nick.');
      return;
    }

    setSavedNick(nick);
    setMessage('Minecraft nick uložen.');
    await loadStats(nick);
  };

  return (
    <div className="min-h-screen bg-[#030506] text-stone-100 font-minecraft">
      <header className="border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xs tracking-wider text-stone-200">
            KukyynSMP
          </Link>

          <button
            onClick={signOut}
            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 border border-white/10 text-stone-300 text-xs px-4 py-2 rounded-lg"
          >
            <LogOut size={15} />
            Odhlásit se
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="rounded-2xl border border-white/10 bg-[#0b0f12]/90 shadow-2xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl text-white tracking-wider mb-10 uppercase">
            Vítej zpět, {savedNick || username}!
          </h1>

          {message && <div className="mb-6 text-sm text-green-400">{message}</div>}

          {!savedNick && (
            <div className="mb-8 rounded-xl border border-green-900/60 bg-green-950/20 p-5">
              <div className="text-sm text-stone-300 mb-3">
                Nejdřív si nastav Minecraft nick, aby se načetla data ze serveru.
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={minecraftNick}
                  onChange={(e) => setMinecraftNick(e.target.value)}
                  placeholder="Např. KukySC"
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-stone-100 outline-none"
                />

                <button
                  onClick={saveMinecraftNick}
                  className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white text-xs px-5 py-3 rounded-lg"
                >
                  <Save size={15} />
                  Uložit nick
                </button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <StatCard
              icon={<Coins size={48} className="text-yellow-400" />}
              label="PENÍZE"
              value={money}
              color="text-yellow-400"
            />

            <StatCard
              icon={<User size={48} className="text-green-400" />}
              label="STATUS"
              value={stats?.online ? 'ONLINE' : 'OFFLINE'}
              color={stats?.online ? 'text-green-400' : 'text-red-400'}
            />

            <StatCard
              icon={<Shield size={48} className="text-blue-400" />}
              label="RANK"
              value={displayRank}
              color="text-blue-400"
            />

            <StatCard
              icon={<Users size={48} className="text-stone-300" />}
              label="SERVER"
              value="ONLINE"
              color="text-stone-200"
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-[#11161a]/80 p-8 mb-8">
            <div className="flex items-center gap-4 mb-10">
              <List size={32} className="text-stone-300" />
              <h2 className="text-2xl text-white">INFORMACE</h2>
            </div>

            {savedNick && !stats && !loading ? (
              <p className="text-stone-400 text-sm">
                Pro nick <span className="text-green-400">{savedNick}</span> zatím nejsou data.
                Připoj se na server a počkej na sync.
              </p>
            ) : (
              <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8">
                <InfoItem
                  icon={<Clock size={42} />}
                  label="ODEHRANÝ ČAS"
                  value={playtime(stats?.playtime_minutes ?? 0)}
                />

                <InfoItem
                  icon={<Castle size={42} />}
                  label="LAND"
                  value={cleanLand(stats?.land_name)}
                />

                <InfoItem
                  icon={<User size={42} />}
                  label="MINECRAFT NICK"
                  value={savedNick || 'Nenastaveno'}
                />

                <InfoItem
                  icon={<Shield size={42} />}
                  label="RANK"
                  value={displayRank}
                  blue
                />
              </div>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#11161a]/80 p-5 flex items-center gap-3 text-stone-400 text-sm">
            <RefreshCcw size={22} />
            POSLEDNÍ AKTUALIZACE: PŘED CHVÍLÍ
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#11161a]/80 p-6 flex items-center gap-5 shadow-lg">
      {icon}
      <div>
        <div className="text-stone-300 text-lg mb-2">{label}</div>
        <div className={`${color} text-3xl uppercase`}>{value}</div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  blue = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  blue?: boolean;
}) {
  return (
    <div className="flex items-center gap-7 border-b border-white/10 pb-7">
      <div className="text-green-400 shrink-0">{icon}</div>
      <div>
        <div className="text-stone-300 text-lg mb-2">{label}</div>
        <div className={`${blue ? 'text-blue-400' : 'text-green-400'} text-2xl uppercase`}>
          {value}
        </div>
      </div>
    </div>
  );
}