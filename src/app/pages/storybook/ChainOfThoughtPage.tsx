import { ChainOfThought } from "../../components/ChainOfThought";
import { StorySection, CodeBlock } from "./shared";

export function ChainOfThoughtPage() {
  return (
    <StorySection
      title="Chain of Thought"
      description="Animated step-by-step AI reasoning indicator. Shows shimmer text as steps progress, then collapses to 'Worked with N files' with expandable detail."
    >
      <div className="border rounded-xl p-6">
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
          Live Component (auto-animates on mount)
        </p>
        <div className="max-w-[80%]">
          <ChainOfThought
            steps={[
              "Read Schedule_of_Rates2026.xlsx",
              "Read Schedule_of_Rates2025.xlsx",
              "Read Schedule_of_Rates2024.xlsx",
            ]}
          />
        </div>
      </div>

      <CodeBlock
        label="Usage"
        code={`import { ChainOfThought } from './components/ChainOfThought';

<ChainOfThought steps={[
  'Read Schedule_of_Rates2026.xlsx',
  'Read Schedule_of_Rates2025.xlsx',
  'Read Schedule_of_Rates2024.xlsx',
]} />`}
      />

      <CodeBlock
        label="Tailwind classes + inline style for shimmer"
        code={`import { ChainOfThought } from './components/ChainOfThought';

{/* Usage */}
<ChainOfThought steps={[
  'Read Schedule_of_Rates2026.xlsx',
  'Read Schedule_of_Rates2025.xlsx',
  'Read Schedule_of_Rates2024.xlsx',
]} />

{/* ── Internal structure (for replication) ── */}

{/* Outer wrapper — clickable to expand/collapse */}
<button className="w-full flex items-center justify-between p-4 text-left transition-colors">

  {/* Step label while animating */}
  <div className="flex items-center gap-2 min-w-0 flex-1">
    <div className="size-4 shrink-0">
      <ExcelIcon />   {/* 16×16 custom SVG */}
    </div>
    {/* Shimmer text — uses inline <style> tag */}
    <span className="text-sm shimmer-text truncate">
      Read Schedule_of_Rates2026.xlsx
    </span>
  </div>

  {/* Completed summary */}
  <span className="text-sm font-medium text-gray-700">
    Worked with 3 files
  </span>

  {/* Expand chevron (only shown when completed) */}
  <ChevronRight className="size-4 text-gray-500 shrink-0 ml-2" />
</button>

{/* Expanded file list */}
<div className="pl-4 pb-4 space-y-2">
  <div className="flex items-center gap-2 text-sm">
    <div className="size-4 shrink-0"><ExcelIcon /></div>
    <span className="text-gray-700">Read Schedule_of_Rates2026.xlsx</span>
  </div>
</div>

{/* ── Shimmer animation (inline <style>) ── */}
{/* Tailwind doesn't have a built-in shimmer, so this uses a <style> tag */}
<style>{\`
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .shimmer-text {
    background: linear-gradient(90deg, #9ca3af 0%, #d1d5db 50%, #9ca3af 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 1.5s infinite;
  }
\`}</style>

{/* Timing: each step renders for 1500ms, shimmer plays for 1000ms */}`}
      />
    </StorySection>
  );
}