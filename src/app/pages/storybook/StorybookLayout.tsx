import { Outlet, useNavigate, useLocation } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  Palette,
  Type,
  LayoutGrid,
  MessageSquare,
  Navigation2,
  PanelLeft,
  FileText,
  User,
  Info,
  ChevronDown,
  ListChecks,
  SlidersHorizontal,
  FormInput,
} from "lucide-react";
import { ScrollArea } from "../../components/ui/scroll-area";

const navSections = [
  { path: "", label: "Overview", icon: BookOpen },
  { path: "colors", label: "Colors", icon: Palette },
  { path: "typography", label: "Typography", icon: Type },
  { path: "left-nav", label: "Left-Hand Nav (Sidebar)", icon: PanelLeft },
  { path: "nav-chips", label: "Nav Chips (Top Bar)", icon: Navigation2 },
  { path: "chatbox", label: "Chat Box", icon: MessageSquare },
  { path: "chain-of-thought", label: "Chain of Thought", icon: ListChecks },
  { path: "excavation-list", label: "Excavation Schedule List", icon: FileText },
  { path: "sheet-form", label: "Right-Hand Sheet Form", icon: SlidersHorizontal },
  { path: "buttons", label: "Buttons", icon: LayoutGrid },
  { path: "inputs", label: "Input Fields", icon: FormInput },
  { path: "dropdowns", label: "Dropdown Menus", icon: ChevronDown },
  { path: "avatars", label: "Avatars", icon: User },
  { path: "tooltips", label: "Tooltips", icon: Info },
];

export function StorybookLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.replace("/storybook", "").replace(/^\//, "");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#E8E6F0] bg-[#F8F7FC] flex flex-col shrink-0">
        <div className="p-4 border-b">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="size-4" />
            <span>Back to app</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="bg-[#EBEBFC] p-1.5 rounded-lg">
              <BookOpen className="size-5 text-[#3C3DEC]" />
            </div>
            <div>
              <p className="text-sm">Component Storybook</p>
              <p className="text-xs text-muted-foreground">AiBE Design System</p>
            </div>
          </div>
        </div>
        <ScrollArea className="flex-1 p-3">
          <nav className="space-y-0.5">
            {navSections.map((section) => {
              const isActive = currentPath === section.path;
              const Icon = section.icon;
              return (
                <button
                  key={section.path}
                  onClick={() => navigate(`/storybook${section.path ? `/${section.path}` : ""}`)}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                    isActive
                      ? "bg-[#EBEBFC] text-[#3C3DEC]"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}