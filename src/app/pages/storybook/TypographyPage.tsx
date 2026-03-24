import { Separator } from "../../components/ui/separator";
import { StorySection, CSSToken, CodeBlock } from "./shared";

export function TypographyPage() {
  return (
    <StorySection
      title="Typography"
      description="Base typography is set in theme.css @layer base. Root font-size: 16px. Weight tokens: --font-weight-normal: 400, --font-weight-medium: 500."
    >
      <div className="border rounded-xl p-6 space-y-5">
        <div className="flex items-baseline gap-6">
          <span className="text-xs text-muted-foreground w-24 shrink-0 font-mono">{"<h1>"}</span>
          <h1>Heading Level 1</h1>
          <span className="text-xs text-muted-foreground ml-auto shrink-0">text-2xl / 500 / 1.5</span>
        </div>
        <Separator />
        <div className="flex items-baseline gap-6">
          <span className="text-xs text-muted-foreground w-24 shrink-0 font-mono">{"<h2>"}</span>
          <h2>Heading Level 2</h2>
          <span className="text-xs text-muted-foreground ml-auto shrink-0">text-xl / 500 / 1.5</span>
        </div>
        <Separator />
        <div className="flex items-baseline gap-6">
          <span className="text-xs text-muted-foreground w-24 shrink-0 font-mono">{"<h3>"}</span>
          <h3>Heading Level 3</h3>
          <span className="text-xs text-muted-foreground ml-auto shrink-0">text-lg / 500 / 1.5</span>
        </div>
        <Separator />
        <div className="flex items-baseline gap-6">
          <span className="text-xs text-muted-foreground w-24 shrink-0 font-mono">{"<h4>"}</span>
          <h4>Heading Level 4</h4>
          <span className="text-xs text-muted-foreground ml-auto shrink-0">text-base / 500 / 1.5</span>
        </div>
        <Separator />
        <div className="flex items-baseline gap-6">
          <span className="text-xs text-muted-foreground w-24 shrink-0 font-mono">{"<p>"}</span>
          <p>Body text — The quick brown fox jumps over the lazy dog.</p>
        </div>
        <Separator />
        <div className="flex items-baseline gap-6">
          <span className="text-xs text-muted-foreground w-24 shrink-0 font-mono">{"<label>"}</span>
          <label>Form Label Text</label>
          <span className="text-xs text-muted-foreground ml-auto shrink-0">text-base / 500 / 1.5</span>
        </div>
        <Separator />
        <div className="flex items-baseline gap-6">
          <span className="text-xs text-muted-foreground w-24 shrink-0 font-mono">muted</span>
          <p className="text-sm text-muted-foreground">Muted helper text for descriptions and captions.</p>
        </div>
      </div>

      <div className="border rounded-xl p-6">
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">App-Specific Text Classes</p>
        <div className="space-y-1">
          <CSSToken property="Chat message text" value="text-[14px] leading-[20px]" description="Used in chat bubbles and textarea" />
          <CSSToken property="Chat timestamp" value="text-xs text-muted-foreground" description="Format: Mon D, H:MMam" />
          <CSSToken property="Chat placeholder" value="text-[14px] text-[#a6a6a6]" description="placeholder:text-[#a6a6a6]" />
          <CSSToken property="Starter heading" value="font-bold text-[28px] leading-[32px] tracking-[-0.5px]" />
          <CSSToken property="Suggestion card" value="text-sm text-[#525252] leading-[20px]" />
          <CSSToken property="Quotation section header" value="text-[13.1px] font-semibold tracking-[0.65px] uppercase" />
          <CSSToken property="Quotation label" value="text-[12.9px] text-[#57606a]" />
          <CSSToken property="NavChip tab" value="px-4 py-1.5 rounded-full text-sm font-medium" />
        </div>
      </div>

      <CodeBlock
        label="Tailwind typography classes (from theme.css @layer base)"
        code={`{/* Heading elements get styles from theme.css base layer */}
<h1 className="text-2xl font-medium leading-normal">Heading 1</h1>
<h2 className="text-xl font-medium leading-normal">Heading 2</h2>
<h3 className="text-lg font-medium leading-normal">Heading 3</h3>
<h4 className="text-base font-medium leading-normal">Heading 4</h4>

{/* Labels and buttons inherit font-medium from base */}
<label className="text-base font-medium leading-normal">Form Label</label>
<button className="text-base font-medium leading-normal">Button</button>

{/* Inputs use font-normal */}
<input className="text-base font-normal leading-normal" />

{/* Muted helper text */}
<p className="text-sm text-muted-foreground">Description text</p>

{/* App-specific text patterns */}

{/* Chat bubble text */}
<p className="text-[14px] leading-[20px] text-black">Message content</p>

{/* Chat placeholder */}
<textarea className="text-[14px] leading-[20px] placeholder:text-[#a6a6a6]" />

{/* Starter page heading */}
<h1 className="font-bold text-[28px] leading-[32px] tracking-[-0.5px] text-black">
  How can I help you today?
</h1>

{/* Suggestion card text */}
<p className="text-sm text-[#525252] leading-[20px]">Prompt text</p>

{/* Quotation section header */}
<h3 className="text-[13.1px] font-semibold text-[#0d1117] tracking-[0.65px] uppercase">
  Section Title
</h3>

{/* Quotation form label */}
<Label className="text-[12.9px] text-[#57606a]">Field Label *</Label>

{/* Chat timestamp */}
<span className="text-xs text-muted-foreground">Feb 25, 2:30 PM</span>

{/* Filter chip */}
<button className="px-4 py-1.5 rounded-full text-sm font-medium">Questions</button>`}
      />
    </StorySection>
  );
}