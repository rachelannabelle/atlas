import { useNavigate } from 'react-router';
import { ChatInterface } from '../components/ChatInterface';
import { ChatL1PrimaryNavigation } from '../components/ChatL1PrimaryNavigation';
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
  const activeChat = chats.find((c) => c.id === activeChatId);

  return (
    <div className="relative h-full flex overflow-hidden">
      <ChatL1PrimaryNavigation
        chats={chats}
        activeChatId={activeChatId}
        selectedBuilding={selectedBuilding}
        onChatSelect={(chatId) => navigate(`/chat/${chatId}`)}
      />
      <div className="flex-1 min-w-0">
        <ChatInterface
          selectedBuilding={selectedBuilding}
          selectedScholar={selectedScholar}
          setSelectedScholar={setSelectedScholar}
          onModuleSelect={(moduleId, moduleName) => {
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
        />
      </div>
    </div>
  );
}