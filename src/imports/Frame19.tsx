import svgPaths from "./svg-4w49n27qv3";
import imgImage1 from "figma:asset/55d827301a84ac179b1f2a3171c5d5ee8220f9c2.png";

function Frame7() {
  return (
    <div className="bg-[#f1eeff] content-stretch flex items-center p-[4px] relative rounded-[8px] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[16px] not-italic relative shrink-0 text-black w-[151px] whitespace-pre-wrap">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[14px] w-full">AiBE</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] w-full">Operator</p>
    </div>
  );
}

function LucideSquarePen() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="lucide/square-pen">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="lucide/square-pen">
          <path d={svgPaths.p2ce7a200} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="relative shrink-0 w-full" data-name="menu item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <LucideSquarePen />
          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#334155] text-[14px] whitespace-pre-wrap">New Chat</p>
        </div>
      </div>
    </div>
  );
}

function LucideFolderOpen() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="lucide/folder-open">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="lucide/folder-open">
          <path d={svgPaths.p13733580} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="relative shrink-0 w-full" data-name="menu item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative w-full">
          <LucideFolderOpen />
          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#334155] text-[14px] whitespace-pre-wrap">Documents</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <MenuItem />
      <MenuItem1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full">
      <div className="relative shrink-0 w-full" data-name="menu item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center p-[8px] relative w-full">
            <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[#475569] text-[14px] whitespace-pre-wrap">Your chats</p>
          </div>
        </div>
      </div>
      <div className="h-[56px] relative shrink-0 w-full" data-name="menu item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[6px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#334155] text-[14px] text-ellipsis whitespace-pre-wrap">How much is the average cost of repairs for this building for the last 24 months?</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="menu item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#334155] text-[14px] text-ellipsis whitespace-nowrap">summarize this file for me</p>
          </div>
        </div>
      </div>
      <div className="h-[56px] relative shrink-0 w-full" data-name="menu item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-full leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#334155] text-[14px] text-ellipsis whitespace-pre-wrap">give me the efficiency of all AHU units in this building</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="avatar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <circle cx="20" cy="20" fill="var(--fill-0, #E2E8F0)" id="Ellipse 1" r="20" />
      </svg>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[30%_22.5%] justify-center leading-[0] not-italic text-[#0f172a] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">CT</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[16px] not-italic relative shrink-0 text-black w-[151px] whitespace-pre-wrap">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[14px] w-full">Charlie Tan</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] w-full">charlie.tan@customer.com</p>
    </div>
  );
}

function LucideChevronsUpDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="lucide/chevrons-up-down">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="lucide/chevrons-up-down">
          <path d={svgPaths.p15233480} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip p-[8px] relative shrink-0">
      <Avatar />
      <Frame5 />
      <LucideChevronsUpDown />
    </div>
  );
}

function LucideMapPin() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="lucide/map-pin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.p28c1e4f0} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d={svgPaths.p3ea11c00} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0f172a] text-[14px]">Building A</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="icon/chevron-down">
        <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
          <div className="absolute inset-[-16.67%_-8.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4">
              <path d="M0.5 0.5L3.5 3.5L6.5 0.5" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame />
    </div>
  );
}

function NavigationMenuItem() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative shrink-0" data-name="navigation menu item">
      <LucideMapPin />
      <Group />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0f172a] text-[14px]">Scholar</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="icon/chevron-down">
        <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
          <div className="absolute inset-[-16.67%_-8.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4">
              <path d="M0.5 0.5L3.5 3.5L6.5 0.5" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationMenuItem1() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex gap-[10px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="navigation menu item">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon/book-open">
        <div className="absolute bottom-[12.5%] left-[8.33%] right-1/2 top-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-5.56%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 13.3333">
              <path d={svgPaths.p3a335100} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[12.5%] left-1/2 right-[8.33%] top-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-5.56%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 13.3333">
              <path d={svgPaths.p15e6ea80} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
      <Frame1 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center left-[283px] top-[18px]">
      <NavigationMenuItem />
      <NavigationMenuItem1 />
    </div>
  );
}

