import svgPaths from "./svg-4s1gnmg8kz";

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-zinc-100 top-0 tracking-[-0.4492px] whitespace-pre">Glow Editor</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">CSS Progressive Blur</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[48px] relative shrink-0 w-[136.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[48px] items-start relative w-[136.219px]">
        <Heading1 />
        <Paragraph />
      </div>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16px] items-center relative w-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#71717b] text-[12px] text-nowrap tracking-[0.6px] uppercase whitespace-pre">Power</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="bg-white relative rounded-[1.67772e+07px] shrink-0 size-[16px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="bg-[#030213] h-[18.398px] relative rounded-[1.67772e+07px] shrink-0 w-[32px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[18.398px] items-center pl-[15px] pr-px py-px relative w-[32px]">
        <PrimitiveSpan />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[18.398px] relative shrink-0 w-[88.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[18.398px] items-center relative w-[88.141px]">
        <PrimitiveLabel />
        <PrimitiveButton />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-300 tracking-[-0.1504px] whitespace-pre">Theme Mode</p>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.523px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[70.523px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-zinc-300 tracking-[-0.1504px] whitespace-pre">Dark Mode</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.4431 0.4431 0.5098)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="bg-zinc-950 h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[13px] py-px relative w-full">
          <PrimitiveSpan1 />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[64px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel1 />
      <PrimitiveButton1 />
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[71.539px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-[71.539px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-300 tracking-[-0.1504px] whitespace-pre">Base Color</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-zinc-950 h-[32px] left-[40px] rounded-[8px] top-0 w-[96px]" data-name="Input">
      <div className="box-border content-stretch flex h-[32px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[96px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-300 uppercase whitespace-pre">#ff9f00</p>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-[#ff9f00] border-2 border-[rgba(255,255,255,0.2)] border-solid left-0 rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[32px] top-0" data-name="Container" />;
}

function ColorPicker() {
  return <div className="absolute left-0 opacity-0 size-[32px] top-0" data-name="Color Picker" />;
}

function Container5() {
  return (
    <div className="absolute left-0 size-[32px] top-0" data-name="Container">
      <Container4 />
      <ColorPicker />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[32px] relative shrink-0 w-[136px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[136px]">
        <Input />
        <Container5 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel2 />
      <Container6 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16px] relative shrink-0 w-[54.82px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[54.82px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px whitespace-pre">Lightness</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[25.43px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[25.43px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] top-px w-[26px]">78%</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return <div className="bg-[#030213] h-[16px] shrink-0 w-full" data-name="Text" />;
}

function Text3() {
  return (
    <div className="absolute bg-[#ececf0] box-border content-stretch flex flex-col h-[16px] items-start left-0 overflow-clip pl-0 pr-[80.078px] py-0 rounded-[1.67772e+07px] top-0 w-[364px]" data-name="Text">
      <Text2 />
    </div>
  );
}

function Slider() {
  return <div className="absolute bg-white border border-[#030213] border-solid left-[271.44px] rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[16px] top-0" data-name="Slider" />;
}

function PrimitiveSpan2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Primitive.span">
      <Text3 />
      <Slider />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <PrimitiveSpan2 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[44.203px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px whitespace-pre">Chroma</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[31.094px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px whitespace-pre">0.180</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return <div className="bg-[#030213] h-[16px] shrink-0 w-full" data-name="Text" />;
}

function Text7() {
  return (
    <div className="absolute bg-[#ececf0] box-border content-stretch flex flex-col h-[16px] items-start left-0 overflow-clip pl-0 pr-[200.195px] py-0 rounded-[1.67772e+07px] top-0 w-[364px]" data-name="Text">
      <Text6 />
    </div>
  );
}

function Slider1() {
  return <div className="absolute bg-white border border-[#030213] border-solid left-[156.59px] rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[16px] top-0" data-name="Slider" />;
}

function PrimitiveSpan3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Primitive.span">
      <Text7 />
      <Slider1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <PrimitiveSpan3 />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[22.766px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px whitespace-pre">Hue</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[19.766px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] top-px w-[20px]">70°</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return <div className="bg-[#030213] h-[16px] shrink-0 w-full" data-name="Text" />;
}

function Text11() {
  return (
    <div className="absolute bg-[#ececf0] box-border content-stretch flex flex-col h-[16px] items-start left-0 overflow-clip pl-0 pr-[293.219px] py-0 rounded-[1.67772e+07px] top-[-5px] w-[364px]" data-name="Text">
      <Text10 />
    </div>
  );
}

function Slider2() {
  return <div className="absolute bg-white border border-[#030213] border-solid left-[67.66px] rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[16px] top-[-5px]" data-name="Slider" />;
}

function PrimitiveSpan4() {
  return (
    <div className="bg-gradient-to-r from-[#fb2c36] h-[6px] opacity-80 relative rounded-[1.67772e+07px] shrink-0 to-[#2b7fff] via-50% via-[#00c950] w-full" data-name="Primitive.span">
      <Text11 />
      <Slider2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[30px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <PrimitiveSpan4 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(9,9,11,0.5)] h-[168px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[168px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container9 />
          <Container11 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[216px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container14 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-nowrap text-zinc-300 top-[0.5px] tracking-[-0.1504px] whitespace-pre">Shape Configuration</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[166.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[166.109px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px whitespace-pre">Gradient Mask Size (Shape 1)</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[26.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[26.391px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] top-px w-[27px]">40%</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return <div className="bg-[#030213] h-[16px] shrink-0 w-full" data-name="Text" />;
}

function Text15() {
  return (
    <div className="absolute bg-[#ececf0] box-border content-stretch flex flex-col h-[16px] items-start left-0 overflow-clip pl-0 pr-[238.797px] py-0 rounded-[1.67772e+07px] top-0 w-[398px]" data-name="Text">
      <Text14 />
    </div>
  );
}

function Slider3() {
  return <div className="absolute bg-white border border-[#030213] border-solid left-[152.8px] rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[16px] top-0" data-name="Slider" />;
}

function PrimitiveSpan5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Primitive.span">
      <Text15 />
      <Slider3 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <PrimitiveSpan5 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[62.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[62.391px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px whitespace-pre">Glow Scale</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[22.109px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] top-px w-[23px]">1.0x</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return <div className="bg-[#030213] h-[16px] shrink-0 w-full" data-name="Text" />;
}

function Text19() {
  return (
    <div className="absolute bg-[#ececf0] box-border content-stretch flex flex-col h-[16px] items-start left-0 overflow-clip pl-0 pr-[265.328px] py-0 rounded-[1.67772e+07px] top-0 w-[398px]" data-name="Text">
      <Text18 />
    </div>
  );
}

function Slider4() {
  return <div className="absolute bg-white border border-[#030213] border-solid left-[127.33px] rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[16px] top-0" data-name="Slider" />;
}

function PrimitiveSpan6() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Primitive.span">
      <Text19 />
      <Slider4 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <PrimitiveSpan6 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[92px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] h-[145px] items-start pb-0 pt-[17px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none" />
      <Heading2 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[473px] items-start relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container15 />
      <Container21 />
    </div>
  );
}

function ControlPanel() {
  return (
    <div className="bg-[rgba(24,24,27,0.5)] h-[595px] relative rounded-[24px] shrink-0 w-full" data-name="ControlPanel">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[595px] items-start pb-px pt-[25px] px-[25px] relative w-full">
          <Container2 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Code() {
  return (
    <div className="absolute content-stretch flex h-[14.5px] items-start left-[168.62px] top-px w-[111.273px]" data-name="Code">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#52525c] text-[12px] text-center">backdrop-filter</p>
    </div>
  );
}

function Code1() {
  return (
    <div className="absolute content-stretch flex h-[14.5px] items-start left-[295.18px] top-px w-[74.18px]" data-name="Code">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#52525c] text-[12px] text-center">mask-image</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[124.13px] not-italic text-[#52525c] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">Simulating CSS</p>
      <Code />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[287.89px] not-italic text-[#52525c] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">{`&`}</p>
      <Code1 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[643.5px] items-start left-[913px] top-[267.25px] w-[448px]" data-name="Container">
      <ControlPanel />
      <Paragraph1 />
    </div>
  );
}

function Container24() {
  return <div className="absolute bg-black h-[810px] left-[-1px] opacity-0 top-[-1px] w-[373px]" data-name="Container" />;
}

function Container25() {
  return <div className="absolute bg-[#ff9f00] blur-[226px] filter left-[-113.5px] opacity-40 rounded-[1.67772e+07px] size-[600px] top-[56.7px]" data-name="Container" />;
}

function Container26() {
  return <div className="absolute bg-[#ff9f00] blur-[140px] filter left-[-38.5px] opacity-60 rounded-[1.67772e+07px] size-[450px] top-[113.4px]" data-name="Container" />;
}

function Container27() {
  return <div className="absolute bg-[#ff9f00] blur-[80px] filter h-[300px] left-[11.5px] rounded-[1.67772e+07px] top-[141.75px] w-[350px]" data-name="Container" />;
}

function Container28() {
  return <div className="absolute bg-white blur-[90px] filter h-[150px] left-[86.5px] opacity-40 rounded-[1.67772e+07px] top-[170.09px] w-[200px]" data-name="Container" />;
}

function Container29() {
  return (
    <div className="absolute h-[567px] left-[-187.5px] top-[-163px] w-[373px]" data-name="Container">
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p28e30600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" style={{ stroke: "white", strokeOpacity: "0.8" }} />
          <path d="M7.5 4.16667V15.8333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" style={{ stroke: "white", strokeOpacity: "0.8" }} />
          <path d="M12.5 4.16667V15.8333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" style={{ stroke: "white", strokeOpacity: "0.8" }} />
          <path d="M4.16667 7.5H15.8333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" style={{ stroke: "white", strokeOpacity: "0.8" }} />
          <path d="M4.16667 12.5H15.8333" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" style={{ stroke: "white", strokeOpacity: "0.8" }} />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-px relative size-[40px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[309px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.6)] text-nowrap top-px tracking-[1.2px] uppercase whitespace-pre">Work Space</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute font-['Inter:Bold',sans-serif] font-bold h-[75px] leading-[37.5px] left-0 not-italic text-[30px] text-nowrap text-white top-[24px] tracking-[-0.3545px] w-[309px] whitespace-pre" data-name="Heading 1">
      <p className="absolute left-0 top-0">Enable Efficient</p>
      <p className="absolute left-0 top-[37.5px]">Teamwork</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[45.5px] left-0 top-[107px] w-[280px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.6)] top-px tracking-[-0.1504px] w-[261px]">Create a culture of clarity, creativity, and connection across every project.</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[152.5px] relative shrink-0 w-[309px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[152.5px] relative w-[309px]">
        <Paragraph2 />
        <Heading />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[60.35px] size-[18px] top-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p37eb99f0} fill="var(--fill-0, #4285F4)" id="Vector" style={{ fill: "color(display-p3 0.2588 0.5216 0.9569)", fillOpacity: "1" }} />
          <path d={svgPaths.p308f1900} fill="var(--fill-0, #34A853)" id="Vector_2" style={{ fill: "color(display-p3 0.2039 0.6588 0.3255)", fillOpacity: "1" }} />
          <path d={svgPaths.p9781980} fill="var(--fill-0, #FBBC05)" id="Vector_3" style={{ fill: "color(display-p3 0.9843 0.7373 0.0196)", fillOpacity: "1" }} />
          <path d={svgPaths.p41b6700} fill="var(--fill-0, #EA4335)" id="Vector_4" style={{ fill: "color(display-p3 0.9176 0.2627 0.2078)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[48px] relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Button">
      <Icon2 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[167.35px] not-italic text-[16px] text-black text-center text-nowrap top-[11.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Continue With Google</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] h-[48px] relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[154.86px] not-italic text-[16px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-[11.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Skip</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[108px] relative shrink-0 w-[309px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-[108px] items-start relative w-[309px]">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[24px] h-[810px] items-start justify-end left-[-1px] pb-[24px] pl-[32px] pr-0 pt-[389.5px] top-[-1px] w-[373px]" data-name="Container">
      <Container30 />
      <Container31 />
      <Container32 />
    </div>
  );
}

function GlowPreview() {
  return (
    <div className="absolute bg-[#050505] border-2 border-[rgba(255,255,255,0)] border-solid h-[812px] left-0 overflow-clip rounded-[40px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[375px]" data-name="GlowPreview">
      <Container24 />
      <Container29 />
      <Container33 />
    </div>
  );
}

function Container34() {
  return <div className="absolute bg-[rgba(254,154,0,0.2)] blur-3xl filter h-[32px] left-[37.5px] opacity-30 top-[828px] w-[300px]" data-name="Container" />;
}

function Container35() {
  return (
    <div className="absolute h-[812px] left-[442px] top-[183px] w-[375px]" data-name="Container">
      <GlowPreview />
      <Container34 />
    </div>
  );
}

export default function GlowEffectCssEditor() {
  return (
    <div className="bg-black relative size-full" data-name="Glow Effect CSS Editor">
      <Container23 />
      <Container35 />
    </div>
  );
}