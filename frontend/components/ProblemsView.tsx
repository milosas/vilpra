'use client';

import { useState } from 'react';
import {
  Search,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Thermometer,
  Droplet,
  Volume2,
  Snowflake,
  Zap,
  Wifi,
  TrendingDown,
  Power,
  Package,
  CheckCircle2,
  Tag
} from 'lucide-react';

type Severity = 'dažna' | 'vidutinė' | 'reta';

interface Problem {
  id: string;
  title: string;
  severity: Severity;
  models: string[];
  description: string;
  symptoms: string[];
  solutions: string[];
  errorCodes: string[];
  category: string;
  icon: React.ReactNode;
}

const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Šilumos siurblys neįsijungia',
    severity: 'dažna',
    models: ['Daitsu ASD', 'Mitsubishi MSZ-AP', 'Gree Lomo'],
    description: 'Įrenginys nereaguoja į maitinimo mygtuką arba nuotolinio valdymo pultą. Neužsidega jokie indikatoriai.',
    symptoms: [
      'Neužsidega jokios lemputės ant vidinio bloko',
      'Nėra reakcijos į pulto mygtukus',
      'Negirdėti jokie garsai iš įrenginio',
      'Ekranas neįsijungia'
    ],
    solutions: [
      'Patikrinkite ar yra elektros energija - įsitikinkite, kad saugikliai nesudegę',
      'Įsitikinkite, kad maitinimo jungiklis ant įrenginio yra ON padėtyje',
      'Pakeiskite nuotolinio valdymo pulto baterijas',
      'Išjunkite maitinimą 5 minutėms, tada įjunkite iš naujo (sistemos reset)',
      'Patikrinkite ar nesusidėvėję kontaktai automatiniame jungiklyje'
    ],
    errorCodes: ['--', 'E00', 'P01'],
    category: 'Maitinimas',
    icon: <Power className="w-5 h-5" />
  },
  {
    id: '2',
    title: 'Per žemas vandens slėgis sistemoje',
    severity: 'dažna',
    models: ['Panasonic Aquarea', 'LG Therma V'],
    description: 'Manometras rodo slėgį žemesnį nei 1 bar. Sistema gali automatiškai išsijungti dėl žemo slėgio apsaugos.',
    symptoms: [
      'Manometras rodo mažiau nei 1 bar',
      'Įrenginys rodo klaidos kodą dėl žemo slėgio',
      'Šildymas veikia neefektyviai arba visai neveikia',
      'Sistema dažnai išsijungia'
    ],
    solutions: [
      'Papildykite sistemą vandeniu per užpildymo ventilį iki 1.5-2 bar šaltoje sistemoje',
      'Patikrinkite ar nėra nutekėjimų vamzdžiuose, jungiamose vietose, radiatoriuose',
      'Išorinkite orą iš radiatorių ir sistemos',
      'Patikrinkite plėtimosi indo būklę - gali būti praradęs slėgį',
      'Jei slėgis dažnai krenta - kreipkitės į servisą nutekėjimo paieškai'
    ],
    errorCodes: ['E01', 'F01', 'LP'],
    category: 'Slėgis',
    icon: <Droplet className="w-5 h-5" />
  },
  {
    id: '3',
    title: 'Triukšmingas lauko blokas',
    severity: 'vidutinė',
    models: ['Daitsu ASD', 'Gree Lomo', 'Mitsubishi MSZ-AP'],
    description: 'Lauko blokas veikia garsiau nei įprastai, girdėti klaksėjimas, vibracija arba švilpimas.',
    symptoms: [
      'Girdimas vibracijos garsas nuo lauko bloko',
      'Metalinis klaksėjimas įsijungimo arba išsijungimo metu',
      'Švilpimas kompresoriaus darbo metu',
      'Garsas pasikartoja kas kelias minutes'
    ],
    solutions: [
      'Patikrinkite ar lauko blokas tvirtai pritvirtintas prie pagrindo/sienos',
      'Įdėkite antivibracinius padelius po lauko bloko',
      'Išvalykite lauko bloką - dulkės ir nešvarumai gali sukelti disbalansą',
      'Patikrinkite ar vožtuvas arba kompresoriaus tvirtinimai nėra atsilaisvinę',
      'Aktyvuokite "Tylų" režimą nustatymuose (jei yra)',
      'Jei triukšmas tęsiasi - kreipkitės į servisą patikrinti ventiliatoriaus guolių'
    ],
    errorCodes: [],
    category: 'Triukšmas',
    icon: <Volume2 className="w-5 h-5" />
  },
  {
    id: '4',
    title: 'Šilumos siurblys užšąla',
    severity: 'vidutinė',
    models: ['Mitsubishi MSZ-AP', 'Panasonic Aquarea', 'LG Therma V'],
    description: 'Lauko blokas apdengiamas ledu žiemos metu, automatinis atšildymas neveikia arba veikia neefektyviai.',
    symptoms: [
      'Lauko blokas visiškai apdengiamas ledu',
      'Šildymo efektyvumas smarkiai sumažėja',
      'Atšildymo ciklas pasikartoja per dažnai (kas 10-15 min)',
      'Iš lauko bloko nėra lašo atšildymo metu'
    ],
    solutions: [
      'Patikrinkite ar atšildymo funkcija yra įjungta nustatymuose',
      'Pašalinkite sniegą ir ledą nuo lauko bloko rankiniu būdu (atsargiai)',
      'Įsitikinkite, kad kondensato drenažas nėra užšalęs',
      'Patikrinkite ar lauko bloko apačioje yra pakankamai vietos oro cirkuliacijai',
      'Atšildymo daviklio gedimas - kreipkitės į servisą',
      'Keturkryptis vožtuvas gali būti gedimu - reikalingas servisas'
    ],
    errorCodes: ['E03', 'DF', 'F03'],
    category: 'Atšildymas',
    icon: <Snowflake className="w-5 h-5" />
  },
  {
    id: '5',
    title: 'Kompresoriaus perkaitimas',
    severity: 'reta',
    models: ['LG Therma V', 'Panasonic Aquarea', 'Daitsu ASD'],
    description: 'Sistema rodo kompresoriaus perkaitimo klaidą. Įrenginys išsijungia apsaugos tikslu.',
    symptoms: [
      'Įrenginys rodo klaidos kodą HP arba E04',
      'Kompresoriaus korpusas labai karštas liečiant',
      'Sistema automatiškai išsijungia po kelių minučių darbo',
      'Lauko blokas neveikia, bet vidinis blokas veikia'
    ],
    solutions: [
      'Išjunkite įrenginį ir palaukite 30-60 minučių, kol atvės',
      'Patikrinkite ar lauko blokas turi pakankamą vėdinimą (bent 30cm laisvos erdvės)',
      'Išvalykite lauko bloko šilumokaičio spiralius nuo dulkių ir purvo',
      'Patikrinkite ar ventiliatorius lauko bloke sukasi sklandžiai',
      'Žemas freono kiekis - reikalingas serviso iškvietimas',
      'Kompresoriaus gedimas - reikalingas keitimas'
    ],
    errorCodes: ['E04', 'HP', 'H01'],
    category: 'Kompresorius',
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: '6',
    title: 'Karšto vandens temperatūra nepasiekiama',
    severity: 'vidutinė',
    models: ['Panasonic Aquarea', 'LG Therma V'],
    description: 'Karštas vanduo nepasieka nustatytos temperatūros arba pašyla labai lėtai.',
    symptoms: [
      'Karštas vanduo vėsesnis nei nustatyta (pvz. 40°C vietoj 55°C)',
      'Karšto vandens paruošimas trunka ilgiau nei įprastai',
      'Temperatūra svyruoja naudojimo metu',
      'Boileris nenušyla visiškai'
    ],
    solutions: [
      'Patikrinkite karšto vandens nustatymus - turėtų būti 50-55°C',
      'Įsitikinkite, kad veikia karšto vandens prioriteto funkcija',
      'Patikrinkite boilerio temperatūros daviklio būklę',
      'Išvalykite šilumokaičio plokštes nuo kalkių nuosėdų',
      'Patikrinkite cirkuliacinio siurblio darbą',
      'Per mažas freono kiekis - kreipkitės į servisą'
    ],
    errorCodes: ['E08', 'T02', 'DHW'],
    category: 'Karštas vanduo',
    icon: <Thermometer className="w-5 h-5" />
  },
  {
    id: '7',
    title: 'Ryšio klaida tarp blokų',
    severity: 'reta',
    models: ['Daitsu ASD', 'Mitsubishi MSZ-AP', 'Gree Lomo'],
    description: 'Vidinis ir lauko blokai negali komunikuoti tarpusavyje. Sistema nerodo parametrų arba neveikia.',
    symptoms: [
      'Ekrane rodo komunikacijos klaidos kodą',
      'Lauko blokas neveikia, nors vidinis blokas įsijungia',
      'Parametrai nesiatnaujina ekrane',
      'Nuotolinis valdymas veikia, bet įrenginys nereaguoja'
    ],
    solutions: [
      'Patikrinkite jungiamųjų kabelių tarp blokų tvirtinimą',
      'Įsitikinkite, kad kabeliai nėra pažeisti ar perkirsti',
      'Sistema reset - išjunkite maitinimą 5 minutėms',
      'Patikrinkite DIP jungiklių nustatymus (jei yra)',
      'Patikrinkite ar nėra drėgmės jungčių dėžutėje',
      'Kabelio sugadinimas - reikalingas pakeitimas'
    ],
    errorCodes: ['E07', 'U01', 'C03', 'COM'],
    category: 'Komunikacija',
    icon: <Wifi className="w-5 h-5" />
  },
  {
    id: '8',
    title: 'Didelės elektros sąnaudos',
    severity: 'dažna',
    models: ['LG Therma V', 'Gree Lomo', 'Daitsu ASD'],
    description: 'Pastebimas elektros energijos suvartojimo padidėjimas palyginus su ankstesniais periodais.',
    symptoms: [
      'Elektros sąskaitos padidėjo 30-50%',
      'Kompresorius veikia beveik be pertraukų',
      'COP rodiklis ekrane žemesnis nei 2.5',
      'Sistema ilgai nepasiekia nustatytos temperatūros'
    ],
    solutions: [
      'Sumažinkite nustatytą temperatūrą 1-2°C - tai gali sumažinti sąnaudas iki 10%',
      'Patikrinkite pastato šiluminę izoliaciją - sandarinkite langus, duris',
      'Išvalykite filtrus vidiniame ir lauko blokuose',
      'Patikrinkite ar teisingai nustatytas šildymo/vėsinimo režimas',
      'Aktyvuokite ekonominį režimą (ECO)',
      'Patikrinkite ar nėra žemo freono - sumažina efektyvumą',
      'Netinkamas įrenginio galingumas - per didelis arba per mažas'
    ],
    errorCodes: [],
    category: 'Efektyvumas',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: '9',
    title: 'Šilumos siurblys dažnai junginėjasi',
    severity: 'vidutinė',
    models: ['LG Therma V', 'Panasonic Aquarea', 'Mitsubishi MSZ-AP'],
    description: 'Įrenginys įsijungia ir išsijungia kas kelias minutes (cikliškumas), neveikia stabiliai.',
    symptoms: [
      'Kompresorius veikia 2-3 minutes ir išsijungia',
      'Sistema įsijungia kas 5-10 minučių',
      'Temperatūra svyruoja patalpoje',
      'Padidėjęs elektros suvartojimas'
    ],
    solutions: [
      'Patikrinkite termostato diferencialo nustatymus - turėtų būti 3-4°C',
      'Sumažinkite nustatytą temperatūrą, jei per aukšta',
      'Patikrinkite ar teisingai nustatytas inverterio režimas',
      'Įsitikinkite, kad cirkuliacinis siurblys veikia teisingai',
      'Per didelis įrenginio galingumas patalpai - reikia konsultacijos',
      'Patikrinkite ar nėra termostato gedimo'
    ],
    errorCodes: [],
    category: 'Veikimo režimas',
    icon: <TrendingDown className="w-5 h-5" />
  },
  {
    id: '10',
    title: 'Nutekėjimas iš vidinio bloko',
    severity: 'dažna',
    models: ['Mitsubishi MSZ-AP', 'Daitsu ASD', 'Gree Lomo'],
    description: 'Iš vidinio bloko lašo vanduo ant grindų arba sienos. Kondensato nutekėjimo problemos.',
    symptoms: [
      'Vanduo lašo iš vidinio bloko priekio',
      'Drėgnos dėmės ant sienos po bloku',
      'Vanduo kaupiasi vidinio bloko dėkle',
      'Lašėjimas stiprėja vėsinimo režimu'
    ],
    solutions: [
      'Patikrinkite ar kondensato drenažo žarna nėra sulenkta ar užsikimšusi',
      'Išvalykite drenažo žarną - prapūskite kompresoriu arba pravalykite',
      'Patikrinkite ar blokas pritvirtintas horizontaliai (naudokite gulsčiuką)',
      'Išvalykite kondensato padėklą vidiniame bloke',
      'Patikrinkite ar žarna išvesta žemiau už vidinį bloką',
      'Vėsinimo režimu - gali būti užšalęs šilumokaitis (išjunkite ir atšildykite)',
      'Neteisingas montažas - kreipkitės į montuotoją'
    ],
    errorCodes: ['E12', 'FL'],
    category: 'Nutekėjimas',
    icon: <Droplet className="w-5 h-5" />
  }
];

