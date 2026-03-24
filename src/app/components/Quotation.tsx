import { QuotationForm } from "./QuotationForm";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export function Quotation() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">New Quotation</h1>
          <p className="text-sm text-muted-foreground">
            Create and send professional quotations to clients
          </p>
        </div>
        <Button
          variant="outline"
          className="shrink-0 gap-1.5 border-[#3C3DEC] text-[#3C3DEC] hover:bg-[#EBEBFC] hover:text-[#3C3DEC]"
        >
          <Plus className="size-4" />
          Add SoR Items
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <QuotationForm />
      </div>
    </div>
  );
}