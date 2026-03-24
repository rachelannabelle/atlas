import { ExcavationScheduleList } from "../../components/ExcavationScheduleList";
import { StorySection, CodeBlock } from "./shared";

export function ExcavationListPage() {
  return (
    <StorySection
      title="Excavation Schedule List"
      description="Selectable list of schedule items with checkboxes. Shows rate in primary color. 'Saved Items' button opens the Sheet form to create a quotation."
    >
      <div className="border rounded-xl p-6">
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
          Live Component
        </p>
        <div className="max-w-[90%]">
          <ExcavationScheduleList />
        </div>
      </div>

      <CodeBlock
        label="Tailwind classes"
        code={`{/* ── Container ── */}
<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">

  {/* Header bar */}
  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
    <h3 className="font-semibold text-base text-gray-900">
      Excavation Schedule Items
    </h3>
    <Button
      size="sm"
      disabled={selectedCount === 0}
      className="bg-[#3C3DEC] hover:bg-[#2d2eb8] text-white disabled:opacity-50">
      Saved Items (2)
    </Button>
  </div>

  {/* List items — clickable rows with checkbox */}
  <div className="divide-y divide-gray-200">
    <div className="flex items-start gap-3 px-4 py-3
                    hover:bg-gray-50 transition-colors cursor-pointer"
         onClick={() => handleToggle(item.id)}>

      <Checkbox checked={isSelected} className="mt-1" />

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-gray-700">1.</span>
          <p className="text-sm text-gray-900 leading-relaxed">
            Excavate to form trenches...
          </p>
        </div>
        {/* Rate in brand color */}
        <p className="text-sm font-medium text-[#3C3DEC] mt-1 ml-5">
          25.90 SGD per m3
        </p>
      </div>
    </div>
  </div>
</div>`}
      />
    </StorySection>
  );
}