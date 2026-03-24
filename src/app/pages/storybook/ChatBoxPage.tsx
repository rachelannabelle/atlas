import { ArrowRight, Paperclip, Copy, Pencil, ThumbsUp, ThumbsDown, FileSpreadsheet, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { StorySection, CodeBlock } from "./shared";

export function ChatBoxPage() {
  return (
    <StorySection
      title="Chat Box"
      description="Chat interface with starter view (prompt suggestions), active conversation view (message bubbles + input), file attachment chip, and message actions."
    >
      {/* Starter input */}
      <div className="border rounded-xl p-6">
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
          Starter View — Input Box
        </p>
        <div className="max-w-[549px] mx-auto">
          <div className="bg-white rounded-[24px] border border-[#d9d9d9]">
            <div className="flex flex-col gap-[16px] items-start p-[16px]">
              <textarea
                placeholder="Ask me anything about all scholar files for The Gear"
                className="flex-1 w-full resize-none bg-transparent border-0 outline-none text-[14px] leading-[20px] text-black placeholder:text-[#a6a6a6] min-h-[20px] max-h-[200px]"
                rows={1}
                readOnly
              />
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="size-9 text-[#a6a6a6] hover:text-black">
                    <Paperclip className="size-4" />
                  </Button>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-sidebar-accent rounded-md">
                    <FileSpreadsheet className="size-4 text-green-600" />
                    <span className="text-xs font-medium">CBRE_Inventory_list.xlsx</span>
                    <button className="ml-1 hover:bg-accent rounded-sm p-0.5">
                      <X className="size-3" />
                    </button>
                  </div>
                </div>
                <button disabled className="bg-[#3C3DEC] flex items-center justify-center size-[36px] rounded-full shrink-0 disabled:opacity-50">
                  <ArrowRight className="size-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt suggestion cards */}
      <div className="border rounded-xl p-6">
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Prompt Suggestion Cards</p>
        <div className="grid grid-cols-2 gap-3 max-w-[549px] mx-auto">
          {["Help me find the best rate", "Compare the rates between two companies"].map((prompt) => (
            <Card key={prompt} className="cursor-pointer hover:bg-accent transition-colors border-[#e5e5e5]">
              <CardContent className="p-4">
                <p className="text-sm text-[#525252] leading-[20px]">{prompt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Message bubbles */}
      <div className="border rounded-xl p-6">
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Chat Bubbles — User & Assistant</p>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* User message */}
          <div className="flex justify-end">
            <div className="flex flex-col max-w-[80%]">
              <div className="flex items-center gap-2 group/message">
                <div className="flex items-center gap-1 opacity-0 group-hover/message:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent">
                    <Copy className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent">
                    <Pencil className="size-4" />
                  </Button>
                </div>
                <div className="rounded-2xl px-4 py-3 bg-[#3C3DEC] text-white">
                  <p className="text-sm leading-relaxed">Help me find the best rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assistant message */}
          <div className="flex justify-start">
            <div className="flex flex-col max-w-[80%]">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl px-4 py-3 bg-gray-100 text-black">
                  <p className="text-sm leading-relaxed">
                    What schedule item are you looking to generate a quote for?
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 w-full">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground hover:bg-transparent">
                    <Copy className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-[#3C3DEC] hover:bg-transparent">
                    <ThumbsUp className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground hover:bg-transparent">
                    <ThumbsDown className="size-4" />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">Feb 25, 2:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock
        label="Tailwind classes"
        code={`{/* ── Chat input container ── */}
<div className="bg-white rounded-[24px] border border-[#d9d9d9]">
  <div className="flex flex-col gap-[16px] items-start p-[16px]">

    {/* Textarea — transparent, no border */}
    <textarea
      className="flex-1 w-full resize-none bg-transparent border-0 outline-none
                 text-[14px] leading-[20px] text-black
                 placeholder:text-[#a6a6a6]
                 min-h-[20px] max-h-[200px]"
      rows={1}
    />

    {/* Bottom toolbar row */}
    <div className="flex items-center justify-between w-full">

      {/* Paperclip button */}
      <Button variant="ghost" size="icon"
              className="size-9 text-[#a6a6a6] hover:text-black">
        <Paperclip className="size-4" />
      </Button>

      {/* File attachment chip */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-sidebar-accent rounded-md">
        <FileSpreadsheet className="size-4 text-green-600" />
        <span className="text-xs font-medium">CBRE_Inventory_list.xlsx</span>
        <button className="ml-1 hover:bg-accent rounded-sm p-0.5">
          <X className="size-3" />
        </button>
      </div>

      {/* Send button (custom, not shadcn) */}
      <button className="bg-[#3C3DEC] flex items-center justify-center
                         size-[36px] rounded-full shrink-0
                         hover:bg-[#2d2eb8] transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed">
        <ArrowRight className="size-4 text-white" />
      </button>
    </div>
  </div>
</div>

{/* ── User message bubble ── */}
<div className="flex justify-end">
  <div className="flex flex-col max-w-[80%]">
    <div className="flex items-center gap-2 group/message">
      {/* Hover-reveal actions */}
      <div className="flex items-center gap-1
                      opacity-0 group-hover/message:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon"
                className="size-8 text-muted-foreground hover:text-foreground
                           hover:bg-sidebar-accent">
          <Copy className="size-4" />
        </Button>
      </div>
      <div className="rounded-2xl px-4 py-3 bg-[#3C3DEC] text-white">
        <p className="text-sm leading-relaxed">User message</p>
      </div>
    </div>
  </div>
</div>

{/* ── Assistant message bubble ── */}
<div className="flex justify-start">
  <div className="flex flex-col max-w-[80%]">
    <div className="rounded-2xl px-4 py-3 bg-gray-100 text-black">
      <p className="text-sm leading-relaxed">Assistant message</p>
    </div>
    {/* Feedback row */}
    <div className="flex items-center justify-between mt-2 w-full">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon"
                className="size-8 text-muted-foreground hover:text-foreground
                           hover:bg-transparent">
          <Copy className="size-4" />
        </Button>
        {/* Active feedback: className="text-[#3C3DEC]" */}
        {/* Inactive:        className="text-muted-foreground" */}
        <Button variant="ghost" size="icon"
                className="size-8 text-[#3C3DEC] hover:bg-transparent">
          <ThumbsUp className="size-4" />
        </Button>
      </div>
      <span className="text-xs text-muted-foreground">Feb 25, 2:30 PM</span>
    </div>
  </div>
</div>

{/* ── Prompt suggestion cards ── */}
<Card className="cursor-pointer hover:bg-accent transition-colors border-[#e5e5e5]">
  <CardContent className="p-4">
    <p className="text-sm text-[#525252] leading-[20px]">Suggestion text</p>
  </CardContent>
</Card>`}
      />
    </StorySection>
  );
}