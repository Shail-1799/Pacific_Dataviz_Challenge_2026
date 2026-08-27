# Self-hosting The Pacific Signal Room

This project is a client-side React and Vite application. It needs no database, server-side API, or secret at runtime. Any static host that serves the resulting files and supports a single-page application fallback can run it.

## 1. Install dependencies

Use Node.js 20 or later and pnpm 10 or later.

```bash
pnpm install
pnpm check
VITE_ASSET_BASE=/assets pnpm build
```

The production output is `dist/public`.

## 2. Personalize the author panel

Open `client/src/config/projectProfile.ts` and replace all bracketed placeholder values. Do this before building; the data is compiled into the static site.

| Field | Use |
| --- | --- |
| `authorName` | Your public name or team name |
| `designation` | Your role, such as `Independent data storyteller` |
| `organization` | Your company, institution, or `Independent` |
| `countryOrTerritory` | Your country or territory |
| `contactEmail` | A public email address |
| `portfolioUrl` | Portfolio, LinkedIn, or project profile URL |

## 3. Include the visual assets

The source code defaults to the current project asset paths so it remains functional in the hosted preview. For independent hosting, copy the three supplied asset files from the downloadable source archive into `client/public/assets/` and build with this environment value:

```bash
VITE_ASSET_BASE=/assets pnpm build
```

The required files are:

```text
signal-room-mark_28d6673a.png
signal-room-hero-texture_5b0b26ef.png
signal-room-field-foil_6caa5c14.png
```

If you host the assets on a CDN, set `VITE_ASSET_BASE` to that absolute base URL instead. Do not add a trailing slash.

## 4. Rebuild official companion modules only if needed

The app ships with the already-generated `client/src/data/consequenceData.ts`. It is generated from the two preserved official Pacific Data Hub SDG 11 CSV extracts in `data-sources/official/`: `VC_DSR_LSGP` for direct disaster loss relative to GDP and `VC_DSR_AFFCT` for directly affected people. If you intentionally refresh either official extract, regenerate before building:

```bash
node scripts/build_consequence_data.mjs
pnpm check
```

The transformer preserves blank consequence observations as `null` and observed zeroes as values. Do not replace missing records with zero, add undocumented places, or merge the reported-impact rows with the primary official climate-observation indicators. Read `official_disaster_loss_audit.md` before refreshing the inputs; UNDRR records supplied by national focal points may be revised.

The app also ships with generated `client/src/data/rainfallData.ts`, derived from the preserved official `RAIN_ANOM` extract. If you intentionally refresh that source, rerun the dedicated transformer before building:

```bash
node scripts/build_rainfall_data.mjs
pnpm check
```

The Rainfall Register preserves 1,034 annual observations for 22 places over 1979–2025 in millimetres. Keep it on its own scale and do not use it to attribute a climate or disaster outcome.

## 5. Deploy

Upload the contents of `dist/public` to your host’s static-site directory. Configure a rewrite so unknown paths serve `index.html`; this preserves client-side routing if routes are added later. Use HTTPS because modern browsers can restrict downloads and storage on insecure origins.

## 6. Verify before sending judges the public link

Open the live site in a clean browser session and complete the following checks:

1. The first visit shows the narrative opening; a refresh does not.
2. The four signal tabs update labels, field nodes, and the selected trace.
3. Hover or keyboard-focus a trace mark to confirm that the exact annual record is visible. Treat any WMO event label as linked global context only, not local attribution.
4. The two-country comparison uses one selected metric and common vertical scale.
5. The trace PNG, dedicated **State PNG**, and view PDF export from a standard browser click. The State PNG should name the selected place and indicator and include source and caveat text.
6. The **Share** menu exposes both device sharing and an explicit **Copy link** fallback. Test the social links only after you are ready to leave the page.
7. The **Method & sources** overlay, including hover, focus, and tap explanations for the WMO terms, works without trapping or clipping its content on a phone-sized screen.
8. The mobile signal field permits horizontal inspection of nodes, while the country or territory selector remains usable without horizontal scrolling.
9. The **Signal schematic / Atlas reference** control changes the same selected official indicator without implying political boundaries or a risk ranking.
10. The SST wall opens a place’s official warming-water trace. On a phone, hover/focus or tap a wall card and confirm its exact-value tooltip uses high-contrast light text; the one-column compact layout must remain readable. The **What the record cannot carry alone** section visibly limits the official SDG 11 consequence record to 12 reporting places over 2005–2023, preserves observed zeroes, and leaves blank annual observations unfilled.
11. The evidence-companion cards open PCRAFI/PACRIS, NOAA Coral Reef Watch, and satellite sea-level context without presenting them as merged country observations. The evidence CSV downloads with source and coverage columns.
12. Switch between English and French. Confirm the navigation, methods, WMO source-copy controls, source labels, new evidence sections, and exports remain understandable in both languages.
13. The **Download chart image** control works on a phone-sized viewport and the completed PNG includes the selected place, official SDG 11 dataflow, period, source, and reporting caveat without cropping.
14. Your author details, source attribution, data years, and method caveats are visible.
15. The **Signal Brief** routes each question to the expected evidence surface; the **Coverage Curtain**, **Shared Year Lens**, and **Evidence Passport** show supplied availability, coverage, dataflow, unit, and scope without producing a score or average.
16. The **Field-note Board** permits no more than three temporary exact-value pins. Its exported note must name the active source and caveat; do not use it to manufacture a conclusion.
17. The **Source to Mark** view opens and describes the documented extract, transform, retained supplied observation, and visible mark. The Rainfall Register retains its own unit and non-causal caveat. The Coastline panel remains a method/reference link only, and the community panel must remain empty unless a genuine contribution has documented permission, licence, and attribution.
18. Use **Judge tour** in a clean session. Confirm each evidence target highlights as the 10-to-60-second route advances, focus returns normally after Close/Finish, and motion remains reduced when the operating system requests it.

> The Dashboard PDF is a high-resolution rendering of the currently configured page. Choose the desired signal, primary country, and comparison country before exporting.

## 7. Reset the opening for a demonstration

In browser developer tools, run:

```js
localStorage.removeItem('pacific-signal-room-intro-seen')
```

Reload the page to show the opening sequence again.
