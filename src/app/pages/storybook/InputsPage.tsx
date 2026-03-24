import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import { Switch } from "../../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { StorySection, CodeBlock } from "./shared";

export function InputsPage() {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean | "indeterminate">(true);

  return (
    <StorySection
      title="Input Fields"
      description="All form input elements used across the app: text inputs, textareas, checkboxes, switches, selects."
    >
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Default Input</Label>
          <Input placeholder="Enter text..." />
        </div>
        <div className="space-y-2">
          <Label>Search Input (with icon)</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Quotation Input (h-38px)</Label>
          <Input placeholder="e.g. Q-2024-001" className="h-[38px]" />
        </div>
        <div className="space-y-2">
          <Label>Disabled</Label>
          <Input placeholder="Disabled..." disabled />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Textarea (chat-style, no border)</Label>
        <div className="bg-white rounded-[24px] border border-[#d9d9d9] p-[16px]">
          <textarea
            placeholder="Ask me anything..."
            className="w-full resize-none bg-transparent border-0 outline-none text-[14px] leading-[20px] text-black placeholder:text-[#a6a6a6] min-h-[20px] max-h-[200px]"
            rows={1}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Standard Textarea</Label>
        <Textarea placeholder="Write your message here..." />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Checkbox</p>
          <div className="flex items-center gap-2">
            <Checkbox id="sb-check" checked={checkboxChecked} onCheckedChange={setCheckboxChecked} />
            <Label htmlFor="sb-check" className="cursor-pointer">Checked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="sb-check-off" />
            <Label htmlFor="sb-check-off" className="cursor-pointer">Unchecked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="sb-check-dis" disabled checked />
            <Label htmlFor="sb-check-dis" className="text-muted-foreground">Disabled</Label>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Switch</p>
          <div className="flex items-center gap-3">
            <Switch id="sb-switch" checked={switchChecked} onCheckedChange={setSwitchChecked} />
            <Label htmlFor="sb-switch" className="cursor-pointer">{switchChecked ? "On" : "Off"}</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="sb-switch-dis" disabled />
            <Label htmlFor="sb-switch-dis" className="text-muted-foreground">Disabled</Label>
          </div>
        </div>
      </div>

      <div className="max-w-[300px] space-y-2">
        <Label>Select</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a module..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="operations">Operations</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CodeBlock
        label="Tailwind classes"
        code={`{/* ── shadcn <Input /> ── */}
<Input placeholder="Enter text..." />
{/* Applied classes: */}
className="flex h-9 w-full rounded-md border border-input
           bg-input-background px-3 py-1 text-base
           placeholder:text-muted-foreground
           focus-visible:border-ring focus-visible:ring-ring/50
           focus-visible:ring-[3px]
           disabled:pointer-events-none disabled:opacity-50"

{/* Quotation-style input (taller) */}
<Input placeholder="e.g. Q-2024-001" className="h-[38px]" />

{/* Search input with icon */}
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2
                     size-4 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-9" />
</div>

{/* ── Chat textarea (custom, no shadcn) ── */}
<div className="bg-white rounded-[24px] border border-[#d9d9d9] p-[16px]">
  <textarea
    className="w-full resize-none bg-transparent border-0 outline-none
               text-[14px] leading-[20px] text-black
               placeholder:text-[#a6a6a6]
               min-h-[20px] max-h-[200px]"
    rows={1}
  />
</div>

{/* ── shadcn <Textarea /> ── */}
<Textarea placeholder="Write your message here..." />
{/* Applied classes: */}
className="flex min-h-16 w-full rounded-md border border-input
           bg-input-background px-3 py-2 text-base
           placeholder:text-muted-foreground
           focus-visible:border-ring focus-visible:ring-ring/50"

{/* ── Checkbox ── */}
<Checkbox checked={true} />
{/* Applied classes: */}
className="size-4 shrink-0 rounded-[4px] border border-input
           bg-card transition-all
           data-[state=checked]:bg-primary
           data-[state=checked]:text-primary-foreground
           data-[state=checked]:border-primary"

{/* ── Switch ── */}
<Switch checked={true} />
{/* Applied classes: */}
className="inline-flex h-[1.15rem] w-8 shrink-0 items-center
           rounded-full border-2 border-transparent
           transition-all cursor-pointer
           data-[state=checked]:bg-primary
           data-[state=unchecked]:bg-switch-background"
{/* Thumb: */}
className="pointer-events-none block size-4 rounded-full bg-card
           shadow-xs ring-0 transition-transform
           data-[state=checked]:translate-x-3
           data-[state=unchecked]:translate-x-0"

{/* ── Select ── */}
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a module..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="operations">Operations</SelectItem>
  </SelectContent>
</Select>`}
      />
    </StorySection>
  );
}