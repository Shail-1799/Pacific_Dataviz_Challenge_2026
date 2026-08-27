# Self-hosting source package contents

The downloadable archive contains three top-level folders:

| Folder | Contents | What to do |
| --- | --- | --- |
| `app/` | Complete React, Vite, TypeScript, CSS, data, and build configuration; includes the Signal Brief, coverage curtain, atlas, shared-year SST lens, exact-value Wall inspection, evidence passport, field-note exports, bounded consequence chapter, verified rainfall register, source-to-mark path, English/French interface, and guides | Follow `app/SELF_HOSTING.md`. |
| `assets/` | The three Signal Room PNG files required for independent hosting | Copy into `app/client/public/assets/` before building with `VITE_ASSET_BASE=/assets`. |
| `reusable-skill/` | The validated Pacific Dataviz competition workflow skill | Add it to a compatible skill library or use its `SKILL.md` as a repeatable workflow reference. |

Before releasing the app, edit `app/client/src/config/projectProfile.ts` to replace all bracketed author and contact placeholders.

The application’s embedded `client/src/data/consequenceData.ts` is reproducible from `data-sources/official/pdh_official_direct_disaster_loss.csv` and `data-sources/official/pdh_official_directly_affected.csv` using `scripts/build_consequence_data.mjs`. Those official Pacific Data Hub `SPC:DF_SDG_11(4.4)` records cover 12 reporting places over 2005–2023. Its limits and revision caveat are documented in `app/official_disaster_loss_audit.md`; companion-source roles are documented in `app/expanded_source_audit.md`. Do not alter missing values, replace blank years with zero, or represent the bounded record as a complete Pacific-wide ranking.

`app/client/src/data/rainfallData.ts` is reproducible from `data-sources/official/pdh_rainfall_anomaly.csv` using `scripts/build_rainfall_data.mjs`. This official `RAIN_ANOM` companion has 1,034 supplied annual observations for 22 places across 1979–2025, in millimetres. Keep it separately scaled and do not turn it into an attribution statement with SST, sea level, or reported disaster consequences.

`app/official_dataset_audit_2026.md` records the complete official 2026 Pacific Data Hub climate-change menu, the entry’s four embedded primary `DF_CLIMATE_CHANGE` indicators, and the verified rainfall companion. The primary official source remains the narrative core; the verified official SDG 11 consequence data supplies a deliberately bounded supporting chapter, while other public sources remain explicitly bounded context rather than substitute evidence. `app/tier3_feasibility.md` documents why the Landsat shoreline reference is a method card only and why the community-material section remains empty until permission is secured.
