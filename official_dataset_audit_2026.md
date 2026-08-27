# Official Pacific Data Hub climate-data audit — 2026

## Verified challenge requirements

The official Pacific Dataviz Challenge page states that every entry must use **at least one dataset from the 2026 official list**; other Pacific Data Hub or open-data sources may be added, and all sources must be declared. The current Signal Room already exceeds this requirement through four listed `DF_CLIMATE_CHANGE` indicators: `SST_ANOM`, `SEA_LVL`, `METEO_MONITOR_NET`, and `GHG_EMI_CAPITA`. The main competition accepts interactive entries internationally, while the user must still verify the final originality, authorship, eligibility, and long-term public-URL declarations personally. [1]

## Full official climate menu

The 2026 list names the following indicators or associated official dataflows: environmental taxes; population growth; GHG emissions per capita; crop and livestock yields (plus disaggregated series); mean sea-surface and surface-temperature anomalies; rainfall anomalies; climate-altering land cover; sea-level anomalies; tourist arrivals (plus disaggregated series); Red List Index; directly affected persons attributed to disasters; direct disaster economic loss; tuberculosis incidence; renewable-energy share; safely managed drinking water; power generation (plus disaggregated series); coastline; meteorological monitoring network (plus disaggregated series); and fisheries-management arrangements. [1]

## Fit assessment for The Pacific Signal Room

| Evidence family | Current status | Narrative value | Decision |
| --- | --- | --- | --- |
| SST anomaly, sea level, monitoring network, GHG/person | Embedded official `DF_CLIMATE_CHANGE` annual records | Core question: what can be observed from shore? | **Keep central.** |
| Direct disaster economic loss and directly affected persons | Embedded official `SPC:DF_SDG_11(4.4)` annual records: `VC_DSR_LSGP` and `VC_DSR_AFFCT`; 12 reporting places; 2005–2023 | Adds consequence without claiming a Pacific-wide ranking | **Keep as a separately bounded official supporting chapter; do not merge with the observation indicators.** |
| Rainfall anomalies | Embedded official `RAIN_ANOM` annual records: 1,034 observations, 22 places, 1979–2025, millimetres | Adds a separate water-from-sky register and makes differing units visible without equating rainfall and ocean signals | **Keep as a distinct official companion register, never on the SST scale or as causal evidence.** |
| Crop/livestock yield, land cover, fisheries, Red List | Officially listed but represent distinct food, land, governance, or ecosystem stories | High risk of broadening the entry into a generic dashboard | **Do not add.** |
| Renewable energy, power generation, environmental taxes, tourism, water services, population growth, TB | Officially listed but primarily mitigation, infrastructure, health, or macroeconomic contexts | Could support separate stories, but they dilute the entry’s present contestable question | **Do not add.** |

## Evidence-safe recommendation

The strongest competitive version remains a **single authored observation-and-consequence story**, not a comprehensive climate dashboard. The application preserves the four `SPC:DF_CLIMATE_CHANGE(1.0)` annual signals as the visual core; the official `SPC:DF_SDG_11(4.4)` consequence chapter retains its 12-place, 2005–2023 reporting boundary and UNDRR revision caveat; and supporting PCRAFI/PACRIS, NOAA Coral Reef Watch, NASA, Copernicus, and WMO sources remain explicitly contextual. The verified `RAIN_ANOM` companion now appears only in a separately scaled annual register, with its own coverage, units, and explicit non-causal boundary. Landsat Annual Shorelines is retained only as an attributed external reference card pending separate access approval for geometry.

## Verified source context

The Pacific Data Hub’s climate-change, disasters, and risks topic describes a broad catalogue spanning hazards, extreme events, impacts, vulnerability, and adaptation or resilience material. This reinforces the need not to treat any single observational or reported-impact indicator as a resilience score. [2]

## References

[1]: https://pacificdatavizchallenge.org/ "Pacific Dataviz Challenge 2026 — official theme, dataset list, rules, prizes, and judges"
[2]: https://pacificdata.org/topic/climate-change-disasters-and-risks "Pacific Data Hub — Climate Change, Disasters and Risks topic"
