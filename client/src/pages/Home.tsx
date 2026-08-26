/** Signal Room style reminder: oceanographic instrument narrative; official Pacific data is the subject, and visual restraint protects uncertainty. */
import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Activity,
  ArrowDown,
  ArrowLeftRight,
  BookOpen,
  ChevronDown,
  CircleDashed,
  Check,
  Copy,
  Download,
  Eye,
  ImageDown,
  LoaderCircle,
  ExternalLink,
  Info,
  Radio,
  Share2,
  Waves,
  X,
} from "lucide-react";
import { signalRoom, type SignalCountry, type SignalPoint } from "@/data/signalRoomData";
import { projectProfile } from "@/config/projectProfile";

type Metric = "sst" | "sea" | "stations" | "ghg";
type Room = { meta: typeof signalRoom.meta; countries: SignalCountry[] };
type ClimateContext = { label: string; note: string; source: string; url: string };

const room = signalRoom as unknown as Room;
const ASSET_BASE = (import.meta.env.VITE_ASSET_BASE ?? "/manus-storage").replace(/\/$/, "");
const HERO_TEXTURE = `${ASSET_BASE}/signal-room-hero-texture_5b0b26ef.png`;
const MARK = `${ASSET_BASE}/signal-room-mark_28d6673a.png`;
const FIELD_FOIL = `${ASSET_BASE}/signal-room-field-foil_6caa5c14.png`;
const INTRO_STORAGE_KEY = "pacific-signal-room-intro-seen";
const PACIFIC_DATA_HUB_URL = "https://stats.pacificdata.org/";
const climateContext: Record<number, ClimateContext> = {
  1998: { label: "1997–98 El Niño context", note: "WMO identifies 1997–98 as comparable with the strong 2015–16 El Niño.", source: "WMO ENSO update", url: "https://wmo.int/files/el-ninola-nina-update-february-2016" },
  2016: { label: "2015–16 El Niño context", note: "WMO reported the event as one of the strongest on record.", source: "WMO ENSO update", url: "https://wmo.int/files/el-ninola-nina-update-february-2016" },
  2024: { label: "Global ocean-heat context", note: "WMO confirmed exceptional land and sea-surface temperatures and ocean heat in 2024.", source: "WMO 2024 climate assessment", url: "https://wmo.int/news/media-centre/wmo-confirms-2024-warmest-year-record-about-155degc-above-pre-industrial-level" },
};

const metricMeta: Record<Metric, { label: string; short: string; unit: string; color: string; soft: string; description: string; caveat: string }> = {
  sst: {
    label: "Sea-surface temperature anomaly",
    short: "Warming water",
    unit: "°C",
    color: "#9ae3dd",
    soft: "#d8f3ef",
    description: "The latest annual anomaly recorded in the official Pacific Data Hub series.",
    caveat: "An annual anomaly is a temperature departure, not a forecast or an attribution of a single event.",
  },
  sea: {
    label: "Sea-level anomaly",
    short: "Sea level",
    unit: "m",
    color: "#a7b9ff",
    soft: "#e6e9ff",
    description: "The latest annual sea-level anomaly in the official record.",
    caveat: "This indicator is an anomaly series. It should not be read as a local flood-height projection.",
  },
  stations: {
    label: "Meteorological monitoring network",
    short: "Monitoring record",
    unit: "sites",
    color: "#f2c46f",
    soft: "#fff0cf",
    description: "The latest reported number of meteorological monitoring sites in the official record.",
    caveat: "A reported site count is not a measure of complete early-warning capacity, maintenance, data quality, or community knowledge.",
  },
  ghg: {
    label: "Greenhouse-gas emissions per capita",
    short: "GHG / person",
    unit: "tCO₂e",
    color: "#a7b9ff",
    soft: "#e6e9ff",
    description: "The latest annual greenhouse-gas emissions per capita recorded in the official series.",
    caveat: "Per-capita emissions are one measure of contribution; they do not determine a place’s climate exposure.",
  },
};

const fieldPositions: Record<string, [number, number]> = {
  AS: [170, 110], CK: [230, 330], FJ: [430, 330], PF: [110, 400], GU: [470, 95], KI: [590, 235],
  MH: [650, 140], FM: [560, 130], NR: [680, 300], NC: [370, 430], NU: [280, 395], MP: [520, 75],
  PW: [500, 205], PG: [535, 380], PN: [170, 480], WS: [330, 290], SB: [520, 440], TK: [360, 250],
  TO: [400, 260], TV: [620, 265], VU: [455, 420], WF: [390, 220],
};

function format(value: number | undefined, digits = 1) {
  if (value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(value);
}

function latest(country: SignalCountry, metric: Metric) {
  return country.summary[metric];
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const temporaryField = document.createElement("textarea");
    temporaryField.value = text;
    temporaryField.setAttribute("readonly", "");
    temporaryField.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(temporaryField);
    temporaryField.select();
    const copiedWithLegacyMethod = document.execCommand("copy");
    temporaryField.remove();
    return copiedWithLegacyMethod;
  }
}

