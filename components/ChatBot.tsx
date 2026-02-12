'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  ChevronDown,
  Sparkles,
  BookOpen,
  AlertCircle,
  Wrench,
  Settings,
  ChevronRight,
  X
} from 'lucide-react';

// Types
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  relatedInfo?: RelatedInfo[];
}

interface RelatedInfo {
  type: 'article' | 'error' | 'guide';
  title: string;
  description: string;
  link?: string;
}

type HeatPumpModel =
  | 'Atlantic Alfea Extensa Duo A.I. R32'
  | 'Atlantic Alfea Excellia A.I. TRI'
  | 'Vaillant aroTHERM Plus'
  | 'GREE Versati III'
  | 'Sime Argo Top'
  | 'Visi modeliai';

const HEAT_PUMP_MODELS: HeatPumpModel[] = [
  'Visi modeliai',
  'Atlantic Alfea Extensa Duo A.I. R32',
  'Atlantic Alfea Excellia A.I. TRI',
  'Vaillant aroTHERM Plus',
  'GREE Versati III',
  'Sime Argo Top',
];

const QUICK_ACTIONS = [
  { icon: AlertCircle, label: 'Klaidos kodas', color: 'text-red-500' },
  { icon: Wrench, label: 'Gedimų šalinimas', color: 'text-orange-500' },
  { icon: Settings, label: 'Montavimo patarimai', color: 'text-blue-500' },
  { icon: Sparkles, label: 'Priežiūra', color: 'text-teal-500' },
];

