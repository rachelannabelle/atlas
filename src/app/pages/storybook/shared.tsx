import { useState } from "react";

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mt-3">
      {label && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="bg-[#1e1e2e] text-[#cdd6f4] rounded-lg p-4 overflow-x-auto text-[12px] leading-[18px] font-mono">
          <code>{code}</code>
        </pre>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="absolute top-2 right-2 px-2 py-1 rounded text-[10px] bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export function CSSToken({
  property,
  value,
  description,
}: {
  property: string;
  value: string;
  description?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1.5 text-[12px] font-mono">
      <span className="text-[#3C3DEC] min-w-[200px]">{property}</span>
      <span className="text-muted-foreground min-w-[160px]">{value}</span>
      {description && (
        <span className="text-muted-foreground/60 text-[11px] font-sans">
          {description}
        </span>
      )}
    </div>
  );
}

export function StorySection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl mb-1">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  );
}

export function StoryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function ColorSwatch({
  name,
  cssVar,
  hex,
}: {
  name: string;
  cssVar: string;
  hex?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-20 h-20 rounded-xl border shadow-sm"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="text-center">
        <p className="text-xs">{name}</p>
        <p className="text-[10px] text-muted-foreground font-mono">{cssVar}</p>
        {hex && (
          <p className="text-[10px] text-muted-foreground/60 font-mono">
            {hex}
          </p>
        )}
      </div>
    </div>
  );
}
