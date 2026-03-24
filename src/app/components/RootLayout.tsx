import { TopHeader } from './TopHeader';
import { Toaster } from './ui/sonner';
import { useState, useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import type { Chat, Message, AppContextType, FileData } from '../types';
import { AppContext } from '../context';
import { AiBeChatFAB } from './AiBeChatFAB';
import { PrototypeConfigContext } from '../prototype/PrototypeConfigContext';
import type {
  PrototypeConfig,
  PrototypeScriptDefinition,
  PrototypeScriptMessage,
} from '../prototype/PrototypeConfig.types';

const MODULE_MAP: Record<string, string> = {
  'operations': 'Operations',
  'hr-certificate': 'HR-Certificate',
  'schedule-rates': 'Schedule of Rates',
  'sirius': 'Sirius',
  'hvac': 'HVAC',
  'sop': 'SOP',
};

function normalizeInput(value: string): string {
  return value.trim().toLowerCase();
}

function parsePrototypeMessage(message: PrototypeScriptMessage, index: number): Message {
  return {
    id: `script-msg-${index}-${Date.now()}`,
    role: message.role,
    content: message.content,
    timestamp: new Date(),
  };
}

function buildChatFromScript(historyId: string, createdAt: string, script: PrototypeScriptDefinition): Chat {
  const firstUserMessage = script.messages.find((message) => message.role === 'user');
  return {
    id: historyId,
    title: firstUserMessage?.content || 'Untitled chat',
    messages: script.messages.map(parsePrototypeMessage),
    createdAt: new Date(createdAt),
    scriptId: script.scriptId,
  };
}

function buildMissingScriptChat(historyId: string, createdAt: string, scriptId: string): Chat {
  return {
    id: historyId,
    title: 'Untitled chat',
    messages: [],
    createdAt: new Date(createdAt),
    scriptId,
    scriptError: `Script not found: ${scriptId}`,
  };
}

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [prototypeConfig, setPrototypeConfig] = useState<PrototypeConfig | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState('The Gear');
  const [selectedRole, setSelectedRole] = useState('Operator');
  const [selectedScholar, setSelectedScholar] = useState('All scholar files');
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [hasQuotationDraft, setHasQuotationDraft] = useState(false);
  const [quotationDraftTimestamp, setQuotationDraftTimestamp] = useState<Date | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPrototypeConfig = async () => {
      try {
        const response = await fetch('/prototype-config.json', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch prototype config');
        }

        const parsed = (await response.json()) as PrototypeConfig;
        if (!parsed || !parsed.topNav || !parsed.chat) {
          throw new Error('Prototype config missing top-level keys');
        }

        if (!isMounted) {
          return;
        }

        setPrototypeConfig(parsed);
        setConfigError(null);

        const defaultBuilding = parsed.topNav.buildings.items.find(
          (building) => building.id === parsed.topNav.buildings.defaultBuildingId
        );
        setSelectedBuilding(defaultBuilding?.label || parsed.topNav.buildings.items[0]?.label || 'The Gear');
        setSelectedRole(parsed.topNav.brand.selectedRole);

        const scriptsById = new Map(parsed.chat.scripts.map((script) => [script.scriptId, script]));
        const initialChats = parsed.chat.leftNavHistory.items.map((historyItem) => {
          const script = scriptsById.get(historyItem.scriptId);
          if (!script) {
            return buildMissingScriptChat(historyItem.id, historyItem.createdAt, historyItem.scriptId);
          }
          return buildChatFromScript(historyItem.id, historyItem.createdAt, script);
        });
        setChats(initialChats);
      } catch {
        if (isMounted) {
          setConfigError('Prototype config error — check your JSON file.');
        }
      }
    };

    loadPrototypeConfig();

    return () => {
      isMounted = false;
    };
  }, []);

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
    const normalizedInput = normalizeInput(userMessage);
    const matchedScript = prototypeConfig?.chat.scripts.find((script) => {
      const firstUser = script.messages.find((message) => message.role === 'user');
      return firstUser && normalizeInput(firstUser.content) === normalizedInput;
    });

    const newChat: Chat = matchedScript
      ? {
          id: chatId,
          title: userMessage,
          messages: matchedScript.messages.map(parsePrototypeMessage),
          createdAt: new Date(),
          scriptId: matchedScript.scriptId,
        }
      : {
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

    const scriptedTurn = matchedScript?.turns.find(
      (turn) => normalizeInput(turn.userInput) === normalizedInput
    );
    const assistantReply = scriptedTurn?.assistantResponse || matchedScript?.fallback || assistantResponse;

    if (assistantReply && !matchedScript) {
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
                      content: assistantReply,
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
  }, [navigate, prototypeConfig, selectedModule]);

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

  if (configError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md rounded-lg border bg-background p-6 text-center">
          <h1 className="text-lg font-semibold mb-2">Configuration Error</h1>
          <p className="text-sm text-muted-foreground">{configError}</p>
        </div>
      </div>
    );
  }

  if (!prototypeConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading prototype configuration...</p>
      </div>
    );
  }

  return (
    <>
      <AppContext.Provider value={context}>
        <PrototypeConfigContext.Provider value={{ config: prototypeConfig }}>
          <div className={isDarkMode ? 'dark' : ''}>
            <div className="flex flex-col h-screen">
              <TopHeader
                selectedBuilding={selectedBuilding}
                setSelectedBuilding={setSelectedBuilding}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
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
        </PrototypeConfigContext.Provider>
      </AppContext.Provider>
    </>
  );
}