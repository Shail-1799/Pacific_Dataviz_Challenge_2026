# Pacific Dataviz Challenge 2026 — submission copy

## Recommended entry route

| Form field | Recommended entry |
| --- | --- |
| Competition | Main competition |
| Format | Interactive dataviz |
| Prize path | **Global Mention**; also select the Pacific interactive prize only if you truthfully self-identify as a Pacific Islander |
| Individual or team | Individual, unless you designate a team and update the authorship statement accordingly |
| Title | **The Pacific Signal Room: What can we see from shore?** |
| Public URL | Insert the published project URL here: `https://[your-published-url]` |

> Do **not** submit the earlier “Smallest Emitters, Biggest Losers” Dash app as another individual interactive entry. The rules limit each eligible contestant to one interactive entry as an individual. This Signal Room entry is the recommended replacement. [1]

## Problem addressed

Climate change is often communicated through global headlines, but action depends on what can be observed and interpreted locally. Pacific countries and territories face a changing ocean while the official data record is uneven across indicators and years. The problem is not simply whether climate change is visible in a dataset; it is whether the available record makes it possible to inspect changing sea-surface temperatures, sea-level anomalies, emissions context, and the reported meteorological monitoring network together—without pretending that a number of monitoring sites captures all local knowledge, preparedness, or resilience.

## How the dataviz responds

**The Pacific Signal Room** turns four official Pacific Data Hub climate indicators into an explorable observation interface. Visitors tune the field between sea-surface temperature anomaly, sea-level anomaly, meteorological monitoring-network count, and greenhouse-gas emissions per capita. Each selected signal reveals the latest record, the first-to-latest descriptive change, coverage years, and a country or territory trace. A schematic signal field makes the record explorable across the region, while its caveats keep the interpretation disciplined: node size is never a risk score; reported monitoring sites are never treated as a complete measure of early-warning capacity; and differences are descriptive rather than causal claims.

The project’s central question is therefore: **as the ocean changes, what does the record allow us to see from shore—and what does a separate consequence record show only where comparable reporting exists?** A short Signal Brief begins with questions rather than a ranking. A coverage curtain, shared-year Wall lens, spatial-unit key, and evidence passport make the source, unit, coverage, scope, and uncertainty of each selected record inspectable.

## Data-source declaration

The entry uses official datasets published for the Challenge’s 2026 climate-change theme through the Pacific Data Hub .Stat Explorer. Its **primary dataset** is `SPC:DF_CLIMATE_CHANGE(1.0)` and its four core indicators are:

| Indicator code | Indicator name | Role in the story |
| --- | --- | --- |
| `SST_ANOM` | Mean sea-surface temperature anomalies | Warming-water signal and annual trace |
| `SEA_LVL` | Sea-level anomalies | Ocean-change signal and annual trace |
| `METEO_MONITOR_NET` | Meteorological monitoring network | Recorded monitoring-network signal and annual trace |
| `GHG_EMI_CAPITA` | Greenhouse-gas emissions per capita | Contribution context and annual trace |

The application retains source gaps as missing and displays the latest available year per indicator rather than falsely synchronizing all series. The app cites Pacific Community / Pacific Data Hub .Stat directly in its footer and links to the Explorer. [2]

A fifth **separate companion register** preserves official `RAIN_ANOM` observations from the same primary dataflow: 1,034 annual records for 22 places, 1979–2025, in millimetres. It receives its own visual scale, source line, and availability description. It is not overlaid on SST or used to make an attribution claim.

## Consequences and independent context

The interactive adds a separate **What the record cannot carry alone** chapter. It uses a second official Pacific Data Hub dataflow, `SPC:DF_SDG_11(4.4)`: `VC_DSR_LSGP` for direct disaster economic loss relative to GDP and `VC_DSR_AFFCT` for directly affected people. The raw extracts contain 55 loss records and 78 affected-person records across 12 Pacific reporting places over 2005–2023. These values are displayed as reported observations, not a Pacific-wide ranking, complete loss account, resilience score, or causal consequence of any single climate indicator. Blank observations remain missing while observed zeroes remain values. The underlying UNDRR Sendai Framework records are supplied through designated national focal points, may not all have completed official validation, and may be revised. The separate context cards make the boundary visible: PCRAFI/PACRIS is cited as Pacific risk-information infrastructure, NOAA Coral Reef Watch as satellite coral heat-stress monitoring, and NASA/Copernicus satellite products as independent sea-level-method context. None is numerically merged with the Pacific Data Hub country or territory series. [3] [4] [5] [6] [7]

