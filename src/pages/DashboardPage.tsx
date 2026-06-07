import { Link } from 'react-router-dom';
import { LogOut, Map, Coins, Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const username = user?.email?.split('@')[0] ?? 'Hráč';

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px),
            repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px)
          `,
        }}
      />

      {/* Topbar */}
      <header className="relative z-10 border-b border-stone-800 bg-stone-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-forest-600 rounded-sm flex items-center justify-center pixel-border group-hover:bg-forest-500 transition-colors">
                <span className="font-minecraft text-[8px] text-white leading-none">K</span>
              </div>
              <span className="font-minecraft text-xs text-stone-100 hidden sm:block tracking-tight">KukyynSMP</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-stone-800 border border-stone-700 rounded-lg px-3 py-1.5">
                <User size={13} className="text-forest-400" />
                <span className="text-xs text-stone-300 font-medium max-w-[120px] truncate">{username}</span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 mc-button bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs px-3 py-2 rounded-lg"
              >
                <LogOut size={13} />
                Odhlásit se
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-minecraft text-2xl text-stone-100 mb-2">
            Vítej, <span className="text-forest-400">{username}</span>
          </h1>
          <p className="text-stone-500 text-sm">Toto je tvůj hráčský panel.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: Shield,
              label: 'Frakce',
              value: '—',
              desc: 'Zatím nejsi v žádné frakci.',
              color: 'text-war-400',
              bg: 'bg-war-950/40 border-war-900',
            },
            {
              icon: Map,
              label: 'Území',
              value: '0',
              desc: 'Dobytých teritorií.',
              color: 'text-forest-400',
              bg: 'bg-forest-950/40 border-forest-900',
            },
            {
              icon: Coins,
              label: 'Balance',
              value: '0 ⬡',
              desc: 'Herní měna.',
              color: 'text-gold-400',
              bg: 'bg-yellow-950/40 border-yellow-900',
            },
          ].map(({ icon: Icon, label, value, desc, color, bg }) => (
            <div key={label} className={`border rounded-xl p-6 ${bg}`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon size={18} className={color} />
                <span className="text-stone-400 text-sm font-medium">{label}</span>
              </div>
              <div className={`font-minecraft text-2xl ${color} mb-1`}>{value}</div>
              <div className="text-stone-600 text-xs">{desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="font-minecraft text-sm text-stone-300 mb-4">Rychlé odkazy</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 mc-button bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs px-4 py-2.5 rounded-lg"
            >
              <Map size={13} />
              Mapa světa
            </Link>
            <Link
              to="/#ekonomika"
              className="flex items-center gap-2 mc-button bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs px-4 py-2.5 rounded-lg"
            >
              <Coins size={13} />
              Ekonomika
            </Link>
            <button
              onClick={() => window.open('https://discord.gg/9jrRVqmqt5', '_blank')}
              className="flex items-center gap-2 mc-button bg-indigo-900/60 hover:bg-indigo-800/60 text-indigo-300 text-xs px-4 py-2.5 rounded-lg border border-indigo-800"
            >
              Discord
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