function pathFor(series: SignalPoint[], width = 620, height = 180) {
  if (!series.length) return "";
  const values = series.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return series.map((point, index) => {
    const x = 18 + (index / Math.max(series.length - 1, 1)) * (width - 36);
    const y = 18 + ((max - point.value) / range) * (height - 42);
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function pathForRange(series: SignalPoint[], min: number, max: number, width = 300, height = 150) {
  if (!series.length) return "";
  const range = max - min || 1;
  return series.map((point, index) => {
    const x = 16 + (index / Math.max(series.length - 1, 1)) * (width - 32);
    const y = 14 + ((max - point.value) / range) * (height - 30);
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function ExportTrace({ country, metric, min, max, tone }: { country: SignalCountry; metric: Metric; min: number; max: number; tone: string }) {
  const width = 1120;
  const height = 340;
  const padX = 24;
  const padY = 24;
  const series = country.series[metric];
  const range = max - min || 1;
  return (
    <svg className="current-state-sheet__plot" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${country.name} ${metricMeta[metric].label} annual series`}>
      <g stroke="rgba(219,242,238,.17)" strokeDasharray="4 8"><line x1={padX} x2={width - padX} y1={padY} y2={padY} /><line x1={padX} x2={width - padX} y1={height / 2} y2={height / 2} /><line x1={padX} x2={width - padX} y1={height - padY} y2={height - padY} /></g>
      <path d={pathForRange(series, min, max, width, height)} fill="none" stroke={tone} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {series.map((point, index) => { const x = padX + (index / Math.max(series.length - 1, 1)) * (width - padX * 2); const y = padY + ((max - point.value) / range) * (height - padY * 2); return <circle key={point.year} cx={x} cy={y} r={climateContext[point.year] ? 5.5 : 3.5} fill={tone} stroke={climateContext[point.year] ? "#f28a70" : "none"} strokeWidth={climateContext[point.year] ? 3 : 0} />; })}
    </svg>
  );
}

function TracePlot({ country, metric, min, max, width = 620, height = 180, tone, compact = false }: { country: SignalCountry; metric: Metric; min: number; max: number; width?: number; height?: number; tone: string; compact?: boolean }) {
  const series = country.series[metric];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const meta = metricMeta[metric];
  const padX = compact ? 16 : 18;
  const padY = compact ? 14 : 18;
  const range = max - min || 1;
  const activePoint = activeIndex === null ? null : series[activeIndex];
  const activeX = activeIndex === null ? 0 : padX + (activeIndex / Math.max(series.length - 1, 1)) * (width - padX * 2);
  const activeY = activePoint ? padY + ((max - activePoint.value) / range) * (height - padY * 2 - (compact ? 2 : 6)) : 0;
  const tooltipLeft = Math.min(92, Math.max(8, (activeX / width) * 100));
  const tooltipPlacement = activeY < height * 0.38 ? "trace-tooltip--below" : "trace-tooltip--above";
  const pointPath = compact ? pathForRange(series, min, max, width, height) : pathFor(series, width, height);
  const pointY = (point: SignalPoint) => padY + ((max - point.value) / range) * (height - padY * 2 - (compact ? 2 : 6));
  return (
    <div className={`trace-plot ${compact ? "trace-plot--compact" : ""}`} onMouseLeave={() => setActiveIndex(null)}>
      <svg className="trace-plot__svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${country.name} ${meta.label} annual series. Hover or focus a point for an exact recorded value.`}>
        <g stroke="rgba(219,242,238,.17)" strokeDasharray="3 6"><line x1={padX} x2={width - padX} y1={padY} y2={padY} /><line x1={padX} x2={width - padX} y1={height / 2} y2={height / 2} /><line x1={padX} x2={width - padX} y1={height - padY} y2={height - padY} /></g>
        <path d={pointPath} fill="none" stroke={tone} strokeWidth={compact ? "2.5" : "3"} strokeLinecap="round" strokeLinejoin="round" />
        {series.map((point, index) => {
          const x = padX + (index / Math.max(series.length - 1, 1)) * (width - padX * 2);
          const y = pointY(point);
          const contextual = climateContext[point.year];
          return <g key={point.year} className="trace-plot__point" tabIndex={0} role="button" aria-label={`${point.year}: ${format(point.value, metric === "ghg" ? 1 : 2)} ${meta.unit}${contextual ? `. ${contextual.label}` : ". No event annotation in this source record."}`} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)}><circle cx={x} cy={y} r={contextual ? 7 : 5} fill="transparent" /><circle cx={x} cy={y} r={activeIndex === index ? 4.6 : contextual ? 3.5 : 2.2} fill={activeIndex === index ? "#fffdf4" : tone} stroke={contextual ? "#f28a70" : "none"} strokeWidth={contextual ? 2 : 0} /></g>;
        })}
      </svg>
      {activePoint && <div className={`trace-tooltip ${tooltipPlacement}`} style={{ left: `${tooltipLeft}%`, top: `${(activeY / height) * 100}%` }} role="status"><p className="mono-label text-[#9ae3dd]">EXACT ANNUAL RECORD</p><strong>{activePoint.year} · {format(activePoint.value, metric === "ghg" ? 1 : 2)} {meta.unit}</strong><span>{country.name} · Pacific Data Hub .Stat</span>{climateContext[activePoint.year] ? <a href={climateContext[activePoint.year].url} target="_blank" rel="noreferrer">{climateContext[activePoint.year].label} <ExternalLink size={11} /></a> : <em>No event annotation in this source record.</em>}</div>}
    </div>
  );
}

function MethodologyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="signal-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="signal-guide methodology-modal" role="dialog" aria-modal="true" aria-labelledby="methodology-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="signal-guide__header"><div><p className="mono-label text-[#9ae3dd]">CREDIBILITY RECORD</p><h2 id="methodology-title" className="display-serif mt-2 text-4xl text-[#fffdf4]">Methodology &amp; data sources</h2></div><button className="signal-icon-button" onClick={onClose} aria-label="Close methodology"><X size={20} /></button></div>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#c8dfdc]">The Signal Room renders annual values from the official Pacific Community / Pacific Data Hub .Stat climate-change dataflow. It keeps source dates, units, and missing observations visible rather than estimating values or converting records into a preparedness score.</p>
        <div className="methodology-grid mt-8"><div><p className="mono-label text-[#f2c46f]">DATAFLOW</p><p><code>DF_CLIMATE_CHANGE</code> · Pacific Data Hub .Stat</p><a href={PACIFIC_DATA_HUB_URL} target="_blank" rel="noreferrer">Open the official explorer <ExternalLink size={13} /></a></div><div><p className="mono-label text-[#9ae3dd]">INDICATORS</p><p><code>SST_ANOM</code>, <code>SEA_LVL</code>, <code>METEO_MONITOR_NET</code>, <code>GHG_EMI_CAPITA</code></p></div><div><p className="mono-label text-[#f28a70]">INTERPRETATION</p><p>First-to-latest change is descriptive, not a trend model or causal finding. Monitoring sites do not measure all local knowledge or early-warning capacity.</p></div><div><p className="mono-label text-[#a7b9ff]">CONTEXT LABELS</p><p>Annual labels appear only where separately cited WMO global climate context is available; they do not attribute local outcomes.</p><WmoTerm label="El Niño" definition="WMO described the 2015–16 El Niño as a strong global climate pattern, comparable with 1997–98. This label does not claim it caused a value or outcome in any selected place." url={climateContext[2016].url} /><WmoTerm label="Global ocean heat" definition="WMO reported exceptional ocean heat in 2024 at a global scale. In this room, the label supplies global framing only; it is not a local-condition or causal explanation." url={climateContext[2024].url} /><WmoTerm label="Global context" definition="A separately cited statement about broad global conditions. It helps orient an annual record but never attributes a local impact, trend, or outcome." url={climateContext[2024].url} /></div></div>
        <div className="methodology-note mt-7"><Info size={18} /><p>Latest available years differ among indicators. Use the record ribbon and tooltips to inspect each country or territory’s actual coverage before comparing values.</p></div>
        <SourceCredits />
        <div className="mt-8 flex justify-end border-t border-[#9ae3dd]/20 pt-5"><button className="signal-button signal-button--seafoam" onClick={onClose}>Return to the record <ArrowDown size={16} /></button></div>
      </section>
    </div>
  );
}

function WmoTerm({ label, definition, url }: { label: string; definition: string; url: string }) {
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const copySource = async () => {
    const copied = await writeClipboard(url);
    setCopyStatus(copied ? "copied" : "failed");
    window.setTimeout(() => setCopyStatus("idle"), 2600);
  };
  return (
    <span className="wmo-term" onMouseLeave={() => setOpen(false)}>
      <button type="button" className="wmo-term__button" aria-expanded={open} onMouseEnter={() => setOpen(true)} onFocus={() => setOpen(true)} onClick={() => setOpen((value) => !value)}>{label}<Info size={12} /></button>
      {open && <span className="wmo-term__tooltip" role="tooltip"><strong>{label}</strong><span>{definition}</span><span className="wmo-term__actions"><a href={url} target="_blank" rel="noreferrer">Read WMO source <ExternalLink size={11} /></a><button type="button" onClick={copySource}>{copyStatus === "copied" ? <Check size={11} /> : <Copy size={11} />}{copyStatus === "copied" ? "Source copied" : "Copy source link"}</button></span>{copyStatus === "failed" && <span className="wmo-term__copy-error" role="status">Copy was blocked by this browser.</span>}</span>}
    </span>
  );
}

function SourceCredits() {
  return (
    <section className="source-credits" aria-label="Sources cited in this entry">
      <p className="mono-label text-[#f2c46f]">SOURCES CITED IN THIS ENTRY</p>
      <div className="source-credits__links"><a href={PACIFIC_DATA_HUB_URL} target="_blank" rel="noreferrer"><span>01</span> Pacific Community · Pacific Data Hub .Stat, <code>DF_CLIMATE_CHANGE</code> <ExternalLink size={12} /></a><a href={climateContext[2016].url} target="_blank" rel="noreferrer"><span>02</span> World Meteorological Organization · El Niño/La Niña Update (February 2016) <ExternalLink size={12} /></a><a href={climateContext[2024].url} target="_blank" rel="noreferrer"><span>03</span> World Meteorological Organization · 2024 climate assessment (January 2025) <ExternalLink size={12} /></a></div>
    </section>
  );
}

function ComparisonTrace({ country, metric, min, max, role }: { country: SignalCountry; metric: Metric; min: number; max: number; role: "Selected" | "Comparison" }) {
  const series = country.series[metric];
  const record = latest(country, metric);
  const meta = metricMeta[metric];
  const tone = role === "Selected" ? "#9ae3dd" : "#f2c46f";
  return (
    <article className="comparison-trace">
      <div className="flex items-start justify-between gap-4"><div><p className="mono-label" style={{ color: tone }}>{role.toUpperCase()} TRACE</p><h3 className="display-serif mt-2 text-3xl text-[#fffdf4]">{country.name}</h3></div>{record && <span className="comparison-trace__value">{format(record.latest, metric === "ghg" ? 1 : 2)} {meta.unit}<small>{record.latestYear}</small></span>}</div>
      <TracePlot country={country} metric={metric} min={min} max={max} width={300} height={150} tone={tone} compact />
      <div className="flex justify-between text-xs text-[#b8d3d0]"><span>{series[0]?.year ?? "—"}</span><span>{series.at(-1)?.year ?? "—"}</span></div>
      <div className="comparison-trace__ribbon" aria-label={`${series.length} annual observations`}>{series.map((point) => <i key={point.year} style={{ height: `${15 + ((point.value - min) / Math.max(max - min, .0001)) * 20}px`, backgroundColor: tone }} title={`${point.year}: ${format(point.value, metric === "ghg" ? 1 : 2)} ${meta.unit}`} />)}</div>
    </article>
  );
}

function MetricSwitch({ active, onChange }: { active: Metric; onChange: (metric: Metric) => void }) {
  return (
    <div className="signal-switch" role="tablist" aria-label="Choose a climate signal">
      {(Object.keys(metricMeta) as Metric[]).map((metric) => (
        <button
          key={metric}
          role="tab"
          aria-selected={active === metric}
          onClick={() => onChange(metric)}
          className={active === metric ? "signal-switch__active" : ""}
        >
          <span className="signal-switch__dot" style={{ backgroundColor: metricMeta[metric].color }} />
          {metricMeta[metric].short}
        </button>
      ))}
    </div>
  );
}

function Stat({ eyebrow, value, note, accent }: { eyebrow: string; value: string; note: string; accent: string }) {
  return (
    <div className="signal-stat" style={{ "--accent": accent } as CSSProperties}>
      <span className="signal-stat__calibration" aria-hidden="true" />
      <span className="signal-stat__record-mark" aria-hidden="true"><i /><i /><i /><i /><b /></span>
      <p>{eyebrow}</p>
      <strong>{value}</strong>
      <span>{note}</span>
    </div>
  );
}

function SignalGuide({ metric, onClose }: { metric: Metric; onClose: () => void }) {
  const meta = metricMeta[metric];
  return (
    <div className="signal-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="signal-guide" role="dialog" aria-modal="true" aria-labelledby="guide-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="signal-guide__header"><div><p className="mono-label text-[#9ae3dd]">SIGNAL ROOM FIELD GUIDE</p><h2 id="guide-title" className="display-serif mt-2 text-4xl text-[#fffdf4]">How to read this signal</h2></div><button className="signal-icon-button" onClick={onClose} aria-label="Close guide"><X size={20} /></button></div>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#c8dfdc]">You are reading the official record for <strong className="text-[#fffdf4]">{meta.label}</strong>. The interface makes the evidence explorable, but it does not turn a data point into a judgement about readiness or safety.</p>
        <div className="signal-guide__steps mt-8">
          <div><span><Radio size={18} /></span><div><p className="mono-label text-[#f2c46f]">01 · TUNE</p><h3>Choose one signal at a time.</h3><p>The field compares the latest recorded value within the selected indicator only. Different indicators have different units and latest years, so their nodes should never be compared across tabs.</p></div></div>
          <div><span><CircleDashed size={18} /></span><div><p className="mono-label text-[#9ae3dd]">02 · LOCATE</p><h3>Read the rings as records, not rankings.</h3><p>Each seafoam ring marks a country or territory with a recorded series. Its inner dot identifies the active signal. Larger nodes mean a higher latest value within this view; the field is schematic, not a geographic map.</p></div></div>
          <div><span><Activity size={18} /></span><div><p className="mono-label text-[#f28a70]">03 · FOLLOW</p><h3>Open a place and read its trace.</h3><p>The field log shows the first and latest annual record. The line and record ribbon expose the series rather than smoothing or filling missing observations.</p></div></div>
          <div><span><Waves size={18} /></span><div><p className="mono-label text-[#a7b9ff]">04 · HOLD THE LIMIT</p><h3>Observation is not the same as safety.</h3><p>{meta.caveat} Local knowledge, instruments outside this record, data quality, and response capacity are not represented by a single indicator.</p></div></div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-[#9ae3dd]/20 pt-5"><p className="text-xs text-[#aac5c2]">The guide updates to the indicator you are currently tuning.</p><button className="signal-button signal-button--seafoam" onClick={onClose}>Return to the record <ArrowDown size={16} /></button></div>
      </section>
    </div>
  );
}

function SignalIntro({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="signal-intro-overlay" style={{ "--hero-texture": `url(${HERO_TEXTURE})` } as CSSProperties} role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <div className="signal-intro-overlay__grid" />
      <div className="signal-intro-overlay__body">
        <img src={MARK} alt="" className="signal-intro-overlay__mark" />
        <p className="mono-label text-[#9ae3dd]">OPENING THE PACIFIC SIGNAL ROOM</p>
        <h2 id="intro-title" className="display-serif mt-5 max-w-3xl text-5xl leading-[.9] tracking-[-.03em] text-[#fffdf4] sm:text-7xl">Before a signal can guide action,<br /><em className="font-normal text-[#9ae3dd]">it must be recorded.</em></h2>
        <div className="signal-intro-overlay__sequence mt-10"><p><i /> Ocean changes.</p><p><i /> Records arrive unevenly.</p><p><i /> Attention begins with what we can see.</p></div>
        <div className="mt-10 flex flex-wrap items-center gap-4"><button className="signal-button signal-button--seafoam" onClick={onEnter}>Enter the Signal Room <ArrowDown size={16} /></button><button className="signal-link-button" onClick={onEnter}>Skip introduction</button></div>
      </div>
    </div>
  );
}

function SignalField({ metric, selectedCode, onSelect }: { metric: Metric; selectedCode: string; onSelect: (code: string) => void }) {
  const data = useMemo(() => room.countries.filter((country) => latest(country, metric)), [metric]);
  const values = data.map((country) => latest(country, metric)?.latest ?? 0);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const metricColor = metricMeta[metric].color;
  const signalColor = "#8fd8d4";

  return (
    <div className="signal-field-wrap">
      <svg className="signal-field" viewBox="0 0 760 540" role="img" aria-label={`Schematic Pacific signal field, showing ${metricMeta[metric].label}`}>
        <defs>
          <filter id="signalGlow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <pattern id="microGrid" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M 38 0 L 0 0 0 38" fill="none" stroke="rgba(154,227,221,.07)" strokeWidth="1" /></pattern>
        </defs>
        <rect width="760" height="540" fill="url(#microGrid)" />
        <g opacity=".34" fill="none" stroke="#8fd8d4" strokeWidth="1"><path d="M74 102 C230 40 353 88 476 62 S664 72 730 28" /><path d="M45 352 C158 290 242 356 361 326 S600 294 737 352" /><path d="M100 490 C250 420 422 515 664 430" /><path strokeDasharray="3 8" d="M106 180 C245 112 394 174 528 154 S650 146 724 190" /></g>
        <text x="24" y="34" fill="rgba(235,250,247,.52)" fontSize="10" letterSpacing="2.4">PACIFIC SIGNAL FIELD · SCHEMATIC, NOT A MAP</text>
        <text x="24" y="502" fill="rgba(235,250,247,.45)" fontSize="10" letterSpacing="1.7">EACH NODE IS A COUNTRY OR TERRITORY WITH A RECORDED SERIES</text>
        {data.map((country) => {
          const position = fieldPositions[country.code] ?? [380, 270];
          const record = latest(country, metric)!;
          const normalized = (record.latest - min) / Math.max(max - min, 0.00001);
          const radius = 10 + normalized * 20;
          const selected = country.code === selectedCode;
          return (
            <g
              key={country.code}
              role="button"
              tabIndex={0}
              aria-label={`Select ${country.name}, latest ${metricMeta[metric].label}: ${format(record.latest, metric === "ghg" ? 1 : 2)} ${metricMeta[metric].unit}`}
              className="signal-node"
              onClick={() => onSelect(country.code)}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onSelect(country.code); }}
            >
              <title>{`${country.name}: ${format(record.latest, metric === "ghg" ? 1 : 2)} ${metricMeta[metric].unit}, ${record.latestYear}`}</title>
              {selected && <><circle cx={position[0]} cy={position[1]} r={radius + 15} fill="none" stroke="#f28a70" strokeWidth="1.5" strokeDasharray="3 5" filter="url(#signalGlow)" /><path d={`M ${position[0] + radius + 20} ${position[1]} a ${radius + 20} ${radius + 20} 0 0 1 ${-(radius + 20)} ${radius + 20}`} fill="none" stroke="#f28a70" strokeWidth="1.5" /></>}
              <circle cx={position[0]} cy={position[1]} r={radius + 7} fill="none" stroke={signalColor} strokeWidth="1" opacity={selected ? ".9" : ".42"} />
              <circle cx={position[0]} cy={position[1]} r={radius} fill="#082631" stroke={selected ? "#fff8e9" : signalColor} strokeWidth={selected ? "2.5" : "1.6"} />
              <circle cx={position[0]} cy={position[1]} r={Math.max(3.5, radius * .4)} fill={selected ? "#f28a70" : metricColor} opacity=".95" />
              <text x={position[0] + radius + 7} y={position[1] + 4} fill={selected ? "#fff8e9" : "rgba(235,250,247,.85)"} fontSize="11" fontWeight={selected ? "700" : "600"}>{country.name}</text>
            </g>
          );
        })}
      </svg>
      <div className="signal-scale"><span>Lower latest recorded value</span><i /><span>Higher</span></div>
    </div>
  );
}

