'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  MessageSquare,
  Package
} from 'lucide-react';

interface Conversation {
  id: string;
  question: string;
  answer: string;
  model: string;
  timestamp: string;
  relativeTime: string;
  status: 'resolved' | 'pending';
  category: string;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    question: 'Kodėl šilumos siurblys rodo klaidos kodą E01 ir neveikia?',
    answer: 'Klaidos kodas E01 Daitsu šilumos siurblių modeliuose reiškia žemo slėgio problemą. Patikrinkite: 1) Ar uždaryta apsaugos vožtuvas, 2) Ar pakankamas freonas sistemoje, 3) Ar nėra užsikimšę filtrai. Rekomenduojama iškviesti servisą patikrinti sistemos slėgį.',
    model: 'Daitsu ASD-12HI',
    timestamp: '2026-02-12T08:30:00',
    relativeTime: 'prieš 2 val.',
    status: 'resolved',
    category: 'Klaidos kodas'
  },
  {
    id: '2',
    question: 'Ar reikia išjungti šilumos siurbly vasarą, kai jo nenaudoju?',
    answer: 'Ne, nebūtina išjungti šilumos siurblio vasarą. Tačiau rekomenduojama bent kartą per mėnesį leisti jam padirbėti 10-15 minučių, kad kompresoriaus alyvos neprasidėtų atsisluoksniuoti ir sistema išliktų gerame stovyje. Tai ypač aktualu Mitsubishi MSZ-AP modeliams.',
    model: 'Mitsubishi MSZ-AP25VG',
    timestamp: '2026-02-12T06:15:00',
    relativeTime: 'prieš 4 val.',
    status: 'resolved',
    category: 'Priežiūra'
  },
  {
    id: '3',
    question: 'Lauko blokas labai triukšmingas naktį, ką daryti?',
    answer: 'Triukšmas gali kilti dėl kelių priežasčių: 1) Vibracija - patikrinkite ar tvirtai pritvirtintas lauko blokas, 2) Ventiliatoriaus disbalansas, 3) Ledas ant šilumokaičio žiemą. Gree Lomo modelių atveju galite aktyvuoti "Tylų" režimą nustatymuose, kuris sumažins ventiliatoriaus greitį naktį.',
    model: 'Gree Lomo GWH09QB',
    timestamp: '2026-02-11T22:45:00',
    relativeTime: 'prieš 12 val.',
    status: 'pending',
    category: 'Triukšmas'
  },
  {
    id: '4',
    question: 'Kaip nustatyti optimalią temperatūrą karšto vandens paruošimui?',
    answer: 'Optimaliai karšto vandens temperatūra turėtų būti 50-55°C. Tai užtikrina pakankamą komfortą ir mažina kalkių susikaupimą. Panasonic Aquarea modeliuose galite nustatyti šią temperatūrą per valdymo pultą meniu "DHW Settings". Aukštesnė temperatūra padidins elektros sąnaudas.',
    model: 'Panasonic Aquarea',
    timestamp: '2026-02-11T18:20:00',
    relativeTime: 'prieš 16 val.',
    status: 'resolved',
    category: 'Nustatymai'
  },
  {
    id: '5',
    question: 'Po įjungimo šildymo siurblys veikia 2 minutes ir išsijungia, kodėl?',
    answer: 'Dažnas įsijungimas ir išsijungimas (cikliškumas) gali reikšti: 1) Per didelis įrenginio galingumas patalpai, 2) Blogas cirkuliacijos siurblio darbas, 3) Nekorektiški automatikos nustatymai. LG Therma V modeliuose patikrinkite diferencialo nustatymus - turėtų būti 3-4°C tarp įsijungimo ir išsijungimo temperatūrų.',
    model: 'LG Therma V',
    timestamp: '2026-02-11T14:10:00',
    relativeTime: 'prieš 20 val.',
    status: 'pending',
    category: 'Veikimo sutrikimas'
  },
  {
    id: '6',
    question: 'Kokį slėgį turėtų rodyti manometras Daitsu sistemoje?',
    answer: 'Šaltoje sistemoje slėgis turėtų būti apie 1.5 bar, veikiančioje - 2-2.5 bar. Jei slėgis žemesnis nei 1 bar, reikia papildyti sistemą vandeniu. Jei aukštesnis nei 3 bar - išleisti perteklių per nuorinimo ventilį. Šie parametrai taikomi visiems Daitsu ASD serijų modeliams.',
    model: 'Daitsu ASD-18HI',
    timestamp: '2026-02-11T10:30:00',
    relativeTime: 'prieš 1 dieną',
    status: 'resolved',
    category: 'Techninė informacija'
  },
  {
    id: '7',
    question: 'Ar normalus, kad žiemą lauko blokas apdengiamas ledų sluoksniu?',
    answer: 'Taip, tai normalu žiemą, kai blokas dirba šildymo režimu. Mitsubishi MSZ-AP modeliai turi automatinę atšildymo ciklo funkciją, kuri periodiškai pašalina susidariusį ledą. Jei ledas nesišalina arba blokas visiškai apšąla - gali būti problema su atšildymo davikliu arba vožtuvu.',
    model: 'Mitsubishi MSZ-AP35VG',
    timestamp: '2026-02-10T16:50:00',
    relativeTime: 'prieš 1 dieną',
    status: 'resolved',
    category: 'Normalus darbas'
  },
  {
    id: '8',
    question: 'Koks energijos suvartojimas per mėnesį vidutiniškai?',
    answer: 'Energijos suvartojimas priklauso nuo daugelio faktorių: pastato izoliacijos, lauko temperatūros, vidaus temperatūros nustatymo. Vidutiniškai Gree Lomo 9kW modeliui 120m² namui žiemą reikėtų ~800-1200 kWh/mėn. Vasarą vėsinimui ~200-400 kWh/mėn. SCOP 4.0 reiškia, kad 1 kWh elektros duoda ~4 kWh šilumos.',
    model: 'Gree Lomo GWH12QB',
    timestamp: '2026-02-10T09:15:00',
    relativeTime: 'prieš 2 dienas',
    status: 'resolved',
    category: 'Energija'
  },
  {
    id: '9',
    question: 'Ryšio klaida E07 tarp vidinio ir lauko blokų, kaip išspręsti?',
    answer: 'Klaidos kodas E07 reiškia komunikacijos sutrikimą tarp blokų. Sprendimai: 1) Patikrinkite ar jungiamieji kabeliai gerai prijungti, 2) Ar nėra pažeistų laidų, 3) Pabandykite iš naujo paleisti sistemą - išjunkite maitinimą 5 minutėms. Panasonic Aquarea sistemose taip pat patikrinkite DIP jungiklių nustatymus.',
    model: 'Panasonic Aquarea T-CAP',
    timestamp: '2026-02-09T14:40:00',
    relativeTime: 'prieš 3 dienas',
    status: 'pending',
    category: 'Klaidos kodas'
  },
  {
    id: '10',
    question: 'Kompresoriaus perkaitimas - rodo įspėjimą. Kas tai reiškia?',
    answer: 'Kompresoriaus perkaitimo įspėjimas gali reikšti: 1) Per aukštą slėgį sistemoje, 2) Nepakankamą vėsinimą ventiliatoriaus, 3) Žemą freono kiekį. LG Therma V sistemose tai dažniausiai apsauginė funkcija. Išjunkite įrenginį, palaukite 30 min. ir bandykite vėl. Jei kartojasi - kvieskite servisą.',
    model: 'LG Therma V 9kW',
    timestamp: '2026-02-08T11:20:00',
    relativeTime: 'prieš 4 dienas',
    status: 'pending',
    category: 'Perspėjimas'
  },
  {
    id: '11',
    question: 'Kaip nustatyti savaitės programą Daitsu pulte?',
    answer: 'Savaitės programos nustatymas Daitsu ASD modeliuose: 1) Paspauskite "Timer" mygtuką 3 sekundes, 2) Pasirinkite dieną (Mon-Sun), 3) Nustatykite įsijungimo laiką ir temperatūrą, 4) Nustatykite išsijungimo laiką, 5) Patvirtinkite su "OK". Galite nustatyti skirtingas programas kiekvienai savaitės dienai.',
    model: 'Daitsu ASD-12HI',
    timestamp: '2026-02-07T15:55:00',
    relativeTime: 'prieš 5 dienas',
    status: 'resolved',
    category: 'Nustatymai'
  },
  {
    id: '12',
    question: 'Iš vidinio bloko lašo vanduo ant grindų. Normalu?',
    answer: 'Ne, tai nėra normalu. Vandens nutekėjimas dažniausiai atsiranda dėl: 1) Užsikimšusio kondensato nutekėjimo vamzdelio, 2) Nekorektiškai sumontuoto drenažo, 3) Užšalusio šilumokaičio vėsinimo režimu. Mitsubishi MSZ-AP sistemose patikrinkite ar drenažo žarna nėra sulenkta ir ar išvestas kondensatas laisvai nuteka.',
    model: 'Mitsubishi MSZ-AP25VG',
    timestamp: '2026-02-06T08:30:00',
    relativeTime: 'prieš 6 dienas',
    status: 'resolved',
    category: 'Nutekėjimas'
  }
];

