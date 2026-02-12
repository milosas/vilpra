'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, error, clearError } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    if (isSignUp) {
      await signUpWithEmail(email, password);
    } else {
      await signInWithEmail(email, password);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#f5f5f7' }}>
      {/* Decorative orange circles */}
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: 'rgba(224, 122, 95, 0.08)' }} />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: 'rgba(224, 122, 95, 0.06)', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: 'rgba(224, 122, 95, 0.04)', animationDelay: '1s' }} />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md px-4 md:px-6">
        <div className="card p-5 md:p-8 animate-fade-in" style={{ backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="inline-block">
              <h1 className="text-3xl md:text-5xl font-bold mb-2" style={{ color: '#1a1a1a', letterSpacing: '0.02em' }}>
                VILPRA
              </h1>
              <div className="h-1 w-full rounded-full" style={{ background: 'linear-gradient(to right, #E07A5F, #F4A589)' }} />
            </div>
            <p className="text-lg md:text-xl font-medium mt-3 md:mt-4" style={{ color: '#4b5563' }}>Akademija</p>
            <p className="text-sm mt-2" style={{ color: '#9ca3af' }}>Šilumos siurblių specialistų platforma</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl flex items-start gap-2.5" style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <AlertCircle className="shrink-0 mt-0.5" style={{ width: '18px', height: '18px', color: '#ef4444' }} />
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#dc2626' }}>{error}</p>
                <button
                  onClick={clearError}
                  className="text-xs mt-1.5 hover:underline transition-all"
                  style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Uždaryti
                </button>
              </div>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4 mb-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#4b5563' }}>El. paštas</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail style={{ position: 'absolute', left: '14px', width: '18px', height: '18px', color: '#9ca3af', pointerEvents: 'none', zIndex: 1 }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jusu@pastas.lt"
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px 16px 12px 44px',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#E07A5F'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#4b5563' }}>Slaptažodis</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock style={{ position: 'absolute', left: '14px', width: '18px', height: '18px', color: '#9ca3af', pointerEvents: 'none', zIndex: 1 }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px 44px 12px 44px',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#E07A5F'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    display: 'flex',
                    zIndex: 1
                  }}
                >
                  {showPassword ?
                    <EyeOff style={{ width: '18px', height: '18px', color: '#9ca3af' }} /> :
                    <Eye style={{ width: '18px', height: '18px', color: '#9ca3af' }} />
                  }
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="btn-accent"
                style={{ padding: '11px 40px', fontSize: '14px' }}
              >
                {loading ? 'Palaukite...' : isSignUp ? 'Registruotis' : 'Prisijungti'}
              </button>
            </div>
          </form>

          {/* Toggle sign up / sign in */}
          <div className="text-center mb-5">
            <button
              onClick={() => { setIsSignUp(!isSignUp); clearError(); }}
              className="text-sm font-medium transition-all hover:underline"
              style={{
                color: '#E07A5F',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {isSignUp ? 'Jau turite paskyrą? Prisijunkite' : 'Neturite paskyros? Registruotis'}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ backgroundColor: '#e5e7eb' }} />
            <span className="text-sm font-medium" style={{ color: '#9ca3af' }}>arba</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#e5e7eb' }} />
          </div>

          {/* Google Sign-In Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'white',
              color: '#1f2937',
              border: '1.5px solid #e5e7eb',
              fontSize: '14px',
              fontWeight: '500',
              padding: '11px 28px',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fafafa';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Prisijungti su Google</span>
          </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: '#9ca3af' }}>
              Prisijungdami sutinkate su naudojimo sąlygomis ir privatumo politika
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: '#6b7280' }}>Platforma skirta Vilpra partneriams ir specialistams</p>
        </div>
      </div>
    </div>
  );
}
