"use client";

/**
 * Interactive US Map SVG Component
 * Each state is a clickable path that triggers a callback with the state abbreviation
 * Birthday rule states are highlighted with a different color
 */

interface USMapSVGProps {
  onStateClick: (stateAbbr: string) => void;
  birthdayRuleStates: string[];
  hoveredState: string | null;
  onStateHover: (stateAbbr: string | null) => void;
}

export default function USMapSVG({ onStateClick, birthdayRuleStates, hoveredState, onStateHover }: USMapSVGProps) {
  const getStateFill = (abbr: string) => {
    const isBirthdayRule = birthdayRuleStates.includes(abbr);
    const isHovered = hoveredState === abbr;
    
    if (isHovered) return "#0d9488"; // teal-600
    if (isBirthdayRule) return "#1e3a5f"; // dark navy for birthday rule states
    return "#5b9bd5"; // lighter blue for regular states
  };

  const getStateStroke = (abbr: string) => {
    return hoveredState === abbr ? "#ffffff" : "#ffffff";
  };

  const getStateStrokeWidth = (abbr: string) => {
    return hoveredState === abbr ? "2" : "1";
  };

  const stateProps = (abbr: string) => ({
    fill: getStateFill(abbr),
    stroke: getStateStroke(abbr),
    strokeWidth: getStateStrokeWidth(abbr),
    className: "cursor-pointer transition-all duration-200",
    onClick: () => onStateClick(abbr),
    onMouseEnter: () => onStateHover(abbr),
    onMouseLeave: () => onStateHover(null),
  });

  return (
    <svg viewBox="0 0 960 600" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Alabama */}
      <path d="M628,425 L628,466 L620,477 L625,483 L623,488 L630,488 L632,485 L640,486 L640,425Z" {...stateProps("AL")} />
      {/* Alaska */}
      <path d="M161,485 L183,485 L183,493 L193,493 L193,485 L209,485 L209,505 L161,505Z" {...stateProps("AK")} />
      {/* Arizona */}
      <path d="M205,390 L205,440 L195,453 L230,453 L243,468 L258,453 L258,378 L230,378Z" {...stateProps("AZ")} />
      {/* Arkansas */}
      <path d="M556,410 L556,452 L600,452 L600,408 L590,408Z" {...stateProps("AR")} />
      {/* California */}
      <path d="M122,290 L122,420 L140,440 L155,440 L165,430 L175,430 L185,410 L185,370 L175,340 L155,310 L140,290Z" {...stateProps("CA")} />
      {/* Colorado */}
      <path d="M295,295 L295,355 L380,355 L380,295Z" {...stateProps("CO")} />
      {/* Connecticut */}
      <path d="M830,195 L830,210 L850,210 L850,195Z" {...stateProps("CT")} />
      {/* Delaware */}
      <path d="M795,270 L795,290 L805,290 L805,270Z" {...stateProps("DE")} />
      {/* Florida */}
      <path d="M640,460 L640,488 L665,488 L680,500 L700,530 L705,545 L695,555 L680,545 L670,530 L660,505 L640,490 L635,488 L640,460Z" {...stateProps("FL")} />
      {/* Georgia */}
      <path d="M660,400 L660,460 L700,460 L700,430 L690,400Z" {...stateProps("GA")} />
      {/* Hawaii */}
      <path d="M260,510 L270,510 L275,515 L270,520 L260,520Z" {...stateProps("HI")} />
      {/* Idaho */}
      <path d="M210,140 L210,250 L245,250 L245,200 L235,180 L225,140Z" {...stateProps("ID")} />
      {/* Illinois */}
      <path d="M580,250 L580,350 L610,350 L615,340 L610,250Z" {...stateProps("IL")} />
      {/* Indiana */}
      <path d="M620,255 L620,340 L650,340 L650,255Z" {...stateProps("IN")} />
      {/* Iowa */}
      <path d="M500,230 L500,280 L570,280 L570,230Z" {...stateProps("IA")} />
      {/* Kansas */}
      <path d="M410,310 L410,360 L500,360 L500,310Z" {...stateProps("KS")} />
      {/* Kentucky */}
      <path d="M620,340 L620,370 L700,370 L710,355 L680,340Z" {...stateProps("KY")} />
      {/* Louisiana */}
      <path d="M556,452 L556,500 L590,500 L600,490 L600,452Z" {...stateProps("LA")} />
      {/* Maine */}
      <path d="M860,100 L860,160 L880,160 L880,130 L870,100Z" {...stateProps("ME")} />
      {/* Maryland */}
      <path d="M745,270 L745,290 L790,290 L790,270Z" {...stateProps("MD")} />
      {/* Massachusetts */}
      <path d="M835,180 L835,192 L870,192 L870,180Z" {...stateProps("MA")} />
      {/* Michigan */}
      <path d="M600,160 L600,240 L640,240 L660,200 L650,160Z" {...stateProps("MI")} />
      {/* Minnesota */}
      <path d="M480,120 L480,210 L540,210 L540,120Z" {...stateProps("MN")} />
      {/* Mississippi */}
      <path d="M600,410 L600,480 L628,480 L628,425 L610,410Z" {...stateProps("MS")} />
      {/* Missouri */}
      <path d="M530,300 L530,380 L580,380 L590,370 L580,350 L580,300Z" {...stateProps("MO")} />
      {/* Montana */}
      <path d="M260,100 L260,175 L380,175 L380,100Z" {...stateProps("MT")} />
      {/* Nebraska */}
      <path d="M380,255 L380,305 L490,305 L490,255Z" {...stateProps("NE")} />
      {/* Nevada */}
      <path d="M175,220 L175,370 L210,370 L210,280 L195,220Z" {...stateProps("NV")} />
      {/* New Hampshire */}
      <path d="M850,130 L850,175 L860,175 L860,130Z" {...stateProps("NH")} />
      {/* New Jersey */}
      <path d="M800,225 L800,270 L815,270 L815,225Z" {...stateProps("NJ")} />
      {/* New Mexico */}
      <path d="M270,380 L270,450 L350,450 L350,380Z" {...stateProps("NM")} />
      {/* New York */}
      <path d="M760,160 L760,220 L830,220 L840,200 L830,180 L800,160Z" {...stateProps("NY")} />
      {/* North Carolina */}
      <path d="M680,350 L680,385 L780,385 L780,365 L740,350Z" {...stateProps("NC")} />
      {/* North Dakota */}
      <path d="M390,110 L390,170 L470,170 L470,110Z" {...stateProps("ND")} />
      {/* Ohio */}
      <path d="M655,240 L655,310 L710,310 L710,240Z" {...stateProps("OH")} />
      {/* Oklahoma */}
      <path d="M390,365 L390,410 L530,410 L530,380 L500,365Z" {...stateProps("OK")} />
      {/* Oregon */}
      <path d="M120,140 L120,220 L200,220 L200,180 L180,140Z" {...stateProps("OR")} />
      {/* Pennsylvania */}
      <path d="M715,215 L715,255 L795,255 L795,215Z" {...stateProps("PA")} />
      {/* Rhode Island */}
      <path d="M852,195 L852,205 L860,205 L860,195Z" {...stateProps("RI")} />
      {/* South Carolina */}
      <path d="M700,380 L700,420 L740,420 L750,400 L730,380Z" {...stateProps("SC")} />
      {/* South Dakota */}
      <path d="M390,175 L390,240 L480,240 L480,175Z" {...stateProps("SD")} />
      {/* Tennessee */}
      <path d="M610,360 L610,395 L710,395 L720,380 L710,360Z" {...stateProps("TN")} />
      {/* Texas */}
      <path d="M350,400 L350,520 L430,540 L470,510 L500,480 L530,450 L530,410 L390,410 L390,400Z" {...stateProps("TX")} />
      {/* Utah */}
      <path d="M245,250 L245,345 L295,345 L295,250Z" {...stateProps("UT")} />
      {/* Vermont */}
      <path d="M835,130 L835,175 L845,175 L845,130Z" {...stateProps("VT")} />
      {/* Virginia */}
      <path d="M700,310 L700,360 L780,360 L790,340 L760,310Z" {...stateProps("VA")} />
      {/* Washington */}
      <path d="M130,70 L130,140 L210,140 L210,100 L180,70Z" {...stateProps("WA")} />
      {/* West Virginia */}
      <path d="M710,290 L710,340 L740,340 L740,310 L730,290Z" {...stateProps("WV")} />
      {/* Wisconsin */}
      <path d="M540,140 L540,230 L590,230 L590,160 L570,140Z" {...stateProps("WI")} />
      {/* Wyoming */}
      <path d="M280,175 L280,250 L370,250 L370,175Z" {...stateProps("WY")} />
      {/* DC */}
      <path d="M770,285 L770,295 L780,295 L780,285Z" {...stateProps("DC")} />
    </svg>
  );
}
