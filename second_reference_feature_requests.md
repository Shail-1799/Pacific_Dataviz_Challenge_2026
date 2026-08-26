# Verified feature requests from supplied reference

The supplied 1026 × 263 pixel screenshot was read in two overlapping horizontal crops. It requests four additions:

1. Convert the end-to-end Pacific dataviz workflow into a reusable skill using the skill-creation process.
2. Set the opening sequence to play only once per browser and add author credit in the footer.
3. Let users download the entire dashboard view as a high-resolution PDF.
4. Let users select two country traces and compare them side by side.

## Signal Room implementation decisions

The author credit will use a single documented configuration module containing placeholders for author name, affiliation/designation, country or territory, email, and portfolio URL. The one-time opener will use browser session storage, so it plays again in a new browser session but not on refreshes within the same browser session. The PDF export will capture the complete interactive reading surface after the user has selected their desired signal and place; the capture is branded and includes a method note. The comparison feature will keep the selected signal consistent across both countries to avoid comparing incompatible units.
