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

## 4. Deploy

Upload the contents of `dist/public` to your host’s static-site directory. Configure a rewrite so unknown paths serve `index.html`; this preserves client-side routing if routes are added later. Use HTTPS because modern browsers can restrict downloads and storage on insecure origins.

## 5. Verify before sending judges the public link

Open the live site in a clean browser session and complete the following checks:

1. The first visit shows the narrative opening; a refresh does not.
2. The four signal tabs update labels, field nodes, and the selected trace.
3. Hover or keyboard-focus a trace mark to confirm that the exact annual record is visible. Treat any WMO event label as linked global context only, not local attribution.
4. The two-country comparison uses one selected metric and common vertical scale.
5. The trace PNG and view PDF export from a standard browser click.
6. The **Share** menu exposes both device sharing and an explicit **Copy link** fallback. Test the social links only after you are ready to leave the page.
7. The **Method & sources** overlay, your author details, source attribution, data years, and method caveats are visible.

> The Dashboard PDF is a high-resolution rendering of the currently configured page. Choose the desired signal, primary country, and comparison country before exporting.

## Reset the opening for a demonstration

In browser developer tools, run:

```js
localStorage.removeItem('pacific-signal-room-intro-seen')
```

Reload the page to show the opening sequence again.
