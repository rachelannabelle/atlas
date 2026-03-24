import { ArrowRight, Paperclip, Copy, ThumbsUp, ThumbsDown, Pencil, FileSpreadsheet, X, BookOpen, Layers, FolderSearch, GitFork, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState, useRef, useEffect } from "react";
import type { Chat, Message } from "../types";
import { ChainOfThought } from "./ChainOfThought";
import { ExcavationScheduleList } from "./ExcavationScheduleList";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { usePrototypeConfig } from "../prototype/PrototypeConfigContext";

interface ChatInterfaceProps {
  selectedBuilding: string;
  selectedScholar: string;
  className?: string;
  activeChat?: Chat;
  onCreateChat: (userMessage: string, assistantResponse?: string) => string;
  onSendMessage: (chatId: string, message: Message) => void;
  setSelectedScholar: (value: string) => void;
  onModuleSelect?: (moduleId: string | null, moduleName: string) => void;
}

const MODULE_NAME_TO_ID: Record<string, string> = {
  'Operations': 'operations',
  'HR-Certificate': 'hr-certificate',
  'Schedule of Rates': 'schedule-rates',
  'Sirius': 'sirius',
  'HVAC': 'hvac',
  'SOP': 'sop',
};

export function ChatInterface({ 
  selectedBuilding, 
  selectedScholar, 
  className,
  activeChat,
  onCreateChat,
  onSendMessage,
  setSelectedScholar,
  onModuleSelect,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down' | null>>({});
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);
  const chatFileInputRef = useRef<HTMLInputElement>(null);
  const [showAttachedFile, setShowAttachedFile] = useState(false);
  const [scholarModalOpen, setScholarModalOpen] = useState(false);
  const [operatorModalOpen, setOperatorModalOpen] = useState(false);
  const { config } = usePrototypeConfig();
  const placeholderText = `Ask me anything about ${selectedScholar.toLowerCase()} for ${selectedBuilding}`;

  const selectModule = (name: string) => {
    setSelectedScholar(name);
    setScholarModalOpen(false);
    const moduleId = MODULE_NAME_TO_ID[name] || null;
    onModuleSelect?.(moduleId, name);
  };

  const handleSelectScholar = () => {
    setSelectedScholar('All scholar files');
    setScholarModalOpen(false);
    onModuleSelect?.(null, 'All scholar files');
  };

  const handleSelectOperator = () => {
    setSelectedScholar('All operator systems');
    setOperatorModalOpen(false);
    onModuleSelect?.(null, 'All operator systems');
  };

  const handleSelectOperatorSub = (name: string) => {
    setSelectedScholar(name);
    setOperatorModalOpen(false);
    onModuleSelect?.(null, name);
  };

  // Check if we're in a specific project folder
  const isInProjectFolder = selectedScholar !== 'All Scholar Files' && 
                            selectedScholar !== '' && 
                            selectedScholar !== 'Scholar';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const getPromptSuggestions = () => {
    if (selectedScholar === 'Schedule of Rates') {
      return [
        "Help me find the best rate",
        "Compare the rates between two companies"
      ];
    } else if (selectedScholar === 'Operations') {
      return [
        "What are the key maintenance issues in Building A?",
        "Show me the latest work orders for this building",
        "What's the energy consumption trend?"
      ];
    } else if (selectedScholar === 'HR-Certificate') {
      return [
        "List all HR-certificates"
      ];
    } else {
      return [
        "What are the key maintenance issues in Building A?",
        "Show me the latest work orders for this building",
        "What's the energy consumption trend?",
        "List all pending HR certifications"
      ];
    }
  };

  const promptSuggestions = getPromptSuggestions();

  const normalizeInput = (value: string) => value.trim().toLowerCase();

  const activeScript = activeChat?.scriptId
    ? config.chat.scripts.find((script) => script.scriptId === activeChat.scriptId)
    : null;

  const handlePromptClick = (prompt: string) => {
    // Create chat with specific assistant response for "Help me find the best rate"
    if (prompt === "Help me find the best rate") {
      onCreateChat(prompt, "What schedule item are you looking to generate a quote for?");
    } else {
      onCreateChat(prompt, "I understand. How can I assist you with that?");
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const normalizedInput = normalizeInput(inputValue);

    if (activeChat) {
      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: inputValue,
        timestamp: new Date(),
      };
      onSendMessage(activeChat.id, userMessage);

      const scriptedResponse = activeScript?.turns.find(
        (turn) => normalizeInput(turn.userInput) === normalizedInput
      )?.assistantResponse;
      const assistantCopy = scriptedResponse || activeScript?.fallback || "I'm processing your request...";

      setTimeout(() => {
        const assistantMessage: Message = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: assistantCopy,
          timestamp: new Date(),
        };
        onSendMessage(activeChat.id, assistantMessage);
      }, 500);
    } else {
      onCreateChat(inputValue, "I understand. How can I assist you with that?");
    }

    setInputValue("");
    setTextareaHeight(0);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize
    const target = e.target;
    target.style.height = 'auto';
    const newHeight = target.scrollHeight;
    target.style.height = newHeight + 'px';
    setTextareaHeight(newHeight);
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    setFeedbackState(prevState => ({
      ...prevState,
      [messageId]: feedback
    }));
  };

  const formatTimestamp = (date: Date) => {
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    return `${month} ${day}, ${time}`;
  };

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    setEditValue(content);
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditValue("");
  };

  const handleSendEdit = () => {
    if (!editValue.trim() || !activeChat) return;
    
    // TODO: Implement message edit logic
    // For now, just simulate sending the edited message as a new message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: editValue,
      timestamp: new Date(),
    };
    onSendMessage(activeChat.id, userMessage);

    // Reset edit state
    setEditingMessageId(null);
    setEditValue("");

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: "I understand your updated request. How can I assist you further?",
        timestamp: new Date(),
      };
      onSendMessage(activeChat.id, assistantMessage);
    }, 500);
  };

  const handleEditTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
    
    // Auto-resize
    const target = e.target;
    target.style.height = 'auto';
    const newHeight = target.scrollHeight;
    target.style.height = newHeight + 'px';
  };

  const handlePaperclipClick = () => {
    chatFileInputRef.current?.click();
  };

  const handleChatFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Show the attached file chip after selecting a file
      setShowAttachedFile(true);
    }
    // Reset the input so the same file can be re-selected
    if (chatFileInputRef.current) {
      chatFileInputRef.current.value = '';
    }
  };

  const handleRemoveAttachedFile = () => {
    setShowAttachedFile(false);
  };

  // If there's an active chat, show conversation view
  if (activeChat) {
    return (
      <div className={`flex flex-col h-full ${className || ''}`}>
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {activeChat.scriptError && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                <span>{activeChat.scriptError}</span>
              </div>
            )}
            {activeChat.messages.map((message) => {
              // Handle chain of thought message
              if (message.type === 'chainOfThought' && message.chainSteps) {
                return (
                  <div key={message.id} className="flex justify-start">
                    <div className="max-w-[80%]">
                      <ChainOfThought steps={message.chainSteps} />
                    </div>
                  </div>
                );
              }

              // Handle excavation list message
              if (message.type === 'excavationList') {
                return (
                  <div key={message.id} className="flex justify-start">
                    <div className="max-w-[90%] w-full">
                      <ExcavationScheduleList />
                    </div>
                  </div>
                );
              }

              // Handle regular text messages
              return (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {editingMessageId === message.id && message.role === 'user' ? (
                    // Edit mode - full width
                    <div className="w-full">
                      <div className="bg-white rounded-[24px] border border-[#d9d9d9]">
                        <div className="flex flex-col gap-[16px] items-start p-[16px]">
                          <textarea
                            ref={editTextareaRef}
                            value={editValue}
                            onChange={handleEditTextareaChange}
                            className="flex-1 w-full resize-none bg-transparent border-0 outline-none text-[14px] leading-[20px] text-black placeholder:text-[#a6a6a6] min-h-[20px] max-h-[200px]"
                            rows={1}
                            autoFocus
                          />
                          
                          <div className="flex items-center gap-2 w-full justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSendEdit}
                              disabled={!editValue.trim()}
                              className="bg-[#3C3DEC] hover:bg-[#2d2eb8] text-white"
                            >
                              Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Normal display mode
                    <div className="flex flex-col max-w-[80%]">
                      <div className="flex items-center gap-2 group/message">
                        {message.role === 'user' && (
                          <div className="flex items-center gap-1 opacity-0 group-hover/message:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                              aria-label="Copy message"
                              onClick={() => {
                                navigator.clipboard.writeText(message.content);
                                toast.success('Copied to clipboard');
                              }}
                            >
                              <Copy className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                              aria-label="Edit message"
                              onClick={() => handleEditMessage(message.id, message.content)}
                            >
                              <Pencil className="size-4" />
                            </Button>
                          </div>
                        )}
                        
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.role === 'user'
                              ? 'bg-[#3C3DEC] text-white'
                              : 'bg-gray-100 text-black'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                      
                      {message.role === 'assistant' && (
                        <div className="flex items-center justify-between mt-2 w-full">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-muted-foreground hover:text-foreground hover:bg-transparent"
                              aria-label="Copy message"
                              onClick={() => {
                                navigator.clipboard.writeText(message.content);
                                toast.success('Copied to clipboard');
                              }}
                            >
                              <Copy className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`size-8 hover:bg-transparent ${
                                feedbackState[message.id] === 'up'
                                  ? 'text-[#3C3DEC]'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                              aria-label="Thumbs up"
                              onClick={() => handleFeedback(message.id, 'up')}
                            >
                              <ThumbsUp className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`size-8 hover:bg-transparent ${
                                feedbackState[message.id] === 'down'
                                  ? 'text-[#3C3DEC]'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                              aria-label="Thumbs down"
                              onClick={() => handleFeedback(message.id, 'down')}
                            >
                              <ThumbsDown className="size-4" />
                            </Button>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t bg-white px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-[24px] border border-[#d9d9d9]">
              <div className="flex flex-col gap-[16px] items-start p-[16px]">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholderText}
                  className="flex-1 w-full resize-none bg-transparent border-0 outline-none text-[14px] leading-[20px] text-black placeholder:text-[#a6a6a6] min-h-[20px] max-h-[200px]"
                  rows={1}
                />

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="size-9 text-[#a6a6a6] hover:text-black"
                      aria-label="Attach file"
                      onClick={handlePaperclipClick}
                    >
                      <Paperclip className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-9 gap-1.5 px-3 text-[#a6a6a6] hover:text-black"
                      onClick={() => setScholarModalOpen(true)}
                    >
                      <BookOpen className="size-4" />
                      <span className="text-xs">Scholar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-9 gap-1.5 px-3 text-[#a6a6a6] hover:text-black"
                      onClick={() => setOperatorModalOpen(true)}
                    >
                      <Layers className="size-4" />
                      <span className="text-xs">Operator</span>
                    </Button>
                    
                    {showAttachedFile && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-sidebar-accent rounded-md">
                        <FileSpreadsheet className="size-4 text-green-600" />
                        <span className="text-xs font-medium">CBRE_Inventory_list.xlsx</span>
                        <button
                          onClick={handleRemoveAttachedFile}
                          className="ml-1 hover:bg-accent rounded-sm p-0.5"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-[#3C3DEC] flex items-center justify-center size-[36px] rounded-full shrink-0 hover:bg-[#2d2eb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="size-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">
              AiBE can make mistakes, always check important information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show starter view when no active chat
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 pt-[20vh]">
      <div className="flex flex-col items-center gap-[48px] max-w-[549px] w-full">
        <h1 className="font-bold text-[28px] leading-[32px] tracking-[-0.5px] text-black">
          How can I help you today?
        </h1>
        
        <div className="w-full">
          <div className="bg-white rounded-[24px] border border-[#d9d9d9]">
            <div className="flex flex-col gap-[16px] items-start p-[16px]">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholderText}
                className="flex-1 w-full resize-none bg-transparent border-0 outline-none text-[14px] leading-[20px] text-black placeholder:text-[#a6a6a6] min-h-[20px] max-h-[200px]"
                rows={1}
              />
              
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="size-9 text-[#a6a6a6] hover:text-black"
                    aria-label="Attach file"
                    onClick={handlePaperclipClick}
                  >
                    <Paperclip className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-9 gap-1.5 px-3 text-[#a6a6a6] hover:text-black"
                    onClick={() => setScholarModalOpen(true)}
                  >
                    <BookOpen className="size-4" />
                    <span className="text-xs">Scholar</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-9 gap-1.5 px-3 text-[#a6a6a6] hover:text-black"
                    onClick={() => setOperatorModalOpen(true)}
                  >
                    <Layers className="size-4" />
                    <span className="text-xs">Operator</span>
                  </Button>
                  
                  {showAttachedFile && (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-sidebar-accent rounded-md">
                      <FileSpreadsheet className="size-4 text-green-600" />
                      <span className="text-xs font-medium">CBRE_Inventory_list.xlsx</span>
                      <button
                        onClick={handleRemoveAttachedFile}
                        className="ml-1 hover:bg-accent rounded-sm p-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-[#3C3DEC] flex items-center justify-center size-[36px] rounded-full shrink-0 hover:bg-[#2d2eb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="size-4 text-white" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-1">
            AiBE can make mistakes, always check important information.
          </p>
          
          {isInProjectFolder && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-foreground mb-3">Popular Questions</p>
              <div className="grid grid-cols-2 gap-3 w-full">
                {promptSuggestions.map((prompt, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:bg-accent transition-colors border-[#e5e5e5]"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <CardContent className="p-4">
                      <p className="text-sm text-[#525252] leading-[20px]">{prompt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input for native file picker */}
      <input
        type="file"
        ref={chatFileInputRef}
        className="hidden"
        onChange={handleChatFileInputChange}
      />

      {/* Scholar Modal */}
      <Dialog open={scholarModalOpen} onOpenChange={setScholarModalOpen}>
        <DialogContent className="sm:max-w-[400px]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="size-5" />
              Scholar Modules
            </DialogTitle>
            <DialogDescription className="text-sm">
              Select a module to view its documents.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1 mt-2">
            <button
              onClick={handleSelectScholar}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-accent outline-none text-left transition-colors"
            >
              <BookOpen className="size-4 text-[#3C3DEC]" />
              <span className="text-sm">All scholar files</span>
            </button>
            <div className="h-px bg-border my-1" />
            {['Operations', 'HR-Certificate', 'Schedule of Rates', 'Sirius', 'HVAC', 'SOP'].map((name) => (
              <button
                key={name}
                onClick={() => selectModule(name)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-accent outline-none text-left transition-colors"
              >
                <FolderSearch className="size-4 text-muted-foreground" />
                <span className="text-sm">{name}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Operator Modal */}
      <Dialog open={operatorModalOpen} onOpenChange={setOperatorModalOpen}>
        <DialogContent className="sm:max-w-[400px]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="size-5" />
              Operator Systems
            </DialogTitle>
            <DialogDescription className="text-sm">
              Select a system to view its documents.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1 mt-2">
            <button
              onClick={handleSelectOperator}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-accent outline-none text-left transition-colors"
            >
              <Layers className="size-4 text-[#3C3DEC]" />
              <span className="text-sm">All operator systems</span>
            </button>
            <div className="h-px bg-border my-1" />
            {[
              { name: 'Work Order Management', icon: GitFork },
              { name: 'IoT', icon: GitFork },
              { name: 'Building Management', icon: GitFork },
            ].map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => handleSelectOperatorSub(name)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-accent outline-none text-left transition-colors"
              >
                <Icon className="size-4 text-muted-foreground" />
                <span className="text-sm">{name}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}