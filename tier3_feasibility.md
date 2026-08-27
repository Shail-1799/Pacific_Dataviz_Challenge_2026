# Tier 3 feasibility decision — Signal Room

| Roadmap item | Verification result | Approved implementation scope |
| --- | --- | --- |
| Official rainfall companion | Direct Pacific Data Hub `.Stat` extract `SPC:DF_CLIMATE_CHANGE(1.0)` / `RAIN_ANOM` contains 1,034 annual observations: all 22 Signal Room places, every year 1979–2025, unit `MM`. | Add a deterministic rainfall module and source record with no filled values, no causal claim, and a visible distinct-unit key. |
| Annual Shorelines (Landsat, 30 m) | Official Pacific Data Hub catalogue page describes annual shoreline vectors derived from Landsat feature extraction; it begins in 1980, lists 14 Pacific places, links its source/STAC resource, and states CC BY-NC 4.0. The catalogue page presents a request-for-full-access prompt. | Add an attributed **Coastline reference card** that explains scope, temporal coverage, extraction method, licence, and direct source link. Do not embed or reproduce shoreline geometry, compute change, or equate it with country/EEZ sea-level records without independently accessible, reviewed vectors. |
| Community closing note | No licensed quote, oral history, audio recording, or speaker approval has been supplied. | Add a clearly disabled/empty “community material belongs here by permission” disclosure in the closing section. Do not fabricate, generate, or attribute a quote or voice. |

## Evidence rules

`RAIN_ANOM` is an annual anomaly in millimetres and should never be compared visually as though it shares magnitude or unit with SST, sea level, network count, GHG, or direct-disaster-loss records. It may only be read as its own official record alongside the selected place’s other records. The Landsat coastline resource is a regional vector time series derived from satellite imagery, not an observed local impact or a measurement identical to the Signal Room `SEA_LVL` series.[1] [2]

## References

[1]: https://stats-sdmx-disseminate.pacificdata.org/rest/v1/data/SPC,DF_CLIMATE_CHANGE,1.0/A.RAIN_ANOM..?format=csvfile "Pacific Community / Pacific Data Hub .Stat — official rainfall-anomaly extract"

[2]: https://pacificdata.org/data/dataset/landsat-coastlines "Pacific Data Hub — Annual Shorelines (Landsat, 30 m)"
