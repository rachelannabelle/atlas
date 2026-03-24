import { StorySection, ColorSwatch, CodeBlock } from "./shared";

export function ColorsPage() {
  return (
    <StorySection
      title="Colors"
      description="All design tokens are defined as CSS custom properties in /src/styles/theme.css. Reference them via var(--token-name) or Tailwind's color utilities (bg-primary, text-muted-foreground, etc.)."
    >
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Core Palette</p>
        <div className="flex flex-wrap gap-4">
          <ColorSwatch name="Primary" cssVar="--primary" hex="#3C3DEC" />
          <ColorSwatch name="Background" cssVar="--background" hex="#ffffff" />
          <ColorSwatch name="Foreground" cssVar="--foreground" />
          <ColorSwatch name="Secondary" cssVar="--secondary" />
          <ColorSwatch name="Muted" cssVar="--muted" hex="#ececf0" />
          <ColorSwatch name="Accent" cssVar="--accent" hex="#e9ebef" />
          <ColorSwatch name="Destructive" cssVar="--destructive" hex="#d4183d" />
          <ColorSwatch name="Border" cssVar="--border" hex="rgba(0,0,0,0.1)" />
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Text / Foreground Colors</p>
        <div className="flex flex-wrap gap-4">
          <ColorSwatch name="Primary FG" cssVar="--primary-foreground" />
          <ColorSwatch name="Secondary FG" cssVar="--secondary-foreground" hex="#030213" />
          <ColorSwatch name="Muted FG" cssVar="--muted-foreground" hex="#717182" />
          <ColorSwatch name="Accent FG" cssVar="--accent-foreground" hex="#030213" />
          <ColorSwatch name="Destructive FG" cssVar="--destructive-foreground" hex="#ffffff" />
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Sidebar Tokens</p>
        <div className="flex flex-wrap gap-4">
          <ColorSwatch name="Sidebar" cssVar="--sidebar" />
          <ColorSwatch name="Sidebar FG" cssVar="--sidebar-foreground" />
          <ColorSwatch name="Sidebar Primary" cssVar="--sidebar-primary" hex="#030213" />
          <ColorSwatch name="Sidebar Accent" cssVar="--sidebar-accent" />
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Interactive / Input</p>
        <div className="flex flex-wrap gap-4">
          <ColorSwatch name="Input BG" cssVar="--input-background" hex="#f3f3f5" />
          <ColorSwatch name="Switch BG" cssVar="--switch-background" hex="#cbced4" />
          <ColorSwatch name="Ring" cssVar="--ring" />
        </div>
      </div>

      <div className="bg-muted/30 rounded-xl p-6 border">
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Brand Specification</p>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-xl bg-[#3C3DEC] flex items-center justify-center">
            <span className="text-white text-xs font-mono">#3C3DEC</span>
          </div>
          <div className="w-24 h-24 rounded-xl bg-[#EBEBFC] flex items-center justify-center">
            <span className="text-[#3C3DEC] text-xs font-mono">#EBEBFC</span>
          </div>
          <div className="w-24 h-24 rounded-xl bg-[#2d2eb8] flex items-center justify-center">
            <span className="text-white text-xs font-mono">#2d2eb8</span>
          </div>
          <div className="flex-1">
            <p className="text-sm mb-1">Primary Brand Scale</p>
            <p className="text-xs text-muted-foreground">
              #3C3DEC — Primary (buttons, links, active states)<br />
              #EBEBFC — Light tint (avatar backgrounds, highlights)<br />
              #2d2eb8 — Hover state (button hover)
            </p>
          </div>
        </div>
      </div>

      <CodeBlock
        label="CSS Custom Properties (theme.css) → Tailwind mappings"
        code={`/* theme.css defines tokens, Tailwind maps them automatically */

/* Token                    Tailwind Class                  Hex Value */
--primary               →  bg-primary / text-primary        #3C3DEC
--primary-foreground    →  text-primary-foreground           oklch(1 0 0)
--background            →  bg-background                    #ffffff
--foreground            →  text-foreground                  oklch(0.145 0 0)
--muted                 →  bg-muted                         #ececf0
--muted-foreground      →  text-muted-foreground            #717182
--accent                →  bg-accent                        #e9ebef
--accent-foreground     →  text-accent-foreground           #030213
--destructive           →  bg-destructive                   #d4183d
--destructive-foreground→  text-destructive-foreground      #ffffff
--border                →  border-border                    rgba(0,0,0,0.1)
--input-background      →  bg-input-background              #f3f3f5
--switch-background     →  bg-switch-background             #cbced4
--ring                  →  ring-ring                        (inherits primary)
--radius                →  rounded-sm/md/lg/xl              0.625rem base

/* Sidebar-specific tokens */
--sidebar               →  bg-sidebar
--sidebar-foreground    →  text-sidebar-foreground
--sidebar-primary       →  text-sidebar-primary             #030213
--sidebar-accent        →  bg-sidebar-accent
--sidebar-accent-fg     →  text-sidebar-accent-foreground`}
      />

      <CodeBlock
        label="Tailwind usage examples"
        code={`{/* Background + text color */}
<div className="bg-primary text-primary-foreground">Primary button</div>

{/* Muted text */}
<p className="text-muted-foreground">Helper text</p>

{/* Borders */}
<div className="border border-border rounded-lg">Card</div>

{/* Accent background */}
<div className="bg-accent text-accent-foreground">Hover state</div>

{/* Destructive */}
<button className="bg-destructive text-destructive-foreground">Delete</button>

{/* Sidebar tokens */}
<div className="bg-sidebar-accent text-sidebar-accent-foreground">Active nav item</div>

{/* Brand-specific overrides (when you need exact hex) */}
<div className="bg-[#3C3DEC] hover:bg-[#2d2eb8] text-white">Brand CTA</div>
<div className="bg-[#EBEBFC] text-[#3C3DEC]">Brand tint</div>`}
      />
    </StorySection>
  );
}