export default function Home() {
  const [metric, setMetric] = useState<Metric>("stations");
  const [selectedCode, setSelectedCode] = useState("VU");
  const [introOpen, setIntroOpen] = useState(() => {
    try { return window.localStorage.getItem(INTRO_STORAGE_KEY) !== "seen"; } catch { return true; }
  });
  const [guideOpen, setGuideOpen] = useState(false);
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [dashboardExporting, setDashboardExporting] = useState(false);
  const [stateExporting, setStateExporting] = useState(false);
  const [stateExportStatus, setStateExportStatus] = useState<"idle" | "success" | "error">("idle");
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [comparisonCode, setComparisonCode] = useState("FJ");
  const [traceMotionKey, setTraceMotionKey] = useState(0);
  const traceRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const stateExportRef = useRef<HTMLElement>(null);
  const selected = room.countries.find((country) => country.code === selectedCode) ?? room.countries[0];
  const selectedRecord = latest(selected, metric);
  const series = selected.series[metric];
  const fieldCount = room.countries.filter((country) => latest(country, metric)).length;
  const unchangedNetworks = room.countries.filter((country) => {
    const record = latest(country, "stations");
    return record && record.change <= 0;
  }).length;
  const stationCountries = room.countries.filter((country) => latest(country, "stations")).length;
  const traceMin = Math.min(...series.map((point) => point.value));
  const traceMax = Math.max(...series.map((point) => point.value));
  const traceRange = traceMax - traceMin || 1;
  const comparison = room.countries.find((country) => country.code === comparisonCode && latest(country, metric)) ?? room.countries.find((country) => country.code !== selected.code && latest(country, metric)) ?? selected;
  const comparisonSeries = comparison.series[metric];
  const comparisonMin = Math.min(...series.map((point) => point.value), ...comparisonSeries.map((point) => point.value));
  const comparisonMax = Math.max(...series.map((point) => point.value), ...comparisonSeries.map((point) => point.value));

  const chooseMetric = (nextMetric: Metric) => {
    if (!latest(selected, nextMetric)) {
      const firstAvailable = room.countries.find((country) => latest(country, nextMetric));
      if (firstAvailable) setSelectedCode(firstAvailable.code);
    }
    setMetric(nextMetric);
    setTraceMotionKey((key) => key + 1);
  };

  const chooseCountry = (code: string) => {
    setSelectedCode(code);
    setTraceMotionKey((key) => key + 1);
  };

  const chooseComparison = (code: string) => {
    setComparisonCode(code);
    setTraceMotionKey((key) => key + 1);
  };

  const shareText = `The Pacific Signal Room: ${selected.name} · ${metricMeta[metric].label}. Explore an official Pacific Data Hub climate record.`;

  const copyCurrentView = async () => {
    const copyText = `${shareText}\n${window.location.href}`;
    if (!(await writeClipboard(copyText))) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const shareCurrentView = async () => {
    const payload = { title: "The Pacific Signal Room", text: shareText, url: window.location.href };
    try {
      if (navigator.share) { await navigator.share(payload); return; }
      await copyCurrentView();
    } catch { /* A dismissed native share sheet or unavailable clipboard does not change the evidence view. */ }
  };

  const exportTrace = async () => {
    if (!traceRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(traceRef.current, { backgroundColor: "#072530", scale: 3, useCORS: true, logging: false });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png", 1));
      if (!blob) return;
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `pacific-signal-room_${selected.code}_${metric}_trace.png`;
      link.href = objectUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1_000);
    } finally {
      setExporting(false);
    }
  };

  const exportCurrentState = async () => {
    if (!stateExportRef.current) return;
    setStateExporting(true);
    setStateExportStatus("idle");
    try {
      const canvas = await html2canvas(stateExportRef.current, { backgroundColor: "#061b26", scale: 2.5, useCORS: true, logging: false, windowWidth: stateExportRef.current.scrollWidth });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png", 1));
      if (!blob) throw new Error("PNG generation returned no data.");
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `pacific-signal-room_${selected.code}_${metric}_current-state.png`;
      link.href = objectUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1_000);
      setStateExportStatus("success");
      window.setTimeout(() => setStateExportStatus("idle"), 5200);
    } catch {
      setStateExportStatus("error");
      window.setTimeout(() => setStateExportStatus("idle"), 5200);
    } finally {
      setStateExporting(false);
    }
  };

  const closeIntro = () => {
    try { window.localStorage.setItem(INTRO_STORAGE_KEY, "seen"); } catch { /* Preserve current-visit access if storage is unavailable. */ }
    setIntroOpen(false);
  };

  const exportDashboardPdf = async () => {
    if (!dashboardRef.current) return;
    setDashboardExporting(true);
    try {
      const canvas = await html2canvas(dashboardRef.current, { backgroundColor: "#061b26", scale: 1.5, useCORS: true, logging: false, windowWidth: dashboardRef.current.scrollWidth });
      const image = canvas.toDataURL("image/png", 1);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageHeight = (canvas.height * pageWidth) / canvas.width;
      let offset = 0;
      pdf.addImage(image, "PNG", 0, offset, pageWidth, imageHeight, undefined, "FAST");
      let remaining = imageHeight - pageHeight;
      while (remaining > 0) {
        offset = remaining - imageHeight;
        pdf.addPage();
        pdf.addImage(image, "PNG", 0, offset, pageWidth, imageHeight, undefined, "FAST");
        remaining -= pageHeight;
      }
      pdf.save(`pacific-signal-room_${selected.code}_${metric}_dashboard.pdf`);
    } finally {
      setDashboardExporting(false);
    }
  };

  return (
    <div className="signal-room min-h-screen overflow-hidden bg-[#061b26] text-[#effbf7]">
      {introOpen && <SignalIntro onEnter={closeIntro} />}
      {guideOpen && <SignalGuide metric={metric} onClose={() => setGuideOpen(false)} />}
      {methodologyOpen && <MethodologyModal onClose={() => setMethodologyOpen(false)} />}
      <div ref={dashboardRef}>
        <header className="signal-hero" style={{ backgroundImage: `linear-gradient(105deg, rgba(4,22,32,.98) 5%, rgba(4,22,32,.92) 47%, rgba(4,22,32,.60) 100%), url(${HERO_TEXTURE})` }}>
          <div className="signal-grid absolute inset-0" />
          <div className="hero-signal-field" aria-hidden="true"><span className="hero-signal-field__trace" /><span className="hero-signal-field__trace hero-signal-field__trace--lower" /><span className="hero-signal-field__orbit hero-signal-field__orbit--one" /><span className="hero-signal-field__orbit hero-signal-field__orbit--two" /><span className="hero-signal-field__orbit hero-signal-field__orbit--three" /><i className="hero-signal-field__pulse" /><i className="hero-signal-field__pulse hero-signal-field__pulse--small" /></div>
          <nav className="relative mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3"><img src={MARK} alt="The Pacific Signal Room mark" className="h-10 w-10" /><div><p className="signal-wordmark"><span>PACIFIC</span><strong>SIGNAL</strong><span>ROOM</span></p><p className="mt-1 text-xs text-[#b9d2d2]">Climate observation · 2026</p></div></div>
            <div className="signal-nav-actions"><button className="signal-nav-export" onClick={() => setMethodologyOpen(true)}><BookOpen size={14} />Method &amp; sources</button><div className="share-wrap"><button className="signal-nav-export" onClick={() => setShareOpen((open) => !open)} aria-expanded={shareOpen}><Share2 size={14} />Share</button>{shareOpen && <div className="share-popover"><button onClick={shareCurrentView}><Share2 size={14} />Use device share</button><button onClick={copyCurrentView}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Link copied" : "Copy link"}</button><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">in · LinkedIn</a><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">X · Share</a></div>}</div><button className="signal-nav-export" onClick={exportDashboardPdf} disabled={dashboardExporting}><Download size={14} />{dashboardExporting ? "Preparing PDF…" : "Export view PDF"}</button><a href="#method" className="hidden items-center gap-2 text-xs font-semibold text-[#d7eeea] transition hover:text-[#f2c46f] sm:inline-flex">Read the record <ArrowDown size={15} /></a></div>
          </nav>

          <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.18fr_.82fr] lg:px-12 lg:pb-28 lg:pt-24">
            <div className="relative">
              <span className="hero-signal-ring" aria-hidden="true" />
              <p className="mono-label text-[#f2c46f]">INTERACTIVE DATA STORY · PACIFIC DATAVIZ CHALLENGE 2026</p>
              <h1 className="display-serif mt-5 max-w-5xl text-5xl leading-[.9] tracking-[-.035em] sm:text-7xl lg:text-[5.9rem]">The ocean is changing.<br /><em className="font-normal text-[#9ae3dd]">What can we see</em><br />from shore?</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d5e8e4] sm:text-xl">A Pacific observation room for reading the official record: warming water, sea-level change, greenhouse-gas emissions, and the meteorological network that makes signals visible.</p>
              <p className="mt-5 max-w-2xl border-l border-[#f28a70] pl-4 text-sm leading-6 text-[#afc7c5]">This is not a scorecard for resilience. It is a way to inspect what is recorded, where the record is thin, and what a changing ocean asks us to notice.</p>
            </div>
            <div className="signal-observation-bank self-end border-t border-[#9ae3dd]/25 pt-5 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-8">
              <p className="mono-label text-[#9ae3dd]">THE OFFICIAL RECORD, AT A GLANCE</p>
              <div className="mt-4 grid grid-cols-2 gap-px bg-[#9ae3dd]/15"><Stat eyebrow="Warming-water series" value={`${room.meta.sstSeries}`} note={`through ${room.meta.latestSstYear}`} accent="#9ae3dd" /><Stat eyebrow="Sea-level series" value={`${room.meta.seaSeries}`} note={`through ${room.meta.latestSeaYear}`} accent="#a7b9ff" /><Stat eyebrow="Monitoring records" value={`${room.meta.stationSeries}`} note={`through ${room.meta.latestStationsYear}`} accent="#f2c46f" /><Stat eyebrow="Four-signal places" value={`${room.meta.allFour}`} note="all official indicators" accent="#9ae3dd" /></div>
              <p className="mt-5 max-w-sm text-xs leading-5 text-[#a9c6c3]">The series do not all end in the same year. That unevenness is retained rather than hidden.</p>
            </div>
          </div>
        </header>

        <main className="bg-[#eff4ee] text-[#062330]">
          <section className="signal-intro mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[.95fr_1.05fr] lg:px-12 lg:py-20">
            <div><p className="mono-label text-[#137d80]">01 · TUNE THE ROOM</p><h2 className="display-serif mt-3 max-w-xl text-4xl leading-[.95] tracking-[-.025em] sm:text-5xl">A climate signal only helps when it can be observed.</h2></div>
            <div className="self-end"><p className="max-w-2xl text-base leading-7 text-[#41606b]">Choose a signal. Each node in the field is a Pacific country or territory with a recorded series. Node size encodes the latest value within the selected indicator—not risk, readiness, or blame.</p><div className="mt-5 border-l-2 border-[#f28a70] pl-4 text-sm leading-6 text-[#45626a]"><strong className="text-[#062330]">Read with care.</strong> The field is schematic, not a geographic map. It makes the dataset explorable without claiming that a count of stations captures all observation or local knowledge.</div></div>
          </section>

          <section className="mx-auto max-w-[1440px] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
            <div className="signal-panel overflow-hidden border border-[#b9ccc8] bg-[#082631] shadow-[0_24px_70px_rgba(3,24,33,.22)]">
              <div className="border-b border-[#9ae3dd]/20 px-5 py-5 sm:px-7"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex flex-wrap items-center gap-x-4 gap-y-2"><p className="mono-label text-[#9ae3dd]">TUNE THE SIGNAL FIELD</p><button className="signal-text-button" onClick={() => setGuideOpen(true)}><Eye size={14} /> How to read this signal</button></div><h2 className="display-serif mt-2 text-3xl text-[#fffdf4] sm:text-4xl">{metricMeta[metric].label}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#c4dcda]">{metricMeta[metric].description} {fieldCount} country or territory series are receiving this signal.</p></div><MetricSwitch active={metric} onChange={chooseMetric} /></div></div>
              <div className="grid lg:grid-cols-[minmax(0,1fr)_330px]"><SignalField metric={metric} selectedCode={selectedCode} onSelect={chooseCountry} /><aside className="border-t border-[#9ae3dd]/20 bg-[#0c3440] p-6 text-[#e9f7f3] lg:border-l lg:border-t-0"><p className="mono-label text-[#f2c46f]">SELECTED FIELD LOG</p><label className="sr-only" htmlFor="signal-place">Choose a country or territory</label><div className="mt-3 flex items-center border-b border-[#9ae3dd]/25 pb-3"><select id="signal-place" value={selected.code} onChange={(event) => chooseCountry(event.target.value)} className="w-full appearance-none bg-transparent pr-6 text-2xl font-semibold text-[#fffdf4] outline-none">{room.countries.filter((country) => latest(country, metric)).map((country) => <option key={country.code} value={country.code} className="bg-[#0c3440]">{country.name}</option>)}</select><ChevronDown className="pointer-events-none -ml-6 text-[#9ae3dd]" size={18} /></div>
                {selectedRecord ? <><div className="mt-7"><p className="mono-label" style={{ color: metricMeta[metric].color }}>LATEST RECORDED VALUE</p><p className="mt-2 text-5xl font-semibold tracking-[-.05em] tabular-nums text-[#fffdf4]">{format(selectedRecord.latest, metric === "ghg" ? 1 : 2)} <span className="text-base font-normal tracking-normal text-[#a9c6c3]">{metricMeta[metric].unit}</span></p><p className="mt-2 text-sm text-[#b8d3d0]">{selectedRecord.latestYear} · {selectedRecord.records} annual observations in the official series</p></div><div className="mt-7 border-y border-[#9ae3dd]/15 py-4"><div className="flex items-center justify-between text-sm"><span className="text-[#a9c6c3]">First record</span><span>{selectedRecord.firstYear} · {format(selectedRecord.first, metric === "ghg" ? 1 : 2)} {metricMeta[metric].unit}</span></div><div className="mt-3 flex items-center justify-between text-sm"><span className="text-[#a9c6c3]">Simple change</span><span className={selectedRecord.change > 0 ? "text-[#f2c46f]" : "text-[#9ae3dd]"}>{selectedRecord.change > 0 ? "+" : ""}{format(selectedRecord.change, metric === "ghg" ? 1 : 2)} {metricMeta[metric].unit}</span></div></div><div className="mt-6 flex gap-3"><Info className="mt-0.5 shrink-0 text-[#f28a70]" size={17} /><p className="text-xs leading-5 text-[#b8d3d0]">{metricMeta[metric].caveat}</p></div></> : <p className="mt-6 text-sm text-[#b8d3d0]">No recorded series is available for the chosen indicator.</p>}</aside></div>
            </div>
          </section>

          <section className="field-journal-section border-y border-[#c8d9d4] bg-[#f9f7f0] py-14 lg:py-20"><div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="mono-label text-[#137d80]">02 · READ THE TRACE</p><h2 className="display-serif mt-3 max-w-md text-4xl leading-[.95] tracking-[-.025em] sm:text-5xl">Every reading has a history.</h2><p className="mt-5 max-w-md text-base leading-7 text-[#47636a]">The field tells you where to look. This trace tells you what the official record contains for the selected place, including the first and latest year available.</p><div className="mt-8 border-l-2 border-[#f2c46f] pl-4"><p className="mono-label text-[#997233]">A PROVISIONAL FINDING</p><p className="mt-2 text-sm leading-6 text-[#47636a]">{unchangedNetworks} of {stationCountries} places with a monitoring-network series show no net increase from their first to latest reported count. That does not prove decline in warning capacity; it is a prompt to inspect the record.</p></div></div>
            <div ref={traceRef} key={`${metric}-${selected.code}-${traceMotionKey}`} className="trace-card trace-swap relative overflow-hidden border border-[#c3d4ce] bg-[#072530] p-5 text-[#ecf9f5] sm:p-7" style={{ backgroundImage: `linear-gradient(115deg, rgba(7,37,48,.96), rgba(7,37,48,.83)), url(${FIELD_FOIL})`, backgroundSize: "cover", backgroundPosition: "right" }}><div className="relative"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="mono-label" style={{ color: metricMeta[metric].color }}>FIELD TRACE · PACIFIC SIGNAL ROOM</p><h3 className="display-serif mt-2 text-3xl text-[#fffdf4]">{selected.name} · {metricMeta[metric].short}</h3></div><div className="trace-actions">{selectedRecord && <span className="rounded-full border border-[#9ae3dd]/25 px-3 py-1 text-xs text-[#cce2df]">{selectedRecord.firstYear}–{selectedRecord.latestYear}</span>}<button className="signal-export" onClick={() => setComparisonOpen((open) => !open)}><ArrowLeftRight size={15} />{comparisonOpen ? "Close compare" : "Compare"}</button><button className="signal-export" onClick={exportTrace} disabled={exporting}><Download size={15} />{exporting ? "Preparing…" : "Trace PNG"}</button><button className="signal-export" onClick={exportCurrentState} disabled={stateExporting} aria-describedby="state-export-status">{stateExporting ? <LoaderCircle className="signal-spinner" size={15} /> : stateExportStatus === "success" ? <Check size={15} /> : <ImageDown size={15} />}{stateExporting ? "Preparing…" : stateExportStatus === "success" ? "State saved" : "State PNG"}</button></div></div><p id="state-export-status" className={`export-status export-status--${stateExportStatus}`} role="status">{stateExporting ? "Generating a high-resolution evidence sheet with the active place, source, and caveat…" : stateExportStatus === "success" ? "High-resolution State PNG is ready. It includes this view’s source and interpretation note." : stateExportStatus === "error" ? "The State PNG could not be generated. Please try again." : ""}</p>
              <TracePlot country={selected} metric={metric} min={traceMin} max={traceMax} tone={metricMeta[metric].color} />
              {series.length ? <div className="mt-2 flex justify-between text-xs text-[#b8d3d0]"><span>{series[0].year} · {format(series[0].value, metric === "ghg" ? 1 : 2)} {metricMeta[metric].unit}</span><span>{series[series.length - 1].year} · {format(series[series.length - 1].value, metric === "ghg" ? 1 : 2)} {metricMeta[metric].unit}</span></div> : null}
              <div className="record-ribbon mt-7"><div className="flex items-center justify-between"><p className="mono-label" style={{ color: metricMeta[metric].color }}>RECORD RIBBON · ONE MARK PER ANNUAL OBSERVATION</p><span className="text-[10px] text-[#a9c6c3]">No gaps filled</span></div><div className="record-ribbon__marks" aria-label={`${series.length} annual observations in the ${selected.name} ${metricMeta[metric].label} record`}>{series.map((point) => <i key={point.year} title={`${point.year}: ${format(point.value, metric === "ghg" ? 1 : 2)} ${metricMeta[metric].unit}`} style={{ height: `${18 + ((point.value - traceMin) / traceRange) * 28}px`, backgroundColor: metricMeta[metric].color }} />)}</div></div>
            </div></div></div></div></section>

          {comparisonOpen && <section className="comparison-section border-y border-[#b9ccc8] bg-[#e3eeea] py-12"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="comparison-section__header"><div><p className="mono-label text-[#137d80]">02B · COMPARE TWO PLACES</p><h2 className="display-serif mt-3 text-4xl leading-none">One signal. Two records.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#47636a]">Both traces use the same active indicator and a shared vertical scale. The comparison is descriptive: it shows recorded values and coverage, not a resilience ranking or causal explanation.</p></div><label className="comparison-select"><span>Compare {selected.name} with</span><select value={comparison.code} onChange={(event) => chooseComparison(event.target.value)}>{room.countries.filter((country) => country.code !== selected.code && latest(country, metric)).map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}</select></label></div><div key={`${metric}-${selected.code}-${comparison.code}-${traceMotionKey}`} className="comparison-grid trace-swap mt-8"><ComparisonTrace country={selected} metric={metric} min={comparisonMin} max={comparisonMax} role="Selected" /><ComparisonTrace country={comparison} metric={metric} min={comparisonMin} max={comparisonMax} role="Comparison" /></div></div></section>}

          <section className="field-journal-section mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="relative grid gap-10 lg:grid-cols-[1fr_.94fr]"><div><p className="mono-label text-[#137d80]">03 · HOLD THE LIMIT</p><h2 className="display-serif mt-3 max-w-xl text-4xl leading-[.95] tracking-[-.025em] sm:text-5xl">Observation is not the same as safety.</h2><p className="mt-5 max-w-xl text-base leading-7 text-[#47636a]">The official record makes it possible to inspect change and coverage together. But no single indicator can explain exposure, adaptation, local knowledge, financing, or the lived consequences of a changing climate.</p><p className="mt-5 max-w-xl border-l-2 border-[#f28a70] pl-4 text-sm leading-6 text-[#47636a]">The point of this room is not to declare who is prepared. It is to make one kind of evidence visible, legible, and open to scrutiny.</p></div>
            <div className="instrument-summary-grid grid gap-px border border-[#bdd0ca] bg-[#bdd0ca] sm:grid-cols-2">{(Object.keys(metricMeta) as Metric[]).map((key) => { const record = latest(selected, key); return <button key={key} onClick={() => chooseMetric(key)} className="instrument-readout group bg-[#fbfaf5] p-5 text-left transition hover:bg-[#e5f2ee]"><div className="flex items-center justify-between"><span className="instrument-readout__ring"><i style={{ backgroundColor: metricMeta[key].color }} /></span><span className="text-xs text-[#60777b]">REC · {record?.latestYear ?? "—"}</span></div><p className="mt-5 text-xs font-bold uppercase tracking-[.13em] text-[#527076]">{metricMeta[key].short}</p><p className="mt-2 text-3xl font-semibold tracking-[-.04em] text-[#062330]">{record ? format(record.latest, key === "ghg" ? 1 : 2) : "—"}<span className="ml-1 text-xs font-normal tracking-normal text-[#60777b]">{metricMeta[key].unit}</span></p><div className="instrument-readout__ticks mt-4" aria-hidden="true"><i /><i /><i /><i /><i /><b /></div><p className="mt-3 text-xs leading-5 text-[#60777b]">Tune this signal in the field <span className="inline-block transition-transform group-hover:translate-x-1">→</span></p></button>; })}</div>
          </div></section>
        </main>

        <section className="source-dossier" aria-labelledby="source-dossier-title"><div className="source-dossier__inner"><div><p className="mono-label text-[#9ae3dd]">04 · TRACE THE SOURCE</p><h2 id="source-dossier-title" className="display-serif mt-3">Every visible signal has a public record.</h2><p>Open the source before drawing a conclusion. The dataflow, context notes, and limits remain available beside the interaction—not hidden in a footnote.</p></div><SourceCredits /></div></section>

        <footer id="method" className="border-t border-[#9ae3dd]/15 bg-[#061b26] text-[#d4e9e5]"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-12"><div><img src={MARK} alt="The Pacific Signal Room mark" className="h-11 w-11" /><p className="display-serif mt-4 text-3xl leading-none text-[#fffdf4]">Every signal starts with a record.</p><p className="mt-4 max-w-sm text-sm leading-6 text-[#a9c6c3]">Original interactive entry for the Pacific Dataviz Challenge 2026. Built with the official datasets named for the climate-change theme.</p><div className="author-credit mt-6"><p className="mono-label text-[#f2c46f]">AUTHORED BY</p><p className="mt-2 text-lg font-semibold text-[#fffdf4]">{projectProfile.authorName}</p><p className="mt-1 text-xs leading-5 text-[#a9c6c3]">{projectProfile.designation} {projectProfile.organization}<br />{projectProfile.countryOrTerritory}</p><p className="mt-2 text-xs text-[#9ae3dd]">{projectProfile.contactEmail}</p><a className="mt-1 inline-flex text-xs font-semibold text-[#9ae3dd] underline underline-offset-4" href={projectProfile.portfolioUrl} target="_blank" rel="noreferrer">{projectProfile.portfolioUrl}</a></div></div><div className="grid gap-6 text-sm leading-6 text-[#b9d2ce] sm:grid-cols-2"><div><p className="mono-label text-[#9ae3dd]">DATA & METHOD</p><p className="mt-2">Pacific Community, Pacific Data Hub .Stat, <code>DF_CLIMATE_CHANGE</code>: <code>SST_ANOM</code>, <code>SEA_LVL</code>, <code>METEO_MONITOR_NET</code>, and <code>GHG_EMI_CAPITA</code>. The app shows annual values exactly as supplied in downloaded official CSV extracts. Missing values are not filled.</p></div><div><p className="mono-label text-[#f2c46f]">HOW TO READ</p><p className="mt-2">Latest years differ by indicator: SST {room.meta.latestSstYear}, sea level {room.meta.latestSeaYear}, monitoring {room.meta.latestStationsYear}, and GHG per capita 2024. First-to-latest differences are descriptive only; they are not trend models or causal findings.</p><a className="mt-3 inline-flex items-center gap-1.5 font-semibold text-[#9ae3dd] hover:text-[#fffdf4]" href="https://stats.pacificdata.org/" target="_blank" rel="noreferrer">Open the Pacific Data Hub .Stat Explorer <ExternalLink size={14} /></a></div></div></div></footer>
      </div>
      <section ref={stateExportRef} className="current-state-sheet" aria-hidden="true" inert>
        <header><div className="current-state-sheet__lockup"><img src={MARK} alt="" /><div><p>PACIFIC SIGNAL ROOM</p><span>HIGH-RESOLUTION CURRENT STATE · PACIFIC DATAVIZ CHALLENGE 2026</span></div></div><p>Official record snapshot</p></header>
        <div className="current-state-sheet__body"><div className="current-state-sheet__intro"><p className="mono-label text-[#9ae3dd]">TUNED SIGNAL</p><h2>{selected.name} · {metricMeta[metric].label}</h2><p>This export preserves the current selected place, indicator, available coverage, official source, and interpretation limit.</p><div className="current-state-sheet__facts"><div><span>Latest record</span><strong>{selectedRecord ? `${format(selectedRecord.latest, metric === "ghg" ? 1 : 2)} ${metricMeta[metric].unit}` : "—"}</strong><small>{selectedRecord?.latestYear ?? "—"}</small></div><div><span>Coverage</span><strong>{selectedRecord ? `${selectedRecord.firstYear}–${selectedRecord.latestYear}` : "—"}</strong><small>{selectedRecord?.records ?? 0} annual observations</small></div>{comparisonOpen && <div><span>Comparison</span><strong>{comparison.name}</strong><small>shared indicator scale</small></div>}</div></div><div className="current-state-sheet__trace" style={{ backgroundImage: `linear-gradient(115deg, rgba(7,37,48,.98), rgba(7,37,48,.82)), url(${FIELD_FOIL})` }}><p className="mono-label" style={{ color: metricMeta[metric].color }}>EXACT ANNUAL RECORDS · NO GAPS FILLED</p><ExportTrace country={selected} metric={metric} min={traceMin} max={traceMax} tone={metricMeta[metric].color} /></div></div>
        <footer><p><strong>Source:</strong> Pacific Community / Pacific Data Hub .Stat <code>DF_CLIMATE_CHANGE</code> · {metricMeta[metric].label}.</p><p><strong>Read with care:</strong> {metricMeta[metric].caveat} First-to-latest change is descriptive only, not a trend model or causal finding.</p></footer>
      </section>
    </div>
  );
}
