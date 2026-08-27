# Expanded Signal Room implementation decisions

> **Historical planning record — superseded where it refers to a ten-place archived reported-impact series.** The completed app now renders a separately bounded official Pacific Data Hub `SPC:DF_SDG_11(4.4)` consequence chapter; see `official_disaster_loss_audit.md`.

## Narrative structure

The existing official Pacific Data Hub observation room remains intact. The expansion adds a fifth, clearly bounded chapter: **What the record cannot carry alone**. That chapter shows archived reported disaster-impact coverage for the ten documented comparable places, then connects it to two separate context cards: NOAA Coral Reef Watch ecological heat-stress monitoring and PCRAFI/PACRIS risk-information infrastructure. It does not claim that warming-water, coral heat stress, satellite sea-level anomalies, or reported impacts cause one another.

## Visual and interaction structure

The field keeps its authored schematic as the default. An **Atlas reference** toggle renders the same selected official indicator over country/territory positions on a simple equirectangular Pacific coordinate field. It is an orientation aid, not a political-boundary map and has no external tile dependency.

An **SST wall of signals** renders one deterministic miniature annual trace per place with an official SST record. It exposes the same values as the primary trace and opens a place on selection. The wall is a coverage and pattern-inspection instrument, not a heat ranking.

The full-data CSV export is generated client-side from the embedded official record and the bounded reported-impact rows. It includes source and coverage columns. The source dossier provides an in-page manifest and download link.

## Bilingual structure

The top navigation receives an English/French language switch. The selected language controls the visible navigation, hero, panels, guide, methodology, exports, source labels, caveats, and new modules. Country and territory proper names remain as supplied by the source record. Download filenames remain ASCII-stable, while their generated evidence-sheet headings follow the selected language.

## Satellite and ecology context

NASA and Copernicus appear as independent sea-level-method cross-checks, not as a merged numerical comparison with Pacific Data Hub `SEA_LVL`. NOAA Coral Reef Watch appears as a source-linked ecological heat-stress monitor with definitions for HotSpot, Degree Heating Week, and bleaching-alert area. The first implementation does not invent country-scale values from a global grid or imply observed coral bleaching in every selected place.