function TitleSection() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="title section">
      <div className="bg-white content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[8px] relative shrink-0" data-name="menu item">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon/folder-search">
          <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector">
            <div className="absolute inset-[-8.82%_-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 13.3333">
                <path d={svgPaths.p2fe18520} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[58.33%_16.67%_16.67%_58.33%]" data-name="Vector">
            <div className="absolute inset-[-25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                <path d={svgPaths.pafef4f0} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[81.25%_12.5%_12.5%_81.25%]" data-name="Vector">
            <div className="absolute inset-[-100%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
                <path d="M2 2L1 1" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[131px] whitespace-pre-wrap">Operations</p>
      </div>
    </div>
  );
}

function TopSection() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="top section">
      <div className="bg-white content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[8px] relative shrink-0" data-name="menu item">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon/folder-search">
          <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector">
            <div className="absolute inset-[-8.82%_-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 13.3333">
                <path d={svgPaths.p2fe18520} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[58.33%_16.67%_16.67%_58.33%]" data-name="Vector">
            <div className="absolute inset-[-25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                <path d={svgPaths.pafef4f0} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[81.25%_12.5%_12.5%_81.25%]" data-name="Vector">
            <div className="absolute inset-[-100%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
                <path d="M2 2L1 1" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#334155] text-[14px] w-[131px] whitespace-pre-wrap">HR-Certificate</p>
      </div>
    </div>
  );
}

function TitleSection1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="title section">
      <div className="bg-white content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[8px] relative shrink-0" data-name="menu item">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon/folder-search">
          <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector">
            <div className="absolute inset-[-8.82%_-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 13.3333">
                <path d={svgPaths.p2fe18520} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[58.33%_16.67%_16.67%_58.33%]" data-name="Vector">
            <div className="absolute inset-[-25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                <path d={svgPaths.pafef4f0} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[81.25%_12.5%_12.5%_81.25%]" data-name="Vector">
            <div className="absolute inset-[-100%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
                <path d="M2 2L1 1" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[131px] whitespace-pre-wrap">SoR</p>
      </div>
    </div>
  );
}

