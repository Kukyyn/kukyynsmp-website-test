import { Link } from 'react-router-dom';
import { LogOut, Map, User, Copy, ExternalLink, Pickaxe, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const username = user?.email?.split('@')[0] ?? 'Hráč';

  const copyIp = () => {
    navigator.clipboard.writeText('mc.kukyyn.cz');
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
          Vítej, <span className="text-forest-400">{username}</span>
        </h1>
        <p className="text-stone-500 text-sm mb-10">
          Tvůj hráčský panel pro KukyynSMP.
        </p>

        <div className="grid lg:grid-cols-3 gap-5 mb-10">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
            <User className="text-forest-400 mb-4" />
            <h2 className="font-minecraft text-sm mb-3">Minecraft profil</h2>
            <p className="text-stone-400 text-sm mb-4">
              Minecraft nick zatím není propojený.
            </p>
            <p className="text-xs text-stone-600">Brzy bude možné nastavit nick přímo zde.</p>
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
          <h2 className="font-minecraft text-sm mb-4">Připravujeme propojení se serverem</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-stone-400">
            <div>Balance z CMI<br /><span className="text-stone-600 text-xs">Brzy propojeno</span></div>
            <div>Země / národ z Lands<br /><span className="text-stone-600 text-xs">Brzy propojeno</span></div>
            <div>Rank z LuckPerms<br /><span className="text-stone-600 text-xs">Brzy propojeno</span></div>
            <div>Herní čas<br /><span className="text-stone-600 text-xs">Brzy propojeno</span></div>
          </div>
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