'use client';

import { useState } from 'react';
import {
  MessageCircle,
  Send,
  ThumbsUp,
  Reply,
  Users,
  TrendingUp,
  Tag,
  Circle
} from 'lucide-react';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userInitials: string;
  avatarColor: string;
  expertise: string;
  timestamp: string;
  content: string;
  tags: string[];
  likes: number;
  liked?: boolean;
  replies?: Message[];
}

interface OnlineUser {
  id: string;
  name: string;
  initials: string;
  color: string;
  expertise: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Jonas M.',
    userInitials: 'JM',
    avatarColor: '#3b82f6',
    expertise: 'Atlantic specialistas',
    timestamp: '10:24',
    content: 'Sveiki, ar kas nors susidūrė su klaidos kodu E04 Atlantic Alfea Extensa? Klientas sako, kad siurblys sustoja vidury nakties.',
    tags: ['Atlantic Alfea', 'E04'],
    likes: 3,
    replies: [
      {
        id: '1-1',
        userId: 'user4',
        userName: 'Andrius V.',
        userInitials: 'AV',
        avatarColor: '#10b981',
        expertise: 'Šilumos inžinierius',
        timestamp: '10:31',
        content: 'E04 dažniausiai būna žemo slėgio problema. Patikrink šaltnešio lygį ir oro išleidimo vožtuvus.',
        tags: [],
        likes: 2
      },
      {
        id: '1-2',
        userId: 'user1',
        userName: 'Jonas M.',
        userInitials: 'JM',
        avatarColor: '#3b82f6',
        expertise: 'Atlantic specialistas',
        timestamp: '10:45',
        content: 'Ačiū! Tikrai, šaltnešio lygis buvo per žemas. Papildžiau - veikia puikiai.',
        tags: [],
        likes: 1
      }
    ]
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Rimas K.',
    userInitials: 'RK',
    avatarColor: '#f59e0b',
    expertise: 'Vaillant meistras',
    timestamp: '11:15',
    content: 'Geriausia praktika montažui aroTHERM Plus: paliekite minimum 50cm tarpą iš visų pusių, ypač oro įsiurbimo pusėje. Triukšmas sumažėja ženkliai.',
    tags: ['Vaillant aroTHERM', 'Montavimas'],
    likes: 8,
    replies: [
      {
        id: '2-1',
        userId: 'user5',
        userName: 'Marius S.',
        userInitials: 'MS',
        avatarColor: '#8b5cf6',
        expertise: 'Montavimo specialistas',
        timestamp: '11:23',
        content: 'Pritariu! Dar pridėčiau - vibracijos slopintuvai ant kojelių būtinai. Ypač jei siurblys ant terasų ar balkonu.',
        tags: [],
        likes: 4
      },
      {
        id: '2-2',
        userId: 'user2',
        userName: 'Rimas K.',
        userInitials: 'RK',
        avatarColor: '#f59e0b',
        expertise: 'Vaillant meistras',
        timestamp: '11:28',
        content: 'Visiškai teisingai! Ir dar vienas patarimas - jei galima, išorinis blokas į pietus ar rytus, tada efektyvumas didžiausias.',
        tags: [],
        likes: 5
      }
    ]
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Dalia P.',
    userInitials: 'DP',
    avatarColor: '#06b6d4',
    expertise: 'Gree ekspertė',
    timestamp: '12:40',
    content: 'GREE Versati III dažna problema - error P01. Tai apsaugos relė suveikė. Visada pirmiausia patikrinkit elektros tinklo įtampą, turi būt stabili 230V ±10%.',
    tags: ['GREE Versati', 'P01', 'Elektra'],
    likes: 6,
    replies: [
      {
        id: '3-1',
        userId: 'user6',
        userName: 'Petras L.',
        userInitials: 'PL',
        avatarColor: '#ec4899',
        expertise: 'Elektrikas',
        timestamp: '12:55',
        content: 'Ir įžeminimas! Daug kartų mačiau, kad įžeminimo nėra arba netinkamas. UPS irgi gali padėti jei tinklas nestabilus.',
        tags: [],
        likes: 3
      }
    ]
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Andrius V.',
    userInitials: 'AV',
    avatarColor: '#10b981',
    expertise: 'Šilumos inžinierius',
    timestamp: '14:20',
    content: 'Pro tip: Kai optimizuojate efektyvumą, temperatūrų grafikas yra svarbiausias. -5°C lauke / 35°C šildymo = COP ~3.5. Bet jei tą pačią temperatūrą lauke palaikytume 30°C šildyme, COP ~4.2! Žemesnės temperatūros = didesnis efektyvumas.',
    tags: ['Efektyvumas', 'COP', 'Optimizavimas'],
    likes: 12,
    replies: [
      {
        id: '4-1',
        userId: 'user1',
        userName: 'Jonas M.',
        userInitials: 'JM',
        avatarColor: '#3b82f6',
        expertise: 'Atlantic specialistas',
        timestamp: '14:35',
        content: 'Aukso vertės patarimas! Tik daugelis klientų nori 23-24°C kambaryje žiemą 😅',
        tags: [],
        likes: 7
      },
      {
        id: '4-2',
        userId: 'user4',
        userName: 'Andrius V.',
        userInitials: 'AV',
        avatarColor: '#10b981',
        expertise: 'Šilumos inžinierius',
        timestamp: '14:42',
        content: 'Todėl svarbu išaiškinti apie grindinio šildymo pranašumus. 21°C grindų = 23°C komfortas, bet COP geresnis 👍',
        tags: [],
        likes: 9
      }
    ]
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'Marius S.',
    userInitials: 'MS',
    avatarColor: '#8b5cf6',
    expertise: 'Montavimo specialistas',
    timestamp: '15:30',
    content: 'Kiek užtrunka Atlantic Alfea Excellia TRI montažas nuo pradžių iki galo? Turiu projektą - 200m² namas, grindinis šildymas jau yra.',
    tags: ['Atlantic Alfea', 'Montavimas'],
    likes: 2,
    replies: [
      {
        id: '5-1',
        userId: 'user1',
        userName: 'Jonas M.',
        userInitials: 'JM',
        avatarColor: '#3b82f6',
        expertise: 'Atlantic specialistas',
        timestamp: '15:45',
        content: 'Su komanda (2 žmonės) ir jei visa įranga paruošta - 1 diena išorinis blokas, 1 diena vidinis + jungtys. Plius pusė dienos paleidimas ir derinimas.',
        tags: [],
        likes: 4
      }
    ]
  },
  {
    id: '6',
    userId: 'user7',
    userName: 'Tomas R.',
    userInitials: 'TR',
    avatarColor: '#ef4444',
    expertise: 'Servisas ir diagnostika',
    timestamp: '16:10',
    content: 'Naujiena: R290 šaltnešis tampa standartu. Vaillant, Daikin jau naudoja. Ekologiškesnis nei R32, bet montuojant reikia specialių atsargumo priemonių - jis degus.',
    tags: ['R290', 'Šaltnešis', 'Naujienos'],
    likes: 15,
    replies: [
      {
        id: '6-1',
        userId: 'user2',
        userName: 'Rimas K.',
        userInitials: 'RK',
        avatarColor: '#f59e0b',
        expertise: 'Vaillant meistras',
        timestamp: '16:25',
        content: 'Taip, aroTHERM Plus jau su R290. GWP tik 3! Palyginkite su R32 GWP 675. Bet tikrai reikia sertifikato darbui su degiais dujomis.',
        tags: [],
        likes: 8
      },
      {
        id: '6-2',
        userId: 'user4',
        userName: 'Andrius V.',
        userInitials: 'AV',
        avatarColor: '#10b981',
        expertise: 'Šilumos inžinierius',
        timestamp: '16:40',
        content: 'Ateitis tikrai už R290 ir panašius natūralius šaltnešius. ES reguliacijos griežtėja.',
        tags: [],
        likes: 6
      }
    ]
  },
  {
    id: '7',
    userId: 'user8',
    userName: 'Laura M.',
    userInitials: 'LM',
    avatarColor: '#a855f7',
    expertise: 'Projektavimo inžinierė',
    timestamp: '17:05',
    content: 'Ar kas turite patirties su Sime Argo Top? Planuoju 150m² namui, geoterminis šaltinis netinka, tai žiūriu oras-vanduo variantus.',
    tags: ['Sime Argo', 'Projektavimas'],
    likes: 1,
    replies: [
      {
        id: '7-1',
        userId: 'user5',
        userName: 'Marius S.',
        userInitials: 'MS',
        avatarColor: '#8b5cf6',
        expertise: 'Montavimo specialistas',
        timestamp: '17:20',
        content: 'Sime Argo Top geras pasirinkimas. Itališkas gaminys, kokybė normali. 150m² namui reikės apie 10-12kW modelio, priklausomai nuo izoliacijos.',
        tags: [],
        likes: 3
      }
    ]
  },
  {
    id: '8',
    userId: 'user3',
    userName: 'Dalia P.',
    userInitials: 'DP',
    avatarColor: '#06b6d4',
    expertise: 'Gree ekspertė',
    timestamp: '17:45',
    content: 'Primenu visiems: artėja žiemos sezonas, dabar pats laikas atlikti prevencinę priežiūrą. Filtrai, drenažo vamzdeliai, šaltnešio slėgis, elektros jungtys.',
    tags: ['Priežiūra', 'Patarimai'],
    likes: 10,
    replies: [
      {
        id: '8-1',
        userId: 'user4',
        userName: 'Andrius V.',
        userInitials: 'AV',
        avatarColor: '#10b981',
        expertise: 'Šilumos inžinierius',
        timestamp: '18:00',
        content: 'Absoliučiai! Ir išorinio bloko apžiūra - ar nėra lapų, dulkių ant šilumokaičio. Efektyvumas gali nukristi 15-20% jei užterštas.',
        tags: [],
        likes: 7
      }
    ]
  }
];

