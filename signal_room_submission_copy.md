# Pacific Dataviz Challenge 2026 — submission copy

## Recommended entry route

| Form field | Recommended entry |
| --- | --- |
| Competition | Main competition |
| Format | Interactive dataviz |
| Prize path | **Global Mention**; also select the Pacific interactive prize only if you truthfully self-identify as a Pacific Islander |
| Individual or team | Individual, unless you designate a team and update the authorship statement accordingly |
| Title | **The Pacific Signal Room: What can we see from shore?** |
| Public URL | Insert the published project URL here: `https://[your-published-url]` |

> Do **not** submit the earlier “Smallest Emitters, Biggest Losers” Dash app as another individual interactive entry. The rules limit each eligible contestant to one interactive entry as an individual. This Signal Room entry is the recommended replacement. [1]

## Problem addressed

Climate change is often communicated through global headlines, but action depends on what can be observed and interpreted locally. Pacific countries and territories face a changing ocean while the official data record is uneven across indicators and years. The problem is not simply whether climate change is visible in a dataset; it is whether the available record makes it possible to inspect changing sea-surface temperatures, sea-level anomalies, emissions context, and the reported meteorological monitoring network together—without pretending that a number of monitoring sites captures all local knowledge, preparedness, or resilience.

## How the dataviz responds

**The Pacific Signal Room** turns four official Pacific Data Hub climate indicators into an explorable observation interface. Visitors tune the field between sea-surface temperature anomaly, sea-level anomaly, meteorological monitoring-network count, and greenhouse-gas emissions per capita. Each selected signal reveals the latest record, the first-to-latest descriptive change, coverage years, and a country or territory trace. A schematic signal field makes the record explorable across the region, while its caveats keep the interpretation disciplined: node size is never a risk score; reported monitoring sites are never treated as a complete measure of early-warning capacity; and differences are descriptive rather than causal claims.

The project’s central question is therefore: **as the ocean changes, what does the record allow us to see from shore?**

## Data-source declaration

The entry uses official datasets published for the Challenge’s 2026 climate-change theme through the Pacific Data Hub .Stat Explorer. The dataflow is `DF_CLIMATE_CHANGE` and the indicators are:

| Indicator code | Indicator name | Role in the story |
| --- | --- | --- |
| `SST_ANOM` | Mean sea-surface temperature anomalies | Warming-water signal and annual trace |
| `SEA_LVL` | Sea-level anomalies | Ocean-change signal and annual trace |
| `METEO_MONITOR_NET` | Meteorological monitoring network | Recorded monitoring-network signal and annual trace |
| `GHG_EMI_CAPITA` | Greenhouse-gas emissions per capita | Contribution context and annual trace |

The application retains source gaps as missing and displays the latest available year per indicator rather than falsely synchronizing all series. The app cites Pacific Community / Pacific Data Hub .Stat directly in its footer and links to the Explorer. [2]

## Technical and design note

The published interactive is a custom React and SVG data story. The signal field, instrument readouts, selected-place log, and time traces are implemented specifically for this entry; no dashboard or chart template defines the central visual form. The application is static, fast to load, and designed for keyboard navigation as well as pointer interaction.

## Required personal verification before submitting

You must edit and verify the following statements yourself, because the Challenge requires that the entry reflect **your own original work and judgement**. Do not submit a declaration you cannot truthfully make.

| Declaration | Action required |
| --- | --- |
| Originality | Confirm this exact entry has not been previously published or submitted elsewhere. The earlier Dash prototype should be treated as retired, not separately entered. |
| AI use | Describe only your real process. If accurate, state that AI was used supportively for coding assistance, narrative refinement, and visual-asset ideation, while you personally directed the analytical question, data choices, interpretation, creative decisions, review, and final submission. |
| Author credit | Insert your name or designated team name consistently in the form and in any public project metadata you add. |
| Long-term URL | Confirm the published link will remain publicly accessible until at least 31 August 2029. [1] |
| Pacific eligibility | Select Pacific-only prizes only if you truthfully self-identify as a Pacific Islander; Global Mention is open internationally. [1] |

## Final form checklist

Review the visual in the published project, copy the two narrative sections above into the form, list the four Pacific Data Hub indicator codes, paste the live URL, and then personally read and accept the rules. Submission should occur only after you have completed the personal fields and provided explicit final authorization.

## References

[1]: https://pacificdatavizchallenge.org/sites/default/files/2026-05/Pacific-Dataviz-Challenge-2026-rules-reglement.pdf "Pacific Dataviz Challenge 2026 Rules"
[2]: https://pacificdatavizchallenge.org/ "Pacific Dataviz Challenge 2026: official theme and data list"
