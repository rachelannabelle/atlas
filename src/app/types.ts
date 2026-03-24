export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'chainOfThought' | 'excavationList';
  chainSteps?: string[];
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  scriptId?: string;
  scriptError?: string;
}

export type FileStatus = "uploading" | "processed" | "error";
export type Building = "The Gear" | "Raffles City Tower" | "Marina Bay Sands Tower 1" | "Marina Bay Sands Tower 2";
export type Category = "Operations" | "HR-Certificate" | "Schedule of Rates" | "Sirius" | "HVAC" | "SOP";

export interface FileData {
  id: string;
  fileName: string;
  fileType: "document" | "spreadsheet" | "image" | "word";
  status: FileStatus;
  building: Building;
  category: Category;
  uploadTime: string;
  uploadedBy: string;
}

export interface AppContextType {
  selectedBuilding: string;
  setSelectedBuilding: (value: string) => void;
  selectedScholar: string;
  setSelectedScholar: (value: string) => void;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  selectedModule: string | null;
  setSelectedModule: (module: string | null) => void;
  createNewChat: (userMessage: string, assistantResponse?: string) => string;
  addMessageToChat: (chatId: string, message: Message) => void;
  startNewChat: () => void;
  uploadedFiles: FileData[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
  hasQuotationDraft: boolean;
  setHasQuotationDraft: (value: boolean) => void;
  quotationDraftTimestamp: Date | null;
  setQuotationDraftTimestamp: (value: Date | null) => void;
}