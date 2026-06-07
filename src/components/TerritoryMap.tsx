import { Map, ExternalLink } from 'lucide-react';

export default function TerritoryMap() {

  return (
    <section id="mapa" className="py-24 bg-stone-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/30 to-stone-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-forest-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Map size={14} />
            Mapa světa
          </div>
          <h2 className="font-minecraft text-2xl sm:text-3xl text-stone-100 mb-4">
            Interaktivní <span className="text-forest-400">dynmapa</span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
            Prohlédni si live mapu všech frakcí, jejich území a fortifikací v reálném čase.
          </p>
        </div>

        <div className="bg-stone-900 border border-stone-700 rounded-xl overflow-hidden pixel-border">
          <iframe
            src="https://mapa.kukyyn.cz"
            className="w-full"
            style={{ height: 'min(600px, 80vh)' }}
            allow="fullscreen"
            title="KukyynSMP Dynmapa"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="https://mapa.kukyyn.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="mc-button bg-forest-700 hover:bg-forest-600 border-forest-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2"
          >
            Otevřít dynmapu na celou obrazovku
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
