---
name: Arena Brawl
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#3d4a3e'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#6d7b6d'
  outline-variant: '#bccabb'
  surface-tint: '#006d36'
  primary: '#006d36'
  on-primary: '#ffffff'
  primary-container: '#4ade80'
  on-primary-container: '#005e2d'
  inverse-primary: '#4de082'
  secondary: '#8127cf'
  on-secondary: '#ffffff'
  secondary-container: '#9c48ea'
  on-secondary-container: '#fffbff'
  tertiary: '#005ac2'
  on-tertiary: '#ffffff'
  tertiary-container: '#aac4ff'
  on-tertiary-container: '#004da8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6dfe9c'
  primary-fixed-dim: '#4de082'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005227'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.5'
  label-numeric:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
  headline-md-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.2'
spacing:
  arena-margin: 24px
  gutter: 16px
  bar-height: 32px
  border-width-thick: 4px
  border-width-thin: 2px
---

## Brand & Style

This design system is built for "Ball Fight," a game that embraces an **intentionally unpolished, indie-developer aesthetic**. The goal is to evoke the nostalgic feeling of early 2000s flash games or local multiplayer prototypes—clean and functional, but with a "just for friends" handmade charm.

The visual direction combines **Brutalism** and **High-Contrast** elements. It utilizes heavy black strokes, raw layouts, and a purposefully mismatched color palette to create a low-stakes, high-energy environment. It prioritizes clarity of action and personality over corporate smoothness, ensuring players focus on the chaotic mechanics of the game.

## Colors

The palette is vibrant and purposefully clashing to maintain the indie dev vibe. 
- **Primary (Neon Green):** Reserved for high-vitality indicators like full health bars and success states.
- **Secondary (Vivid Purple):** Used for player identification, special abilities, and primary accents.
- **Tertiary (Bright Blue):** Used for UI secondary elements and alternative player roles.
- **Neutral:** A deep, near-black charcoal used for the "heavy" 2px-4px borders that define the game's structure.
- **Background:** A slightly off-white or very light grey to reduce eye strain while keeping the "canvas" feel of a square arena.

## Typography

The typography strategy mixes high-quality sans-serifs with a technical monospace for a "dev tool" feel. 
- **Headlines:** Uses **Plus Jakarta Sans** for its slightly rounded, friendly but modern terminals. It feels approachable yet bold.
- **Body:** **Inter** provides maximum legibility for settings and instructions.
- **Data/Stats:** **JetBrains Mono** is used for health numbers (e.g., "250 / 250") and timers to reinforce the "unpolished" indie/coding aesthetic.

## Layout & Spacing

The layout is centered around a **Fixed Grid** philosophy, dominated by a large, square central arena.
- **The Arena:** A perfect square with a heavy 4px border. This is the primary field of play.
- **UI HUD:** Positioned strictly below or above the arena (no overlays for the "raw" look). Health bars and names are aligned to the outer edges of the arena width.
- **Mobile Reflow:** On smaller screens, the HUD elements stack vertically, and the arena scales down to fit the viewport width while maintaining its 1:1 aspect ratio.
- **Rhythm:** Spacing is modular (8px increments) but often "tight" to mimic a compact game engine window.

## Elevation & Depth

This design system rejects soft shadows and blurs in favor of **Bold Borders** and **Hard Shadows**.
- **Depth via Offsets:** Depth is created by a 4px solid black offset shadow on buttons and containers, rather than a blur. This creates a "pop-out" comic or game effect.
- **Stroke-based Hierarchy:** The most important elements (the Arena, Primary Buttons) use a 4px stroke. Secondary elements (Chips, Health Bar containers) use a 2px stroke.
- **Flat Layers:** No gradients or glassmorphism. Objects are solid colors placed on top of one another, separated only by their thick outlines.

## Shapes

The shape language is primarily **Sharp (0px roundedness)** for structural elements like the Arena and Health Bars, giving it a rigid, "engineered" feel. 

**Exceptions:**
- **Avatars:** Circular (fully rounded) to contrast against the square world, making player characters immediately identifiable.
- **Status Pills:** Can use a subtle "Soft" (4px) radius if they are secondary to the main gameplay loop (e.g., lobby tags).

## Components

### Health & Energy Bars
- Consist of a 2px black bordered container with a light grey background.
- The "fill" is a solid, un-gradiented block of color (Primary Green for HP).
- Text overlays (using the label-numeric font) are centered horizontally.

### Buttons
- Rectangular with 0px corner radius.
- 2px black border.
- On hover/press, the button shifts 2px down and right to "cover" its own hard shadow, simulating a physical click.

### Circular Avatars
- Solid 3px border using the player's assigned secondary or tertiary color.
- Transparent background within the circle if the asset doesn't fill the frame.

### Input Fields
- Monospaced text entry.
- Sharp corners, white background, 2px black border.
- Focus state is indicated by the border changing to the Primary Green or Secondary Purple.

### Arena Square
- The definitive component. A 4px solid black border containing a white or transparent field. No internal decorations; the "messiness" comes from the players within it.