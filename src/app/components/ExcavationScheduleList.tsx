import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { QuotationForm } from "./QuotationForm";
import { useAppContext } from "../context";

interface ScheduleItem {
  id: string;
  title: string;
  rate: string;
  unitPrice: number;
}

const scheduleItems: ScheduleItem[] = [
  {
    id: "1",
    title: "Excavate to form trenches, drains, manholes, etc. in ordinary ground (depth not exceeding 2.0m)",
    rate: "25.90 SGD per m³",
    unitPrice: 25.90,
  },
  {
    id: "2",
    title: "Excavate to form trenches, drains, manholes, etc. in ordinary ground (depth exceeding 2.0m but not exceeding 4.0m)",
    rate: "30.80 SGD per m³",
    unitPrice: 30.80,
  },
  {
    id: "3",
    title: "Breaking up reinforced concrete including cutting reinforcement and carting away debris",
    rate: "128.20 per m³",
    unitPrice: 128.20,
  },
];

export function ExcavationScheduleList() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { setHasQuotationDraft, setQuotationDraftTimestamp } = useAppContext();

  const handleToggle = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleCreateQuotation = () => {
    setIsSheetOpen(true);
    setHasQuotationDraft(true);
    setQuotationDraftTimestamp(new Date());
  };

  const selectedCount = selectedItems.size;
  const isDisabled = selectedCount === 0;

  // Get selected items data
  const selectedItemsData = scheduleItems.filter((item) =>
    selectedItems.has(item.id)
  );

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-base text-gray-900">
            Excavation Schedule Items
          </h3>
          <Button
            disabled={isDisabled}
            onClick={handleCreateQuotation}
            className="bg-[#3C3DEC] hover:bg-[#2d2eb8] text-white disabled:opacity-50"
            size="sm"
          >
            Saved Items{selectedCount > 0 && ` (${selectedCount})`}
          </Button>
        </div>

        {/* List Items */}
        <div className="divide-y divide-gray-200">
          {scheduleItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleToggle(item.id)}
            >
              <Checkbox
                checked={selectedItems.has(item.id)}
                onCheckedChange={() => handleToggle(item.id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {index + 1}.
                  </span>
                  <p className="text-sm text-gray-900 leading-relaxed">
                    {item.title}
                  </p>
                </div>
                <p className="text-sm font-medium text-[#3C3DEC] mt-1 ml-5">
                  {item.rate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[700px] overflow-y-auto p-0">
          <SheetHeader className="px-6 py-4 border-b border-[#e4e7eb]">
            <SheetTitle className="text-xl font-bold">Create Quotation</SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
              Select the items you want to include in your quotation.
            </SheetDescription>
          </SheetHeader>
          <QuotationForm selectedItems={selectedItemsData} />
        </SheetContent>
      </Sheet>
    </>
  );
}
