'use client';

import { useState } from 'react';
import {
  MessageSquare, CheckCircle2, Users, ArrowRight,
  TrendingUp, ChevronRight, Mic, Search, Filter,
  AlertTriangle, Star
} from 'lucide-react';

const activities = [
  { icon: MessageSquare, title: 'Kaip atlikti metinę techninę priežiūrą?', user: 'Jonas Kazlauskas', category: 'Priežiūra', time: 'Prieš 5 min', color: '#3B82F6', resolved: false },
  { icon: CheckCircle2, title: 'Išspręsta: Šilumos siurblys nepasiekia temperatūros', user: 'Sistema', category: 'Gedimas', time: 'Prieš 12 min', color: '#22C55E', resolved: true },
  { icon: MessageSquare, title: 'Kokia optimali COP vertė žiemą?', user: 'Petras Petraitis', category: 'Konsultacija', time: 'Prieš 23 min', color: '#8B5CF6', resolved: false },
  { icon: CheckCircle2, title: 'Išspręsta: Aukštas energijos suvartojimas', user: 'Sistema', category: 'Gedimas', time: 'Prieš 45 min', color: '#22C55E', resolved: true },
  { icon: MessageSquare, title: 'Vaillant aroTHERM F.22 klaida - ką daryti?', user: 'Rimas K.', category: 'Klaida', time: 'Prieš 1 val.', color: '#EF4444', resolved: false },
];

const models = [
  { name: 'Atlantic Alfea', count: 423, color: '#3B82F6', size: 180 },
  { name: 'Vaillant aroTHERM', count: 387, color: '#E07A5F', size: 140 },
  { name: 'GREE Versati III', count: 298, color: '#22C55E', size: 110 },
  { name: 'Sime Argo Top', count: 245, color: '#8B5CF6', size: 85 },
];

const topProblems = [
  { title: 'Nepasiekia temperatūros', count: 156, trend: '+12%' },
  { title: 'Aukštas energijos suvartojimas', count: 142, trend: '+8%' },
  { title: 'Triukšmas veikiant kompresoriui', count: 98, trend: '+3%' },
];

const weekDays = ['P', 'A', 'T', 'K', 'Pn', 'Š', 'S'];
const weekActivity = [65, 80, 45, 90, 70, 30, 20];

