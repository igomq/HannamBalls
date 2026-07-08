# AGENTS.md

Guidance for coding agents working in this repository.

## Project Overview

HannamBalls is a static browser game with a Tauri desktop wrapper.

- Web source lives in `src/`.
- `dist/` is generated output from the build script and should not be edited directly.
- Tauri source and configuration live in `src-tauri/`.
- Cloudflare Wrangler serves static assets from `dist/`.

## Commands

Use `pnpm` for Node package commands. The project declares `pnpm@11.10.0`.

- `pnpm build` - clears `dist/` and copies `src/` into it.
- `pnpm tauri dev` - starts the Tauri desktop app during development.
- `pnpm tauri build` - builds the Tauri app.

There is currently no useful automated test command. `pnpm test` is a placeholder that exits with an error.

## Code Layout

- `src/index.html` - character selection screen and related inline UI logic.
- `src/game.html` - game screen and battle logic.
- `src/characters.js` - character data shared by the screens.
- `src/effects.js` and `src/effects.css` - reusable visual effects.
- `src/images/` - character image assets.
- `build.js` - Node build script that copies `src` to `dist`.
- `src-tauri/src/` - Rust entry points for the Tauri wrapper.

## Development Notes

- Keep source changes in `src/`; rebuild to refresh `dist/`.
- Do not hand-edit generated Tauri schemas under `src-tauri/gen/`.
- Preserve the current static-file architecture unless the task explicitly calls for a bundler or framework.
- The frontend uses Korean copy and Tailwind loaded from CDN in the HTML files.
- Character image paths should stay relative to the HTML files so they work after copying to `dist/`.
- Keep game-facing data in `src/characters.js` when adding or changing characters.

## Verification

For web-only changes, run:

```sh
pnpm build
```

For Tauri changes, run the relevant Tauri command:

```sh
pnpm tauri dev
pnpm tauri build
```

When changing gameplay or UI behavior, also verify manually in a browser or Tauri preview because there are no automated tests yet.
