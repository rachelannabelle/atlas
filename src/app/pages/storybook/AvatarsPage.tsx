import { StorySection, StoryRow, CodeBlock } from "./shared";

export function AvatarsPage() {
  return (
    <StorySection
      title="Avatars"
      description="Custom SVG-based circle avatars used for user profiles. Not using shadcn Avatar — these are inline SVG circles with text initials."
    >
      <StoryRow label="Sizes used in app">
        <div className="flex flex-col items-center gap-2">
          <div className="relative size-8">
            <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" fill="#EBEBFC" r="20" /></svg>
            <div className="absolute inset-0 flex items-center justify-center text-[#3C3DEC] text-xs font-medium">CT</div>
          </div>
          <span className="text-[10px] text-muted-foreground">size-8 (32px)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="relative size-10">
            <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" fill="#EBEBFC" r="20" /></svg>
            <div className="absolute inset-0 flex items-center justify-center text-[#3C3DEC] text-xs font-medium">CT</div>
          </div>
          <span className="text-[10px] text-muted-foreground">size-10 (40px)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="relative size-14">
            <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" fill="#EBEBFC" r="20" /></svg>
            <div className="absolute inset-0 flex items-center justify-center text-[#3C3DEC] text-sm font-medium">CT</div>
          </div>
          <span className="text-[10px] text-muted-foreground">size-14 (56px)</span>
        </div>
      </StoryRow>

      <StoryRow label="Different initials">
        {["CT", "AB", "JD", "SK", "MW"].map((initials) => (
          <div key={initials} className="relative size-10">
            <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" fill="#EBEBFC" r="20" /></svg>
            <div className="absolute inset-0 flex items-center justify-center text-[#3C3DEC] text-xs font-medium">{initials}</div>
          </div>
        ))}
      </StoryRow>

      <CodeBlock
        label="Tailwind classes"
        code={`{/* ── SVG circle avatar with initials ── */}
<div className="relative size-8 shrink-0">
  <svg className="absolute block size-full" fill="none"
       preserveAspectRatio="none" viewBox="0 0 40 40">
    <circle cx="20" cy="20" fill="#EBEBFC" r="20" />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center
                  text-[#3C3DEC] text-xs font-medium">
    CT
  </div>
</div>

{/* ── Sizes used in the app ── */}
{/* Sidebar footer: */}
className="relative size-8 shrink-0"   {/* 32px */}

{/* Dropdown trigger: */}
className="relative size-10"           {/* 40px */}

{/* Display / larger: */}
className="relative size-14"           {/* 56px */}
{/* Bump text to text-sm for larger sizes */}

{/* ── Key tokens ── */}
{/* Circle fill:  #EBEBFC  (bg-[#EBEBFC]) — light purple tint */}
{/* Text color:   #3C3DEC  (text-[#3C3DEC]) — primary brand */}
{/* Text style:   text-xs font-medium */}
{/* Position:     absolute inset-0 flex items-center justify-center */}`}
      />
    </StorySection>
  );
}