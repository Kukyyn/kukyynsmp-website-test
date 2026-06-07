import { Coins, ShoppingCart, Hammer, Pickaxe } from 'lucide-react';

const economyFeatures = [
  {
    icon: ShoppingCart,
    title: 'Hráčský trh',
    desc: 'Nakupuj a prodávej suroviny přímo od ostatních hráčů. Ceny se mění dle nabídky a poptávky.',
    color: 'text-forest-400',
    bg: 'bg-forest-950 border-forest-900',
  },
  {
    icon: Hammer,
    title: 'Řemesla & výroba',
    desc: 'Mineři, farmáři i průzkumníci mají vlastní profese s bonusy.',
    color: 'text-orange-400',
    bg: 'bg-orange-950 border-orange-900',
  },
  {
    icon: Coins,
    title: 'Zlatá měna',
    desc: 'Ekonomika je postavena na penězích hráčů. Vydělávej a postav své impérium',
    color: 'text-gold-400',
    bg: 'bg-yellow-950 border-yellow-900',
  },
];

export default function Economy() {
  return (
    <section id="ekonomika" className="py-24 bg-stone-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/20 to-stone-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Coins size={14} />
            Ekonomika
          </div>
          <h2 className="font-minecraft text-2xl sm:text-3xl text-stone-100 mb-4">
            Obchod & <span className="text-gold-400">peníze</span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
            Dynamická ekonomika hráčů. Těž, obchoduj a staň se bohatým nebo zůstaň chudák.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {economyFeatures.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className={`bg-stone-900 border rounded-xl p-6 hover:border-stone-700 transition-colors pixel-border border-stone-800`}>
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mb-4 ${bg}`}>
                <Icon size={20} className={color} />
              </div>
              <h4 className="text-stone-200 font-semibold text-sm mb-2">{title}</h4>
              <p className="text-stone-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
