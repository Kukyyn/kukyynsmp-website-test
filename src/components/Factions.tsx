import { Users, Shield, Sword, Wheat, Coins, Mountain } from 'lucide-react';

type Faction = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  leader: string;
  members: number;
  territory: number;
  type: string;
  typeIcon: typeof Users;
  primaryColor: string;
  accentColor: string;
  borderColor: string;
  strengths: string[];
  bgGradient: string;
};

const factions: Faction[] = [
  {
    id: 'greenleaf',
    name: 'Greenleaf',
    tagline: 'Pán lesů a farem',
    description: 'Největší a nejorganizovanější frakce serveru. Greenleaf ovládá rozsáhlé zemědělské plochy a zásobuje potravinami polovinu světa. Jejich moc je tichá, ale absolutní.',
    leader: 'LeafMaster',
    members: 15,
    territory: 35,
    type: 'Zemědělská',
    typeIcon: Wheat,
    primaryColor: 'text-forest-400',
    accentColor: 'bg-forest-400',
    borderColor: 'border-forest-700',
    bgGradient: 'from-forest-950/40 to-transparent',
    strengths: ['Výroba potravin', 'Diplomacie', 'Velká členská základna'],
  },
  {
    id: 'northkeep',
    name: 'Northkeep',
    tagline: 'Strážci severu',
    description: 'Starověká frakce sídlící v zasněžených horách. Mistři obrany a dolování. Jejich pevnosti jsou nepřekonatelné a zásoby surovin nevyčerpatelné.',
    leader: 'FrostBorn',
    members: 12,
    territory: 28,
    type: 'Obranná',
    typeIcon: Shield,
    primaryColor: 'text-blue-400',
    accentColor: 'bg-blue-400',
    borderColor: 'border-blue-700',
    bgGradient: 'from-blue-950/40 to-transparent',
    strengths: ['Fortifikace', 'Těžba', 'Strategická výhoda'],
  },
  {
    id: 'ironforge',
    name: 'Ironforge',
    tagline: 'Mistři kovářství',
    description: 'Trpasličí klan žijící v hlubinách hor. Nejlepší zbrojíři na serveru. Jejich zbraně a brnění jsou ceněny každou frakcí. Obchod je jejich zbraň.',
    leader: 'SteelKing',
    members: 9,
    territory: 22,
    type: 'Výrobní',
    typeIcon: Mountain,
    primaryColor: 'text-orange-400',
    accentColor: 'bg-orange-400',
    borderColor: 'border-orange-700',
    bgGradient: 'from-orange-950/40 to-transparent',
    strengths: ['Výroba zbraní', 'Těžba kovů', 'Aliance'],
  },
  {
    id: 'redclaw',
    name: 'RedClaw',
    tagline: 'Válečníci bez hranic',
    description: 'Nejagresivnější frakce na serveru. RedClaw žije pro boj a expanzi. Malá ale velmi efektivní bojová frakce, která terorizuje hranice svých sousedů.',
    leader: 'AshRunner',
    members: 7,
    territory: 18,
    type: 'Militaristická',
    typeIcon: Sword,
    primaryColor: 'text-red-400',
    accentColor: 'bg-red-400',
    borderColor: 'border-red-700',
    bgGradient: 'from-red-950/40 to-transparent',
    strengths: ['PvP nájezdy', 'Rychlá expanze', 'Válečná strategie'],
  },
  {
    id: 'goldenhand',
    name: 'GoldenHand',
    tagline: 'Zlatá ruka trhu',
    description: 'Nejmocnější obchodní cech světa. GoldenHand kontroluje centrální trhy a zlaté rezervy. Malá frakce s obrovským vlivem — každý od nich potřebuje nakoupit.',
    leader: 'Kukyyn',
    members: 6,
    territory: 15,
    type: 'Obchodní',
    typeIcon: Coins,
    primaryColor: 'text-yellow-400',
    accentColor: 'bg-yellow-400',
    borderColor: 'border-yellow-700',
    bgGradient: 'from-yellow-950/40 to-transparent',
    strengths: ['Ekonomická moc', 'Trhy', 'Diplomacie'],
  },
];

export default function Factions() {
  return (
    <section id="frakce" className="py-24 bg-stone-900/40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-transparent to-stone-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-stone-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Users size={14} />
            Frakce
          </div>
          <h2 className="font-minecraft text-2xl sm:text-3xl text-stone-100 mb-4">
            Vyber si <span className="text-stone-300">stranu</span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
            Připoj se k jedné z pěti mocných frakcí nebo založ vlastní a dobývej svět od nuly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
          {factions.map((f) => {
            const TypeIcon = f.typeIcon;
            return (
              <div
                key={f.id}
                className={`relative bg-stone-900 border ${f.borderColor} rounded-xl overflow-hidden hover:scale-[1.01] transition-transform duration-200 pixel-border group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.bgGradient} pointer-events-none`} />

                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${f.accentColor}`} />
                        <span className="text-stone-500 text-xs uppercase tracking-wider font-medium">{f.type}</span>
                      </div>
                      <h3 className={`font-minecraft text-xl ${f.primaryColor}`}>{f.name}</h3>
                      <p className="text-stone-500 text-xs mt-0.5">{f.tagline}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center flex-shrink-0`}>
                      <TypeIcon size={18} className={f.primaryColor} />
                    </div>
                  </div>

                  <p className="text-stone-400 text-xs leading-relaxed mb-5">{f.description}</p>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { label: 'Hráčů', value: f.members },
                      { label: 'Chunks', value: f.territory },
                      { label: 'Vůdce', value: f.leader },
                    ].map(stat => (
                      <div key={stat.label} className="bg-stone-800/70 rounded-lg p-2 text-center">
                        <div className={`font-minecraft text-sm ${f.primaryColor} truncate`}>{stat.value}</div>
                        <div className="text-stone-600 text-xs mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {f.strengths.map(s => (
                      <span key={s} className={`text-xs px-2 py-0.5 rounded-full bg-stone-800 ${f.primaryColor} border border-stone-700`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-stone-900/50 border border-dashed border-stone-700 rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[280px] hover:border-stone-500 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center mb-4 group-hover:border-stone-600 transition-colors">
              <span className="text-2xl text-stone-500 group-hover:text-stone-400 transition-colors">+</span>
            </div>
            <h3 className="text-stone-300 font-semibold text-sm mb-2">Založ vlastní frakci</h3>
            <p className="text-stone-600 text-xs leading-relaxed max-w-xs">
              Sesbírej hráče, vyber území a vypiš svoji vlajku. Ke startu potřebuješ 3 hráče a 200G.
            </p>
          </div>
        </div>

        <div className="text-center bg-stone-900 border border-stone-800 rounded-2xl p-10 pixel-border">
          <h3 className="font-minecraft text-xl sm:text-2xl text-stone-100 mb-3">
            Připraven vstoupit do boje?
          </h3>
          <p className="text-stone-400 text-sm mb-6 max-w-md mx-auto">
            Připoj se na mc.kukyyn.cz a vyber si svou cestu — diplomat, válečník nebo obchodník.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-3 bg-stone-800 border border-stone-700 rounded-lg px-5 py-3">
              <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
              <span className="font-mono text-stone-200 font-semibold tracking-wide">mc.kukyyn.cz</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText('mc.kukyyn.cz')}
              className="mc-button bg-forest-700 hover:bg-forest-600 border-forest-600 text-white px-6 py-3 rounded-lg font-medium text-sm"
            >
              Kopírovat IP a hrát
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
