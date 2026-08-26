# Data validation — Smallest Emitters, Biggest Losers

## Decision

The interactive will lead with a **three-variable evidence view**: annual per-capita greenhouse-gas emissions on the horizontal axis, reported direct economic damage as a percentage of GDP on the vertical axis, and people affected per 1,000 residents as the bubble size. A user-facing axis switch will offer **share of global GHG emissions** as a second emissions view; this is the stronger measurement for the headline “smallest emitters,” while per-capita emissions remains available exactly as requested.

## Validated source files

| Measure | Source | Unit used in app | Coverage used | Key handling choice |
| --- | --- | --- | --- | --- |
| Per-capita GHG emissions including land use | Jones et al. (2025); population series, processed by OWID | tonnes CO2e per person | 2000–2024 | Used as annual x-axis value and in the period comparison. |
| Global GHG share | Derived from the same GHG-per-capita series multiplied by population, divided by the corresponding World total | percent | 2000–2024 | Exposes the global-scale meaning of “smallest emitters.” |
| Direct economic damages from natural disasters | EM-DAT / CRED / UCLouvain, World Bank GDP series, processed by OWID | percent of GDP | 2000–2024 where reported | The attached source is already expressed in percent; no x100 conversion is applied. |
| People affected by natural disasters | EM-DAT / CRED / UCLouvain, processed by OWID | people and people per 1,000 residents | 2000–2024 where reported | “Affected” means injured, requiring assistance, or homeless; annual source gaps remain visible. |
| Pacific climate context | SPC Pacific Data Hub `.Stat`, DF_CLIMATE_CHANGE, SST_ANOM | degrees C anomaly | 2017–2025 | Included as an official-Challenge-data context panel, satisfying the at-least-one-official-dataset rule without pretending it causes a specific disaster outcome. |

## Coverage audit

For 2000–2024, the selected Pacific geography list yields 13 country/territory records with the GHG series, 12 with people-affected observations, 10 with reported economic-loss observations, and 10 with all three measures. The app must show data availability, must not turn source gaps into zeroes, and must describe the values as **reported disaster impacts**.

## Critical caveat for the headline

“Smallest emitters” is **not** the same claim as “lowest per-capita emitters.” Some small territories have comparatively high per-capita values, whereas their global emission shares are still tiny. Therefore the app’s default evidence view will use per-capita emissions, as requested, but the opening copy and an axis switch will make the distinction explicit. It will never claim every Pacific country has low per-capita emissions.

## Period and aggregation

The interactive will expose a year slider for country-year evidence and a default 2000–2024 annual series. Country case files will show the latest available data, count the source years that report each disaster measure, and provide time-series context. Any period averages will be labelled as **mean across reported years**, not as a complete count of all impacts.

## References

1. https://ourworldindata.org/grapher/per-capita-ghg-emissions
2. https://ourworldindata.org/grapher/natural-disasters-economic-damages
3. https://ourworldindata.org/grapher/natural-disasters-people-affected
4. https://docs.pacificdata.org/dotstat/api
