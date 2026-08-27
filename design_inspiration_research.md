# Design-reference notes — Signal Room refinement

The user supplied two public design-learning references. They are treated as inspiration for interaction and visual-communication patterns, not as sources of data or evidence claims.

| Reference | Publicly surfaced themes | Signal Room translation |
| --- | --- | --- |
| React Graph Gallery — D3 ❤️ React | Reusable tooltip design; positioning, formatting, and interaction patterns | Keep exact values on demand, but add fixed annotation callouts only for carefully selected records so the visual is not permanently crowded. |
| Matplotlib Journey | Design, colour, highlighted text, arrows, small multiples, multiple axes, and geographic presentation | Use leader-line annotations, one dominant highlighted reading, and deliberately quiet surrounding marks. Retain one shared scale per comparison and never add a secondary axis that hides the official unit. |

## Applied rule set

1. **Annotations explain, not decorate.** Each callout must identify a visible official datum, its unit and year, and an interpretation boundary where needed.
2. **Avoid overlap by construction.** Use measured offsets, leader arrows, and at most a small number of fixed callouts per visual. Tooltips retain full detail on demand.
3. **One visual priority at a time.** The selected place and one provisional evidence pattern receive contrast; all other official marks remain visible but quieter.
4. **No unsupported storytelling.** Annotation text will never imply attribution, a Pacific-wide ranking, a forecast, or a resilience assessment.
5. **Exports preserve the reading.** The selected record, source dataflow, units, coverage, and caveat accompany any downloadable visual or table.

## Source links

1. https://www.react-graph-gallery.com/react-d3-dataviz-course
2. https://www.matplotlib-journey.com/
