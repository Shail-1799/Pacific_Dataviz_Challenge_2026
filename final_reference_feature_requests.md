# Verified request extraction: attribution and export-feedback enhancements

The supplied 980 × 155 screenshot was read in two overlapping horizontal crops. It requests the following three changes:

1. Replace attribution placeholders with actual source text and links.
2. Add a loading spinner and success message while generating the high-resolution State PNG export.
3. Add a quick **copy link** action for WMO context-term source URLs.

## Implementation boundaries

The application must not invent a personal author identity. The placeholder author profile remains configurable; this update instead replaces source-attribution placeholders in the evidence interface with explicit Pacific Data Hub and WMO source-credit links. The State PNG feedback must be visible, accessible, and non-blocking. WMO copy actions must copy the cited public source URL and leave the external source unopened unless the user chooses its link.
