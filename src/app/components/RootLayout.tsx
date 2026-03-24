import { TopHeader } from './TopHeader';
import { Toaster } from './ui/sonner';
import { useState, useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import type { Chat, Message, AppContextType, FileData } from '../types';
import { AppContext } from '../context';
import { AiBeChatFAB } from './AiBeChatFAB';

const MODULE_MAP: Record<string, string> = {
  'operations': 'Operations',
  'hr-certificate': 'HR-Certificate',
  'schedule-rates': 'Schedule of Rates',
  'sirius': 'Sirius',
  'hvac': 'HVAC',
  'sop': 'SOP',
};

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedBuilding, setSelectedBuilding] = useState('The Gear');
  const [selectedScholar, setSelectedScholar] = useState('All scholar files');
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [hasQuotationDraft, setHasQuotationDraft] = useState(false);
  const [quotationDraftTimestamp, setQuotationDraftTimestamp] = useState<Date | null>(null);

  // Sync module from URL on mount and URL changes
  useEffect(() => {
    const moduleMatch = location.pathname.match(/^\/modules\/([^/]+)/);
    if (moduleMatch) {
      const moduleId = moduleMatch[1];
      const moduleName = MODULE_MAP[moduleId];
      if (moduleName) {
        setSelectedModule(moduleId);
        setSelectedScholar(moduleName);
      }
    } else if (location.pathname === '/' || location.pathname.startsWith('/chat/')) {
      // Only reset module if navigating to root chat (not documents/search/quotations)
      if (!selectedModule || location.pathname === '/') {
        // Keep module context if navigating to a chat from module
      }
    }
  }, [location.pathname]);

  // Sync activeChatId from URL
  useEffect(() => {
    const chatMatch = location.pathname.match(/\/chat\/([^/]+)/);
    if (chatMatch) {
      setActiveChatId(chatMatch[1]);
    } else if (location.pathname === '/' || location.pathname.match(/^\/modules\/[^/]+$/)) {
      setActiveChatId(null);
    }
  }, [location.pathname]);

  const createNewChat = useCallback((userMessage: string, assistantResponse?: string) => {
    const chatId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: chatId,
      title: userMessage,
      messages: [
        {
          id: `msg-${Date.now()}-1`,
          role: 'user',
          content: userMessage,
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    };

    if (assistantResponse) {
      setTimeout(() => {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    {
                      id: `msg-${Date.now()}-2`,
                      role: 'assistant',
                      content: assistantResponse,
                      timestamp: new Date(),
                    },
                  ],
                }
              : chat
          )
        );
      }, 500);
    }

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(chatId);

    // Navigate to the chat URL
    if (selectedModule) {
      navigate(`/modules/${selectedModule}/chat/${chatId}`);
    } else {
      navigate(`/chat/${chatId}`);
    }

    return chatId;
  }, [navigate, selectedModule]);

  const addMessageToChat = useCallback((chatId: string, message: Message) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  }, []);

  const startNewChat = useCallback(() => {
    setActiveChatId(null);
    if (selectedModule) {
      navigate(`/modules/${selectedModule}`);
    } else {
      navigate('/');
    }
  }, [navigate, selectedModule]);

  // Determine current view from URL for Navigation component
  const currentView = location.pathname.startsWith('/documents')
    ? 'documents' as const
    : location.pathname.startsWith('/quotations')
    ? 'quotation' as const
    : location.pathname.startsWith('/search')
    ? 'search' as const
    : 'chat' as const;

  const context: AppContextType = {
    selectedBuilding,
    setSelectedBuilding,
    selectedScholar,
    setSelectedScholar,
    chats,
    setChats,
    activeChatId,
    setActiveChatId,
    isDarkMode,
    setIsDarkMode,
    selectedModule,
    setSelectedModule,
    createNewChat,
    addMessageToChat,
    startNewChat,
    uploadedFiles,
    setUploadedFiles,
    hasQuotationDraft,
    setHasQuotationDraft,
    quotationDraftTimestamp,
    setQuotationDraftTimestamp,
  };

  return (
    <>
      <AppContext.Provider value={context}>
        <div className={isDarkMode ? 'dark' : ''}>
          <div className="flex flex-col h-screen">
            <TopHeader
              selectedBuilding={selectedBuilding}
              setSelectedBuilding={setSelectedBuilding}
              chats={chats}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              currentView={currentView}
            />
            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <Outlet context={context} />
              </div>
            </div>
          </div>
          {/* Show FAB on all pages except chat */}
          {currentView !== 'chat' && (
            <AiBeChatFAB />
          )}
          <Toaster />
        </div>
      </AppContext.Provider>
    </>
  );
}