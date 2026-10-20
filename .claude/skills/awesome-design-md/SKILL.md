---
name: awesome-design-md
description: Library of 84 ready-made DESIGN.md design systems (colors, typography, spacing, components, rules) inspired by real brands such as Stripe, Apple, Linear, Vercel, Notion, Airbnb, Tesla and Spotify. Use when building or restyling UI "to look like" a known site, when picking a visual direction, or when the project needs a DESIGN.md.
argument-hint: "[design-name] [what to build]"
---

# Awesome DESIGN.md

Vendored from https://github.com/VoltAgent/awesome-design-md (commit 3b60532, MIT, see `LICENSE`).

A DESIGN.md is a plain-markdown design system an agent reads to generate visually consistent UI:
YAML front matter with tokens (`colors`, `typography`, spacing, radii, shadows) followed by prose
describing layout, components, do's and don'ts.

## How to use

Invoked as `/awesome-design-md <design-name> [task]`, e.g. `/awesome-design-md stripe build the landing page`.
Arguments: `$ARGUMENTS`

- First word = design name, matched to a folder in `designs/` (case-insensitive; `linear` → `linear.app`,
  `mistral` → `mistral.ai`). If nothing matches, list the closest names and ask.
- The rest = the task to do in that style. No task → summarize the design and ask what to build.
- No arguments → show the list below and ask which design to use.

1. Pick a design from `designs/<name>/DESIGN.md`. If the user named a brand or site, use the matching
   folder; otherwise suggest 2–3 that fit the product and let the user choose.
2. Read the whole DESIGN.md before writing any UI.
3. Apply its tokens and rules: map `colors` / `typography` to CSS custom properties (or the project's
   theme config), and follow the component and layout guidance.
4. If the user wants it as the project's standing design system, copy the file to the project root as
   `DESIGN.md`.

These are *inspired* interpretations. Don't copy logos, trademarks, or proprietary fonts. Use the
listed fallbacks when a font isn't licensed.

## Available designs

1win airbnb airtable aljazeera apple binance bmw bmw-m bugatti cal claude clay clickhouse cohere coinbase composio cursor dell-1996 dji elevenlabs expo ferrari figma framer hashicorp hp ibm intercom jobright kraken lamborghini linear.app lovable mastercard mercury meta minimax mintlify miro mistral.ai mongodb mydealz nerdwallet nike nintendo-2001 notion nvidia ollama opencode.ai oracle oura pinterest playstation posthog raycast renault replicate resend revolut runwayml sanity sap sentry shopify slack spacex spotify starbucks stripe supabase superhuman tesla theverge together.ai uber vercel vodafone voltagent warp webflow wired wise x.ai zapier 
