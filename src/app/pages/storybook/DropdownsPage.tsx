import {
  ChevronsUpDown,
  FolderOpen,
  FileText,
  HelpCircle,
  Settings,
  LogOut,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { StorySection, CodeBlock } from "./shared";

export function DropdownsPage() {
  return (
    <StorySection
      title="Dropdown Menus"
      description="Radix DropdownMenu used for user profile actions, chat item kebab menus, and term card actions."
    >
      <div className="flex flex-wrap gap-8">
        {/* User profile dropdown */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">User Profile Menu</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <div className="relative size-6">
                  <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" fill="#EBEBFC" r="20" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[#3C3DEC] text-[9px] font-medium">CT</div>
                </div>
                Charlie Tan
                <ChevronsUpDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <FolderOpen className="mr-2 size-4" />
                File Management
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 size-4" />
                Terms & Policies
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 size-4" />
                Helpdesk
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
                <span>Dark mode</span>
                <Switch />
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Chat kebab */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Chat Item Kebab</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="mr-2 size-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 size-4 text-destructive" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Terms kebab */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Terms Card Action</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="size-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="size-4 mr-2 text-destructive" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CodeBlock
        label="Tailwind classes"
        code={`{/* ── DropdownMenu (Radix Portal — auto-positioned) ── */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="gap-2">
      Charlie Tan
      <ChevronsUpDown className="size-4" />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="w-56">
    {/* Standard item with icon */}
    <DropdownMenuItem>
      <FolderOpen className="mr-2 size-4" />
      File Management
    </DropdownMenuItem>

    {/* Destructive item */}
    <DropdownMenuItem className="text-destructive
                                 focus:text-destructive
                                 focus:bg-destructive/10">
      <LogOut className="mr-2 size-4" />
      Sign out
    </DropdownMenuItem>

    {/* Dark mode toggle (prevents close on click) */}
    <DropdownMenuItem
      className="flex items-center justify-between"
      onSelect={(e) => e.preventDefault()}>
      <span>Dark mode</span>
      <Switch />
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

{/* ── Chat kebab (hover-reveal pattern) ── */}
<div className="group relative">
  <button className="absolute right-2 top-1/2 -translate-y-1/2
                     opacity-0 group-hover:opacity-100 transition-opacity
                     p-1 rounded hover:bg-accent">
    <MoreHorizontal className="size-4 text-muted-foreground" />
  </button>
</div>

{/* ── Kebab trigger (icon-only ghost button) ── */}
<Button variant="ghost" size="icon" className="size-8">
  <MoreHorizontal className="size-4 text-muted-foreground" />
</Button>

{/* ── Terms card kebab (opacity on group hover) ── */}
<Button variant="ghost" size="sm"
        className="h-8 w-8 p-0
                   opacity-0 group-hover:opacity-100
                   transition-opacity">
  <MoreHorizontal className="size-4" />
</Button>`}
      />
    </StorySection>
  );
}