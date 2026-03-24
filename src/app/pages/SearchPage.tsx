import { useNavigate } from 'react-router';
import { SearchChats } from '../components/SearchChats';
import { useAppContext } from '../context';

export function SearchPage() {
  const { chats, setActiveChatId, selectedModule } = useAppContext();
  const navigate = useNavigate();

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    if (selectedModule) {
      navigate(`/modules/${selectedModule}/chat/${chatId}`);
    } else {
      navigate(`/chat/${chatId}`);
    }
  };

  return <SearchChats chats={chats} onChatSelect={handleChatSelect} />;
}