# Self-hosting source package contents

The downloadable archive contains three top-level folders:

| Folder | Contents | What to do |
| --- | --- | --- |
| `app/` | Complete React, Vite, TypeScript, CSS, data, and build configuration | Follow `app/SELF_HOSTING.md`. |
| `assets/` | The three Signal Room PNG files required for independent hosting | Copy into `app/client/public/assets/` before building with `VITE_ASSET_BASE=/assets`. |
| `reusable-skill/` | The validated Pacific Dataviz competition workflow skill | Add it to a compatible skill library or use its `SKILL.md` as a repeatable workflow reference. |

Before releasing the app, edit `app/client/src/config/projectProfile.ts` to replace all bracketed author and contact placeholders.
