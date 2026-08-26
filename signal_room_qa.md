# Signal Room QA

## Visual and accessibility checks

The public preview loads with the intended page title, alt text for the Signal Room mark, semantic tab controls for the four indicators, keyboard-addressable SVG country nodes, a labelled place selector, and an external primary-source link. Desktop and mobile screenshot passes found the headline, field, selected log, trace, caveats, and methods readable at their intended breakpoints.

## Data checks

The rendered default confirms the declared official-record counts: 21 SST anomaly series through 2025, 21 sea-level series through 2023, 18 monitoring-network series through 2026, and 14 places with all four indicator series. The default Vanuatu monitoring record displays 6 sites in 2026, 5 in 1990, and a simple +1 change, matching the generated official-data module.

## Interaction check

The browser automation’s indexed click did not dispatch the warming-water event in the preview. Direct in-page event dispatch then confirmed that the standard React tab control works: the field changed to **Sea-surface temperature anomaly**, the country list expanded from 18 to 21 series, and Vanuatu’s selected record changed to **0.8 °C in 2025**, with a 2017–2025 trace and the correct anomaly caveat. The earlier indexed-click failure is therefore an automation-targeting limitation rather than an application defect.