| Source family | Role and boundary |
| --- | --- |
| Pacific Community / Pacific Data Hub .Stat, `SPC:DF_SDG_11(4.4)` | Bounded official reported-impact chapter: `VC_DSR_LSGP` and `VC_DSR_AFFCT`; 12 reporting places; 2005–2023; incomplete and potentially revisable. |
| PCRAFI / PACRIS | Pacific risk-information reference; not an observed annual-loss series. |
| NOAA Coral Reef Watch | Ecological heat-stress context; a satellite alert is not a confirmed local bleaching observation. |
| NASA / Copernicus satellite sea level | Independent global or gridded method context; not interchangeable with country/territory anomaly records. |
| Pacific Data Hub .Stat, `RAIN_ANOM` | Official rainfall-anomaly companion: 1,034 annual records, 22 places, 1979–2025, millimetres; separately scaled and non-causal. |
| Landsat Annual Shorelines | Attributed external method/resource reference only; no geometry is embedded pending the dataset’s access process. |

## Technical and design note

The published interactive is a custom React and SVG data story. The signal field, instrument readouts, selected-place log, coverage curtain, shared-year Wall lens, evidence passport, temporary field-note board, and time traces are implemented specifically for this entry; no dashboard or chart template defines the central visual form. A source-to-mark sequence explains the documented extract-to-transform-to-visible-mark path. The application is static, fast to load, and designed for keyboard navigation as well as pointer interaction. The temporary Field-note Board can export a source-labelled visual note from up to three selected annual records; it never converts those points into a conclusion.

## Required personal verification before submitting

You must edit and verify the following statements yourself, because the Challenge requires that the entry reflect **your own original work and judgement**. Do not submit a declaration you cannot truthfully make.

| Declaration | Action required |
| --- | --- |
| Originality | Confirm this exact entry has not been previously published or submitted elsewhere. The earlier Dash prototype should be treated as retired, not separately entered. |
| AI use | Describe only your real process. If accurate, state that AI was used supportively for coding assistance, narrative refinement, and visual-asset ideation, while you personally directed the analytical question, data choices, interpretation, creative decisions, review, and final submission. |
| Author credit | Insert your name or designated team name consistently in the form and in any public project metadata you add. |
| Long-term URL | Confirm the published link will remain publicly accessible until at least 31 August 2029. [1] |
| Pacific eligibility | Select Pacific-only prizes only if you truthfully self-identify as a Pacific Islander; Global Mention is open internationally. [1] |
| Community material | Leave the reserved panel empty unless you have documented consent, licence, and attribution for a genuine contribution. Do not add simulated testimony, audio, quote, or identity. |

## Final form checklist

Review the visual in the published project, copy the narrative sections above into the form, name `SPC:DF_CLIMATE_CHANGE(1.0)` as the primary Pacific Data Hub dataset, list its four indicator codes plus the bounded official SDG 11 consequence declaration, paste the live URL, and then personally read and accept the rules. Submission should occur only after you have completed the personal fields and provided explicit final authorization.

## References

[1]: https://pacificdatavizchallenge.org/sites/default/files/2026-05/Pacific-Dataviz-Challenge-2026-rules-reglement.pdf "Pacific Dataviz Challenge 2026 Rules"
[2]: https://pacificdatavizchallenge.org/ "Pacific Dataviz Challenge 2026: official theme and data list"
[3]: https://stats-sdmx-disseminate.pacificdata.org/rest/v1/data/SPC,DF_SDG_11,4.4/A..VC_DSR_LSGP............?format=csvfile "Pacific Data Hub .Stat: SDG 11 direct disaster loss extract"
[4]: https://pacific-data.sprep.org/dataset/pacific-catastrophe-risk-assessment-and-financing-initiative-pcrafi "SPREP Pacific Environment Data Portal: PCRAFI"
[5]: https://coralreefwatch.noaa.gov/product/5km/ "NOAA Coral Reef Watch 5 km products"
[6]: https://podaac.jpl.nasa.gov/dataset/NASA_SSH_GMSL_INDICATOR "NASA PO.DAAC global mean sea level indicator"
[7]: https://cds.climate.copernicus.eu/datasets/satellite-sea-level-global?tab=overview "Copernicus C3S satellite sea-level context"
[8]: https://stats-sdmx-disseminate.pacificdata.org/rest/v1/data/SPC,DF_CLIMATE_CHANGE,1.0/A.RAIN_ANOM..?format=csvfile "Pacific Data Hub .Stat: rainfall anomaly extract"
[9]: https://pacificdata.org/data/dataset/annual-shorelines-land-sat-30m "Pacific Data Hub: Annual Shorelines (Landsat, 30 m)"
