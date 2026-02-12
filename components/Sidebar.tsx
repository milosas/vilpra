'use client';

import {
  LayoutDashboard,
  Bot,
  History,
  AlertTriangle,
  MessageSquare,
  BookOpen,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'faq-bot', label: 'FAQ Botas', icon: Bot },
  { id: 'history', label: 'Istorija', icon: History },
  { id: 'problems', label: 'Problemos', icon: AlertTriangle },
  { id: 'specialist-chat', label: 'Specialistų Chat', icon: MessageSquare },
  { id: 'knowledge-base', label: 'Žinių Bazė', icon: BookOpen },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  const getInitial = (name: string | null | undefined) => {
    if (!name) return 'V';
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-lg text-gray-700 hover:text-gray-900 transition-colors border border-gray-200"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-[260px] bg-white border-r border-gray-200 z-40
          flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo area */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                VILPRA
              </h1>
              <p className="text-xs text-gray-500">Akademija</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium
                    transition-all duration-200 group relative
                    ${
                      isActive
                        ? 'bg-[#FEF0EC] text-[#E07A5F]'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#E07A5F] rounded-r-full" />
                  )}
                  <Icon
                    size={20}
                    className={`
                      ${isActive ? 'text-[#E07A5F]' : 'text-gray-500 group-hover:text-gray-700'}
                    `}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User profile section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#E07A5F] flex items-center justify-center text-white font-semibold shadow-sm">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>{getInitial(user?.displayName)}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.displayName || 'Vartotojas'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || ''}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all duration-200 font-medium"
          >
            <LogOut size={18} />
            <span>Atsijungti</span>
          </button>
        </div>
      </aside>
    </>
  );
}