export default function HistoryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'resolved' | 'pending'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter conversations
  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch =
      conv.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'all' ||
      conv.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalConversations = mockConversations.length;
  const resolvedCount = mockConversations.filter(c => c.status === 'resolved').length;
  const resolvedPercentage = Math.round((resolvedCount / totalConversations) * 100);

  const modelCounts = mockConversations.reduce((acc, conv) => {
    const modelName = conv.model.split(' ')[0]; // Get brand name
    acc[modelName] = (acc[modelName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonModel = Object.entries(modelCounts).sort((a, b) => b[1] - a[1])[0];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>Pokalbių istorija</h1>
          <p style={{ color: '#6b7280' }}>FAQ roboto pokalbių archyvas ir analizė</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E07A5F20' }}>
                <MessageSquare className="w-6 h-6" style={{ color: '#E07A5F' }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: '#6b7280' }}>Viso pokalbių</p>
                <p className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>{totalConversations}</p>
              </div>
            </div>
          </div>

          <div className="card rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#10b98120' }}>
                <TrendingUp className="w-6 h-6" style={{ color: '#10b981' }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: '#6b7280' }}>Išspręsta</p>
                <p className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>{resolvedPercentage}%</p>
              </div>
            </div>
          </div>

          <div className="card rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8b5cf620' }}>
                <Package className="w-6 h-6" style={{ color: '#8b5cf6' }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: '#6b7280' }}>Populiariausias</p>
                <p className="text-lg font-bold" style={{ color: '#1a1a1a' }}>{mostCommonModel[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#999', pointerEvents: 'none', zIndex: 1 }} />
            <input
              type="text"
              placeholder="Ieškoti pokalbių..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{
                paddingLeft: '44px',
                color: '#1a1a1a',
                border: '1px solid #e5e7eb',
                outline: 'none'
              }}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'all'
                  ? 'text-white'
                  : ''
              }`}
              style={activeFilter === 'all'
                ? { backgroundColor: '#E07A5F' }
                : { backgroundColor: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Visi</span>
              </div>
            </button>
            <button
              onClick={() => setActiveFilter('resolved')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'resolved'
                  ? 'text-white'
                  : ''
              }`}
              style={activeFilter === 'resolved'
                ? { backgroundColor: '#10b981' }
                : { backgroundColor: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Išspręsti</span>
              </div>
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'pending'
                  ? 'text-white'
                  : ''
              }`}
              style={activeFilter === 'pending'
                ? { backgroundColor: '#f59e0b' }
                : { backgroundColor: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Neišspręsti</span>
              </div>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm" style={{ color: '#6b7280' }}>
          Rasta pokalbių: <span className="font-medium" style={{ color: '#1a1a1a' }}>{filteredConversations.length}</span>
        </div>

        {/* Conversation List */}
        <div className="space-y-3">
          {filteredConversations.map((conversation, index) => {
            const isExpanded = expandedId === conversation.id;

            return (
              <div
                key={conversation.id}
                className="card rounded-xl overflow-hidden hover:shadow-md transition-all animate-fade-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                  border: '1px solid #e5e7eb'
                }}
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(conversation.id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2" style={{ color: '#1a1a1a' }}>
                        {conversation.question}
                      </h3>
                      {!isExpanded && (
                        <p className="text-sm line-clamp-2" style={{ color: '#6b7280' }}>
                          {conversation.answer}
                        </p>
                      )}
                    </div>
                    <button className="flex-shrink-0" style={{ color: '#6b7280' }}>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mb-4 pb-4 animate-fade-in" style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <div className="rounded-lg p-4" style={{ backgroundColor: '#f9fafb' }}>
                        <p className="text-sm mb-2 font-medium" style={{ color: '#6b7280' }}>Roboto atsakymas:</p>
                        <p className="leading-relaxed" style={{ color: '#1a1a1a' }}>{conversation.answer}</p>
                      </div>
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Model Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium" style={{ backgroundColor: '#e5e7eb', color: '#1a1a1a' }}>
                      <Package className="w-3.5 h-3.5" />
                      {conversation.model}
                    </span>

                    {/* Category Badge */}
                    <span className="px-3 py-1 rounded-lg text-sm font-medium" style={{ backgroundColor: '#06b6d420', color: '#06b6d4' }}>
                      {conversation.category}
                    </span>

                    {/* Status Badge */}
                    {conversation.status === 'resolved' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium" style={{ backgroundColor: '#10b98120', color: '#10b981' }}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Išspręsta
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium" style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}>
                        <AlertCircle className="w-3.5 h-3.5" />
                        Laukiama
                      </span>
                    )}

                    {/* Timestamp */}
                    <span className="inline-flex items-center gap-1.5 text-sm ml-auto" style={{ color: '#6b7280' }}>
                      <Clock className="w-3.5 h-3.5" />
                      {conversation.relativeTime}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredConversations.length === 0 && (
            <div className="card rounded-xl p-12 text-center" style={{ border: '1px solid #e5e7eb' }}>
              <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: '#6b7280' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#1a1a1a' }}>Pokalbių nerasta</h3>
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