export default function DashboardView() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const today = new Date();
  const dayName = ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'][today.getDay()];
  const monthName = ['Sausio', 'Vasario', 'Kovo', 'Balandžio', 'Gegužės', 'Birželio', 'Liepos', 'Rugpjūčio', 'Rugsėjo', 'Spalio', 'Lapkričio', 'Gruodžio'][today.getMonth()];

  return (
    <div className="p-4 md:px-8 md:py-7 pt-14 lg:pt-0" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* ===== TOP BAR ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="card animate-fade-in-up stagger-1" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '800' }}>
            {today.getDate()}
          </div>
          <div>
            <div style={{ fontSize: '17px', fontWeight: '700', color: '#111' }}>{dayName}</div>
            <div style={{ fontSize: '13px', color: '#888', fontWeight: '500' }}>{monthName} {today.getFullYear()}</div>
          </div>
          <button className="btn-accent" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '13px' }}>
            Rodyti užduotis <ArrowRight size={16} />
          </button>
        </div>

        <div className="card animate-fade-in-up stagger-2" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="text-lg md:text-2xl" style={{ fontWeight: '800', color: '#111', lineHeight: '1.2' }}>
              Sveiki! Reikia pagalbos? <span style={{ fontSize: '28px' }}>👋</span>
            </div>
            <div className="text-sm md:text-base" style={{ color: '#999', marginTop: '4px' }}>Tiesiog klauskite!</div>
          </div>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #E0E0E6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mic size={20} style={{ color: '#111' }} />
          </button>
        </div>
      </div>

      {/* ===== STATS ROW ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
        {/* Klausimai */}
        <div className="card animate-fade-in-up stagger-3" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={18} style={{ color: '#3B82F6' }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Klausimai</span>
          </div>
          <div className="stat-number">1,247</div>
          <div className="stat-label">Iš viso užduotų</div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <span className="badge badge-info">+24 nauji</span>
            <span className="badge badge-success">18 atsakyti</span>
          </div>
        </div>

        {/* Išspręsti */}
        <div className="card animate-fade-in-up stagger-4" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} style={{ color: '#22C55E' }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Išspręsti</span>
          </div>
          <div className="stat-number">1,089</div>
          <div className="stat-label">Sėkmingai išspręsta</div>
          <div style={{ marginTop: '16px', padding: '12px 14px', background: '#FAFAFA', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#999', fontWeight: '500' }}>Laukiantys</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#E07A5F' }}>158</div>
            </div>
            <button style={{ fontSize: '12px', color: '#E07A5F', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Peržiūrėti <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Sprendimo rodiklis */}
        <div className="card animate-fade-in-up stagger-5" style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '130px', height: '130px' }}>
            <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="65" cy="65" r="55" fill="none" className="progress-ring-bg" strokeWidth="12" />
              <circle cx="65" cy="65" r="55" fill="none" className="progress-ring-fill" strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 55}`}
                strokeDashoffset={`${2 * Math.PI * 55 * (1 - 0.87)}`}
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#111' }}>87%</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>Sprendimo rodiklis</div>
            <div style={{ fontSize: '12px', color: '#22C55E', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center', marginTop: '4px' }}>
              <TrendingUp size={13} /> +5.2% šią savaitę
            </div>
          </div>
        </div>

        {/* Specialistai */}
        <div className="card animate-fade-in-up stagger-6" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#FFF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} style={{ color: '#E07A5F' }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Specialistai</span>
          </div>
          <div className="stat-number">23</div>
          <div className="stat-label">Aktyvūs dabar</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginTop: '16px', height: '48px' }}>
            {weekDays.map((day, i) => (
              <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '100%', height: `${weekActivity[i] * 0.48}px`, borderRadius: '4px',
                  background: i === 3 ? '#E07A5F' : '#E8E8ED', transition: 'all 0.3s ease',
                }} />
                <span style={{ fontSize: '9px', color: '#AAA', fontWeight: '600' }}>{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BOTTOM ROW ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-5">
        {/* Populiariausi modeliai */}
        <div className="card animate-fade-in-up stagger-7" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '20px' }}>Populiariausi modeliai</h3>
          <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 20px' }}>
            {models.map((m, i) => (
              <div key={m.name} style={{
                position: 'absolute', top: '50%', left: '50%',
                width: `${m.size}px`, height: `${m.size}px`, borderRadius: '50%',
                border: `3px solid ${m.color}`, opacity: 0.3 + (i === 0 ? 0.4 : i === 1 ? 0.3 : i === 2 ? 0.15 : 0),
                transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {i === 0 && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#555' }}>{m.name}</div>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: m.color }}>{m.count}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {models.map((m) => (
              <div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.color }} />
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#555' }}>{m.name}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: m.color }}>{m.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Naujausia veikla */}
        <div className="card animate-fade-in-up stagger-7" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>Naujausia veikla</h3>
            <button className="btn-outline" style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={13} /> Filtruoti
            </button>
          </div>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
            <input className="input" placeholder="Ieškoti veiklų..." style={{ paddingLeft: '40px' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <span className="badge badge-accent">Šiandien</span>
            <span className="badge badge-neutral">Komanda</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {activities.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px',
                borderRadius: '14px', cursor: 'pointer', transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <a.icon size={16} style={{ color: a.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.title}</div>
                  <div style={{ fontSize: '11px', color: '#999', display: 'flex', gap: '6px', alignItems: 'center', marginTop: '2px' }}>
                    <span className="badge badge-neutral" style={{ padding: '2px 8px', fontSize: '10px' }}>{a.category}</span>
                    <span>{a.user}</span><span>·</span><span>{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card animate-fade-in-up stagger-8" style={{ padding: '24px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <AlertTriangle size={16} style={{ color: '#E07A5F' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>Dažniausios problemos</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {topProblems.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#E07A5F', width: '24px' }}>#{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>{p.title}</div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>{p.count}</span>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: '#22C55E' }}>{p.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card animate-fade-in-up stagger-8" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Star size={16} style={{ color: '#F59E0B' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>Kaip vertinate?</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              {['😞', '😐', '🙂', '😊', '🤩'].map((emoji, i) => (
                <button key={i} onClick={() => setSelectedRating(i)} style={{
                  width: '44px', height: '44px', borderRadius: '14px', border: 'none',
                  background: selectedRating === i ? '#FFF0EC' : '#FAFAFA', cursor: 'pointer', fontSize: '22px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: selectedRating === i ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: selectedRating === i ? '0 2px 8px rgba(224,122,95,0.2)' : 'none', transition: 'all 0.2s ease',
                }}>{emoji}</button>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="gradient-text" style={{ fontSize: '32px', fontWeight: '800' }}>4.8</div>
              <div style={{ fontSize: '11px', color: '#888', fontWeight: '500' }}>Vidutinis vertinimas</div>
              <div style={{ fontSize: '11px', color: '#22C55E', fontWeight: '600', marginTop: '2px' }}>+0.3 šį mėnesį</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
