import { useNavigate } from 'react-router';
import { ChatInterface } from '../components/ChatInterface';
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

  return (
    <div className="relative h-full">
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
        activeChat={chats.find((c) => c.id === activeChatId)}
        onCreateChat={createNewChat}
        onSendMessage={addMessageToChat}
      />
    </div>
  );
}