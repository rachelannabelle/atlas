import { useMemo, useState } from "react";
import { ChevronFirst, ChevronLast, Search, Info } from "lucide-react";
import type { Chat } from "../types";
import { usePrototypeConfig } from "../prototype/PrototypeConfigContext";

interface ChatL1PrimaryNavigationProps {
  chats: Chat[];
  activeChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

function formatDate(date: Date) {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function ChatL1PrimaryNavigation({
  chats,
  activeChatId,
  onChatSelect,
}: ChatL1PrimaryNavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { config } = usePrototypeConfig();

  const filteredChats = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return chats;
    return chats.filter((chat) => chat.title.toLowerCase().includes(normalizedQuery));
  }, [chats, searchQuery]);

  if (isCollapsed) {
    return (
      <aside className="w-14 min-w-14 border-r bg-background h-full p-2 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="h-9 w-9 inline-flex items-center justify-center rounded-md text-foreground hover:bg-accent transition-colors"
          aria-label="Expand chat navigation"
        >
          <ChevronLast className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="h-9 w-9 inline-flex items-center justify-center rounded-md text-foreground hover:bg-accent transition-colors"
          aria-label="Open chat search"
        >
          <Search className="size-4" />
        </button>
      </aside>
    );
  }

  const showEmptyState = config.chat.leftNavHistory.emptyStateEnabled || filteredChats.length === 0;

  return (
    <aside className="w-[337px] min-w-[337px] border-r bg-background h-full p-3">
      <div className="h-full flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-medium text-foreground">Chats</h2>
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md text-foreground hover:bg-accent transition-colors"
            aria-label="Collapse chat navigation"
          >
            <ChevronFirst className="size-4" />
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search chats"
            className="h-10 w-full rounded-md border bg-white pl-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="overflow-y-auto space-y-1 pr-1 flex-1">
          {!showEmptyState ? (
            filteredChats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => onChatSelect(chat.id)}
                  className={`w-full rounded-md px-3 py-2 text-left transition-colors ${
                    isActive ? "bg-sidebar-accent text-black" : "bg-white text-black hover:bg-accent"
                  }`}
                >
                  <p className="text-sm truncate">{chat.title}</p>
                  <p className="text-xs mt-0.5 text-black/70">{formatDate(chat.createdAt)}</p>
                </button>
              );
            })
          ) : (
            <div className="rounded-md border border-[#d9d9d9] bg-white p-3">
              <div className="flex items-start gap-2">
                <Info className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">No chat history available</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Load a prototype chat script or visit the Help page for setup instructions.
                  </p>
                  <a
                    className="text-xs mt-2 inline-block text-[#3C3DEC] hover:underline"
                    href={config.chat.leftNavHistory.helpUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Help
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

