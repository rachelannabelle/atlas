import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  MapPin,
  ChevronDown,
  LogOut,
  FileText,
  HelpCircle,
  Settings,
  Plus,
  BarChart3,
} from "lucide-react";
import imgImage1 from "figma:asset/55d827301a84ac179b1f2a3171c5d5ee8220f9c2.png";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { usePrototypeConfig } from "../prototype/PrototypeConfigContext";

interface TopHeaderProps {
  selectedBuilding: string;
  setSelectedBuilding: (value: string) => void;
  selectedRole: string;
  setSelectedRole: (value: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  currentView: "chat" | "documents" | "quotation" | "search";
}

function MenuSection({
  emptyStateEnabled,
  items,
  icon,
  createLabel,
}: {
  emptyStateEnabled: boolean;
  items: Array<{ id: string; title: string; lastUpdatedLabel: string }>;
  icon: ReactNode;
  createLabel: string;
}) {
  return (
    <div className="flex flex-col py-2">
      <div className="px-4 py-2">
        <p className="text-[10px] tracking-[1.5px] uppercase text-muted-foreground">Recent</p>
      </div>

      {emptyStateEnabled ? (
        <div className="px-4 py-3">
          <p className="text-sm text-muted-foreground">No recent items yet.</p>
        </div>
      ) : (
        items.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-4 px-4 py-2 hover:bg-accent transition-colors text-left"
          >
            <div className="bg-[#EBEBFC] flex items-center justify-center p-2 rounded-lg shrink-0">{icon}</div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-sm text-foreground truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.lastUpdatedLabel}</p>
            </div>
          </button>
        ))
      )}

      <button className="flex items-center gap-4 px-4 py-2 hover:bg-accent transition-colors text-left">
        <div className="flex items-center justify-center p-2 rounded-lg shrink-0">
          <Plus className="size-5 text-foreground" />
        </div>
        <p className="text-sm text-foreground">{createLabel}</p>
      </button>
    </div>
  );
}

export function TopHeader({
  selectedBuilding,
  setSelectedBuilding,
  selectedRole,
  setSelectedRole,
  isDarkMode,
  setIsDarkMode,
  currentView,
}: TopHeaderProps) {
  const navigate = useNavigate();
  const { config } = usePrototypeConfig();
  const [buildingOpen, setBuildingOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <header className="h-16 border-b bg-background flex items-center px-6 gap-4 shrink-0 relative">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity"
      >
        <div className="bg-[#EBEBFC] p-1 rounded-lg">
          <img alt="AiBE" className="size-6" src={imgImage1} />
        </div>
        <div className="flex flex-col leading-tight">
          <p className="font-semibold text-sm">{config.topNav.brand.appName}</p>
          <Popover open={roleOpen} onOpenChange={setRoleOpen}>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <span>{selectedRole}</span>
                <ChevronDown className="size-3 opacity-60" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-1">
              <div className="flex flex-col">
                {config.topNav.brand.roleOptions.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setRoleOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent text-left whitespace-nowrap"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </button>

      <div className="h-8 w-px bg-border" />

      <Popover open={buildingOpen} onOpenChange={setBuildingOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="gap-2 px-3 h-9 shrink-0 text-foreground [&_svg]:text-muted-foreground"
          >
            <MapPin className="size-4" />
            <span className="text-sm whitespace-nowrap">{selectedBuilding}</span>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-1">
          <div className="flex flex-col">
            {config.topNav.buildings.items.map((building) => (
              <button
                key={building.id}
                onClick={() => {
                  setSelectedBuilding(building.label);
                  setBuildingOpen(false);
                }}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent text-left whitespace-nowrap"
              >
                <MapPin className="size-4" />
                <span>{building.label}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          className={`h-9 px-3 text-sm ${currentView === "documents" ? "text-[#3C3DEC] hover:text-[#3C3DEC]" : "text-foreground"}`}
          onClick={() => navigate("/documents")}
        >
          Knowledge Base
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={`h-9 px-3 text-sm gap-1 ${currentView === "quotation" ? "text-[#3C3DEC] hover:text-[#3C3DEC]" : "text-foreground"}`}
            >
              Quotations
              <ChevronDown className="size-3.5 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[365px] p-0 rounded-lg">
            <MenuSection
              emptyStateEnabled={config.topNav.quotationsMenu.emptyStateEnabled}
              items={config.topNav.quotationsMenu.items}
              icon={<FileText className="size-5 text-[#3C3DEC]" />}
              createLabel="Create quotation"
            />
            <div className="h-px bg-border" />
            <div className="py-2">
              <button className="w-full flex items-center px-4 py-3 hover:bg-accent transition-colors text-left">
                <p className="text-sm text-foreground">View all quotations</p>
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" className="h-9 px-3 text-sm text-foreground gap-1">
              Reports
              <ChevronDown className="size-3.5 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[365px] p-0 rounded-lg">
            <MenuSection
              emptyStateEnabled={config.topNav.reportsMenu.emptyStateEnabled}
              items={config.topNav.reportsMenu.items}
              icon={<BarChart3 className="size-5 text-[#3C3DEC]" />}
              createLabel="Create report"
            />
            <div className="h-px bg-border" />
            <div className="py-2">
              <button className="w-full flex items-center px-4 py-3 hover:bg-accent transition-colors text-left">
                <p className="text-sm text-foreground">View all reports</p>
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </nav>

      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Button
          type="button"
          className="h-9 px-4 bg-[#3C3DEC] hover:bg-[#3233d1] text-white gap-2"
          onClick={() => navigate("/chat")}
        >
          <Plus className="size-4" />
          New Chat
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" className="px-1 h-9 shrink-0 text-foreground">
            <div className="relative size-8">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                <circle cx="20" cy="20" fill="#EBEBFC" r="20" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[#3C3DEC] text-xs font-medium">
                {config.topNav.user.avatarAcronym}
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="px-2 py-2 border-b">
            <p className="font-semibold text-sm">{config.topNav.user.name}</p>
            <p className="text-xs text-muted-foreground">{config.topNav.user.email}</p>
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

