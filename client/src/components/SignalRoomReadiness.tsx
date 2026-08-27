/** Signal Room extension: a field-journal evidence layer. Every mark retains a source, unit, date or availability boundary; no widget converts records into a score or causal claim. */
import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { ArrowDown, Check, ClipboardCheck, Download, ExternalLink, FileWarning, Link2, MapPinned, Pin, ScanSearch, Share2, Waves } from "lucide-react";
import { consequenceMeta, consequencePlaces } from "@/data/consequenceData";
import { rainfallData } from "@/data/rainfallData";
import type { SignalCountry, SignalPoint } from "@/data/signalRoomData";

export type ReadinessMetric = "sst" | "sea" | "stations" | "ghg";
export type ReadinessLanguage = "en" | "fr";
type MetricInfo = { label: string; short: string; unit: string; color: string; caveat: string };
type PinRecord = { id: string; country: string; code: string; signal: string; year: number; value: number; unit: string; source: string; caveat: string };

const officialDataflow = "SPC:DF_CLIMATE_CHANGE(1.0)";
const sourceLabel = "Pacific Community / Pacific Data Hub .Stat";
const rainfallUrl = "https://stats-sdmx-disseminate.pacificdata.org/rest/v1/data/SPC,DF_CLIMATE_CHANGE,1.0/A.RAIN_ANOM..?format=csvfile";
const coastlineUrl = "https://pacificdata.org/data/dataset/landsat-coastlines";

function number(value: number | null | undefined, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function bounds(series: SignalPoint[]) {
  if (!series.length) return null;
  return { start: series[0].year, end: series.at(-1)!.year, records: series.length };
}

async function copy(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const node = document.createElement("textarea");
    node.value = text;
    node.setAttribute("readonly", "");
    node.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(node); node.select();
    const success = document.execCommand("copy"); node.remove(); return success;
  }
}

