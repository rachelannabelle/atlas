import { useNavigate, useLocation } from 'react-router';
import { ChatInterface } from '../components/ChatInterface';
import { ScholarChatView } from '../components/ScholarChatView';
import { useAppContext } from '../context';

export function ChatPage() {
  const {
    selectedBuilding,
    selectedScholar,
    setSelectedScholar,
    setSelectedModule,
    chats,
    activeChatId,
    createNewChat,
    addMessageToChat,
  } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();

  const activeChat = chats.find((c) => c.id === activeChatId);
  const activeMode: 'scholar' | 'operator' =
    location.pathname.startsWith('/operator') ? 'operator' : 'scholar';

  // Scholar mode with an active /chat/:chatId route → Scholar chat experience
  const isScholarChatRoute = location.pathname.startsWith('/chat/')
  if (activeMode === 'scholar' && activeChat && isScholarChatRoute) {
    return (
      <div className="relative h-full flex overflow-hidden">
        <div className="flex-1 min-w-0 overflow-hidden">
          <ScholarChatView
            activeChat={activeChat}
            onSendMessage={addMessageToChat}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full flex overflow-hidden">
      <div className="flex-1 min-w-0">
        <ChatInterface
          selectedBuilding={selectedBuilding}
          selectedScholar={selectedScholar}
          setSelectedScholar={setSelectedScholar}
          onModuleSelect={(moduleId, _moduleName) => {
            if (moduleId) {
              setSelectedModule(moduleId);
              navigate(`/modules/${moduleId}`);
            } else {
              setSelectedModule(null);
              navigate('/');
            }
          }}
          className="h-full"
          activeChat={activeChat}
          onCreateChat={createNewChat}
          onSendMessage={addMessageToChat}
          mode={activeMode}
        />
      </div>
    </div>
  );
}
