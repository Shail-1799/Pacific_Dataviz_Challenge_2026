# The Pacific Signal Room — Judge-Readiness Roadmap

## Executive assessment

The Signal Room already has a strong foundation: a distinctive observation-room visual language, official Pacific Data Hub records at the centre, reproducible transforms, explicit limits, English/French controls, mobile care, exact-value inspection, source access, downloads, sharing, and a short guided route. It is **well beyond a generic dashboard**.

The next gains should not be “more charts.” The official 2026 materials frame the Challenge around **storytelling, design, innovation and technical skill** in visualising Pacific data. They require at least one official listed dataset, disclose all sources, permit supplementary open data, and require the entry to be public. The published rules identify a jury but do **not** disclose a weighted numeric rubric. The practical aim is therefore to make each of those visible priorities impossible to miss in the first minute, while protecting the evidential restraint that makes the project credible.[1]

> **North star:** A judge should be able to say, within one minute: “I understand the question, the official source, the unexpected observation, the human stakes, and exactly what the work refuses to claim.”

## Criteria lens and current readiness

This is a strategic, qualitative assessment—not an invented official scorecard.

| Likely judging priority | Why it matters here | Current readiness | Biggest remaining opportunity |
| --- | --- | --- | --- |
| Pacific climate relevance | The 2026 theme is climate change, with a Pacific-facing jury. | **Strong** | Make the observation-to-consequence tension more immediate on first view. |
| Storytelling and clarity | The Challenge explicitly foregrounds impactful insights and storytelling. | **Strong** | Give the opening one precise, inspectable “why look now?” invitation. |
| Originality and visual authorship | A bespoke form is more memorable than a default dashboard. | **Strong** | Make the Wall, atlas, and consequence lens feel like parts of one authored argument. |
| Data integrity and reproducibility | Official data, source disclosure, and public access are non-negotiable. | **Very strong** | Let curious judges inspect the transformation and missingness in seconds. |
| Interpretation discipline | The work currently avoids causality and resilience rankings unsupported by the data. | **Very strong** | Turn those limits into a visible strength, rather than hiding them in methods. |
| Interaction and technical craft | Interactive entries must reward exploration, not merely replicate a static graphic. | **Strong** | Create a few purposeful moments of discovery, not more controls. |
| Accessibility and international reach | The audience includes varied devices, languages, and levels of data literacy. | **Strong** | Add explicit readability mode, localisation QA, and a reduced-complexity mobile path. |
| Public-interest impact | Climate-justice advocates and journalists respond to relevance, accountability, and care. | **Moderate–strong** | Make each official record’s human significance present without using unverified anecdotes. |
| Submission and demo readiness | A public URL and compelling walkthrough often determine whether good work is fully seen. | **Moderate** | Finalise credentials, stable hosting, a one-minute demo script, and a static fallback. |

## Prioritised upgrade slate

### Tier 1 — highest return before submission

| # | Upgrade | What a judge sees | Criteria strengthened | Evidence guardrail | Delivery effort |
| ---: | --- | --- | --- | --- | --- |
| 1 | **The Signal Brief** | A compact opening note with one selected official record, its year, the source code, and a question such as “What can this shoreline record show—and what remains unrecorded?” The place is rotated deterministically from the current selection, never cherry-picked. | Story, clarity, first impression | Do not call a high SST year “record-breaking” unless the source explicitly establishes it. | S |
| 2 | **Bounded consequence bridge** | A narrow, annotation-led “same year / different record” bridge between the selected SST trace and official SDG 11 loss/affected observations where both are available. It visually uses a dotted connector labelled “co-occurs; does not explain.” | Climate justice, interpretation, public interest | Show only overlapping reported years; retain blank data and UNDRR revision caveat; never imply attribution. | M |
| 3 | **Evidence passport** | One click opens a shareable receipt for the live state: place, indicator, exact period, source dataflow, units, coverage, active filters, and interpretation limit. It has a persistent URL fragment and print-friendly layout. | Trust, technical craft, sharing | Receipt must reflect the live state and never cite a context source as an underlying measurement. | M |
| 4 | **Coverage as a first-class visual** | A subtle “what the archive contains” curtain: thin timelines for SST, sea level, monitoring, GHG, loss, and affected data by place. Gaps are blank paper, not empty marks. | Originality, trust, data literacy | Coverage is not a capacity or quality ranking; label it as reporting/series availability. | M |
| 5 | **A three-question entry choice** | Rather than a generic landing prompt, readers choose one plain-language question: “Where is the warming-water record?”, “What is measured from shore?”, or “What consequences are reported?” The app moves to the relevant existing section. | Usability, storytelling | Each question leads to an existing documented record; no new composite score. | S |
| 6 | **Judge route 2.0: one claim per stop** | Enhance the existing 60-second guide with a persistent elapsed-time label and exactly one sentence per step: observation, comparison, consequence boundary, source proof, and closing question. | Demo readiness, accessibility, clarity | Keep the guide factual and close it with a limitation, not a slogan. | S |

### Tier 2 — high distinction and memorable craft

