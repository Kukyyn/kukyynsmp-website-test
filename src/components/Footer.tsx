import { Map, Coins } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-900 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-forest-600 rounded-sm flex items-center justify-center pixel-border">
                <span className="font-minecraft text-[8px] text-white">K</span>
              </div>
              <span className="font-minecraft text-sm text-stone-200">KukyynSMP</span>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed mb-4">
              Strategický Minecraft survival server se zaměřením na frakce, války a ekonomiku. Každé rozhodnutí má důsledky.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
              Server běží 24/7
            </div>
          </div>

          <div>
            <h4 className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-4">Navigace</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Mapa světa', href: '#mapa', icon: Map },
                { label: 'Ekonomika', href: '#ekonomika', icon: Coins },
              ].map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a href={href} className="flex items-center gap-2 text-stone-500 hover:text-stone-300 text-xs transition-colors">
                    <Icon size={12} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-4">Připojit se</h4>
            <div className="space-y-3">
              <div className="bg-stone-900 border border-stone-800 rounded-lg p-3">
                <div className="text-stone-500 text-xs mb-1">Java Edition IP</div>
                <div className="font-mono text-stone-200 text-sm font-semibold">mc.kukyyn.cz</div>
              </div>
              <div className="bg-stone-900 border border-stone-800 rounded-lg p-3">
                <div className="text-stone-500 text-xs mb-1">Verze</div>
                <div className="font-mono text-stone-200 text-sm font-semibold">1.21.11</div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText('mc.kukyyn.cz')}
                className="w-full mc-button bg-forest-700 hover:bg-forest-600 text-white text-xs py-2.5 rounded-lg font-medium"
              >
                Kopírovat IP adresu
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-700 text-xs">
            © 2025 KukyynSMP — Všechna práva vyhrazena
          </p>
          <p className="text-stone-700 text-xs">
            Minecraft je registrovaná ochranná známka Mojang Studios
          </p>
        </div>
      </div>
    </footer>
  );
}
