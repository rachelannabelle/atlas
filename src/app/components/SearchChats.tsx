import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import type { Chat } from "../types";

interface SearchChatsProps {
  chats: Chat[];
  onChatSelect: (chatId: string) => void;
}

export function SearchChats({ chats, onChatSelect }: SearchChatsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter chats based on search query
  const filteredChats = searchQuery
    ? chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;

  // Format date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 pt-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-medium mb-8">Search</h1>
        
        {/* Search input */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-background border-border"
          />
        </div>

        {/* Recent section */}
        <div>
          <h2 className="text-sm font-medium mb-4 text-foreground">Recent</h2>
          <div className="space-y-1">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onChatSelect(chat.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors text-left group"
                >
                  <span className="text-sm font-normal text-foreground group-hover:text-sidebar-accent-foreground">
                    {chat.title}
                  </span>
                  <span className="text-sm text-muted-foreground group-hover:text-sidebar-accent-foreground">
                    {formatDate(chat.createdAt)}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-sm text-muted-foreground px-4 py-3">
                {searchQuery ? "No chats found" : "No recent chats"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}