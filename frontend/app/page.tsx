'use client';

import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardView from '@/components/DashboardView';
import ChatBot from '@/components/ChatBot';
import HistoryView from '@/components/HistoryView';
import ProblemsView from '@/components/ProblemsView';
import SpecialistChat from '@/components/SpecialistChat';
import KnowledgeBase from '@/components/KnowledgeBase';

export default function Home() {
  const { loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-400">Kraunama...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'faq-bot' && <ChatBot />}
        {activeTab === 'history' && <HistoryView />}
        {activeTab === 'problems' && <ProblemsView />}
        {activeTab === 'specialist-chat' && <SpecialistChat />}
        {activeTab === 'knowledge-base' && <KnowledgeBase />}
      </main>
    </div>
  );
}
