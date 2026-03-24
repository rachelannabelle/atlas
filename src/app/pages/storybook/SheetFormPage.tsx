import { ChevronDown, MoreHorizontal, ChevronUp, Minus, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "../../components/ui/sheet";
import { StorySection, CodeBlock } from "./shared";

export function SheetFormPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <StorySection
      title="Right-Hand Sheet Form (Quotation)"
      description="A Sheet (slide-over panel) from the right containing the QuotationForm with collapsible sections: Quotation Details, Terms & Conditions, Client Details, Items with qty/markup controls, and a summary with GST calculation."
    >
      <div className="border rounded-xl p-6">
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
          Open the sheet to see the full form
        </p>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button className="bg-[#3C3DEC] hover:bg-[#2d2eb8] text-white">
              Open Quotation Sheet
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-[700px] overflow-y-auto p-0">
            <SheetHeader className="px-6 py-4 border-b border-[#e4e7eb]">
              <SheetTitle className="text-xl font-bold">Create Quotation</SheetTitle>
              <SheetDescription className="text-sm text-gray-500">
                Select the items you want to include in your quotation.
              </SheetDescription>
            </SheetHeader>
            <div className="max-w-[620px] mx-auto">
              <div className="border-b border-[#e4e7eb] py-6 px-6">
                <button className="flex items-center justify-between w-full mb-4">
                  <h3 className="text-[13.1px] font-semibold text-[#0d1117] tracking-[0.65px] uppercase">
                    Quotation Details
                  </h3>
                  <ChevronUp className="size-4" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[12.9px] text-[#57606a]">Quotation Number *</Label>
                    <Input placeholder="e.g. Q-2024-001" className="h-[38px]" />
                  </div>
                </div>
              </div>

              <div className="group flex items-start justify-between gap-3 p-3 bg-white border border-[#e4e7eb] rounded-lg hover:border-[#d1d9e0] transition-colors">
                <p className="text-[13px] text-[#0d1117] leading-[1.5] flex-1">
                  Payment terms: Net 30 days from invoice date
                </p>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="size-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 bg-[#f7f7f7] rounded-md border border-[#e8e8e8] px-2 h-[33px]">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-transparent">
                  <Minus className="size-3" />
                </Button>
                <span className="text-[13.7px] font-medium text-[#0d0d0d] w-8 text-center">
                  1
                </span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-transparent">
                  <Plus className="size-3" />
                </Button>
              </div>

              <div className="relative w-[80px]">
                <Input type="number" className="h-[32px] pr-6" min="0" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[15.8px] text-[#0d0d0d]">%</span>
              </div>

              <div className="text-[19.2px] font-semibold text-[#0d0d0d] leading-[20px]">
                $25.90
              </div>
              <div className="text-[11.8px] text-[#666] leading-[14.4px]">
                $25.90/m3
              </div>

              <div className="bg-[#f6f8fa] rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between py-2 px-3">
                  <span className="text-[14.6px] font-semibold text-[#57606a]">Subtotal</span>
                  <span className="text-[15.1px] font-bold text-[#0d1117]">$25.90</span>
                </div>
                <div className="bg-gradient-to-r from-[rgba(26,127,55,0.02)] to-transparent rounded-lg border-t-2 border-[#e4e7eb] py-6 px-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[15.5px] font-bold text-[#0d1117] tracking-[0.8px] uppercase">Total</span>
                    <span className="text-[15.1px] font-bold text-[#0d1117]">$28.23</span>
                  </div>
                </div>
              </div>

              <div className="py-6 px-6 flex gap-3 justify-end border-t border-[#e4e7eb]">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-[#3C3DEC] hover:bg-[#2d2eb8] text-white">Generate Quotation</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <CodeBlock
        label="Tailwind classes"
        code={`{/* ── Sheet container ── */}
<SheetContent side="right"
              className="w-full sm:max-w-[700px] overflow-y-auto p-0">

  {/* Sheet header */}
  <SheetHeader className="px-6 py-4 border-b border-[#e4e7eb]">
    <SheetTitle className="text-xl font-bold">Create Quotation</SheetTitle>
    <SheetDescription className="text-sm text-gray-500">
      Select the items you want to include in your quotation.
    </SheetDescription>
  </SheetHeader>

  {/* ── Collapsible section ── */}
  <div className="border-b border-[#e4e7eb] py-6 px-6">
    <button className="flex items-center justify-between w-full mb-4">
      <h3 className="text-[13.1px] font-semibold text-[#0d1117]
                     tracking-[0.65px] uppercase">
        Quotation Details
      </h3>
      <ChevronUp className="size-4" />
    </button>

    {/* Form grid */}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-[12.9px] text-[#57606a]">Quotation Number *</Label>
        <Input placeholder="e.g. Q-2024-001" className="h-[38px]" />
      </div>
    </div>
  </div>

  {/* ── Terms card with hover kebab ── */}
  <div className="group flex items-start justify-between gap-3
                  p-3 bg-white border border-[#e4e7eb] rounded-lg
                  hover:border-[#d1d9e0] transition-colors">
    <p className="text-[13px] text-[#0d1117] leading-[1.5] flex-1">
      Payment terms: Net 30 days from invoice date
    </p>
    <Button variant="ghost" size="sm"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100
                       transition-opacity">
      <MoreHorizontal className="size-4" />
    </Button>
  </div>

  {/* ── Quantity stepper ── */}
  <div className="flex items-center gap-2 bg-[#f7f7f7]
                  rounded-md border border-[#e8e8e8] px-2 h-[33px]">
    <Button variant="ghost" size="sm"
            className="h-6 w-6 p-0 hover:bg-transparent">
      <Minus className="size-3" />
    </Button>
    <span className="text-[13.7px] font-medium text-[#0d0d0d] w-8 text-center">
      1
    </span>
    <Button variant="ghost" size="sm"
            className="h-6 w-6 p-0 hover:bg-transparent">
      <Plus className="size-3" />
    </Button>
  </div>

  {/* ── Markup input with % suffix ── */}
  <div className="relative w-[80px]">
    <Input type="number" className="h-[32px] pr-6" min="0" />
    <span className="absolute right-3 top-1/2 -translate-y-1/2
                     text-[15.8px] text-[#0d0d0d]">%</span>
  </div>

  {/* ── Item total price ── */}
  <div className="text-[19.2px] font-semibold text-[#0d0d0d] leading-[20px]">
    $25.90
  </div>
  <div className="text-[11.8px] text-[#666] leading-[14.4px]">
    $25.90/m3
  </div>

  {/* ── Summary section ── */}
  <div className="bg-[#f6f8fa] rounded-lg p-4 space-y-2">
    <div className="flex items-center justify-between py-2 px-3">
      <span className="text-[14.6px] font-semibold text-[#57606a]">Subtotal</span>
      <span className="text-[15.1px] font-bold text-[#0d1117]">$25.90</span>
    </div>

    {/* Total row with subtle gradient */}
    <div className="bg-gradient-to-r from-[rgba(26,127,55,0.02)] to-transparent
                    rounded-lg border-t-2 border-[#e4e7eb] py-6 px-3">
      <div className="flex items-center justify-between">
        <span className="text-[15.5px] font-bold text-[#0d1117]
                         tracking-[0.8px] uppercase">Total</span>
        <span className="text-[15.1px] font-bold text-[#0d1117]">$28.23</span>
      </div>
    </div>
  </div>

  {/* ── Action buttons ── */}
  <div className="py-6 px-6 flex gap-3 justify-end border-t border-[#e4e7eb]">
    <Button variant="outline">Save as Draft</Button>
    <Button className="bg-[#3C3DEC] hover:bg-[#2d2eb8] text-white">
      Generate Quotation
    </Button>
  </div>
</SheetContent>`}
      />
    </StorySection>
  );
}