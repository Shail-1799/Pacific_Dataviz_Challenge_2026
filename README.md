# The Pacific Signal Room

An interactive Pacific climate-observation data story built for the 2026 Pacific Dataviz Challenge. It lets visitors inspect official Pacific Data Hub records for sea-surface-temperature anomalies, sea-level anomalies, meteorological monitoring-network counts, and greenhouse-gas emissions per capita.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. Before publishing, run `pnpm check`. For an independent static deployment, follow the asset-aware build command in `SELF_HOSTING.md`.

## Personalize the public credit

Edit `client/src/config/projectProfile.ts`. Replace every bracketed placeholder with your author name, designation, organization, country or territory, contact email, and portfolio or LinkedIn URL. This is the only file needed for attribution details.

## Key features

The app provides a once-per-browser narrative opening, four official climate signals, a selected country or territory trace, an indicator-aware reading guide, and a judge-facing methodology overlay. Every annual trace mark can be hovered or keyboard-focused to reveal the exact value, country or territory, source, and a deliberately limited global WMO context label where one is available.

Visitors can also use a shared-scale two-country comparison; a geographic-reference toggle beside the original schematic; a wall of official SST traces for all available places; and an English/French interface control. The selected trace now carries two bounded, collision-aware leader-arrow callouts—its first and latest official records—while exact inspection remains available for every annual mark. A persistent **Day/Night** reading-light control changes presentation contrast without changing data colors or encodings; in night reading, Wall place labels, values, and years now have explicit high-contrast typography and a protected reading plate. The wall and the locally embedded SDG 11 register enter with short, reduced-motion-aware calibration feedback; the latter explicitly states that it is not fetching live data.

The full judge-readiness extension starts with a deterministic **Signal Brief** and three evidence questions, then adds a **Coverage Curtain**, **Spatial Unit Key**, shared-year Wall lens, and live **Evidence Passport**. These surfaces make supplied coverage, record type, unit, dataflow, geographic scope, and caveats inspectable without creating a composite score or an all-Pacific average. The selected record can also be pinned temporarily—up to three exact annual observations—in the browser-only **Field-note Board** and exported as a citation-safe visual note. A **Source to Mark** view shows the documented extract-to-transform-to-visible-mark pipeline.

The header also exposes a voluntary, keyboard-accessible **Judge tour**. Its six approximately ten-second stops move through the official-record overview, one-indicator signal-field boundary, exact Wall reading, endpoint-annotated trace, official SDG 11 consequence caveat, and source dossier. The walkthrough has Back, Next, Finish, and Close controls, respects reduced-motion preferences, and never alters a selected record or implies causality.

Exports include the selected trace as PNG, source-labelled selected-data CSV, trace PDF, configured-view PDF, full evidence CSV, consequence-chart image, and a dedicated high-resolution **current-state PNG** that records the selected place, indicator, coverage, source, and caveat. The climate-justice consequence chapter has its own share menu, carrying its coverage boundary through device share, copy-link, LinkedIn, and X actions; no social post is sent automatically.

## Data provenance

The app-ready observation series are transformed from the **primary official** Pacific Community / Pacific Data Hub .Stat `SPC:DF_CLIMATE_CHANGE(1.0)` extracts: `SST_ANOM`, `SEA_LVL`, `METEO_MONITOR_NET`, and `GHG_EMI_CAPITA`. Missing values are not filled. A separate, bounded consequence chapter is generated from the official Pacific Data Hub `SPC:DF_SDG_11(4.4)` extracts `VC_DSR_LSGP` (direct economic loss relative to GDP) and `VC_DSR_AFFCT` (directly affected persons). It spans 12 reporting places and 2005–2023, retains blank years as `null`, and is not a regional ranking, complete loss account, resilience measure, or causal model.

The verified official rainfall companion is transformed from the same primary dataflow’s `RAIN_ANOM` extract. It preserves 1,034 annual observations for 22 places across 1979–2025 in millimetres and is rendered in a deliberately separate Rainfall Register: it does not share a scale with SST and does not establish a causal reading. The Landsat Annual Shorelines resource is shown only as an attributed method/reference card because the relevant geometry requires access approval. A community-material panel remains explicitly empty until a real contribution has documented consent, licence, and attribution; no quote, audio, testimony, or review is invented.

NOAA Coral Reef Watch, PCRAFI/PACRIS, NASA PO.DAAC, and Copernicus are linked as independent context sources. They are not numerically merged with the Pacific Data Hub country/territory records. The application offers a client-side CSV download containing official annual observations and only the non-null bounded consequence rows, with source and coverage fields. The small number of annual WMO context labels remain separately cited global context, not local attribution.

`scripts/build_consequence_data.mjs` recreates `client/src/data/consequenceData.ts` and `scripts/build_rainfall_data.mjs` recreates `client/src/data/rainfallData.ts` from preserved official Pacific Data Hub CSV extracts in `data-sources/official/`. See `official_disaster_loss_audit.md` for the SDG 11 coverage and revision boundary, `tier3_feasibility.md` for rainfall/coastline scope, `expanded_source_audit.md` for companion-source limits, and `signal_room_submission_copy.md` for the submission-ready narrative.

## Self-hosting

Use `SELF_HOSTING.md` for local asset setup and static deployment instructions. The project builds a static site to `dist/public`.
