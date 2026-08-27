import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const source = resolve('data-sources/team-water/pdh_sdg06_safely_managed_drinking_water.csv');
const lines = readFileSync(source, 'utf8').trim().split(/\r?\n/);
const headers = lines[0].split(',');
const records = lines.slice(1).map((line) => {
  const cells = line.split(',');
  return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
});

const overall = records.filter((record) => record.URBANIZATION === '_T');
const coverage = new Map();
for (const record of overall) {
  const entries = coverage.get(record.GEO_PICT) ?? [];
  entries.push(record);
  coverage.set(record.GEO_PICT, entries);
}

const summary = [...coverage.entries()]
  .map(([geo, entries]) => {
    const ordered = entries.sort((a, b) => Number(a.TIME_PERIOD) - Number(b.TIME_PERIOD));
    const first = ordered[0];
    const last = ordered.at(-1);
    return {
      geo,
      observations: ordered.length,
      firstYear: Number(first.TIME_PERIOD),
      firstValue: Number(first.OBS_VALUE),
      latestYear: Number(last.TIME_PERIOD),
      latestValue: Number(last.OBS_VALUE),
      change: Number((Number(last.OBS_VALUE) - Number(first.OBS_VALUE)).toFixed(2)),
    };
  })
  .sort((a, b) => a.latestValue - b.latestValue || a.geo.localeCompare(b.geo));

const years = records.map((record) => Number(record.TIME_PERIOD));
const byUrbanization = [...new Set(records.map((record) => record.URBANIZATION))].sort();

console.log(JSON.stringify({
  source,
  recordCount: records.length,
  overallRecordCount: overall.length,
  placeCount: coverage.size,
  yearRange: [Math.min(...years), Math.max(...years)],
  urbanizationCodes: byUrbanization,
  summary,
}, null, 2));