const ONLINE_USERS: OnlineUser[] = [
  { id: 'user1', name: 'Jonas M.', initials: 'JM', color: '#3b82f6', expertise: 'Atlantic specialistas' },
  { id: 'user2', name: 'Rimas K.', initials: 'RK', color: '#f59e0b', expertise: 'Vaillant meistras' },
  { id: 'user3', name: 'Dalia P.', initials: 'DP', color: '#06b6d4', expertise: 'Gree ekspertė' },
  { id: 'user4', name: 'Andrius V.', initials: 'AV', color: '#10b981', expertise: 'Šilumos inžinierius' },
  { id: 'user5', name: 'Marius S.', initials: 'MS', color: '#8b5cf6', expertise: 'Montavimo specialistas' },
  { id: 'user6', name: 'Petras L.', initials: 'PL', color: '#ec4899', expertise: 'Elektrikas' },
  { id: 'user7', name: 'Tomas R.', initials: 'TR', color: '#ef4444', expertise: 'Servisas ir diagnostika' },
  { id: 'user8', name: 'Laura M.', initials: 'LM', color: '#a855f7', expertise: 'Projektavimo inžinierė' }
];

const TRENDING_TAGS = [
  { tag: 'Atlantic Alfea', count: 15 },
  { tag: 'Montavimas', count: 12 },
  { tag: 'Efektyvumas', count: 10 },
  { tag: 'Vaillant aroTHERM', count: 8 },
  { tag: 'R290', count: 7 },
  { tag: 'GREE Versati', count: 6 }
];

