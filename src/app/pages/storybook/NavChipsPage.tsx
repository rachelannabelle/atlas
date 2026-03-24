import { BookOpen, ChevronDown, MapPin } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { StorySection, CodeBlock } from "./shared";

export function NavChipsPage() {
  return (
    <StorySection
      title="Nav Chips (Top Bar)"
      description="Ghost button chips in the top navigation bar for Building and Scholar selection. Uses Popover for dropdown menus with sub-level nesting."
    >
      <div className="border rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Live Preview</p>
        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="gap-2 px-4 h-9">
                <MapPin className="size-4" />
                <span className="text-sm whitespace-nowrap">The Gear</span>
                <ChevronDown className="size-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-1">
              <div className="flex flex-col">
                {["The Gear", "Raffles City Tower", "Marina Bay Sands Tower 1"].map((b) => (
                  <button
                    key={b}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent outline-none text-left whitespace-nowrap"
                  >
                    <MapPin className="size-4" />
                    <span>{b}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="gap-2 px-4 h-9">
                <BookOpen className="size-4" />
                <span className="text-sm">All scholar files</span>
                <ChevronDown className="size-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[180px] p-1">
              <div className="flex flex-col">
                <button className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent outline-none text-left">
                  <BookOpen className="size-4" />
                  <span>Scholar</span>
                  <ChevronDown className="size-4 -rotate-90 ml-auto" />
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="border rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
          Below-Chatbox Filter Chips (Questions / Chats / Sources)
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-sidebar-accent text-sidebar-accent-foreground">
            Questions
          </button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors">
            Chats
          </button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors">
            Sources
          </button>
        </div>
      </div>

      <CodeBlock
        label="Tailwind classes"
        code={`{/* Top nav chip — ghost button with icon + chevron */}
<Button variant="ghost" className="gap-2 px-4 h-9">
  <MapPin className="size-4" />
  <span className="text-sm whitespace-nowrap">{selectedBuilding}</span>
  <ChevronDown className="size-4 opacity-50" />
</Button>

{/* Popover dropdown list item */}
<button className="flex items-center gap-2 w-full px-2 py-1.5
                   text-sm rounded-sm hover:bg-accent outline-none
                   text-left whitespace-nowrap">
  <MapPin className="size-4" />
  <span>{buildingName}</span>
</button>

{/* Below-chat filter chips — active */}
<button className="px-4 py-1.5 rounded-full text-sm font-medium
                   bg-sidebar-accent text-sidebar-accent-foreground">
  Questions
</button>

{/* Below-chat filter chips — inactive */}
<button className="px-4 py-1.5 rounded-full text-sm font-medium
                   text-muted-foreground
                   hover:bg-sidebar-accent/50
                   hover:text-sidebar-accent-foreground
                   transition-colors">
  Chats
</button>`}
      />
    </StorySection>
  );
}