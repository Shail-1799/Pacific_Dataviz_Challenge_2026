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

Visitors can also use a shared-scale two-country comparison, export a country trace as PNG or the configured view as PDF, and share the active view through their device’s share sheet, an explicit copy-link fallback, LinkedIn, or X. These controls preserve the selected place and indicator in their share text while retaining data dates, units, and interpretation limits on the visualization itself.

## Data provenance

The app-ready series are transformed from Pacific Community / Pacific Data Hub .Stat `DF_CLIMATE_CHANGE` extracts: `SST_ANOM`, `SEA_LVL`, `METEO_MONITOR_NET`, and `GHG_EMI_CAPITA`. Missing values are not filled. The small number of annual global-context labels are separately linked to World Meteorological Organization material and do not attribute local outcomes. See the in-app data and method note before making any public claim.

## Self-hosting

Use `SELF_HOSTING.md` for local asset setup and static deployment instructions. The project builds a static site to `dist/public`.
