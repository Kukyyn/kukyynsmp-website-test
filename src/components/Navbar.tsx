import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Map, Coins, LogIn, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { label: 'Mapa', href: '#mapa', icon: Map },
  { label: 'Ekonomika', href: '#ekonomika', icon: Coins },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState('Loading...');
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    fetch('https://api.mcsrvstat.us/3/mc.kukyyn.cz')
      .then((res) => res.json())
      .then((data) => {
        if (data.online) {
          setOnlinePlayers(`👥 ${data.players.online}/${data.players.max} Online`);
        } else {
          setOnlinePlayers('🔴 Offline');
        }
      })
      .catch(() => setOnlinePlayers('🔴 Offline'));
  }, []);

  const username =
  user?.user_metadata?.minecraft_nick ||
  user?.email?.split('@')[0] ||
  '';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-forest-500 rounded-sm flex items-center justify-center pixel-border group-hover:bg-forest-400 transition-colors">
              <span className="font-minecraft text-[8px] text-white leading-none">K</span>
            </div>
            <span className="font-minecraft text-xs text-stone-100 hidden sm:block tracking-tight">
              KukyynSMP
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 transition-all duration-150 text-sm font-medium"
              >
                <Icon size={15} />
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
              <span className="text-xs text-stone-300 font-medium font-mono">
                {onlinePlayers}
              </span>
            </div>

            <button
              onClick={() => window.open('https://discord.gg/9jrRVqmqt5', '_blank')}
              className="mc-button bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded"
            >
              🌍 Discord
            </button>

            {user ? (
              <>
                <div className="flex items-center gap-2 bg-stone-800 border border-stone-700 rounded px-3 py-1.5">
                  <User size={13} className="text-forest-400" />
                  <span className="text-xs text-stone-300 font-medium max-w-[100px] truncate">{username}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 mc-button bg-forest-800 hover:bg-forest-700 text-forest-300 text-xs px-3 py-2 rounded"
                >
                  <LayoutDashboard size={13} />
                  Panel
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1.5 mc-button bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs px-3 py-2 rounded"
                >
                  <LogOut size={13} />
                  Odhlásit
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 mc-button bg-forest-700 hover:bg-forest-600 text-white text-xs px-4 py-2 rounded"
              >
                <LogIn size={13} />
                Přihlásit se
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 text-stone-400 hover:text-stone-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-stone-950/98 backdrop-blur-md border-t border-stone-800">
          <div className="px-4 py-4 space-y-1">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded text-stone-300 hover:text-white hover:bg-stone-800 transition-all text-sm font-medium"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}

            <div className="pt-3 border-t border-stone-800 space-y-2">
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
                <span className="text-xs text-stone-300 font-mono">
                  {onlinePlayers}
                </span>
              </div>

              <button
                onClick={() => {
                  window.open('https://discord.gg/9jrRVqmqt5', '_blank');
                  setOpen(false);
                }}
                className="w-full mc-button bg-indigo-600 text-white text-sm py-2.5 rounded font-medium"
              >
                🌍 Discord
              </button>

              {user ? (
                <>
                  <div className="flex items-center gap-2 bg-stone-800 border border-stone-700 rounded px-3 py-2">
                    <User size={13} className="text-forest-400" />
                    <span className="text-xs text-stone-300 truncate">{username}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center justify-center gap-2 mc-button bg-forest-800 text-forest-300 text-sm py-2.5 rounded font-medium"
                  >
                    <LayoutDashboard size={14} />
                    Můj panel
                  </Link>
                  <button
                    onClick={() => { signOut(); setOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 mc-button bg-stone-800 text-stone-300 text-sm py-2.5 rounded font-medium"
                  >
                    <LogOut size={14} />
                    Odhlásit se
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 mc-button bg-forest-700 text-white text-sm py-2.5 rounded font-medium"
                >
                  <LogIn size={14} />
                  Přihlásit se
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
