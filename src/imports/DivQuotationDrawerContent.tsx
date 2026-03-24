import svgPaths from "./svg-pcdgii6a0g";

function DivSummaryRow() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Div [summary-row]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between leading-[0] not-italic px-[12px] py-[11px] relative size-full whitespace-nowrap">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#57606a] text-[14.6px]">
            <p className="leading-[18px]">Subtotal</p>
          </div>
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[#0d1117] text-[15.1px]">
            <p className="leading-[19.2px]">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputAntInputNumberInput() {
  return (
    <div className="absolute h-[25.97px] left-[12.62px] overflow-clip rounded-[6px] top-[0.63px] w-[44.77px]" data-name="Input [ant-input-number-input]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[7px] not-italic overflow-hidden text-[13.8px] text-[rgba(0,0,0,0.88)] text-ellipsis top-[12.98px] w-[44.77px] whitespace-nowrap">
        <p className="leading-[22px] overflow-hidden">9%</p>
      </div>
    </div>
  );
}

function DivAntInputNumber() {
  return (
    <div className="h-[32px] relative rounded-[12px] shrink-0 w-[57px]" data-name="Div [ant-input-number]">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[0.625px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <InputAntInputNumberInput />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[34px] items-center relative shrink-0 w-[290.5px]">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[14.6px] whitespace-nowrap">
        <p className="leading-[18px]">GST</p>
      </div>
      <DivAntInputNumber />
    </div>
  );
}

function DivSummaryRow1() {
  return (
    <div className="h-[57px] relative shrink-0 w-full" data-name="Div [summary-row]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[12px] relative size-full">
          <Frame4 />
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0d1117] text-[15.1px] whitespace-nowrap">
            <p className="leading-[19.2px]">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-[517px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Inter:Bold',sans-serif] font-bold items-center justify-between leading-[0] not-italic relative text-[#0d1117] w-full whitespace-nowrap">
        <div className="flex flex-col justify-center relative shrink-0 text-[15.5px] tracking-[0.8px] uppercase">
          <p className="leading-[19.2px]">Total</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[15.1px] text-shadow-[0px_1px_2px_rgba(26,127,55,0.1)] tracking-[-0.32px]">
          <p className="leading-[19.2px]">$0.00</p>
        </div>
      </div>
    </div>
  );
}

function DivSummaryRow2() {
  return (
    <div className="bg-gradient-to-r from-[rgba(26,127,55,0.02)] h-[69px] relative rounded-[8px] shrink-0 to-[rgba(0,0,0,0)] w-full" data-name="Div [summary-row]">
      <div aria-hidden="true" className="absolute border-[#e4e7eb] border-solid border-t-[1.875px] inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex items-start pb-[24px] pt-[25.875px] px-[12px] relative size-full">
        <Frame3 />
      </div>
    </div>
  );
}

function DivQuotationSummaryPrice() {
  return (
    <div className="absolute bg-[#f6f8fa] content-stretch flex flex-col gap-[7px] items-center left-[24px] p-[16px] rounded-[8px] top-[1419px] w-[572px]" data-name="Div [quotation-summary] Price">
      <DivSummaryRow />
      <DivSummaryRow1 />
      <DivSummaryRow2 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute h-[10px] left-[580.73px] top-[36.79px] w-[15.273px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2733 10">
        <g id="Icon">
          <path d={svgPaths.p36333050} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DivSectionTitleExpandable() {
  return (
    <div className="absolute contents left-[24px] top-[23.99px]" data-name="Div [section-title-expandable]">
      <Icon />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[24px] not-italic text-[#0d1117] text-[13.1px] top-[31.99px] tracking-[0.65px] uppercase w-[103.858px]">
        <p className="leading-[15.6px] whitespace-pre-wrap">Items (2)</p>
      </div>
    </div>
  );
}

function DivItemDescription() {
  return (
    <div className="h-[42px] relative shrink-0 w-[510px]" data-name="Div [item-description]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[0.006px] items-start leading-[0] not-italic pb-[385.563px] pr-[25px] relative size-full text-[#0d0d0d] text-[13.9px] tracking-[-0.14px] whitespace-nowrap">
        <div className="flex flex-col justify-center relative shrink-0">
          <p className="leading-[21px]">{`Excavate to form trenches, drains, manholes, etc. in ordinary ground (depth `}</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0">
          <p className="leading-[21px]">not exceeding 2.0m)</p>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[78.11px] size-[13px] top-[10.12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p959a000} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.pc590ac0} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[10.12px] size-[13px] top-[10.12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p3ec51780} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DivQuantityControl() {
  return (
    <div className="bg-[#f7f7f7] h-[33.25px] relative rounded-[6px] shrink-0 w-[101.23px]" data-name="Div [quantity-control]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon1 />
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[46.37px] not-italic text-[#0d0d0d] text-[13.7px] top-[16.72px] whitespace-nowrap">
          <p className="leading-[16.8px]">2</p>
        </div>
        <Icon2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.625px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DivControlGroup() {
  return (
    <div className="h-[47.25px] relative shrink-0 w-[101.23px]" data-name="Div [control-group]">
      <div className="content-stretch flex flex-col gap-[7.961px] items-start pb-[449.58px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.2px] whitespace-nowrap">
          <p className="leading-[13.2px]">Qty</p>
        </div>
        <DivQuantityControl />
      </div>
    </div>
  );
}

function InputAntInputNumberInput1() {
  return (
    <div className="absolute h-[25.97px] left-[12.62px] overflow-clip rounded-[6px] top-[0.63px] w-[54.77px]" data-name="Input [ant-input-number-input]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[7px] not-italic overflow-hidden text-[#0d0d0d] text-[15.8px] text-ellipsis top-[12.98px] w-[54.77px] whitespace-nowrap">
        <p className="leading-[22px] overflow-hidden">0%</p>
      </div>
    </div>
  );
}

function DivAntInputNumber1() {
  return (
    <div className="h-[32px] relative rounded-[12px] shrink-0 w-[80px]" data-name="Div [ant-input-number]">
      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.625px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <InputAntInputNumberInput1 />
      </div>
    </div>
  );
}

function DivControlGroup1() {
  return (
    <div className="h-[46px] relative shrink-0 w-[80px]" data-name="Div [control-group]">
      <div className="content-stretch flex flex-col gap-[7.961px] items-start pb-[451.455px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.2px] whitespace-nowrap">
          <p className="leading-[13.2px]">Markup</p>
        </div>
        <DivAntInputNumber1 />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[60px] items-center relative shrink-0 w-[314.359px]">
      <DivControlGroup />
      <DivControlGroup1 />
    </div>
  );
}

function DivPriceBox() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 whitespace-nowrap" data-name="Div [price-box]">
      <div className="col-1 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center ml-0 mt-[18.38px] relative row-1 text-[#0d0d0d] text-[19.2px] tracking-[-0.4px]">
        <p className="leading-[20px]">$51.80</p>
      </div>
      <div className="col-1 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center ml-[3.51px] mt-0 relative row-1 text-[#666] text-[11.8px]">
        <p className="leading-[14.4px]">$25.90/m³</p>
      </div>
    </div>
  );
}

function DivItemControlsRow() {
  return (
    <div className="relative shrink-0 w-[510px]" data-name="Div [item-controls-row]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Frame5 />
        <DivPriceBox />
      </div>
    </div>
  );
}

function DivQuotationItem() {
  return (
    <div className="bg-white h-[160px] relative shrink-0 w-full" data-name="Div [quotation-item]">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[11.992px] items-start pb-[24.625px] pt-[24px] px-[24px] relative size-full">
          <DivItemDescription />
          <DivItemControlsRow />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[0.625px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DivItemDescription1() {
  return (
    <div className="h-[42px] relative shrink-0 w-[510px]" data-name="Div [item-description]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[0.006px] items-start leading-[0] not-italic pb-[633.922px] pr-[18.242px] relative size-full text-[#0d0d0d] text-[13.9px] tracking-[-0.14px]">
        <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
          <p className="leading-[21px]">{`Breaking up reinforced concrete including cutting reinforcement and carting  `}</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-[80px]">
          <p className="leading-[21px] whitespace-pre-wrap">away debris</p>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[78.11px] size-[13px] top-[10.12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p959a000} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.pc590ac0} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[10.12px] size-[13px] top-[10.12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p3ec51780} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DivQuantityControl1() {
  return (
    <div className="bg-[#f7f7f7] h-[33.25px] relative rounded-[6px] shrink-0 w-[101.23px]" data-name="Div [quantity-control]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon3 />
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[47.32px] not-italic text-[#0d0d0d] text-[13.7px] top-[16.72px] whitespace-nowrap">
          <p className="leading-[16.8px]">1</p>
        </div>
        <Icon4 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.625px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DivControlGroup2() {
  return (
    <div className="h-[47.25px] relative shrink-0 w-[101.23px]" data-name="Div [control-group]">
      <div className="content-stretch flex flex-col gap-[7.961px] items-start pb-[697.939px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.2px] whitespace-nowrap">
          <p className="leading-[13.2px]">Qty</p>
        </div>
        <DivQuantityControl1 />
      </div>
    </div>
  );
}

function InputAntInputNumberInput2() {
  return (
    <div className="absolute h-[25.97px] left-[12.62px] overflow-clip rounded-[6px] top-[0.63px] w-[54.77px]" data-name="Input [ant-input-number-input]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[7px] not-italic overflow-hidden text-[#0d0d0d] text-[15.8px] text-ellipsis top-[12.98px] w-[54.77px] whitespace-nowrap">
        <p className="leading-[22px] overflow-hidden">0%</p>
      </div>
    </div>
  );
}

function DivAntInputNumber2() {
  return (
    <div className="h-[32px] relative rounded-[12px] shrink-0 w-[80px]" data-name="Div [ant-input-number]">
      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.625px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <InputAntInputNumberInput2 />
      </div>
    </div>
  );
}

function DivControlGroup3() {
  return (
    <div className="h-[46px] relative shrink-0 w-[80px]" data-name="Div [control-group]">
      <div className="content-stretch flex flex-col gap-[7.961px] items-start pb-[699.814px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.2px] whitespace-nowrap">
          <p className="leading-[13.2px]">Markup</p>
        </div>
        <DivAntInputNumber2 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[60px] items-center relative shrink-0 w-[308.23px]">
      <DivControlGroup2 />
      <DivControlGroup3 />
    </div>
  );
}

function DivPriceBox1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 whitespace-nowrap" data-name="Div [price-box]">
      <div className="col-1 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center ml-0 mt-[18.38px] relative row-1 text-[#0d0d0d] text-[19.2px] tracking-[-0.4px]">
        <p className="leading-[20px]">$128.20</p>
      </div>
      <div className="col-1 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center ml-[9.44px] mt-0 relative row-1 text-[#666] text-[11.8px]">
        <p className="leading-[14.4px]">$128.20/m³</p>
      </div>
    </div>
  );
}

function DivItemControlsRow1() {
  return (
    <div className="relative shrink-0 w-[509.676px]" data-name="Div [item-controls-row]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Frame6 />
        <DivPriceBox1 />
      </div>
    </div>
  );
}

function DivQuotationItem1() {
  return (
    <div className="bg-white h-[160px] relative shrink-0 w-full" data-name="Div [quotation-item]">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[11.992px] items-start pb-[24.625px] pt-[24px] px-[24px] relative size-full">
          <DivItemDescription1 />
          <DivItemControlsRow1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[0.625px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DivItemsList() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[24px] top-[63px] w-[558px]" data-name="Div [items-list]">
      <DivQuotationItem />
      <DivQuotationItem1 />
    </div>
  );
}

function DivQuotationSection() {
  return (
    <div className="absolute border-[#e4e7eb] border-b-[0.625px] border-solid h-[423px] left-0 top-[972px] w-[620px]" data-name="Div [quotation-section]">
      <DivSectionTitleExpandable />
      <DivItemsList />
    </div>
  );
}

function Icon5() {
  return (
    <div className="col-1 h-[10px] ml-[556.74px] mt-[12.8px] relative row-1 w-[15.274px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2735 10">
        <g id="Icon">
          <path d={svgPaths.p3dfdef00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DivSectionTitleExpandable1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Div [section-title-expandable]">
      <Icon5 />
      <div className="col-1 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center ml-0 mt-0 not-italic relative row-1 text-[#0d1117] text-[13.1px] tracking-[0.65px] uppercase w-[172.591px]">
        <p className="leading-[15.6px] whitespace-pre-wrap">Client Details</p>
      </div>
    </div>
  );
}

function InputAntInput() {
  return (
    <div className="h-[38px] relative rounded-[6px] shrink-0 w-full" data-name="Input [ant-input]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[12px] not-italic overflow-hidden text-[#0d1117] text-[13.8px] text-ellipsis top-[19px] w-[362.02px] whitespace-nowrap">
          <p className="leading-[22px] overflow-hidden">client@company.com</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d9e0] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DivDetailItem() {
  return (
    <div className="absolute h-[65px] left-[0.01px] top-[160.21px] w-[559px]" data-name="Div [detail-item]">
      <div className="content-stretch flex flex-col gap-[8.341px] items-start pb-[1087.891px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[12.9px] whitespace-nowrap">
          <p className="leading-[18.2px]">Email *</p>
        </div>
        <InputAntInput />
      </div>
    </div>
  );
}

function InputAntInput1() {
  return (
    <div className="h-[38px] relative rounded-[6px] shrink-0 w-full" data-name="Input [ant-input]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[12px] not-italic overflow-hidden text-[#0d1117] text-[13.8px] text-ellipsis top-[19px] w-[362.02px] whitespace-nowrap">
          <p className="leading-[22px] overflow-hidden">123 Building Road, Singapore 123456</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d9e0] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DivDetailItem1() {
  return (
    <div className="absolute h-[65px] left-[0.01px] top-[80.21px] w-[559px]" data-name="Div [detail-item]">
      <div className="content-stretch flex flex-col gap-[8.341px] items-start pb-[1007.705px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[12.9px] whitespace-nowrap">
          <p className="leading-[18.2px]">Address *</p>
        </div>
        <InputAntInput1 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[155.27px] size-[12px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SpanAntSelectSelectionItem() {
  return (
    <div className="absolute h-[26px] left-[11.99px] overflow-clip top-[2.37px] w-[149.03px]" data-name="Span [ant-select-selection-item]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#0d1117] text-[11.9px] top-[12.81px] whitespace-nowrap">
        <p className="leading-[26px]">Company Name</p>
      </div>
    </div>
  );
}

function DivAntSelectSelector() {
  return (
    <div className="absolute bg-white border-[#d9d9d9] border-[0.625px] border-solid h-[32px] left-0 rounded-[12px] top-[-0.34px] w-[267px]" data-name="Div [ant-select-selector]">
      <SpanAntSelectSelectionItem />
    </div>
  );
}

function DivAntSelect() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Div [ant-select]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon6 />
        <DivAntSelectSelector />
      </div>
    </div>
  );
}

function DivDetailItem2() {
  return (
    <div className="absolute h-[59px] left-[292.01px] top-[0.21px] w-[267px]" data-name="Div [detail-item]">
      <div className="content-stretch flex flex-col gap-[8.341px] items-start pb-[935.02px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[12.9px] whitespace-nowrap">
          <p className="leading-[18.2px]">Company *</p>
        </div>
        <DivAntSelect />
      </div>
    </div>
  );
}

function InputAntInput2() {
  return (
    <div className="h-[38px] relative rounded-[6px] shrink-0 w-full" data-name="Input [ant-input]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[12px] not-italic overflow-hidden text-[#0d1117] text-[13.8px] text-ellipsis top-[19px] w-[171.76px] whitespace-nowrap">
          <p className="leading-[22px] overflow-hidden">Client Name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d9e0] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DivDetailItem3() {
  return (
    <div className="absolute h-[65px] left-[0.01px] top-[0.21px] w-[267px]" data-name="Div [detail-item]">
      <div className="content-stretch flex flex-col gap-[8.341px] items-start pb-[927.52px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[12.9px] whitespace-nowrap">
          <p className="leading-[18.2px]">Name *</p>
        </div>
        <InputAntInput2 />
      </div>
    </div>
  );
}

function DivClientDetailsGrid() {
  return (
    <div className="h-[224px] relative shrink-0 w-[572px]" data-name="Div [client-details-grid]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DivDetailItem />
        <DivDetailItem1 />
        <DivDetailItem2 />
        <DivDetailItem3 />
      </div>
    </div>
  );
}

function DivQuotationSectionClientDetails() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.996px] h-[311px] items-start left-0 pb-[24.625px] pt-[23.994px] px-[23.994px] top-[661px] w-[620px]" data-name="Div [quotation-section] Client Details">
      <div aria-hidden="true" className="absolute border-[#e4e7eb] border-b-[0.625px] border-solid inset-0 pointer-events-none" />
      <DivSectionTitleExpandable1 />
      <DivClientDetailsGrid />
    </div>
  );
}

function Icon7() {
  return (
    <div className="col-1 h-[10px] ml-[556.74px] mt-[12.8px] relative row-1 w-[15.274px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2735 10">
        <g id="Icon">
          <path d={svgPaths.p3dfdef00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DivSectionTitleExpandable2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Div [section-title-expandable]">
      <Icon7 />
      <div className="col-1 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center ml-0 mt-0 not-italic relative row-1 text-[#0d1117] text-[13.1px] tracking-[0.65px] uppercase w-[238.267px]">
        <p className="leading-[15.6px] whitespace-pre-wrap">{`Terms & Conditions`}</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p267c4351} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p16b79100} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonAntBtn() {
  return (
    <div className="-translate-x-1/2 absolute bg-white content-stretch flex gap-[6px] items-center justify-center left-[calc(50%+0.01px)] px-[141px] py-[10px] rounded-[12px] top-[223.21px] w-[557px]" data-name="Button [ant-btn]">
      <div aria-hidden="true" className="absolute border-[#d1d9e0] border-[1.25px] border-dashed inset-0 pointer-events-none rounded-[12px] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.02)]" />
      <Icon8 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[13.7px] whitespace-nowrap">
        <p className="leading-[16.8px]">Add Term</p>
      </div>
    </div>
  );
}

function TextareaAntInput() {
  return (
    <div className="absolute h-[22px] left-[11.99px] overflow-clip rounded-[8px] top-[10px] w-[302.04px]" data-name="Textarea [ant-input]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[5px] not-italic overflow-hidden text-[#0d1117] text-[11.9px] text-ellipsis top-[11px] w-[302.04px] whitespace-nowrap">
        <p className="leading-[22px] overflow-hidden">Subject to site inspection and conditions</p>
      </div>
    </div>
  );
}

function DivTermItemEditable() {
  return (
    <div className="absolute bg-white border-[#d1d9e0] border-[1.25px] border-solid h-[46px] left-0 rounded-[6px] top-[160.94px] w-[557px]" data-name="Div [term-item-editable]">
      <TextareaAntInput />
    </div>
  );
}

function TextareaAntInput1() {
  return (
    <div className="absolute h-[22px] left-[11.99px] overflow-clip rounded-[8px] top-[10px] w-[302.04px]" data-name="Textarea [ant-input]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[5px] not-italic overflow-hidden text-[#0d1117] text-[11.9px] text-ellipsis top-[11px] w-[302.04px] whitespace-nowrap">
        <p className="leading-[22px] overflow-hidden">Prices exclude permits and disposal fees</p>
      </div>
    </div>
  );
}

function DivTermItemEditable1() {
  return (
    <div className="absolute bg-white border-[#d1d9e0] border-[1.25px] border-solid h-[46px] left-0 rounded-[6px] top-[106.94px] w-[557px]" data-name="Div [term-item-editable]">
      <TextareaAntInput1 />
    </div>
  );
}

function TextareaAntInput2() {
  return (
    <div className="absolute h-[22px] left-[11.99px] overflow-clip rounded-[8px] top-[10px] w-[302.04px]" data-name="Textarea [ant-input]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[5px] not-italic overflow-hidden text-[#0d1117] text-[11.9px] text-ellipsis top-[11px] w-[302.04px] whitespace-nowrap">
        <p className="leading-[22px] overflow-hidden">Payment within 30 days of invoice</p>
      </div>
    </div>
  );
}

function DivTermItemEditable2() {
  return (
    <div className="absolute bg-white border-[#d1d9e0] border-[1.25px] border-solid h-[45px] left-0 rounded-[6px] top-[53.94px] w-[557px]" data-name="Div [term-item-editable]">
      <TextareaAntInput2 />
    </div>
  );
}

function TextareaAntInput3() {
  return (
    <div className="absolute h-[22px] left-[11.99px] overflow-clip rounded-[8px] top-[10px] w-[302.04px]" data-name="Textarea [ant-input]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[5px] not-italic overflow-hidden text-[#0d1117] text-[11.9px] text-ellipsis top-[11px] w-[302.04px] whitespace-nowrap">
        <p className="leading-[22px] overflow-hidden">Prices valid for 30 days from quotation date</p>
      </div>
    </div>
  );
}

function DivTermItemEditable3() {
  return (
    <div className="absolute bg-white border-[#d1d9e0] border-[1.25px] border-solid h-[46px] left-0 rounded-[6px] top-[-0.06px] w-[557px]" data-name="Div [term-item-editable]">
      <TextareaAntInput3 />
    </div>
  );
}

function DivTermsList() {
  return (
    <div className="h-[261px] relative shrink-0 w-[557px]" data-name="Div [terms-list]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ButtonAntBtn />
        <DivTermItemEditable />
        <DivTermItemEditable1 />
        <DivTermItemEditable2 />
        <DivTermItemEditable3 />
      </div>
    </div>
  );
}

function DivQuotationSectionTC() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.996px] h-[348px] items-start left-0 pb-[307.246px] pt-[23.994px] px-[23.994px] top-[313px] w-[620px]" data-name="Div [quotation-section] T&C">
      <div aria-hidden="true" className="absolute border-[#e4e7eb] border-b-[0.625px] border-solid inset-0 pointer-events-none" />
      <DivSectionTitleExpandable2 />
      <DivTermsList />
    </div>
  );
}

function Icon9() {
  return (
    <div className="col-1 h-[10px] ml-[556.74px] mt-[12.8px] relative row-1 w-[15.274px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2735 10">
        <g id="Icon">
          <path d={svgPaths.p3dfdef00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DivSectionTitleExpandable3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Div [section-title-expandable]">
      <Icon9 />
      <div className="col-1 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center ml-0 mt-0 not-italic relative row-1 text-[#0d1117] text-[13.1px] tracking-[0.65px] uppercase w-[222.994px]">
        <p className="leading-[15.6px] whitespace-pre-wrap">Quotation Details</p>
      </div>
    </div>
  );
}

function InputAntInput3() {
  return (
    <div className="h-[38px] relative rounded-[6px] shrink-0 w-full" data-name="Input [ant-input]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[12px] not-italic overflow-hidden text-[#0d1117] text-[13.8px] text-ellipsis top-[19px] w-[362.02px] whitespace-nowrap">
          <p className="leading-[22px] overflow-hidden">R123</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d9e0] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DivDetailItem4() {
  return (
    <div className="absolute h-[57px] left-[0.01px] top-[160.21px] w-[554px]" data-name="Div [detail-item]">
      <div className="content-stretch flex flex-col gap-[8.341px] items-start pb-[247.481px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[12.9px] whitespace-nowrap">
          <p className="leading-[18.2px]">Reference *</p>
        </div>
        <InputAntInput3 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[155.27px] size-[12px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SpanAntSelectSelectionItem1() {
  return (
    <div className="absolute h-[26px] left-[11.99px] overflow-clip top-[2.37px] w-[149.03px]" data-name="Span [ant-select-selection-item]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#0d1117] text-[11.9px] top-[12.81px] whitespace-nowrap">
        <p className="leading-[26px]">30 Days</p>
      </div>
    </div>
  );
}

function DivAntSelectSelector1() {
  return (
    <div className="absolute bg-white border-[#d9d9d9] border-[0.625px] border-solid h-[32px] left-0 rounded-[12px] top-[-0.34px] w-[265px]" data-name="Div [ant-select-selector]">
      <SpanAntSelectSelectionItem1 />
    </div>
  );
}

function DivAntSelect1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[174.26px]" data-name="Div [ant-select]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon10 />
        <DivAntSelectSelector1 />
      </div>
    </div>
  );
}

function DivDetailItem5() {
  return (
    <div className="h-[47px] relative shrink-0 w-[273px]" data-name="Div [detail-item]">
      <div className="content-stretch flex flex-col gap-[8.341px] items-start pb-[174.795px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[12.9px] whitespace-nowrap">
          <p className="leading-[18.2px]">Period Effective</p>
        </div>
        <DivAntSelect1 />
      </div>
    </div>
  );
}

function InputAntInput4() {
  return (
    <div className="h-[38px] relative rounded-[6px] shrink-0 w-[265px]" data-name="Input [ant-input]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[12px] not-italic overflow-hidden text-[#0d1117] text-[13.8px] text-ellipsis top-[19px] w-[171.76px] whitespace-nowrap">
          <p className="leading-[22px] overflow-hidden">22-Jan-2025</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d9e0] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DivDetailItem6() {
  return (
    <div className="h-[57px] relative shrink-0 w-[273px]" data-name="Div [detail-item]">
      <div className="content-stretch flex flex-col gap-[8.341px] items-start pb-[167.295px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[12.9px] whitespace-nowrap">
          <p className="leading-[18.2px]">Valid Until</p>
        </div>
        <InputAntInput4 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[0.01px] top-[80.21px] w-[572px]">
      <DivDetailItem5 />
      <DivDetailItem6 />
    </div>
  );
}

function InputAntInput5() {
  return (
    <div className="h-[38px] relative rounded-[6px] shrink-0 w-[262px]" data-name="Input [ant-input]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[12px] not-italic overflow-hidden text-[#0d1117] text-[13.8px] text-ellipsis top-[19px] w-[171.76px] whitespace-nowrap">
          <p className="leading-[22px] overflow-hidden">Q1234</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d9e0] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DivDetailItem7() {
  return (
    <div className="h-[57px] relative shrink-0 w-[273px]" data-name="Div [detail-item]">
      <div className="content-stretch flex flex-col gap-[8.341px] items-start pb-[87.109px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[12.9px] whitespace-nowrap">
          <p className="leading-[18.2px]">Quote No *</p>
        </div>
        <InputAntInput5 />
      </div>
    </div>
  );
}

function InputAntInput6() {
  return (
    <div className="h-[38px] relative rounded-[6px] shrink-0 w-[262px]" data-name="Input [ant-input]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[12px] not-italic overflow-hidden text-[#0d1117] text-[13.8px] text-ellipsis top-[19px] w-[171.76px] whitespace-nowrap">
          <p className="leading-[22px] overflow-hidden">23-Dec-2025</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d9e0] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DivDetailItem8() {
  return (
    <div className="h-[57px] relative shrink-0 w-[283px]" data-name="Div [detail-item]">
      <div className="content-stretch flex flex-col gap-[8.341px] items-start pb-[87.109px] relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#57606a] text-[12.9px] whitespace-nowrap">
          <p className="leading-[18.2px]">Date *</p>
        </div>
        <InputAntInput6 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[0.01px] top-[0.21px] w-[572px]">
      <DivDetailItem7 />
      <DivDetailItem8 />
    </div>
  );
}

function DivQuotationDetailsGrid() {
  return (
    <div className="h-[224px] relative shrink-0 w-full" data-name="Div [quotation-details-grid]">
      <DivDetailItem4 />
      <Frame1 />
      <Frame />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[22.99px] top-[22.99px] w-[572.012px]">
      <DivSectionTitleExpandable3 />
      <DivQuotationDetailsGrid />
    </div>
  );
}

function DivQuotationSectionQuotationDetails() {
  return (
    <div className="absolute border border-[#e4e7eb] border-solid h-[313px] left-0 top-0 w-[620px]" data-name="Div [quotation-section] Quotation Details">
      <Frame2 />
    </div>
  );
}

export default function DivQuotationDrawerContent() {
  return (
    <div className="relative size-full" data-name="Div [quotation-drawer-content]">
      <DivQuotationSummaryPrice />
      <DivQuotationSection />
      <DivQuotationSectionClientDetails />
      <DivQuotationSectionTC />
      <DivQuotationSectionQuotationDetails />
    </div>
  );
}