| # | Upgrade | What a judge sees | Criteria strengthened | Evidence guardrail | Delivery effort |
| ---: | --- | --- | --- | --- | --- |
| 7 | **The 22-place field chorus** | The Wall becomes an orchestrated reading moment: tap a year to align all available SST trace cursors, then see a low-key annotation that reports only how many official place-series contain an observation that year. | Originality, interaction, technical craft | Count availability, not “Pacific-wide warming,” unless a defined aggregation is supplied and labelled. | M |
| 8 | **Atlas with a “distance from shore” lens** | The existing map/field toggle gains a simple visual key separating EEZ-scale records, station/network records, and country/territory reporting records. | Design, interpretation, literacy | The lens explains spatial unit differences; it must not imply local lived experience or precision. | M |
| 9 | **Annotation editor for a fixed evidence set** | Visitors can pin up to three exact official observations to a temporary personal “reading board.” Annotations use arrows, avoid collisions, and can be exported as a citation-labelled PNG. | Interaction, accessibility, sharing | Pins are selections, not conclusions; generated wording remains templated and factual. | M |
| 10 | **Field-note postcards** | The State PNG export gains three optional, non-promotional layouts: “warming-water record,” “measurement record,” and “reported consequence record.” Every card carries source and caveat lines. | Sharing, visual craft, public reach | No social copy should say “proves,” “caused,” “safest,” “worst,” or “most resilient.” | M |
| 11 | **A visible source-to-mark animation** | On demand, the selected trace briefly reveals its data pipeline as five quiet steps: official CSV → reproducible transform → retained observation → mark → downloadable record. | Innovation, trust, technical quality | Describe the actual documented transform; do not simulate unseen validation steps. | S–M |
| 12 | **Language and screen-reader finishing pass** | Complete French audit of every new tour/export/method phrase; add semantic landmark labels, spoken chart summaries, focus restoration after modals, skip links, and 4.5:1 contrast verification in both Day and Night modes. | Inclusion, professionalism, technical craft | Preserve precise source labels and codes where translations would risk altering a dataset definition. | M |

### Tier 3 — only if source verification and time permit

| # | Upgrade | Why it can help | Required proof before build |
| ---: | --- | --- | --- |
| 13 | **Observed rainfall companion** | It can make “what can we see from shore?” more tangible by contrasting the availability and chronology of rainfall anomalies against SST and sea level. | Verify the official `RAIN_ANOM` coverage, unit, geography, temporal alignment, and documentation. Do not add it simply because it is available. |
| 14 | **Coastline change context layer** | A carefully sourced Landsat coastline layer could offer a compelling geographic orientation and a separate visual mode. | Verify its methodology, geographic resolution, dates, licensing, and whether it can be presented without equating shoreline change to sea-level anomaly. |
| 15 | **Community-authored closing note** | A short, licensed quote or audio reflection can make the final question more human and memorable. | Obtain explicit permission, identify the speaker accurately, and keep the quote clearly distinct from data claims. This is not appropriate to fabricate or simulate. |

## Additional insights to investigate—not claim yet

The application should not manufacture a “surprise” from a broad average. Better candidate discoveries can be inspected through the existing records:

| Candidate question | How to test it | Acceptable outcome |
| --- | --- | --- |
| Do the most recent SST records have different observation coverage than early records? | Count supplied SST years by place and decade; show only availability. | A coverage pattern with a caveat, not a climate conclusion. |
| When official disaster loss/affected observations are present, how often do the two series co-occur? | Make a 12-place year-pair coverage matrix. | A transparent picture of reported-data completeness. |
| Is monitoring-network availability broadly aligned with the parts of the archive used elsewhere? | Compare record years without calculating a preparedness score. | A prompt about measurement infrastructure, never a capacity ranking. |
| Which “from shore” idea is most legible? | Test three guided first screens with five independent readers. | A usability finding, not a data insight. |

## What not to add

Avoid anonymous testimonials, an unverified “top 10 most vulnerable” list, disaster or coral imagery treated as local evidence, a country leaderboard, a causal arrow from SST to loss, an index that blends incompatible metrics, decorative maps that do not help interpretation, or bulk datasets that dilute the central question. These may look more elaborate while weakening the one feature the Signal Room already owns: **careful observation with visible limits**.

## Recommended four-step implementation order

1. **Make the case visible in the first minute:** build the Signal Brief, three-question entry choice, and Judge Route 2.0.
2. **Make rigor visible under inspection:** add the coverage curtain and Evidence Passport, then test their content with two non-specialist reviewers.
3. **Make it memorable to share:** add the bounded consequence bridge, citation-safe postcard layouts, and annotation board.
4. **Finish like a public product:** complete French/accessibility QA, publish to a stable URL, add an offline/static screenshot fallback, rehearse the one-minute route, and personally complete all source, authorship, and AI declarations.

## Submission readiness checklist

| Must be true before submission | Why |
| --- | --- |
| The public link resolves reliably on mobile and desktop. | Public availability is an official rule. |
| Author/team fields and contact details are real. | Credentials should not be placeholders. |
| Every current source is listed and every transform is reproducible. | The form asks for data sources; transparent methods are judge-facing evidence. |
| The official primary dataset is named plainly. | The current primary dataflow is `SPC:DF_CLIMATE_CHANGE(1.0)`. |
| Any added contextual layer has a visible source and limitation. | Prevents a secondary source from silently becoming a causal claim. |
| The 60-second demo works without explanation. | Judges should understand it even if they do not explore deeply. |

## References

[1]: https://pacificdatavizchallenge.org/ "Pacific Dataviz Challenge 2026 — official theme, official datasets, rules, and 2026 judges"
