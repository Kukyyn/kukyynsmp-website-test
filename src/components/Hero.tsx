import { useState, useEffect } from 'react';
import { Copy, Check, ChevronDown, Sword, Map, Coins } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState('Loading...');

  const copy = () => {
    navigator.clipboard.writeText('mc.kukyyn.cz');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetch('https://api.mcsrvstat.us/3/mc.kukyyn.cz')
      .then((res) => res.json())
      .then((data) => {
        if (data.online) {
          setOnlinePlayers(`${data.players.online}/${data.players.max} hráčů online`);
        } else {
          setOnlinePlayers('Server offline');
        }
      })
      .catch(() => setOnlinePlayers('Server offline'));
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950" />

      <div className="absolute top-20 left-[8%] w-12 h-12 bg-earth-600 rounded-sm opacity-40 animate-float hidden lg:block" style={{ animationDelay: '0s' }} />
      <div className="absolute top-32 right-[12%] w-8 h-8 bg-forest-700 rounded-sm opacity-50 animate-float hidden lg:block" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-[15%] w-10 h-10 bg-stone-600 rounded-sm opacity-30 animate-float hidden lg:block" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-60 right-[8%] w-14 h-14 bg-war-800 rounded-sm opacity-25 animate-float hidden lg:block" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="font-minecraft text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-100 leading-tight mb-4 text-shadow-lg">
          <span className="text-forest-400">Kukyyn</span>
          <span className="text-stone-100">SMP</span>
        </h1>

        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-forest-500 to-transparent mx-auto mb-6" />

        <p className="text-stone-300 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Buduj říši. Dobývej území. Ovládni ekonomiku.
          <br />
          <span className="text-stone-400 text-base">
            Strategická survival mapa s válkami, frakcemi a obchodem.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="bg-stone-900 border border-stone-700 rounded-lg px-6 py-3 pixel-border">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-3 h-3 rounded-sm bg-forest-500" />
              <span className="font-mono text-lg font-semibold text-stone-100 tracking-wide">
                mc.kukyyn.cz
              </span>
            </div>

            <p className="text-sm text-forest-400 mt-2 font-medium text-center">
              👥 {onlinePlayers}
            </p>
          </div>

          <button
            onClick={copy}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              copied
                ? 'bg-forest-600 border-2 border-forest-400 text-white glow-green'
                : 'bg-forest-700 hover:bg-forest-600 border-2 border-forest-600 hover:border-forest-500 text-white'
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Zkopírováno!' : 'Kopírovat IP'}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[
            { icon: Map, label: 'Mapa světa', color: 'text-forest-400 bg-forest-950 border-forest-800' },
            { icon: Sword, label: 'Války & boje', color: 'text-war-400 bg-war-950 border-war-800' },
            { icon: Coins, label: 'Ekonomika', color: 'text-gold-400 bg-yellow-950 border-yellow-800' },
          ].map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${color}`}
            >
              <Icon size={14} />
              {label}
            </div>
          ))}
        </div>

        <a
          href="#mapa"
          className="inline-flex flex-col items-center gap-2 text-stone-500 hover:text-stone-300 transition-colors group"
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Prozkoumat
          </span>
          <ChevronDown
            size={20}
            className="animate-bounce group-hover:text-forest-400 transition-colors"
          />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-950 to-transparent" />
    </section>
  );
}