# Verified request extraction: trace interaction and credibility enhancements

The supplied 992 × 207 image was read in two overlapping horizontal crops. It requests:

1. Interactive hover tooltips that display exact data points and highlight key climate events.
2. Smooth loading and transition effects when switching between country comparisons.
3. Social sharing controls and a methodology-and-data-sources modal to improve judge-facing credibility.

## Implementation limits

The official Pacific Data Hub series used here are annual indicator records. The enhanced trace tooltip will display the exact recorded year, value, unit, country or territory, and source-status context. It will not label unsupported events as climate events. When an annual record lacks an official event annotation, the UI will state **“No event annotation in this source record.”**

Comparison motion will animate opacity and transform only, honor `prefers-reduced-motion`, and leave data values unchanged. Sharing will use the native Web Share API when it exists and copy the current view’s URL plus summary to the clipboard as a transparent fallback. The methodology overlay will list the dataflow, indicator codes, coverage caveats, and source link already supporting the entry.

## External context sources

| Label in the app | Verified source detail | Source |
| --- | --- | --- |
| `1997–98 El Niño context` and `2015–16 El Niño context` | WMO’s February 2016 ENSO update states that the 2015–16 El Niño was one of the strongest on record and comparable with 1997–98 and 1982–83. The app does not claim a local impact from this global context. | https://wmo.int/files/el-ninola-nina-update-february-2016 |
| `Global ocean-heat context` | WMO’s January 2025 assessment confirms 2024 as the warmest year on record and reports exceptional land and sea-surface temperatures and ocean heat. The app labels this as global context only. | https://wmo.int/news/media-centre/wmo-confirms-2024-warmest-year-record-about-155degc-above-pre-industrial-level |

## Fourth reference request — verified from ordered screenshot crops

The supplied 983 × 240 screenshot was read in two overlapping horizontal crops. It requests three additional enhancements:

1. A comprehensive mobile-device QA pass, including small-screen interactive elements and overlays.
2. An export that downloads the current visualization state as a high-resolution image or PDF.
3. Interactive explanations of specific WMO context terms in the methodology overlay when hovered.

The export requirement is additive to the existing trace PNG and dashboard PDF. The new current-state export will preserve the active country or territory, indicator, available coverage, official source, and caveat so it is evidence-led rather than an unexplained graphic. WMO explanations will remain global-context definitions and will not imply a local event attribution.
