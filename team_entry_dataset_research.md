# Team-entry dataset research — working record

## Official candidate: water service records

The Pacific Data Hub SDG 6 dashboard identifies **`SPC:DF_SDG_06(3.0)`**, “Sustainable Development Goal 06 - Clean Water and Sanitation,” as its official dataflow. The official dashboard describes water and sanitation coverage as varying widely across Pacific countries and territories and notes that the displayed drinking-water measure is **not** the full “safely managed” indicator while Pacific Islands complete MICS surveys. This boundary must remain visible if the data become the centre of a new team entry.

The official data structure retrieved on 2026-08-26 has the dimensions, in order: `FREQ`, `INDICATOR`, `GEO_PICT`, `SEX`, `AGE`, `URBANIZATION`, `INCOME`, `EDUCATION`, `OCCUPATION`, `COMPOSITE_BREAKDOWN`, and `DISABILITY`. The indicator code requires a verified codelist lookup before any data extraction or numeric claim is made. An initial guessed code (`SPC_6_1_1`) returned `NoResultsFound`, so it must not be used.

## Sources

1. Pacific Data Hub, [SDG 6 dashboard](https://pacificdata.org/dashboard/sdg-6-clean-water-and-sanitation), accessed 2026-08-26.
2. Pacific Community / Pacific Data Hub .Stat, [SDG 6 dataflow metadata](https://stats-sdmx-disseminate.pacificdata.org/rest/v1/dataflow/SPC/DF_SDG_06/3.0?format=json-structure-2.0.0), retrieved 2026-08-26.
3. Pacific Community / Pacific Data Hub .Stat, [SDG data structure metadata](https://stats-sdmx-disseminate.pacificdata.org/rest/v1/datastructure/SPC/DSD_SDG/3.0?format=json-structure-2.0.0), retrieved 2026-08-26.

## Decision status

**Promising but not selected yet.** It can support a distinct “water record” narrative only after the exact indicator, coverage, units, and missingness are extracted directly from the official service. No climate-impact causality should be implied from the SDG 6 record alone.
