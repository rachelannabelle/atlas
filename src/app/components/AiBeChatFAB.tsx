import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, ArrowRight, X, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { useAppContext } from "../context";
import { useNavigate } from "react-router";
import type { Message, Chat } from "../types";

const SAMPLE_RESPONSES = [
  "I can help you with that! Let me look into it.",
  "Sure, I'll check the building records for you.",
  "Based on the available data, here's what I found...",
  "Let me pull up the relevant documents.",
  "I've found some information that might be useful.",
];

interface FabMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AiBeChatFAB() {
  const { setChats, addMessageToChat, isDarkMode } = useAppContext();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [fabChatId, setFabChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<FabMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm AiBE. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;

    // Add user message to local FAB state
    const userMsg: FabMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Persist to shared chat state
    let chatId = fabChatId;
    if (!chatId) {
      // First message — create a new chat in the global store (without navigating)
      chatId = `fab-chat-${Date.now()}`;
      const newChat: Chat = {
        id: chatId,
        title: text,
        messages: [
          {
            id: `msg-${Date.now()}-1`,
            role: "user",
            content: text,
            timestamp: new Date(),
          },
        ],
        createdAt: new Date(),
      };
      setChats((prev) => [newChat, ...prev]);
      setFabChatId(chatId);

      // Simulate assistant reply
      const currentChatId = chatId;
      setTimeout(() => {
        const response =
          SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-2`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        addMessageToChat(currentChatId, assistantMessage);

        const assistantMsg: FabMessage = {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: response,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }, 800);
    } else {
      // Subsequent messages — append to existing chat
      const userMessage: Message = {
        id: `msg-${Date.now()}-1`,
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      addMessageToChat(chatId, userMessage);

      // Simulate assistant reply
      const currentChatId = chatId;
      setTimeout(() => {
        const response =
          SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-2`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        addMessageToChat(currentChatId, assistantMessage);

        const assistantMsg: FabMessage = {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: response,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }, 800);
    }
  }, [inputValue, fabChatId, setChats, addMessageToChat]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setIsOpen(false);
    setFabChatId(null);
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm AiBE. How can I help you today?",
      },
    ]);
  };

  const handleOpenFullChat = () => {
    if (fabChatId) {
      navigate(`/chat/${fabChatId}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat dialog */}
      {isOpen && (
        <div
          className={`fixed bottom-36 right-6 z-50 w-[380px] h-[520px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200 ${
            isDarkMode
              ? "bg-[#1e1e2e] border-[#2e2e3e]"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#3C3DEC] text-white rounded-t-2xl shrink-0">
            <div
              className="flex items-center gap-2.5 cursor-pointer rounded-lg px-1.5 py-1 -mx-1.5 -my-1 transition-colors hover:bg-white/15"
              onClick={() => navigate('/chat')}
              role="button"
              tabIndex={0}
              title="Open full chat"
            >
              <div className="flex items-center justify-center size-8 bg-white/20 rounded-full">
                <MessageCircle className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium">AiBE Chat</p>
                <p className="text-[11px] text-white/70">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {fabChatId && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-white/80 hover:text-white hover:bg-white/20"
                  onClick={handleOpenFullChat}
                  title="Open full chat"
                >
                  <ArrowRight className="size-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-white/80 hover:text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <Minus className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-white/80 hover:text-white hover:bg-white/20"
                onClick={handleReset}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-[18px] ${
                    msg.role === "user"
                      ? "bg-[#3C3DEC] text-white rounded-br-md"
                      : isDarkMode
                        ? "bg-[#2a2a3a] text-gray-200 rounded-bl-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className={`border-t p-3 shrink-0 ${
              isDarkMode ? "border-[#2e2e3e]" : "border-gray-200"
            }`}
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className={`flex-1 resize-none rounded-xl px-3 py-2.5 text-[13px] leading-[18px] outline-none min-h-[40px] max-h-[100px] transition-colors focus:border-[#3C3DEC] focus:ring-1 focus:ring-[#3C3DEC]/20 ${
                  isDarkMode
                    ? "bg-[#2a2a3a] border border-[#3a3a4a] text-gray-200 placeholder:text-gray-500"
                    : "bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400"
                }`}
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-[#3C3DEC] flex items-center justify-center size-[40px] rounded-full shrink-0 hover:bg-[#2d2eb8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowRight className="size-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB button removed — chat sidebar is opened via "+ Add SoR Items" in Quotation header */}
    </>
  );
}