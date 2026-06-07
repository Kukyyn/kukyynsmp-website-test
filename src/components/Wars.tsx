import { Sword, Shield, Clock, Trophy, Flame, AlertTriangle } from 'lucide-react';

type War = {
  attacker: string;
  defender: string;
  attackerColor: string;
  defenderColor: string;
  status: 'active' | 'ended' | 'ceasefire';
  since: string;
  attackerScore: number;
  defenderScore: number;
  reason: string;
  territory: string;
};

const wars: War[] = [
  {
    attacker: 'RedClaw',
    defender: 'Northkeep',
    attackerColor: 'text-red-400',
    defenderColor: 'text-blue-400',
    status: 'active',
    since: '3 dny',
    attackerScore: 14,
    defenderScore: 9,
    reason: 'Napadení severního obchodního koridoru',
    territory: 'Frostholm Passage',
  },
  {
    attacker: 'Ironforge',
    defender: 'GoldenHand',
    attackerColor: 'text-orange-400',
    defenderColor: 'text-yellow-400',
    status: 'ceasefire',
    since: '1 týden',
    attackerScore: 7,
    defenderScore: 7,
    reason: 'Spor o zlaté doly na hranici',
    territory: 'Goldmine Ridge',
  },
  {
    attacker: 'Greenleaf',
    defender: 'RedClaw',
    attackerColor: 'text-green-400',
    defenderColor: 'text-red-400',
    status: 'ended',
    since: '2 týdny',
    attackerScore: 21,
    defenderScore: 8,
    reason: 'Vítězná obranná válka Greenlef',
    territory: 'Southern Forest',
  },
];

const rules = [
  {
    icon: Sword,
    title: 'Vyhlášení války',
    desc: 'Válku lze vyhlásit frakci s alespoň 5 členy. Potřebujete 500 zlatých jako zálohu.',
  },
  {
    icon: Shield,
    title: 'Obrana území',
    desc: 'Obránce má 24h na přípravu po vyhlášení války. Začínající útok musí být oznámen.',
  },
  {
    icon: Trophy,
    title: 'Vítězství',
    desc: 'Vítěz získává právo nароkovat až 3 nepřátelské chunks a plunder ze skladů.',
  },
  {
    icon: Clock,
    title: 'Příměří',
    desc: 'Příměří lze uzavřít kdykoli. Po 30 dnech bez boje válka automaticky končí.',
  },
];

const statusBadge: Record<string, { label: string; classes: string; icon: typeof Flame }> = {
  active: { label: 'Probíhá', classes: 'bg-red-950 text-red-400 border-red-800', icon: Flame },
  ceasefire: { label: 'Příměří', classes: 'bg-yellow-950 text-yellow-400 border-yellow-800', icon: AlertTriangle },
  ended: { label: 'Skončila', classes: 'bg-stone-800 text-stone-400 border-stone-700', icon: Trophy },
};

export default function Wars() {
  return (
    <section id="války" className="py-24 bg-stone-900/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-transparent to-stone-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-war-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Sword size={14} />
            Válečná deska
          </div>
          <h2 className="font-minecraft text-2xl sm:text-3xl text-stone-100 mb-4">
            Aktivní <span className="text-war-400">konflikty</span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
            Přehled probíhajících válek, příměří a nedávno ukončených konfliktů mezi frakcemi.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {wars.map((war, i) => {
            const badge = statusBadge[war.status];
            const BadgeIcon = badge.icon;
            const total = war.attackerScore + war.defenderScore;
            const atkPct = total ? (war.attackerScore / total) * 100 : 50;

            return (
              <div
                key={i}
                className={`bg-stone-900 border rounded-xl p-6 pixel-border transition-all hover:border-stone-600 ${
                  war.status === 'active' ? 'border-red-900 glow-red' : 'border-stone-800'
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${badge.classes}`}>
                    <BadgeIcon size={10} />
                    {badge.label}
                  </div>
                  <span className="text-stone-600 text-xs">{war.since}</span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className={`font-minecraft text-sm ${war.attackerColor}`}>{war.attacker}</span>
                  <div className="flex items-center gap-2 text-stone-600">
                    <span className="font-mono text-lg font-bold text-stone-300">{war.attackerScore}</span>
                    <Sword size={12} className="text-stone-600" />
                    <span className="font-mono text-lg font-bold text-stone-300">{war.defenderScore}</span>
                  </div>
                  <span className={`font-minecraft text-sm ${war.defenderColor}`}>{war.defender}</span>
                </div>

                <div className="h-2 bg-stone-800 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-700"
                    style={{ width: `${atkPct}%` }}
                  />
                </div>

                <div className="pt-4 border-t border-stone-800">
                  <p className="text-stone-500 text-xs mb-1">{war.reason}</p>
                  <p className="text-stone-600 text-xs">Sporné území: <span className="text-stone-400">{war.territory}</span></p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="font-minecraft text-lg text-stone-200 text-center mb-8">Pravidla válečnictví</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rules.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-stone-900 border border-stone-800 rounded-xl p-5 hover:border-stone-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-war-950 border border-war-900 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-war-400" />
                </div>
                <h4 className="text-stone-200 font-semibold text-sm mb-2">{title}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
