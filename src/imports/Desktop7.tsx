import svgPaths from "./svg-ga9z9nvtni";

function IconLocation() {
  return (
    <div className="absolute inset-[17.86%]" data-name="icon/location">
      <div className="absolute left-[-0.86px] overflow-clip size-[12px] top-[-0.86px]" data-name="Scholar">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-5%_-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6667">
              <path d={svgPaths.p32ba600} id="Vector" stroke="var(--stroke-0, #97ACBF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-center min-h-[28px] px-[12px] py-[4px] relative rounded-[8px] shrink-0" data-name="Button">
        <div className="relative shrink-0 size-[16px]" data-name="IconObjects">
          <div className="absolute bg-[rgba(227,232,239,0.6)] inset-0 rounded-[6px]" />
          <div className="absolute inset-[12.5%] overflow-clip" data-name="lucide icons/building">
            <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
              <div className="absolute inset-[-5%_-6.25%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 22">
                  <path d={svgPaths.p3f4ebd00} id="Vector" stroke="var(--stroke-0, #97ACBF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-[48px] not-italic relative shrink-0 text-[14px] text-black text-center tracking-[-0.15px] whitespace-nowrap">
          <p className="leading-[19px]">Building A</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-center min-h-[28px] px-[12px] py-[4px] relative rounded-[8px] shrink-0" data-name="Button">
        <div className="relative shrink-0 size-[16px]" data-name="IconObjects">
          <div className="absolute bg-[rgba(227,232,239,0.6)] inset-0 rounded-[6px]" />
          <IconLocation />
        </div>
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-[48px] not-italic relative shrink-0 text-[14px] text-black text-center tracking-[-0.15px] whitespace-nowrap">
          <p className="leading-[19px]">Sources</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame1 />
      <div className="bg-[#1b1b1b] content-stretch flex gap-[4px] h-[36px] items-center justify-center min-h-[36px] min-w-[36px] relative rounded-[9999px] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Arrow-Right">
          <div className="absolute inset-[20.83%]" data-name="Vector">
            <div className="absolute inset-[-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                <path d={svgPaths.p2194d080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 7">
      <div className="absolute bg-white left-[468px] rounded-[24px] top-[367px] w-[549px]" data-name="Chatbox">
        <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[16px] relative rounded-[inherit] w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#a6a6a6] text-[14px] tracking-[0.25px] w-full whitespace-pre-wrap">Studying all files in “Scholar”</p>
          <Frame />
        </div>
        <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[24px]" />
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-[554px] not-italic text-[28px] text-black top-[275px] tracking-[-0.5px]">How can I help you today?</p>
    </div>
  );
}