function downloadBlob(content: Blob, filename: string) {
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url; link.download = filename; link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export function SignalBrief({ country, metric, metricInfo, language, onQuestion }: { country: SignalCountry; metric: ReadinessMetric; metricInfo: MetricInfo; language: ReadinessLanguage; onQuestion: (question: "water" | "measure" | "consequence") => void }) {
  const record = country.summary[metric];
  const fr = language === "fr";
  return <section className="signal-brief" aria-labelledby="signal-brief-title">
    <div className="signal-brief__eyebrow"><span />{fr ? "LE BILLET DE SIGNAL" : "THE SIGNAL BRIEF"}</div>
    <div className="signal-brief__body">
      <div><h2 id="signal-brief-title">{fr ? "Commencez par une question simple." : "Start with a simple question."}</h2><p>{fr ? "Choisissez l’un des trois parcours. Chaque parcours ouvre une section clairement nommée ; vous pouvez revenir ici et changer de voie à tout moment." : "Choose one of the three paths below. Each opens a clearly named section, and you can come back and change course at any time."}</p></div>
      <div className="signal-brief__record"><p>{fr ? "RELEVÉ ACTIF" : "ACTIVE RECORD"}</p><strong style={{ color: metricInfo.color }}>{country.name}</strong><span>{record ? <><b>{number(record.latest, metric === "ghg" ? 1 : 2)} {metricInfo.unit}</b> · {record.latestYear}</> : (fr ? "Aucun relevé fourni" : "No supplied record")}</span><small>{metricInfo.short} · {officialDataflow}</small></div>
    </div>
    <div className="signal-brief__questions" role="group" aria-label={fr ? "Choisir une question simple à explorer" : "Choose a simple question to explore"}>
      <button onClick={() => onQuestion("water")}><Waves size={18} /><span><b>{fr ? "Où le relevé montre-t-il une eau plus chaude ?" : "Where does the record show warmer water?"}</b><small>{fr ? "Lire les relevés de température de l’eau" : "Read the warming-water records"}</small></span><ArrowDown size={16} /></button>
      <button onClick={() => onQuestion("measure")}><ScanSearch size={18} /><span><b>{fr ? "Que mesure-t-on sur terre et en mer ?" : "What is measured on land and at sea?"}</b><small>{fr ? "Comprendre ce que chaque mesure signifie" : "Learn what each measure means"}</small></span><ArrowDown size={16} /></button>
      <button onClick={() => onQuestion("consequence")}><FileWarning size={18} /><span><b>{fr ? "Que disent les rapports officiels sur les pertes ?" : "What do official reports say about losses?"}</b><small>{fr ? "Lire les relevés incomplets avec précaution" : "Read the incomplete records with care"}</small></span><ArrowDown size={16} /></button>
    </div>
  </section>;
}

export function EvidencePassport({ country, metric, metricInfo, series, language }: { country: SignalCountry; metric: ReadinessMetric; metricInfo: MetricInfo; series: SignalPoint[]; language: ReadinessLanguage }) {
  const [status, setStatus] = useState<"idle" | "copied">("idle");
  const range = bounds(series);
  const fr = language === "fr";
  const passport = { place: country.name, code: country.code, indicator: metric === "sst" ? "SST_ANOM" : metric === "sea" ? "SEA_LVL" : metric === "stations" ? "METEO_MONITOR_NET" : "GHG_EMI_CAPITA", unit: metricInfo.unit, coverage: range ? `${range.start}–${range.end}; ${range.records} supplied annual observations` : "No supplied observation", dataflow: officialDataflow, caveat: metricInfo.caveat };
  const makeLink = () => `${window.location.origin}${window.location.pathname}#record=${encodeURIComponent(country.code)}&signal=${metric}`;
  const sharePassport = async () => {
    const text = `${country.name} · ${metricInfo.label}\n${passport.dataflow} · ${passport.indicator}\n${passport.unit} · ${passport.coverage}\n${passport.caveat}\n${makeLink()}`;
    await copy(text); setStatus("copied"); window.setTimeout(() => setStatus("idle"), 2400);
  };
  return <section className="evidence-passport" aria-labelledby="passport-title"><div className="evidence-passport__heading"><div><p className="mono-label">{fr ? "PASSEPORT DE PREUVE" : "EVIDENCE PASSPORT"}</p><h2 id="passport-title">{fr ? "Ce que contient cette vue." : "What this view contains."}</h2></div><button onClick={sharePassport}><Link2 size={15} />{status === "copied" ? (fr ? "Copié" : "Copied") : (fr ? "Copier le reçu" : "Copy receipt")}</button></div><dl><div><dt>{fr ? "Lieu" : "Place"}</dt><dd>{passport.place}</dd></div><div><dt>{fr ? "Indicateur" : "Indicator"}</dt><dd><code>{passport.indicator}</code></dd></div><div><dt>{fr ? "Unité" : "Unit"}</dt><dd>{passport.unit}</dd></div><div><dt>{fr ? "Couverture" : "Coverage"}</dt><dd>{passport.coverage}</dd></div><div><dt>{fr ? "Flux de données" : "Dataflow"}</dt><dd><code>{passport.dataflow}</code></dd></div></dl><p><ClipboardCheck size={15} />{passport.caveat}</p></section>;
}

export function CoverageCurtain({ countries, selectedCode, language }: { countries: SignalCountry[]; selectedCode: string; language: ReadinessLanguage }) {
  const fr = language === "fr";
  const selected = countries.find((country) => country.code === selectedCode);
  const selectedRain = rainfallData.countries.find((country) => country.code === selectedCode);
  const consequence = consequencePlaces.find((place) => place.code === selectedCode);
  const rows = [
    { key: "sst", label: fr ? "Eau qui se réchauffe" : "Warming water", unit: "°C", tone: "seafoam", scope: "21 place-series", detail: selected ? bounds(selected.series.sst) : null },
    { key: "sea", label: fr ? "Niveau de la mer" : "Sea level", unit: "m", tone: "periwinkle", scope: "21 place-series", detail: selected ? bounds(selected.series.sea) : null },
    { key: "stations", label: fr ? "Réseau météo" : "Monitoring network", unit: "sites", tone: "amber", scope: "18 place-series", detail: selected ? bounds(selected.series.stations) : null },
    { key: "ghg", label: fr ? "GES par personne" : "GHG / person", unit: "tCO₂e", tone: "periwinkle", scope: "17 place-series", detail: selected ? bounds(selected.series.ghg) : null },
    { key: "rain", label: fr ? "Anomalie de pluie" : "Rainfall anomaly", unit: "mm", tone: "rain", scope: "22 place-series", detail: selectedRain ? { start: selectedRain.summary.firstYear, end: selectedRain.summary.latestYear, records: selectedRain.summary.records } : null },
    { key: "consequence", label: fr ? "Conséquence déclarée" : "Reported consequence", unit: "SDG 11", tone: "coral", scope: "12 reporting places", detail: consequence ? { start: Number(consequenceMeta.period.slice(0, 4)), end: Number(consequenceMeta.period.slice(-4)), records: consequence.lossYears + consequence.affectedYears } : null },
  ];
  return <section className="coverage-curtain" aria-labelledby="coverage-title"><div className="coverage-curtain__copy"><p className="mono-label">{fr ? "RIDEAU DE COUVERTURE" : "COVERAGE CURTAIN"}</p><h2 id="coverage-title">{fr ? "L’absence est visible. Elle n’est pas mise à zéro." : "Absence stays visible. It is not set to zero."}</h2><p>{fr ? "Ces bandes montrent où le lieu choisi possède une série fournie. Elles décrivent la disponibilité du relevé, pas la qualité, la capacité ou l’importance d’un lieu." : "These bands show where the selected place has a supplied series. They describe record availability—not quality, capability, or a place’s importance."}</p></div><div className="coverage-curtain__rows">{rows.map((row) => <div className={`coverage-row coverage-row--${row.tone}`} key={row.key}><div><strong>{row.label}</strong><span>{row.scope} · {row.unit}</span></div><div className="coverage-row__bar" aria-label={row.detail ? `${row.label}: ${row.detail.records} observations from ${row.detail.start} to ${row.detail.end}` : `${row.label}: no supplied record for ${selected?.name ?? "selected place"}`}><i style={row.detail ? { left: `${Math.max(0, Math.min(88, ((row.detail.start - 1979) / 47) * 100))}%`, width: `${Math.max(8, Math.min(100, ((row.detail.end - row.detail.start + 1) / 47) * 100))}%` } : undefined} /></div><small>{row.detail ? `${row.detail.start}–${row.detail.end} · ${row.detail.records} ${fr ? "relevés" : "records"}` : (fr ? "Aucun relevé fourni pour ce lieu" : "No supplied record for this place")}</small></div>)}</div></section>;
}

export function ConsequenceBridge({ country, language }: { country: SignalCountry; language: ReadinessLanguage }) {
  const fr = language === "fr";
  const consequence = consequencePlaces.find((place) => place.code === country.code);
  const sstByYear = new Map(country.series.sst.map((point) => [point.year, point.value]));
  const overlaps = consequence?.annual.filter((row) => sstByYear.has(row.year) && (row.officialLossPctGDP !== null || row.directlyAffected !== null)) ?? [];
  const mostRecent = overlaps.at(-1);
  return <section className="consequence-bridge" aria-labelledby="consequence-bridge-title"><div><p className="mono-label">{fr ? "PONT DE RELEVÉS · PAS UNE FLÈCHE CAUSALE" : "RECORD BRIDGE · NOT A CAUSAL ARROW"}</p><h2 id="consequence-bridge-title">{fr ? "La même année peut contenir deux archives différentes." : "The same year can hold two different records."}</h2><p>{fr ? "Cette jonction ne relie qu’une anomalie SST officielle et une déclaration SDG 11 pour le lieu choisi. Elle ne dit pas que l’un explique l’autre." : "This bridge only places an official SST anomaly beside an SDG 11 report for your selected place. It does not say one explains the other."}</p></div><div className="consequence-bridge__records">{mostRecent ? <><article><span>{fr ? "RELEVÉ D’EAU" : "WATER RECORD"}</span><strong>{number(sstByYear.get(mostRecent.year), 2)} °C</strong><small>{mostRecent.year} · <code>SST_ANOM</code></small></article><div className="consequence-bridge__link"><i /><b>{fr ? "coïncidence de date" : "same reported year"}</b><i /></div><article><span>{fr ? "RELEVÉ D’IMPACT" : "IMPACT RECORD"}</span><strong>{mostRecent.officialLossPctGDP !== null ? `${number(mostRecent.officialLossPctGDP, 2)}%` : number(mostRecent.directlyAffected, 0)}</strong><small>{mostRecent.year} · {mostRecent.officialLossPctGDP !== null ? <code>VC_DSR_LSGP</code> : <code>VC_DSR_AFFCT</code>}</small></article></> : <article className="consequence-bridge__empty"><FileWarning size={20} /><strong>{fr ? "Pas de paire déclarée pour ce lieu." : "No reported pair for this place."}</strong><small>{fr ? "Les lacunes restent visibles ; l’interface ne crée pas de conséquence." : "Gaps remain visible; the interface does not manufacture a consequence."}</small></article>}</div><p className="consequence-bridge__foot">{consequenceMeta.sourceNote}</p></section>;
}

export function WallYearLens({ countries, selectedCode, onSelect, language }: { countries: SignalCountry[]; selectedCode: string; onSelect: (code: string) => void; language: ReadinessLanguage }) {
  const [year, setYear] = useState(2025);
  const fr = language === "fr";
  const withRecord = countries.filter((country) => country.series.sst.some((point) => point.year === year));
  return <section className="wall-year-lens" aria-labelledby="wall-year-lens-title"><div><p className="mono-label">{fr ? "LENTILLE D’ANNÉE PARTAGÉE" : "SHARED YEAR LENS"}</p><h2 id="wall-year-lens-title">{fr ? "Alignez le Mur sans fabriquer une moyenne." : "Align the Wall without inventing an average."}</h2><p>{fr ? "Choisissez une année pour voir quelles séries SST officielles fournissent un relevé. Le nombre est la disponibilité des séries, pas une mesure régionale de réchauffement." : "Choose a year to see which official SST series supply a reading. The count is record availability—not a regional warming measure."}</p><label><span>{year}</span><input type="range" min="2017" max="2025" value={year} onChange={(event) => setYear(Number(event.target.value))} aria-label={fr ? "Choisir une année SST" : "Choose SST year"} /></label></div><div className="wall-year-lens__grid" role="list" aria-label={fr ? `Disponibilité SST pour ${year}` : `SST availability for ${year}`}>{countries.filter((country) => country.series.sst.length).map((country) => { const point = country.series.sst.find((record) => record.year === year); return <button key={country.code} role="listitem" className={country.code === selectedCode ? "is-selected" : point ? "is-available" : "is-empty"} onClick={() => onSelect(country.code)} aria-label={`${country.name}: ${point ? `${number(point.value, 2)} °C in ${year}` : `no supplied SST record in ${year}`}`}><b>{country.code}</b><span>{point ? `${number(point.value, 1)}°` : "—"}</span></button>; })}</div><p className="wall-year-lens__status"><b>{withRecord.length}</b> {fr ? `des ${countries.filter((country) => country.series.sst.length).length} séries SST affichent un relevé fourni en ${year}.` : `of ${countries.filter((country) => country.series.sst.length).length} displayed SST series have a supplied record in ${year}.`}</p></section>;
}

export function SpatialUnitKey({ language }: { language: ReadinessLanguage }) {
  const fr = language === "fr";
  return <aside className="spatial-unit-key" aria-label={fr ? "Clé des unités spatiales" : "Spatial-unit key"}><MapPinned size={19} /><div><p>{fr ? "LA MÊME VUE, PAS LA MÊME GÉOGRAPHIE" : "SAME VIEW, DIFFERENT GEOGRAPHIES"}</p><span><b className="spatial-unit-key__eez" />{fr ? "SST et niveau de la mer : séries d’anomalies à l’échelle de la ZEE." : "SST and sea level: EEZ-scale anomaly series."}</span><span><b className="spatial-unit-key__place" />{fr ? "GES et SDG 11 : relevés rapportés par pays ou territoire." : "GHG and SDG 11: country/territory reporting records."}</span><span><b className="spatial-unit-key__station" />{fr ? "Réseau météo : compte de sites rapportés, pas une carte complète des connaissances." : "Monitoring network: reported site count, not a full map of knowledge."}</span></div></aside>;
}

function postcardPath(series: SignalPoint[], width = 420, height = 130) {
  if (!series.length) return "";
  const values = series.map((point) => point.value), min = Math.min(...values), max = Math.max(...values), range = max - min || 1;
  return series.map((point, index) => `${index ? "L" : "M"}${18 + index / Math.max(1, series.length - 1) * (width - 36)},${12 + (max - point.value) / range * (height - 28)}`).join(" ");
}

export function AnnotationStudio({ country, metric, metricInfo, series, language }: { country: SignalCountry; metric: ReadinessMetric; metricInfo: MetricInfo; series: SignalPoint[]; language: ReadinessLanguage }) {
  const [year, setYear] = useState(series.at(-1)?.year ?? 0);
  const [pins, setPins] = useState<PinRecord[]>([]);
  const [layout, setLayout] = useState<"signal" | "coverage" | "boundary">("signal");
  const [exporting, setExporting] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const fr = language === "fr";
  const activePoint = series.find((point) => point.year === year) ?? series.at(-1);
  const addPin = () => {
    if (!activePoint) return;
    const pinId = `${country.code}-${metric}-${activePoint.year}`;
    setPins((current) => current.some((pin) => pin.id === pinId) || current.length >= 3 ? current : [...current, { id: pinId, country: country.name, code: country.code, signal: metricInfo.label, year: activePoint.year, value: activePoint.value, unit: metricInfo.unit, source: `${sourceLabel} · ${officialDataflow}`, caveat: metricInfo.caveat }]);
  };
  const exportPostcard = async () => { if (!sheetRef.current) return; setExporting(true); try { const canvas = await html2canvas(sheetRef.current, { backgroundColor: "#062530", scale: 2.5, logging: false }); const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png")); if (blob) downloadBlob(blob, `pacific-signal-room_field-note_${country.code}_${metric}_${layout}.png`); } finally { setExporting(false); } };
  return <section className="annotation-studio" aria-labelledby="annotation-studio-title"><div className="annotation-studio__copy"><p className="mono-label">{fr ? "TABLEAU DE NOTES DE TERRAIN" : "FIELD-NOTE BOARD"}</p><h2 id="annotation-studio-title">{fr ? "Épinglez des relevés, jamais des conclusions." : "Pin records, never conclusions."}</h2><p>{fr ? "Choisissez jusqu’à trois observations exactes de la trace active. Elles restent temporaires dans ce navigateur et gardent la source et la réserve lors de l’export." : "Choose up to three exact observations from the active trace. They stay temporary in this browser and keep the source and caveat in any export."}</p><div className="annotation-studio__controls"><label><span>{fr ? "Année" : "Year"}</span><select value={year} onChange={(event) => setYear(Number(event.target.value))}>{series.map((point) => <option key={point.year} value={point.year}>{point.year} · {number(point.value, metric === "ghg" ? 1 : 2)} {metricInfo.unit}</option>)}</select></label><button onClick={addPin} disabled={!activePoint || pins.length >= 3}><Pin size={14} />{fr ? "Épingler le relevé" : "Pin record"}</button></div><p className="annotation-studio__count">{pins.length}/3 {fr ? "relevés épinglés" : "records pinned"}</p></div><div className="annotation-studio__sheet-wrap"><div ref={sheetRef} className={`field-note-postcard field-note-postcard--${layout}`}><div className="field-note-postcard__top"><span>PACIFIC SIGNAL ROOM</span><b>{layout === "signal" ? (fr ? "SIGNAL" : "SIGNAL") : layout === "coverage" ? (fr ? "COUVERTURE" : "COVERAGE") : (fr ? "LIMITE" : "BOUNDARY")}</b></div><h3>{country.name}</h3><p>{metricInfo.label} · <code>{metric === "sst" ? "SST_ANOM" : metric === "sea" ? "SEA_LVL" : metric === "stations" ? "METEO_MONITOR_NET" : "GHG_EMI_CAPITA"}</code></p><svg viewBox="0 0 420 130" role="img" aria-label={`${country.name} selected series`}><path d={postcardPath(series)} /><circle cx="402" cy="30" r="5" /></svg><div className="field-note-postcard__pins">{pins.length ? pins.map((pin) => <span key={pin.id}>{pin.year} · <b>{number(pin.value, metric === "ghg" ? 1 : 2)} {pin.unit}</b></span>) : <span>{fr ? "Choisissez une année à épingler." : "Choose a year to pin."}</span>}</div><footer>{sourceLabel} · {officialDataflow}<br />{metricInfo.caveat}</footer></div><div className="postcard-actions"><label><span>{fr ? "Mise en page" : "Layout"}</span><select value={layout} onChange={(event) => setLayout(event.target.value as typeof layout)}><option value="signal">{fr ? "Signal" : "Signal"}</option><option value="coverage">{fr ? "Couverture" : "Coverage"}</option><option value="boundary">{fr ? "Limite" : "Boundary"}</option></select></label><button onClick={exportPostcard} disabled={exporting}><Download size={14} />{exporting ? (fr ? "Préparation…" : "Preparing…") : (fr ? "Exporter la note" : "Export field note")}</button></div></div></section>;
}

export function SourceToMark({ country, metric, language }: { country: SignalCountry; metric: ReadinessMetric; language: ReadinessLanguage }) {
  const [open, setOpen] = useState(false);
  const fr = language === "fr";
  const code = metric === "sst" ? "SST_ANOM" : metric === "sea" ? "SEA_LVL" : metric === "stations" ? "METEO_MONITOR_NET" : "GHG_EMI_CAPITA";
  return <section className={`source-to-mark ${open ? "is-open" : ""}`}><div><p className="mono-label">{fr ? "DE LA SOURCE AU MARQUEUR" : "SOURCE TO MARK"}</p><h2>{fr ? "Le chemin reste lisible." : "The path stays visible."}</h2><p>{fr ? "Cette animation explique le chemin réel documenté de l’extrait officiel jusqu’au point actif. Elle ne simule pas de validation invisible." : "This sequence shows the real documented path from official extract to active mark. It does not simulate unseen validation."}</p></div><button onClick={() => setOpen((value) => !value)} aria-expanded={open}>{open ? <Check size={15} /> : <Share2 size={15} />}{open ? (fr ? "Chemin affiché" : "Path shown") : (fr ? "Afficher le chemin" : "Show the path")}</button>{open && <ol><li><b>01</b><span>{fr ? "Extrait officiel téléchargé" : "Official extract downloaded"}<small>{sourceLabel}</small></span></li><li><b>02</b><span>{fr ? "Transformation reproductible" : "Reproducible transform"}<small>{officialDataflow}</small></span></li><li><b>03</b><span>{fr ? "Observation fournie conservée" : "Supplied observation retained"}<small>{country.name} · <code>{code}</code></small></span></li><li><b>04</b><span>{fr ? "Marqueur visible et exportable" : "Visible and exportable mark"}<small>{fr ? "aucune lacune comblée" : "no gap filled"}</small></span></li></ol>}</section>;
}

export function RainfallRegister({ selectedCode, language }: { selectedCode: string; language: ReadinessLanguage }) {
  const fr = language === "fr";
  const country = rainfallData.countries.find((item) => item.code === selectedCode) ?? rainfallData.countries[0];
  const values = country.series.map((point) => point.value), min = Math.min(...values), max = Math.max(...values);
  const latest = country.series.at(-1)!;
  const bars = country.series.slice(-18);
  return <section className="rainfall-register" aria-labelledby="rainfall-register-title"><div className="rainfall-register__copy"><p className="mono-label">{fr ? "REGISTRE DE PLUIE OFFICIEL" : "OFFICIAL RAINFALL REGISTER"}</p><h2 id="rainfall-register-title">{fr ? "L’eau qui tombe a sa propre échelle." : "Falling water has its own scale."}</h2><p>{fr ? "L’anomalie de pluie est désormais une couche officielle distincte : 1 034 relevés annuels, 22 lieux, 1979–2025. Elle est affichée en millimètres et ne partage ni échelle ni affirmation causale avec les signaux océaniques." : "Rainfall anomaly is now a separate official layer: 1,034 annual records, 22 places, 1979–2025. It is shown in millimetres and shares neither a scale nor a causal claim with ocean signals."}</p><a href={rainfallUrl} target="_blank" rel="noreferrer">{fr ? "Ouvrir l’extrait officiel" : "Open official extract"} <ExternalLink size={14} /></a></div><div className="rainfall-register__panel"><div><p>{country.name}</p><strong>{number(latest.value, 1)} <small>mm</small></strong><span>{latest.year} · <code>RAIN_ANOM</code></span></div><div className="rainfall-register__bars" aria-label={`${country.name} rainfall anomaly, most recent 18 annual records`}>{bars.map((point) => <i key={point.year} className={point.value >= 0 ? "is-wet" : "is-dry"} style={{ height: `${14 + Math.abs(point.value) / Math.max(Math.abs(min), Math.abs(max), 1) * 68}px` }} title={`${point.year}: ${number(point.value, 1)} mm`} />)}</div><p>— {fr ? "anomalie négative · zéro de référence · anomalie positive" : "negative anomaly · reference zero · positive anomaly"} +</p></div></section>;
}

export function CoastlineAndCommunity({ language }: { language: ReadinessLanguage }) {
  const fr = language === "fr";
  return <section className="coast-community"><article><MapPinned size={20} /><p className="mono-label">{fr ? "RÉFÉRENCE DE LITTORAL" : "COASTLINE REFERENCE"}</p><h2>{fr ? "Un littoral peut être cartographié sans devenir une preuve d’impact." : "A coastline can be mapped without becoming impact proof."}</h2><p>{fr ? "Annual Shorelines (Landsat, 30 m) est une série vectorielle régionale issue d’images Landsat, à partir de 1980. Cette salle fournit la méthode et le lien, mais n’intègre pas de géométrie qui nécessite une demande d’accès et ne confond pas rivage, ZEE et anomalie de niveau marin." : "Annual Shorelines (Landsat, 30 m) is a regional vector time series derived from Landsat imagery, from 1980. This room provides method and link, but does not embed geometry that requires access approval or conflate coast, EEZ, and sea-level anomaly."}</p><a href={coastlineUrl} target="_blank" rel="noreferrer">{fr ? "Lire la fiche et la licence" : "Read dataset record and licence"} <ExternalLink size={14} /></a></article><article className="community-slot"><Pin size={20} /><p className="mono-label">{fr ? "PLACE POUR UNE VOIX AUTORISÉE" : "SPACE FOR A PERMITTED VOICE"}</p><h2>{fr ? "Les données ne remplacent pas la parole." : "Data does not replace a voice."}</h2><p>{fr ? "Aucun témoignage, son ou citation n’est inséré ici sans consentement, licence et attribution exacte. Cette place reste volontairement vide jusqu’à ce qu’une contribution communautaire réelle puisse y être ajoutée." : "No testimony, sound, or quote is placed here without consent, licence, and precise attribution. This space remains deliberately empty until a genuine community contribution can be added."}</p><span><FileWarning size={14} />{fr ? "Aucun contenu simulé" : "No simulated content"}</span></article></section>;
}
