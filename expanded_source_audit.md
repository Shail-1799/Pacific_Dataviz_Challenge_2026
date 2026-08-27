# Expanded source audit — evidence boundaries

## Consequence record

The active consequence chapter is generated from two official Pacific Community / Pacific Data Hub .Stat SDG 11 extracts: `SPC:DF_SDG_11(4.4)` / `VC_DSR_LSGP` for direct economic loss attributed to disasters relative to GDP and `SPC:DF_SDG_11(4.4)` / `VC_DSR_AFFCT` for directly affected people. It covers 12 Pacific reporting places over 2005–2023, with 55 loss observations and 78 affected-person observations. The transformer preserves blank annual cells as `null` and observed zeroes as values. The record is described as **reported disaster impact**, not complete loss, preparedness, resilience, or a causal effect of a climate indicator.

The historical user-supplied OWID/EM-DAT module remains only as archived provenance for the earlier concept and is not rendered, exported, or presented as active evidence. The official replacement’s embedded UNDRR note states that values supplied by designated national focal points may not all have followed official validation and may be revised. See `official_disaster_loss_audit.md` for endpoints and reproducibility.

## PCRAFI / PACRIS role

The SPREP Pacific Environment Data Portal identifies PCRAFI as an open-licence Pacific dataset for disaster-risk modelling and assessment; it links PCRAFI to the Pacific Risk Information System. GFDRR’s PCRAFI Phase 3 page describes probabilistic risk assessments, country risk profiles, and PACRIS information on assets, population, hazards, and risk. These are not annual observed-loss series for every Signal Room place. The app cites PCRAFI/PACRIS as a Pacific risk-information reference and links to its public portal, but does not merge modelled annual-average-loss figures with the official reported-impact records.

## NOAA Coral Reef Watch role

NOAA Coral Reef Watch v3.1 provides daily global 5 km satellite heat-stress monitoring from 1 January 1985 to present. Its published products include SST, SST anomaly, Coral Bleaching HotSpot, Degree Heating Week, and bleaching alert area. The app will present it as **ecological heat-stress context** with an alert-scale explainer and a source link. It will not imply that a reported bleaching alert confirms local bleaching observations or that it caused a selected country’s values.

## Satellite sea-level role

NASA PO.DAAC’s `NASA_SSH_GMSL_INDICATOR` is a global mean sea-level series from satellite sea-surface-height anomalies, starting in 1993. Copernicus Climate Data Store’s global satellite sea-level product provides gridded daily/monthly sea-level anomaly from 1993 onward on a 0.25° grid, relative to a 1993–2012 reference period. They use different spatial support and reference conventions from the official Pacific Data Hub country/territory series. The app will provide a **cross-check method card** and public links, not plot values as if the global/grid products were interchangeable with the Pacific Data Hub records.

## Source links

1. SPREP PCRAFI portal: https://pacific-data.sprep.org/dataset/pacific-catastrophe-risk-assessment-and-financing-initiative-pcrafi
2. GFDRR PCRAFI Phase 3: https://www.gfdrr.org/en/pacific-catastrophe-risk-assessment-and-financing-initiative-phase-3
3. NOAA Coral Reef Watch 5 km products: https://coralreefwatch.noaa.gov/product/5km/
4. NASA PO.DAAC global mean sea level: https://podaac.jpl.nasa.gov/dataset/NASA_SSH_GMSL_INDICATOR
5. Copernicus C3S satellite sea level: https://cds.climate.copernicus.eu/datasets/satellite-sea-level-global?tab=overview
