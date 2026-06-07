import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Map, User, Copy, ExternalLink, Pickaxe, ShieldCheck, Save } from 'lucide-react';
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
};

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const username = user?.email?.split('@')[0] ?? 'Hráč';

  const [minecraftNick, setMinecraftNick] = useState('');
  const [savedNick, setSavedNick] = useState('');
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const copyIp = () => {
    navigator.clipboard.writeText('mc.kukyyn.cz');
    setMessage('IP zkopírována!');
  };

  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours <= 0) return `${mins} min`;
    return `${hours} h ${mins} min`;
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

    const { error } = await supabase
      .from('profiles')
      .upsert({
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
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 bg-stone-950/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-minecraft text-xs">KukyynSMP</Link>

          <button onClick={signOut} className="mc-button bg-stone-800 text-stone-300 text-xs px-3 py-2 rounded-lg">
            <LogOut size={13} /> Odhlásit se
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-minecraft text-2xl mb-2">
          Vítej, <span className="text-forest-400">{savedNick || username}</span>
        </h1>
        <p className="text-stone-500 text-sm mb-4">
          Tvůj hráčský panel pro KukyynSMP.
        </p>

        {message && <p className="text-forest-400 text-sm mb-6">{message}</p>}

        <div className="grid lg:grid-cols-3 gap-5 mb-10">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
            <User className="text-forest-400 mb-4" />
            <h2 className="font-minecraft text-sm mb-3">Minecraft profil</h2>

            <input
              value={minecraftNick}
              onChange={(e) => setMinecraftNick(e.target.value)}
              placeholder="Např. KukySC"
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-sm text-stone-100 mb-3"
            />

            <button onClick={saveMinecraftNick} className="mc-button bg-forest-700 hover:bg-forest-600 text-white text-xs px-4 py-2 rounded-lg">
              <Save size={13} /> Uložit nick
            </button>

            <p className="text-xs text-stone-600 mt-3">
              Zadej přesně stejný nick, se kterým hraješ na serveru.
            </p>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
            <Pickaxe className="text-gold-400 mb-4" />
            <h2 className="font-minecraft text-sm mb-3">Začni hrát</h2>
            <p className="text-stone-400 text-sm mb-3">IP serveru:</p>
            <div className="font-minecraft text-forest-400 mb-4">mc.kukyyn.cz</div>
            <button onClick={copyIp} className="mc-button bg-stone-800 text-stone-300 text-xs px-4 py-2 rounded-lg">
              <Copy size={13} /> Kopírovat IP
            </button>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
            <Map className="text-blue-400 mb-4" />
            <h2 className="font-minecraft text-sm mb-3">Mapa světa</h2>
            <p className="text-stone-400 text-sm mb-4">
              Sleduj Earth mapu a území hráčů.
            </p>
            <button
              onClick={() => window.open('https://mapa.kukyyn.cz', '_blank')}
              className="mc-button bg-stone-800 text-stone-300 text-xs px-4 py-2 rounded-lg"
            >
              <ExternalLink size={13} /> Otevřít mapu
            </button>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 mb-8">
          <h2 className="font-minecraft text-sm mb-4">Propojení se serverem</h2>

          {!savedNick && (
            <p className="text-stone-500 text-sm">Nejdřív si nastav Minecraft nick.</p>
          )}

          {savedNick && !stats && !loading && (
            <p className="text-stone-500 text-sm">
              Pro nick <span className="text-forest-400">{savedNick}</span> zatím nejsou data. Připoj se na server a počkej na sync.
            </p>
          )}

          {stats && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-stone-400">
              <div>
                Balance z CMI<br />
                <span className="text-gold-400 text-lg font-minecraft">{stats.balance ?? 0}</span>
              </div>

              <div>
                Země / národ z Lands<br />
                <span className="text-forest-400 text-sm">
                  {stats.nation_name || stats.land_name || 'Žádná země'}
                </span>
              </div>

              <div>
                Rank z LuckPerms<br />
                <span className="text-blue-400 text-sm">{stats.rank_name || 'default'}</span>
              </div>

              <div>
                Herní čas<br />
                <span className="text-stone-300 text-sm">{formatPlaytime(stats.playtime_minutes ?? 0)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-forest-950/30 border border-forest-900 rounded-xl p-6">
          <ShieldCheck className="text-forest-400 mb-3" />
          <h2 className="font-minecraft text-sm mb-4">Nováček na serveru?</h2>
          <ol className="text-stone-400 text-sm space-y-2">
            <li>1. Připoj se na <span className="text-forest-400">mc.kukyyn.cz</span></li>
            <li>2. Najdi si místo na Earth mapě</li>
            <li>3. Založ stát nebo se k nějakému přidej</li>
            <li>4. Přidej se na Discord</li>
          </ol>
        </div>
      </main>
    </div>
  );
}