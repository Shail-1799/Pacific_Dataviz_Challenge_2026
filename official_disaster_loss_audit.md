# Official disaster-impact replacement audit

## Decision

The consequence chapter now replaces the previous supporting EM-DAT/Our World in Data series with two official Pacific Community / Pacific Data Hub .Stat annual extracts from `SPC:DF_SDG_11(4.4)`. This keeps the chapter separate from the primary observation room while making its direct-loss and directly-affected-person measures part of the Challenge’s official Pacific Data Hub evidence base.

| Official series | Meaning | Unit retained in app | Observed coverage |
| --- | --- | --- | --- |
| `VC_DSR_LSGP` | Direct economic loss attributed to disasters relative to GDP, SDG 1.5.2 and 11.5.2 | `PT` / percentage of GDP | 55 annual records; 12 Pacific places; 2005–2023 |
| `VC_DSR_AFFCT` | Directly affected persons attributed to disasters | `NUMBER` / people | 78 annual records; 12 Pacific places; 2005–2023 |

The shared 12-place roster is Fiji, Micronesia, Kiribati, Marshall Islands, Nauru, Papua New Guinea, Palau, Solomon Islands, Tonga, Tuvalu, Vanuatu, and Samoa. Coverage varies sharply by place: Papua New Guinea has one loss observation, while Solomon Islands has ten. The app therefore exposes source coverage, keeps blank years `null`, and does not rank the Pacific.

> The embedded source note states that UNDRR values were extracted from the Sendai Framework Monitoring System as supplied by designated national focal points; some may not have completed an official validation process and may be revised. The app retains observed zeroes as values and never converts blank years into zeroes.

## Reproducible source paths

The preserved raw extracts are in `data-sources/official/`. `scripts/build_consequence_data.mjs` reads them and writes `client/src/data/consequenceData.ts` without importing or executing any source module.

| Resource | Official endpoint |
| --- | --- |
| Direct loss relative to GDP | [Pacific Data Hub .Stat CSV extract](https://stats-sdmx-disseminate.pacificdata.org/rest/v1/data/SPC,DF_SDG_11,4.4/A..VC_DSR_LSGP............?format=csvfile) |
| Directly affected persons | [Pacific Data Hub .Stat CSV extract](https://stats-sdmx-disseminate.pacificdata.org/rest/v1/data/SPC,DF_SDG_11,4.4/A..VC_DSR_AFFCT............?format=csvfile) |
| SDG 11 dataflow | [Pacific Data Hub .Stat Explorer](https://stats.pacificdata.org/) |

## Interpretation boundary

The direct-loss and affected-person series are **reported impact records**, not a complete loss account, an estimate of all harm, an assessment of resilience, or evidence that any selected climate observation caused an event. The chapter uses them to make the record’s limits and coverage visible alongside the four primary climate-observation indicators.
