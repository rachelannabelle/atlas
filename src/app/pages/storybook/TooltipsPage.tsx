import { Search, Settings, SquarePen } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../components/ui/tooltip";
import { StorySection, StoryRow, CodeBlock } from "./shared";

export function TooltipsPage() {
  return (
    <StorySection
      title="Tooltips"
      description="Custom dark-styled tooltips (bg-[#39395C]) with arrow. Used on sidebar action buttons and icon-only buttons."
    >
      <StoryRow label="Directions">
        <Tooltip>
          <TooltipTrigger asChild><Button variant="outline">Top</Button></TooltipTrigger>
          <TooltipContent side="top"><p>Tooltip on top</p></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="outline">Right</Button></TooltipTrigger>
          <TooltipContent side="right"><p>Tooltip on right</p></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="outline">Bottom</Button></TooltipTrigger>
          <TooltipContent side="bottom"><p>Tooltip on bottom</p></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="outline">Left</Button></TooltipTrigger>
          <TooltipContent side="left"><p>Tooltip on left</p></TooltipContent>
        </Tooltip>
      </StoryRow>

      <StoryRow label="Icon button tooltips (as used in sidebar)">
        <Tooltip>
          <TooltipTrigger asChild><Button variant="ghost" size="icon"><SquarePen className="size-4" /></Button></TooltipTrigger>
          <TooltipContent><p>New Chat</p></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="ghost" size="icon"><Search className="size-4" /></Button></TooltipTrigger>
          <TooltipContent><p>Search chats</p></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="ghost" size="icon"><Settings className="size-4" /></Button></TooltipTrigger>
          <TooltipContent><p>Settings</p></TooltipContent>
        </Tooltip>
      </StoryRow>

      <CodeBlock
        label="Tailwind classes"
        code={`{/* ── Tooltip usage ── */}
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon">
      <Search className="size-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>Search chats</p>
  </TooltipContent>
</Tooltip>

{/* ── TooltipContent applied classes ── */}
className="bg-[#39395C] text-white
           rounded-md px-3 py-1.5 text-xs
           animate-in fade-in-0 zoom-in-95
           data-[side=bottom]:slide-in-from-top-2
           data-[side=top]:slide-in-from-bottom-2
           data-[side=left]:slide-in-from-right-2
           data-[side=right]:slide-in-from-left-2"

{/* ── Tooltip arrow ── */}
className="fill-[#39395C] size-2.5"

{/* ── Side options ── */}
<TooltipContent side="top">     {/* Default */}
<TooltipContent side="right">
<TooltipContent side="bottom">
<TooltipContent side="left">

{/* ── Note: TooltipProvider wraps the app root ── */}
{/* Provides delayDuration and skipDelayDuration */}`}
      />
    </StorySection>
  );
}