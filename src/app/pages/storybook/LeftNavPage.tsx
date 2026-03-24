import { Search, SquarePen, FolderSearch, MoreHorizontal, ChevronsUpDown } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { StorySection, CodeBlock } from "./shared";

export function LeftNavPage() {
  return (
    <StorySection
      title="Left-Hand Nav (Sidebar)"
      description="Collapsible sidebar using shadcn Sidebar primitives. Contains AiBE logo, New Chat / Search actions, My Modules folders, Your Chats list, and user profile footer."
    >
      <div className="border rounded-xl overflow-hidden max-w-[280px]">
        <div className="h-16 flex items-center px-4 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-[#EBEBFC] p-1 rounded-lg shrink-0">
              <div className="size-6 bg-[#3C3DEC]/20 rounded" />
            </div>
            <div className="flex flex-col leading-tight">
              <p className="font-semibold text-sm">AiBE</p>
              <p className="text-xs text-muted-foreground">Operator</p>
            </div>
          </div>
        </div>

        <div className="p-2 space-y-0.5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-sm">
            <SquarePen className="size-4" />
            <span>New Chat</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-sm text-muted-foreground">
            <Search className="size-4" />
            <span>Search chats</span>
          </div>
        </div>

        <Separator />

        <div className="p-2">
          <p className="text-xs text-muted-foreground px-3 py-1">My Modules</p>
          <div className="space-y-0.5">
            {["Operations", "HR-Certificate", "Schedule of Rates", "Sirius", "HVAC", "SOP"].map((m, i) => (
              <div
                key={m}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  i === 0 ? "bg-accent" : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <FolderSearch className="size-4" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="p-2">
          <p className="text-xs text-muted-foreground px-3 py-1">Your chats</p>
          <div className="space-y-0.5">
            <div className="group relative flex items-center">
              <div className="flex-1 px-3 py-2 rounded-lg bg-accent text-sm">
                <span className="line-clamp-2 text-left">Help me find the best rate</span>
              </div>
              <button className="absolute right-2 p-1 rounded hover:bg-muted
                              opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="size-4 text-muted-foreground" />
              </button>
            </div>
            <div className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent">
              <span className="line-clamp-2 text-left">Compare rates between companies</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="p-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer">
            <div className="relative size-8 shrink-0">
              <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40">
                <circle cx="20" cy="20" fill="#EBEBFC" r="20" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[#3C3DEC] text-xs font-medium">CT</div>
            </div>
            <div className="flex flex-col leading-tight flex-1 min-w-0 text-left">
              <p className="font-semibold text-sm truncate">Charlie Tan</p>
              <p className="text-xs text-muted-foreground truncate">charlie.tan@customer.com</p>
            </div>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <CodeBlock
        label="Tailwind classes"
        code={`{/* Sidebar container — shadcn Sidebar with icon-collapse mode */}
<Sidebar collapsible="icon">

{/* Logo block */}
<div className="bg-[#EBEBFC] p-1 rounded-lg">
  <AibeLogoIcon />
</div>
<p className="font-semibold text-sm">AiBE</p>
<p className="text-xs text-muted-foreground">Operator</p>

{/* Active menu item — uses shadcn SidebarMenuButton */}
<SidebarMenuButton isActive={true}>
  {/* Active state applies bg-sidebar-accent text-sidebar-accent-foreground */}
</SidebarMenuButton>

{/* Module folder items */}
<div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm">
  <FolderSearch className="size-4" />
  <span>Operations</span>
</div>
{/* Active: add className="bg-accent" */}
{/* Inactive: add className="text-muted-foreground hover:bg-accent" */}

{/* Chat list items — hover-reveal kebab pattern */}
<div className="group relative flex items-center">
  <div className="flex-1 px-3 py-2 rounded-lg bg-accent text-sm">
    <span className="line-clamp-2 text-left">Chat title</span>
  </div>
  <button className="absolute right-2 p-1 rounded hover:bg-muted
                      opacity-0 group-hover:opacity-100 transition-opacity">
    <MoreHorizontal className="size-4 text-muted-foreground" />
  </button>
</div>

{/* User footer avatar */}
<div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer">
  <div className="relative size-8 shrink-0">
    {/* SVG circle: fill="#EBEBFC" */}
    <div className="absolute inset-0 flex items-center justify-center
                    text-[#3C3DEC] text-xs font-medium">
      CT
    </div>
  </div>
  <div className="flex flex-col leading-tight flex-1 min-w-0 text-left">
    <p className="font-semibold text-sm truncate">Charlie Tan</p>
    <p className="text-xs text-muted-foreground truncate">charlie.tan@customer.com</p>
  </div>
  <ChevronsUpDown className="size-4 text-muted-foreground" />
</div>`}
      />
    </StorySection>
  );
}