import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  BookOpen, 
  ChevronsUpDown, 
  LogOut, 
  FileText, 
  HelpCircle, 
  Settings,
  LayoutGrid,
  MessageSquarePlus,
  X,
  Plus,
  BarChart3,
} from 'lucide-react';
import imgImage1 from "figma:asset/55d827301a84ac179b1f2a3171c5d5ee8220f9c2.png";
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Switch } from './ui/switch';
import type { Chat } from '../types';

// ForwardRef div that strips Figma internal _fg* props before they hit the DOM
const SafeDiv = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  (props, ref) => {
    const filtered: Record<string, unknown> = {};
    for (const key in props) {
      if (!key.startsWith("_fg") && !key.startsWith("_FG")) {
        filtered[key] = (props as Record<string, unknown>)[key];
      }
    }
    return <div ref={ref} {...(filtered as React.ComponentProps<"div">)} />;
  }
);
SafeDiv.displayName = "SafeDiv";

interface TopHeaderProps {
  selectedBuilding: string;
  setSelectedBuilding: (value: string) => void;
  chats: Chat[];
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  currentView: 'chat' | 'documents' | 'quotation' | 'search';
}

export function TopHeader({
  selectedBuilding,
  setSelectedBuilding,
  chats,
  isDarkMode,
  setIsDarkMode,
  currentView,
}: TopHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [buildingOpen, setBuildingOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleSelectBuilding = (building: string) => {
    setSelectedBuilding(building);
    setBuildingOpen(false);
  };

  const handleChatSelect = (chatId: string) => {
    const moduleMatch = location.pathname.match(/^\/modules\/([^/]+)/);
    if (moduleMatch) {
      navigate(`/modules/${moduleMatch[1]}/chat/${chatId}`);
    } else {
      navigate(`/chat/${chatId}`);
    }
    setSearchOpen(false);
    setSearchMode(false);
  };

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

  const handleSearchClick = () => {
    setSearchMode(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleCloseSearch = () => {
    setSearchMode(false);
    setSearchOpen(false);
  };

  return (
    <header className="h-16 border-b bg-background flex items-center px-6 gap-4 shrink-0 relative">
      {/* 1. App Logo and Name */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity"
      >
        <div className="bg-[#EBEBFC] p-1 rounded-lg">
          <img alt="AiBE" className="size-6" src={imgImage1} />
        </div>
        <div className="flex flex-col leading-tight">
          <p className="font-semibold text-sm">AiBE</p>
          <p className="text-xs text-muted-foreground">Operator</p>
        </div>
      </button>

      {/* Vertical separator */}
      <div className="h-8 w-px bg-border" />

      {/* 2. Building Selector */}
      <Popover open={buildingOpen} onOpenChange={setBuildingOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="ghost" className="gap-2 px-3 h-9 shrink-0 text-foreground [&_svg]:text-muted-foreground">
            <MapPin className="size-4" />
            <span className="text-sm whitespace-nowrap">{selectedBuilding}</span>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-1">
          <div className="flex flex-col">
            <button
              onClick={() => handleSelectBuilding('The Gear')}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent outline-none text-left whitespace-nowrap"
            >
              <MapPin className="size-4" />
              <span>The Gear</span>
            </button>
            <button
              onClick={() => handleSelectBuilding('Raffles City Tower')}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent outline-none text-left whitespace-nowrap"
            >
              <MapPin className="size-4" />
              <span>Raffles City Tower</span>
            </button>
            <button
              onClick={() => handleSelectBuilding('Marina Bay Sands Tower 1')}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent outline-none text-left whitespace-nowrap"
            >
              <MapPin className="size-4" />
              <span>Marina Bay Sands Tower 1</span>
            </button>
            <button
              onClick={() => handleSelectBuilding('Marina Bay Sands Tower 2')}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent outline-none text-left whitespace-nowrap"
            >
              <MapPin className="size-4" />
              <span>Marina Bay Sands Tower 2</span>
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* ===== STATE 2: Search Mode ===== */}
      {searchMode && (
        <>
          <div className="flex-1" />
          <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-lg px-4">
            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
              <PopoverTrigger asChild>
                <SafeDiv className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search chats..."
                    className="pl-9 pr-9 h-9 bg-background border-border rounded-full"
                    onFocus={() => setSearchOpen(true)}
                  />
                  <button
                    onClick={handleCloseSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </SafeDiv>
              </PopoverTrigger>
              <PopoverContent align="center" className="p-0" style={{ width: 'var(--radix-popover-trigger-width)' }}>
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="p-3 border-b">
                    <h3 className="text-sm font-medium text-foreground">Recent Chats</h3>
                  </div>
                  <div className="p-2">
                    {chats.length > 0 ? (
                      chats.slice(0, 10).map((chat) => (
                        <button
                          key={chat.id}
                          onClick={() => handleChatSelect(chat.id)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent transition-colors text-left group"
                        >
                          <span className="text-sm font-normal text-foreground group-hover:text-accent-foreground truncate flex-1">
                            {chat.title}
                          </span>
                          <span className="text-xs text-muted-foreground group-hover:text-accent-foreground ml-2 shrink-0">
                            {formatDate(chat.createdAt)}
                          </span>
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground px-3 py-2">
                        No recent chats
                      </p>
                    )}
                    <div className="border-t mt-1 pt-1">
                      <button
                        onClick={() => {
                          navigate('/chat');
                          setSearchOpen(false);
                          setSearchMode(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left group"
                      >
                        <MessageSquarePlus className="size-4 text-muted-foreground group-hover:text-accent-foreground" />
                        <span className="text-sm text-foreground group-hover:text-accent-foreground">New Chat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}

      {/* ===== STATE 1: Default Nav Menu ===== */}
      {!searchMode && (
        <>
          {/* Centered Nav Menu Items */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
            {/* Knowledge Base */}
            <Button
              type="button"
              variant="ghost"
              className={`h-9 px-3 text-sm ${currentView === 'documents' ? 'text-[#3C3DEC] hover:text-[#3C3DEC]' : 'text-foreground'}`}
              onClick={() => navigate('/documents')}
            >
              Knowledge Base
            </Button>

            {/* Quotations Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" className={`h-9 px-3 text-sm gap-1 ${currentView === 'quotation' ? 'text-[#3C3DEC] hover:text-[#3C3DEC]' : 'text-foreground'}`}>
                  Quotations
                  <ChevronDown className="size-3.5 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[365px] p-0 rounded-lg">
                <div className="flex flex-col py-2">
                  {/* Section label */}
                  <div className="px-4 py-2">
                    <p className="text-[10px] tracking-[1.5px] uppercase text-muted-foreground">Recent</p>
                  </div>

                  {/* Quotation items */}
                  {[
                    { title: 'Quotation title', date: 'Last updated —' },
                    { title: 'Quotation title', date: 'Last updated —' },
                    { title: 'Quotation title', date: 'Last updated —' },
                    { title: 'Quotation title', date: 'Last updated —' },
                    { title: 'Quotation title', date: 'Last updated —' },
                  ].map((quotation, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-4 px-4 py-2 hover:bg-accent transition-colors text-left"
                    >
                      <div className="bg-[#EBEBFC] flex items-center justify-center p-2 rounded-lg shrink-0">
                        <FileText className="size-5 text-[#3C3DEC]" />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-sm text-foreground truncate">{quotation.title}</p>
                        <p className="text-xs text-muted-foreground">{quotation.date}</p>
                      </div>
                    </button>
                  ))}

                  {/* Create quotation */}
                  <button
                    onClick={() => navigate('/quotations')}
                    className="flex items-center gap-4 px-4 py-2 hover:bg-accent transition-colors text-left"
                  >
                    <div className="flex items-center justify-center p-2 rounded-lg shrink-0">
                      <Plus className="size-5 text-foreground" />
                    </div>
                    <p className="text-sm text-foreground">Create quotation</p>
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* View all quotations */}
                <div className="py-2">
                  <button className="w-full flex items-center px-4 py-3 hover:bg-accent transition-colors text-left">
                    <p className="text-sm text-foreground">View all quotations</p>
                  </button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Reports Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" className="h-9 px-3 text-sm text-foreground gap-1">
                  Reports
                  <ChevronDown className="size-3.5 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[365px] p-0 rounded-lg">
                <div className="flex flex-col py-2">
                  {/* Section label */}
                  <div className="px-4 py-2">
                    <p className="text-[10px] tracking-[1.5px] uppercase text-muted-foreground">Recent</p>
                  </div>

                  {/* Report items */}
                  {[
                    { title: 'Report title', date: 'Last updated —' },
                    { title: 'Report title', date: 'Last updated —' },
                    { title: 'Report title', date: 'Last updated —' },
                    { title: 'Report title', date: 'Last updated —' },
                    { title: 'Report title', date: 'Last updated —' },
                  ].map((report, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-4 px-4 py-2 hover:bg-accent transition-colors text-left"
                    >
                      <div className="bg-[#EBEBFC] flex items-center justify-center p-2 rounded-lg shrink-0">
                        <BarChart3 className="size-5 text-[#3C3DEC]" />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-sm text-foreground truncate">{report.title}</p>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                    </button>
                  ))}

                  {/* Create report */}
                  <button className="flex items-center gap-4 px-4 py-2 hover:bg-accent transition-colors text-left">
                    <div className="flex items-center justify-center p-2 rounded-lg shrink-0">
                      <Plus className="size-5 text-foreground" />
                    </div>
                    <p className="text-sm text-foreground">Create report</p>
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* View all reports */}
                <div className="py-2">
                  <button className="w-full flex items-center px-4 py-3 hover:bg-accent transition-colors text-left">
                    <p className="text-sm text-foreground">View all reports</p>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </nav>

          {/* Right-aligned: Search icon + New Chat */}
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            {/* Search Icon CTA */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-foreground"
              onClick={handleSearchClick}
            >
              <Search className="size-4" />
            </Button>

            {/* New Chat Primary CTA */}
            <Button
              type="button"
              className="h-9 px-4 bg-[#3C3DEC] hover:bg-[#3233d1] text-white gap-2"
              onClick={() => navigate('/chat')}
            >
              <Plus className="size-4" />
              New Chat
            </Button>
          </div>
        </>
      )}

      {/* User Avatar with Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" className="px-1 h-9 shrink-0 text-foreground">
            <div className="relative size-8">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                <circle cx="20" cy="20" fill="#EBEBFC" r="20" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[#3C3DEC] text-xs font-medium">
                CT
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="px-2 py-2 border-b">
            <p className="font-semibold text-sm">Charlie Tan</p>
            <p className="text-xs text-muted-foreground">charlie.tan@customer.com</p>
          </div>
          <DropdownMenuItem>
            <FileText className="mr-2 size-4" />
            <span>Terms & Policies</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 size-4" />
            <span>Help</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
            <span>Dark mode</span>
            <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
            <LogOut className="mr-2 size-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}