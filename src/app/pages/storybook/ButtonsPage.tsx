import { Plus, ArrowRight, Paperclip, Copy, Search, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { StorySection, StoryRow, CodeBlock } from "./shared";

export function ButtonsPage() {
  return (
    <StorySection
      title="Buttons"
      description="shadcn Button component with CVA variants. Base classes include rounded-md, transition-all, and gap-2 for icon+text."
    >
      <StoryRow label="Variants">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </StoryRow>

      <StoryRow label="Sizes">
        <Button size="sm">Small (h-8)</Button>
        <Button size="default">Default (h-9)</Button>
        <Button size="lg">Large (h-10)</Button>
        <Button size="icon"><Plus /></Button>
      </StoryRow>

      <StoryRow label="With Icons">
        <Button><Plus className="size-4" />Add Item</Button>
        <Button variant="outline"><Search className="size-4" />Search</Button>
        <Button variant="destructive"><Trash2 className="size-4" />Delete</Button>
      </StoryRow>

      <StoryRow label="App-specific button patterns">
        <Button className="bg-[#3C3DEC] hover:bg-[#2d2eb8] text-white">Brand Primary</Button>
        <button className="bg-[#3C3DEC] flex items-center justify-center size-[36px] rounded-full shrink-0 hover:bg-[#2d2eb8] transition-colors">
          <ArrowRight className="size-4 text-white" />
        </button>
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent">
          <Copy className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-9 text-[#a6a6a6] hover:text-black">
          <Paperclip className="size-4" />
        </Button>
      </StoryRow>

      <StoryRow label="States">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
      </StoryRow>

      <CodeBlock
        label="Tailwind classes (CVA variants)"
        code={`{/* ── shadcn Button base classes ── */}
<Button>
  {/* Always applied: */}
  className="inline-flex items-center justify-center gap-2
             whitespace-nowrap rounded-md text-sm font-medium
             transition-all
             disabled:pointer-events-none disabled:opacity-50"
</Button>

{/* ── variant="default" (primary) ── */}
<Button variant="default">
  className="bg-primary text-primary-foreground hover:bg-primary/90"
</Button>

{/* ── variant="destructive" ── */}
<Button variant="destructive">
  className="bg-destructive text-white hover:bg-destructive/90"
</Button>

{/* ── variant="outline" ── */}
<Button variant="outline">
  className="border bg-background text-foreground hover:bg-accent"
</Button>

{/* ── variant="ghost" ── */}
<Button variant="ghost">
  className="hover:bg-accent hover:text-accent-foreground"
</Button>

{/* ── variant="link" ── */}
<Button variant="link">
  className="text-primary underline-offset-4 hover:underline"
</Button>

{/* ── Sizes ── */}
<Button size="default"> {/* h-9 px-4 py-2 */}
<Button size="sm">      {/* h-8 rounded-md gap-1.5 px-3 */}
<Button size="lg">      {/* h-10 rounded-md px-6 */}
<Button size="icon">    {/* size-9 rounded-md */}

{/* ── App-specific: Brand CTA (overrides default variant) ── */}
<Button className="bg-[#3C3DEC] hover:bg-[#2d2eb8] text-white">
  Generate Quotation
</Button>

{/* ── App-specific: Circular send button (custom, not shadcn) ── */}
<button className="bg-[#3C3DEC] flex items-center justify-center
                   size-[36px] rounded-full shrink-0
                   hover:bg-[#2d2eb8] transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed">
  <ArrowRight className="size-4 text-white" />
</button>

{/* ── App-specific: Icon action buttons (ghost, smaller) ── */}
<Button variant="ghost" size="icon"
        className="size-8 text-muted-foreground
                   hover:text-foreground hover:bg-sidebar-accent">
  <Copy className="size-4" />
</Button>

{/* ── App-specific: Paperclip (muted ghost) ── */}
<Button variant="ghost" size="icon"
        className="size-9 text-[#a6a6a6] hover:text-black">
  <Paperclip className="size-4" />
</Button>

{/* ── With icon + text ── */}
<Button>
  <Plus className="size-4" />
  Add Item
</Button>`}
      />
    </StorySection>
  );
}