// Mock bot response generator
const generateBotResponse = (
  userMessage: string,
  selectedModel: HeatPumpModel
): { content: string; relatedInfo?: RelatedInfo[] } => {
  const lowerMessage = userMessage.toLowerCase();
  const modelContext = selectedModel !== 'Visi modeliai' ? ` ${selectedModel} modeliui` : '';

  // Error code detection
  if (lowerMessage.includes('klaida') || lowerMessage.includes('error') || /e\d{2,3}/.test(lowerMessage)) {
    const errorCode = lowerMessage.match(/e\d{2,3}/i)?.[0].toUpperCase() || 'E01';
    return {
      content: `Radau informaciją apie klaidos kodą ${errorCode}${modelContext}.\n\nKlaida ${errorCode}: Temperatūros jutiklio gedimas\n\n**Galimos priežastys:**\n• Jutiklis atjungtas arba pažeistas\n• Blogas kontaktas jungtyje\n• Jutiklio kabelis pažeistas\n\n**Sprendimo žingsniai:**\n1. Patikrinkite jutiklio jungtį\n2. Įsitikinkite, kad kabelis nepažeistas\n3. Išmatuokite jutiklio varžą (turėtų būti ~10kΩ esant 25°C)\n4. Jei reikia, pakeiskite jutiklį\n\nJei problema išlieka, kreipkitės į techninę pagalbą.`,
      relatedInfo: [
        {
          type: 'error',
          title: `Klaidos kodas ${errorCode}`,
          description: 'Išsami informacija apie temperatūros jutiklio gedimus',
          link: '/knowledge-base/error-codes/e01'
        },
        {
          type: 'guide',
          title: 'Temperatūros jutiklių diagnostika',
          description: 'Kaip patikrinti ir pakeisti temperatūros jutiklius',
          link: '/knowledge-base/guides/temperature-sensors'
        },
        {
          type: 'article',
          title: 'Dažniausi jutiklių gedimai',
          description: 'Prevencija ir priežiūros patarimai',
          link: '/knowledge-base/articles/common-sensor-issues'
        }
      ]
    };
  }

  // Troubleshooting request
  if (lowerMessage.includes('neveikia') || lowerMessage.includes('problema') || lowerMessage.includes('gedimas')) {
    return {
      content: `Suprantu, kad susiduriate su problema${modelContext}. Padėsiu išspręsti!\n\n**Pirmieji diagnostikos žingsniai:**\n\n1. **Patikrinkite maitinimą**\n   • Ar šilumos siurblys prijungtas prie elektros tinklo?\n   • Ar neišjungtas saugiklis/automatinis jungiklis?\n\n2. **Peržiūrėkite valdymo pultą**\n   • Ar rodomas klaidos kodas?\n   • Ar įjungtas režimas atitinka poreikius?\n\n3. **Patikrinkite išorinį bloką**\n   • Ar ventiliatorius sukasi?\n   • Ar nėra ledo susidarymo?\n   • Ar oro srautas nėra užblokuotas?\n\n4. **Patikrinkite vidinį bloką**\n   • Ar cirkuliacinis siurblys veikia?\n   • Ar sistema užpildyta vandeniu?\n\nKokius simptomus pastebėjote? Ar rodomas klaidos kodas?`,
      relatedInfo: [
        {
          type: 'guide',
          title: 'Gedimų šalinimo vadovas',
          description: 'Išsamus žingsnis po žingsnio vadovas problemų sprendimui',
          link: '/knowledge-base/troubleshooting'
        },
        {
          type: 'article',
          title: 'Dažniausios problemos ir sprendimai',
          description: 'TOP 10 problemų ir kaip jas išspręsti',
          link: '/knowledge-base/common-issues'
        }
      ]
    };
  }

  // Installation tips
  if (lowerMessage.includes('montav') || lowerMessage.includes('instaliac')) {
    return {
      content: `Štai svarbiausi montavimo patarimai${modelContext}:\n\n**Išorinio bloko montavimas:**\n• Montuokite ant tvirto pagrindo, bent 10 cm nuo žemės\n• Užtikrinkite bent 50 cm tarpą oro cirkuliacijai\n• Vengkite tiesioginių saulės spindulių ir vyraujančių vėjų\n• Numatykite kondensato nutekėjimą\n\n**Vidinio bloko montavimas:**\n• Montuokite techniniame kambaryje ar rūsyje\n• Užtikrinkite lengvą priėjimą techninei priežiūrai\n• Palikite bent 50 cm erdvės priekyje\n\n**Vamzdynų klojimas:**\n• Naudokite tik šaldymo klasės varius\n• Izoliuokite visus vamzdžius\n• Minimizuokite vingių skaičių\n• Laikykitės maksimalių atstumų\n\n**Elektros prijungimas:**\n• Naudokite atskirą liniją su automatiniu jungikliu\n• Būtina įžeminimas\n• Laikykitės gamintojo schemos\n\nKoks konkretus montavimo aspektas jus domina?`,
      relatedInfo: [
        {
          type: 'guide',
          title: 'Montavimo instrukcija',
          description: 'Pilna techninė montavimo dokumentacija',
          link: '/knowledge-base/installation'
        },
        {
          type: 'article',
          title: 'Montavimo klaidos, kurių reikia vengti',
          description: 'Dažniausios klaidos ir kaip jų išvengti',
          link: '/knowledge-base/installation-mistakes'
        }
      ]
    };
  }

  // Maintenance
  if (lowerMessage.includes('priežiūr') || lowerMessage.includes('aptarnav') || lowerMessage.includes('valymas')) {
    return {
      content: `Reguliari priežiūra užtikrina efektyvų ir ilgalaikį šilumos siurblio veikimą${modelContext}.\n\n**Kas 3 mėnesius:**\n• Išvalykite išorinio bloko oro filtrus\n• Patikrinkite kondensato nutekėjimą\n• Apžiūrėkite ventiliatoriaus groteles\n\n**Kas 6 mėnesius:**\n• Patikrinkite šaldymo agento slėgį\n• Išvalykite šilumnešio filtrus\n• Patikrinkite cirkuliacinio siurblio veikimą\n• Peržiūrėkite elektros jungtis\n\n**Kartą per metus (profesionali priežiūra):**\n• Šaldymo kontūro sandarumo tikrinimas\n• Kompresoriaus būklės vertinimas\n• Šilumokaitų valymas\n• Sistemos našumo matavimas\n• Programinės įrangos atnaujinimas\n\n**Sezoninė priežiūra:**\n• Prieš šildymo sezoną: pilna sistemos diagnostika\n• Prieš vėsinimo sezoną: kondensatoriaus valymas\n\nAr turite klausimų apie konkrečias priežiūros procedūras?`,
      relatedInfo: [
        {
          type: 'guide',
          title: 'Priežiūros grafikas',
          description: 'Metinis priežiūros darbų planas',
          link: '/knowledge-base/maintenance-schedule'
        },
        {
          type: 'article',
          title: 'Kaip prailginti šilumos siurblio tarnavimo laiką',
          description: 'Geriausia praktika ir patarimai',
          link: '/knowledge-base/extend-lifespan'
        }
      ]
    };
  }

  // Default response
  return {
    content: `Ačiū už klausimą${modelContext}! Esu čia, kad padėčiau su šilumos siurbliais.\n\n**Galiu padėti su:**\n• 🔧 Gedimų diagnostika ir šalinimu\n• ⚠️ Klaidos kodų aiškinimu\n• 🛠️ Montavimo ir įrengimo patarimais\n• 🔄 Priežiūros rekomendacijomis\n• ⚙️ Sistemos optimizavimu\n• 📊 Efektyvumo gerinimu\n\nGalite užduoti konkretų klausimą arba pasirinkti vieną iš greito pasirinkimo mygtukų žemiau!\n\nPvz., galite klausti:\n• "Kaip išspręsti klaidos kodą E07?"\n• "Kodėl šilumos siurblys neveikia žiemą?"\n• "Kokios taisyklės montuojant išorinį bloką?"\n• "Kaip dažnai reikia valyti filtrus?"`,
    relatedInfo: [
      {
        type: 'article',
        title: 'Pradžios vadovas',
        description: 'Visa, ką reikia žinoti apie šilumos siurblius',
        link: '/knowledge-base/getting-started'
      }
    ]
  };
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Sveiki! Aš esu Vilpra Akademijos AI asistentas. Galiu padėti su šilumos siurblių klausimais - nuo gedimų diagnostikos iki montavimo patarimų. Pasirinkite modelį arba tiesiog klauskite!',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<HeatPumpModel>('Visi modeliai');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showRelatedInfo, setShowRelatedInfo] = useState(true);
  const [currentRelatedInfo, setCurrentRelatedInfo] = useState<RelatedInfo[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowModelDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          model: selectedModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Nepavyko gauti atsakymo');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `⚠️ ${err instanceof Error ? err.message : 'Nepavyko gauti atsakymo. Bandykite dar kartą.'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRelatedInfoIcon = (type: RelatedInfo['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'guide':
        return <Wrench className="w-4 h-4" />;
      case 'article':
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getRelatedInfoColor = (type: RelatedInfo['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-500';
      case 'guide':
        return 'text-orange-500';
      case 'article':
        return 'text-blue-500';
    }
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1400px', margin: '0 auto' }} className="flex h-full gap-4">
      {/* Main Chat Area */}
      <div className={`flex flex-col transition-all duration-300 ${
        showRelatedInfo && currentRelatedInfo.length > 0 ? 'w-2/3' : 'w-full'
      }`}>
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E07A5F] flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#1a1a1a]">Vilpra AI Asistentas</h2>
                <p className="text-sm text-[#6b7280]">Visada pasirengęs padėti</p>
              </div>
            </div>

            {/* Model Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[#1a1a1a] hover:border-[#E07A5F] hover:shadow-sm transition-all duration-200"
              >
                <Settings className="w-4 h-4 text-[#E07A5F]" />
                <span className="text-sm font-medium max-w-[200px] truncate">{selectedModel}</span>
                <ChevronDown className={`w-4 h-4 text-[#6b7280] transition-transform duration-200 ${
                  showModelDropdown ? 'rotate-180' : ''
                }`} />
              </button>

              {showModelDropdown && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl overflow-hidden z-50 shadow-xl">
                  {HEAT_PUMP_MODELS.map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                        selectedModel === model ? 'bg-orange-50 text-[#E07A5F]' : 'text-[#1a1a1a]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{model}</span>
                        {selectedModel === model && (
                          <div className="w-2 h-2 rounded-full bg-[#E07A5F]"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 overflow-y-auto shadow-sm">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
              >
                {/* Avatar */}
                {message.type === 'bot' && (
                  <div className="w-9 h-9 rounded-full bg-[#E07A5F] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`flex flex-col max-w-[75%] ${
                  message.type === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-[#E07A5F] text-white shadow-md'
                      : 'bg-gray-50 border border-gray-200 text-[#1a1a1a] shadow-sm'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <span className="text-xs text-[#6b7280] mt-1 px-1">
                    {message.timestamp.toLocaleTimeString('lt-LT', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.type === 'user' && (
                  <div className="w-9 h-9 rounded-full bg-[#E07A5F] flex items-center justify-center flex-shrink-0 shadow-sm text-white font-semibold text-xs">
                    JŪS
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-9 h-9 rounded-full bg-[#E07A5F] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#E07A5F] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#E07A5F] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#E07A5F] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-4 space-y-3">
          {/* Quick Actions */}
          <div className="flex gap-2 flex-wrap">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-[#1a1a1a] hover:border-[#E07A5F] hover:bg-orange-50 hover:shadow-sm transition-all duration-200 group"
                >
                  <Icon className={`w-4 h-4 ${action.color} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Įveskite savo klausimą..."
                className="flex-1 bg-transparent text-[#1a1a1a] placeholder:text-[#6b7280] outline-none text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-lg bg-[#E07A5F] flex items-center justify-center hover:bg-[#d16b50] hover:shadow-md active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#E07A5F] shadow-sm"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Info Sidebar */}
      {showRelatedInfo && currentRelatedInfo.length > 0 && (
        <div className="w-1/3 animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-xl p-4 h-full shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E07A5F]" />
                <h3 className="text-lg font-semibold text-[#1a1a1a]">Susijusi informacija</h3>
              </div>
              <button
                onClick={() => setShowRelatedInfo(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>

            <div className="space-y-3">
              {currentRelatedInfo.map((info, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:border-[#E07A5F] hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${getRelatedInfoColor(info.type)}`}>
                      {getRelatedInfoIcon(info.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[#1a1a1a] mb-1 group-hover:text-[#E07A5F] transition-colors duration-200">
                        {info.title}
                      </h4>
                      <p className="text-xs text-[#6b7280] leading-relaxed">
                        {info.description}
                      </p>
                      {info.link && (
                        <div className="flex items-center gap-1 mt-2 text-[#E07A5F]">
                          <span className="text-xs font-medium">Skaityti daugiau</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-[#E07A5F] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#6b7280] leading-relaxed">
                    Norite išsamesnės informacijos? Peržiūrėkite pilną{' '}
                    <span className="text-[#E07A5F] font-medium cursor-pointer hover:underline">
                      žinių bazę
                    </span>
                    {' '}arba{' '}
                    <span className="text-[#E07A5F] font-medium cursor-pointer hover:underline">
                      susisiekite su ekspertais
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