export default function SpecialistChat() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleLike = (messageId: string, isReply: boolean, parentId?: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        if (isReply && msg.id === parentId) {
          return {
            ...msg,
            replies: msg.replies?.map(reply =>
              reply.id === messageId
                ? { ...reply, likes: reply.liked ? reply.likes - 1 : reply.likes + 1, liked: !reply.liked }
                : reply
            )
          };
        } else if (msg.id === messageId) {
          return {
            ...msg,
            likes: msg.liked ? msg.likes - 1 : msg.likes + 1,
            liked: !msg.liked
          };
        }
        return msg;
      })
    );
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: `new-${Date.now()}`,
      userId: 'current-user',
      userName: 'Tu',
      userInitials: 'TU',
      avatarColor: '#3b82f6',
      expertise: 'Specialistas',
      timestamp: new Date().toLocaleTimeString('lt-LT', { hour: '2-digit', minute: '2-digit' }),
      content: newMessage,
      tags: selectedTags,
      likes: 0
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setSelectedTags([]);
  };

  const MessageComponent = ({ message, isReply = false, parentId }: { message: Message; isReply?: boolean; parentId?: string }) => (
    <div className={`${isReply ? 'ml-12 mt-3' : 'mb-4'} animate-fade-in`}>
      <div
        className={`rounded-xl p-4 hover:shadow-md transition-all`}
        style={{
          backgroundColor: isReply ? '#f9fafb' : '#fff',
          border: '1px solid #e5e7eb'
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
            style={{ backgroundColor: message.avatarColor }}
          >
            {message.userInitials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold" style={{ color: '#1a1a1a' }}>{message.userName}</span>
              <span className="text-xs" style={{ color: '#6b7280' }}>{message.expertise}</span>
              <span className="text-xs" style={{ color: '#6b7280' }}>•</span>
              <span className="text-xs" style={{ color: '#6b7280' }}>{message.timestamp}</span>
            </div>

            <p className="mb-3 leading-relaxed" style={{ color: '#1a1a1a' }}>{message.content}</p>

            {message.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {message.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs rounded-md"
                    style={{ backgroundColor: '#E07A5F20', color: '#E07A5F', border: '1px solid #E07A5F30' }}
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleLike(message.id, isReply, parentId)}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  message.liked
                    ? ''
                    : ''
                }`}
                style={{ color: message.liked ? '#E07A5F' : '#6b7280' }}
              >
                <ThumbsUp className={`w-4 h-4 ${message.liked ? 'fill-current' : ''}`} />
                {message.likes > 0 && <span>{message.likes}</span>}
              </button>

              {!isReply && (
                <button
                  onClick={() => setReplyingTo(message.id)}
                  className="flex items-center gap-1 text-sm transition-colors hover:opacity-70"
                  style={{ color: '#6b7280' }}
                >
                  <Reply className="w-4 h-4" />
                  <span>Atsakyti</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isReply && message.replies && message.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {message.replies.map(reply => (
            <MessageComponent
              key={reply.id}
              message={reply}
              isReply={true}
              parentId={message.id}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }} className="px-5 md:px-10 lg:px-12 py-6 md:py-8 pt-16 lg:pt-8 flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-8rem)]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col card rounded-2xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
        {/* Header */}
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E07A5F' }}>
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: '#1a1a1a' }}>Specialistų Bendruomenė</h2>
                <p className="text-sm" style={{ color: '#6b7280' }}>Dalijamės žiniomis ir patirtimi</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#10b98120', border: '1px solid #10b98130' }}>
              <Circle className="w-2 h-2 fill-current animate-pulse-slow" style={{ color: '#10b981' }} />
              <span className="text-sm font-medium" style={{ color: '#10b981' }}>{ONLINE_USERS.length} prisijungę</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <MessageComponent key={message.id} message={message} />
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4" style={{ borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          {replyingTo && (
            <div className="mb-3 px-3 py-2 rounded-lg flex items-center justify-between" style={{ backgroundColor: '#06b6d420', border: '1px solid #06b6d430' }}>
              <span className="text-sm" style={{ color: '#06b6d4' }}>
                Atsakote į {messages.find(m => m.id === replyingTo)?.userName}
              </span>
              <button
                onClick={() => setReplyingTo(null)}
                style={{ color: '#06b6d4' }}
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1 rounded-xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Rašykite pranešimą..."
                className="w-full px-4 py-3 bg-transparent outline-none"
                style={{ color: '#1a1a1a' }}
              />

              {selectedTags.length > 0 && (
                <div className="px-4 pb-3 flex flex-wrap gap-2">
                  {selectedTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-md flex items-center gap-1"
                      style={{ backgroundColor: '#E07A5F20', color: '#E07A5F', border: '1px solid #E07A5F30' }}
                    >
                      {tag}
                      <button
                        onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="px-6 text-white rounded-xl transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 btn-accent"
              style={{ backgroundColor: '#E07A5F' }}
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">Siųsti</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block lg:w-80 space-y-6">
        {/* Online Users */}
        <div className="card rounded-2xl p-6" style={{ border: '1px solid #e5e7eb' }}>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" style={{ color: '#10b981' }} />
            <h3 className="font-semibold" style={{ color: '#1a1a1a' }}>Aktyvūs specialistai</h3>
          </div>

          <div className="space-y-3">
            {ONLINE_USERS.map(user => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-gray-50">
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.initials}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ backgroundColor: '#10b981', borderColor: '#fff' }}></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm" style={{ color: '#1a1a1a' }}>{user.name}</div>
                  <div className="text-xs truncate" style={{ color: '#6b7280' }}>{user.expertise}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="card rounded-2xl p-6" style={{ border: '1px solid #e5e7eb' }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" style={{ color: '#E07A5F' }} />
            <h3 className="font-semibold" style={{ color: '#1a1a1a' }}>Populiarios temos</h3>
          </div>

          <div className="space-y-2">
            {TRENDING_TAGS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!selectedTags.includes(item.tag)) {
                    setSelectedTags([...selectedTags, item.tag]);
                  }
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-gray-50 group"
              >
                <span className="text-sm group-hover:opacity-70" style={{ color: '#1a1a1a' }}>
                  {item.tag}
                </span>
                <span className="text-xs px-2 py-1 rounded" style={{ color: '#6b7280', backgroundColor: '#f9fafb' }}>
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