function TopSection1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="top section">
      <div className="bg-white relative shrink-0 w-full" data-name="menu item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon/folder-search">
              <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector">
                <div className="absolute inset-[-8.82%_-7.5%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 13.3333">
                    <path d={svgPaths.p2fe18520} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[58.33%_16.67%_16.67%_58.33%]" data-name="Vector">
                <div className="absolute inset-[-25%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                    <path d={svgPaths.pafef4f0} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[81.25%_12.5%_12.5%_81.25%]" data-name="Vector">
                <div className="absolute inset-[-100%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
                    <path d="M2 2L1 1" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#334155] text-[14px] whitespace-pre-wrap">Sirius</p>
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="menu item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon/folder-search">
              <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector">
                <div className="absolute inset-[-8.82%_-7.5%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 13.3333">
                    <path d={svgPaths.p2fe18520} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[58.33%_16.67%_16.67%_58.33%]" data-name="Vector">
                <div className="absolute inset-[-25%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                    <path d={svgPaths.pafef4f0} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[81.25%_12.5%_12.5%_81.25%]" data-name="Vector">
                <div className="absolute inset-[-100%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
                    <path d="M2 2L1 1" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#334155] text-[14px] whitespace-pre-wrap">HVAC</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[204px]">
      <TitleSection />
      <TopSection />
      <TitleSection1 />
      <TopSection1 />
      <div className="h-0 overflow-clip relative shrink-0 w-full" data-name="section items">
        <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5.88%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 19">
              <path d={svgPaths.p3b350a00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[58.33%_16.67%_16.67%_58.33%]" data-name="Vector">
          <div className="absolute inset-[-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[81.25%_12.5%_12.5%_81.25%]" data-name="Vector">
          <div className="absolute inset-[-66.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
              <path d="M2.5 2.5L1 1" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleSection2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="title section">
      <div className="content-stretch flex flex-col items-start pt-[5px] px-[5px] relative w-full">
        <div className="bg-[#f5f5f5] relative shrink-0 w-full" data-name="menu item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon/book-open">
                <div className="absolute bottom-[12.5%] left-[8.33%] right-1/2 top-[12.5%]" data-name="Vector">
                  <div className="absolute inset-[-8.33%_-15%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66667 14">
                      <path d={svgPaths.p1ba63a00} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-[12.5%] left-1/2 right-[8.33%] top-[12.5%]" data-name="Vector">
                  <div className="absolute inset-[-8.33%_-15%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66667 14">
                      <path d={svgPaths.p295a5400} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#0f172a] text-[14px] whitespace-pre-wrap">Scholar</p>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="secondary icon">
                <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
                  <div className="absolute inset-[-8.33%_-16.67%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 9.33333">
                      <path d={svgPaths.p3ec8f700} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopSection2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="top section">
      <div className="content-stretch flex flex-col items-start pb-[5px] px-[5px] relative w-full">
        <div className="relative rounded-[8px] shrink-0 w-full" data-name="menu item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon/layers">
                <div className="absolute bottom-1/2 left-[8.33%] right-[8.33%] top-[8.33%]" data-name="Vector">
                  <div className="absolute inset-[-15%_-7.5%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 8.66667">
                      <path d={svgPaths.p2552f600} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-[70.83%_8.33%_8.33%_8.33%]" data-name="Vector">
                  <div className="absolute inset-[-30.01%_-7.5%_-30%_-7.5%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3338 5.33355">
                      <path d={svgPaths.p24e97000} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-[29.17%] left-[8.33%] right-[8.33%] top-1/2" data-name="Vector">
                  <div className="absolute inset-[-30.01%_-7.5%_-30%_-7.5%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3338 5.33355">
                      <path d={svgPaths.p24e97000} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#334155] text-[14px] whitespace-pre-wrap">Operator</p>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="secondary icon">
                <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
                  <div className="absolute inset-[-8.33%_-16.67%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 9.33333">
                      <path d={svgPaths.p3ec8f700} id="Vector" stroke="var(--stroke-0, #334155)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px min-w-px relative">
      <TitleSection2 />
      <TopSection2 />
      <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="section 1">
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 204 1">
              <line id="Line 1" stroke="var(--stroke-0, #F1F5F9)" x2="204" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="section items">
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 204 1">
              <line id="Line 1" stroke="var(--stroke-0, #F1F5F9)" x2="204" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame10() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute bg-[#fcfcfc] h-[800px] left-0 top-0 w-[273px]" data-name="LHP">
        <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[12px] relative rounded-[inherit] size-full">
          <div className="relative shrink-0 w-full" data-name="AiBE logo">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[12px] items-center p-[8px] relative w-full">
                <Frame7 />
                <Frame8 />
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lefthandpanel">
                  <div className="absolute inset-[12.5%]" data-name="Vector">
                    <div className="absolute inset-[-5.56%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p102ac4c0} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Frame4 />
          <Frame9 />
          <Frame6 />
        </div>
        <div aria-hidden="true" className="absolute border-[#d9d9d9] border-r border-solid inset-0 pointer-events-none" />
      </div>
      <Frame11 />
      <div className="absolute left-[654px] rounded-[6px] top-[78px]" data-name="select options">
        <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit]">
          <Frame2 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-[-1px] pointer-events-none rounded-[7px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)]" />
      </div>
      <div className="absolute left-[437px] rounded-[6px] top-[73px] w-[204px]" data-name="select options">
        <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
          <Frame3 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-[-1px] pointer-events-none rounded-[7px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)]" />
      </div>
    </div>
  );
}