export default function ProblemsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // Get unique values for filters
  const allModels = Array.from(new Set(mockProblems.flatMap(p => p.models)));
  const allCategories = Array.from(new Set(mockProblems.map(p => p.category)));

  // Filter problems
  const filteredProblems = mockProblems.filter(problem => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      problem.solutions.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesModel =
      selectedModel === 'all' ||
      problem.models.some(m => m.includes(selectedModel));

    const matchesSeverity =
      selectedSeverity === 'all' ||
      problem.severity === selectedSeverity;

    const matchesCategory =
      selectedCategory === 'all' ||
      problem.category === selectedCategory;

    return matchesSearch && matchesModel && matchesSeverity && matchesCategory;
  });

  // Stats
  const totalProblems = mockProblems.length;
  const modelsCovered = allModels.length;

  const toggleExpand = (id: string) => {
    setExpandedIds(prev =>
      prev.includes(id)
        ? prev.filter(expandedId => expandedId !== id)
        : [...prev, id]
    );
  };

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case 'dažna':
        return { bg: '#ef444420', text: '#ef4444', border: '#ef444430' };
      case 'vidutinė':
        return { bg: '#f59e0b20', text: '#f59e0b', border: '#f59e0b30' };
      case 'reta':
        return { bg: '#3b82f620', text: '#3b82f6', border: '#3b82f630' };
    }
  };

  const getSeverityIcon = (severity: Severity) => {
    switch (severity) {
      case 'dažna':
        return <AlertTriangle className="w-4 h-4" />;
      case 'vidutinė':
        return <AlertCircle className="w-4 h-4" />;
      case 'reta':
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-xl md:text-3xl font-bold" style={{ color: '#1a1a1a' }}>Dažniausiai pasitaikančios problemos</h1>
          <p style={{ color: '#6b7280' }}>
            Išsami informacija apie tipines šilumos siurblių problemas ir jų sprendimus
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E07A5F20' }}>
                <AlertTriangle className="w-6 h-6" style={{ color: '#E07A5F' }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: '#6b7280' }}>Dokumentuotų problemų</p>
                <p className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>{totalProblems}</p>
              </div>
            </div>
          </div>

          <div className="card rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8b5cf620' }}>
                <Package className="w-6 h-6" style={{ color: '#8b5cf6' }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: '#6b7280' }}>Aprėptų modelių</p>
                <p className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>{modelsCovered}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#999', pointerEvents: 'none', zIndex: 1 }} />
          <input
            type="text"
            placeholder="Ieškoti problemų, simptomų, sprendimų..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
            style={{ paddingLeft: '44px', color: '#1a1a1a', border: '1px solid #e5e7eb' }}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Model Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6b7280' }}>
              Modelis
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full card rounded-lg px-4 py-2.5"
              style={{ color: '#1a1a1a', border: '1px solid #e5e7eb' }}
            >
              <option value="all">Visi modeliai</option>
              {allModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6b7280' }}>
              Dažnumas
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full card rounded-lg px-4 py-2.5"
              style={{ color: '#1a1a1a', border: '1px solid #e5e7eb' }}
            >
              <option value="all">Visi</option>
              <option value="dažna">Dažna</option>
              <option value="vidutinė">Vidutinė</option>
              <option value="reta">Reta</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6b7280' }}>
              Kategorija
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full card rounded-lg px-4 py-2.5"
              style={{ color: '#1a1a1a', border: '1px solid #e5e7eb' }}
            >
              <option value="all">Visos kategorijos</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm" style={{ color: '#6b7280' }}>
          Rasta problemų: <span className="font-medium" style={{ color: '#1a1a1a' }}>{filteredProblems.length}</span>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProblems.map((problem, index) => {
            const isExpanded = expandedIds.includes(problem.id);
            const severityColors = getSeverityColor(problem.severity);

            return (
              <div
                key={problem.id}
                className="card rounded-xl overflow-hidden hover:shadow-md transition-all animate-fade-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                  borderLeft: `4px solid ${severityColors.text}`
                }}
              >
                <div className="p-4 md:p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: severityColors.bg, color: severityColors.text }}
                    >
                      {problem.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                        {problem.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                        {problem.description}
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Severity Badge */}
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: severityColors.bg,
                        color: severityColors.text,
                        border: `1px solid ${severityColors.border}`
                      }}
                    >
                      {getSeverityIcon(problem.severity)}
                      {problem.severity}
                    </span>

                    {/* Category Badge */}
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: '#06b6d420', color: '#06b6d4' }}
                    >
                      <Tag className="w-3.5 h-3.5" />
                      {problem.category}
                    </span>
                  </div>

                  {/* Models */}
                  <div className="flex flex-wrap gap-2">
                    {problem.models.map(model => (
                      <span
                        key={model}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium"
                        style={{ backgroundColor: '#e5e7eb', color: '#1a1a1a' }}
                      >
                        <Package className="w-3 h-3" />
                        {model}
                      </span>
                    ))}
                  </div>

                  {/* Symptoms */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#1a1a1a' }}>
                      <AlertCircle className="w-4 h-4" style={{ color: '#f59e0b' }} />
                      Simptomai:
                    </h4>
                    <ul className="space-y-1.5">
                      {problem.symptoms.slice(0, isExpanded ? undefined : 2).map((symptom, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2" style={{ color: '#6b7280' }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#f59e0b' }} />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                    {problem.symptoms.length > 2 && !isExpanded && (
                      <p className="text-xs mt-2" style={{ color: '#6b7280' }}>
                        +{problem.symptoms.length - 2} dar simptomų...
                      </p>
                    )}
                  </div>

                  {/* Solutions (Expandable) */}
                  {isExpanded && (
                    <div className="pt-4 space-y-4 animate-fade-in" style={{ borderTop: '1px solid #e5e7eb' }}>
                      <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#1a1a1a' }}>
                          <CheckCircle2 className="w-4 h-4" style={{ color: '#10b981' }} />
                          Sprendimo būdai:
                        </h4>
                        <ol className="space-y-2.5">
                          {problem.solutions.map((solution, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-3" style={{ color: '#6b7280' }}>
                              <span
                                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: '#10b98120', color: '#10b981' }}
                              >
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{solution}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Error Codes */}
                      {problem.errorCodes.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                            Susiję klaidos kodai:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {problem.errorCodes.map(code => (
                              <span
                                key={code}
                                className="px-3 py-1 rounded-md text-xs font-mono font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                                style={{
                                  backgroundColor: '#ef444420',
                                  color: '#ef4444',
                                  border: '1px solid #ef444430'
                                }}
                              >
                                {code}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Expand Button */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => toggleExpand(problem.id)}
                    className="py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all hover:shadow-sm"
                    style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', color: '#1a1a1a' }}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Suskleisti
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Žiūrėti sprendimus
                      </>
                    )}
                  </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredProblems.length === 0 && (
            <div className="col-span-full card rounded-xl p-12 text-center" style={{ border: '1px solid #e5e7eb' }}>
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: '#6b7280' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#1a1a1a' }}>Problemų nerasta</h3>
              <p style={{ color: '#6b7280' }}>
                Pabandykite pakeisti paieškos kriterijus arba filtrus
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
