function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#0f172a] text-[18px]">You are about to delete 12 files</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#64748b] text-[14px] w-[464px] whitespace-pre-wrap">This action cannot be undone. This will permanently delete your files.</p>
    </div>
  );
}

function ButtonSection() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[464px]" data-name="button section">
      <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[6px] shrink-0" data-name="button">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[14px]">Cancel</p>
      </div>
      <div className="bg-[#0f172a] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[6px] shrink-0" data-name="button">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[14px] text-white">Continue</p>
      </div>
    </div>
  );
}

export default function AlterDialog() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[6px] size-full" data-name="alter dialog">
      <div aria-hidden="true" className="absolute border border-[#cbd5e1] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Content />
      <ButtonSection />
    </div>
  );
}