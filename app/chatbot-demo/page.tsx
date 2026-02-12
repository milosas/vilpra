import ChatBot from '@/components/ChatBot';

export default function ChatBotDemoPage() {
  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-dark-text mb-2">Vilpra AI Asistentas</h1>
          <p className="text-dark-text-secondary">
            Pokalbių interfeisas su AI asistentu šilumos siurblių specialistams
          </p>
        </div>

        <div className="h-[calc(100vh-180px)]">
          <ChatBot />
        </div>
      </div>
    </div>
  );
}
