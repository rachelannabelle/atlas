# Fake BE Wiring

## Purpose

This prototype uses a JSON file as a fake backend so non-technical editors can change UI content and scripted chat behavior without touching TypeScript.

Runtime config path:
- `/prototype-config.json` (served from `public/prototype-config.json`)

## Required Top-Level Keys

The app validates the config after fetch. These keys are required:
- `topNav`
- `chat`

If either is missing or malformed, the app renders:
- `Prototype config error — check your JSON file.`

## Schema Overview

- `topNav.brand`
  - `appName`
  - `roleOptions`
  - `selectedRole`
- `topNav.buildings`
  - `defaultBuildingId`
  - `items[]` with `id`, `label`
- `topNav.quotationsMenu`
  - `items[]` with `id`, `title`, `lastUpdatedLabel`
  - `emptyStateEnabled` (boolean)
- `topNav.reportsMenu`
  - same shape as quotations
- `topNav.user`
  - `name`, `email`, `avatarAcronym`
- `chat.leftNavHistory`
  - `items[]` with `id`, `createdAt`, `scriptId`
  - `emptyStateEnabled` (boolean)
  - `helpUrl`
- `chat.scripts`
  - `scriptId`
  - `messages[]` (`role`, `content`)
  - `turns[]` (`userInput`, `assistantResponse`)
  - `fallback`
- `flowEngine` (optional, inert in this commit)

## Startup Behavior

At app startup (`RootLayout`):
1. Fetch `/prototype-config.json`
2. Validate required top-level keys (`topNav`, `chat`)
3. Apply defaults:
   - selected building from `topNav.buildings.defaultBuildingId`
   - selected role from `topNav.brand.selectedRole`
4. Build chat history from `chat.leftNavHistory.items` + `chat.scripts`
5. Normalize `createdAt` ISO strings to `Date`

## Scripted Chat Behavior

- Clicking a left-nav chat history item opens the associated script via `scriptId`.
- Left-nav chat title comes from the first user message in that script.
- Sending a message uses deterministic normalized matching:
  - trim + lowercase input
  - match against `turns[].userInput`
  - return `assistantResponse`
  - use script `fallback` if no turn matches

## Missing Script Rule

If `chat.leftNavHistory.items[*].scriptId` does not exist in `chat.scripts`:
- render an empty chat log
- show inline error:
  - `Script not found: [scriptId]`

## Empty State Controls

Empty-state copy/design is FE-owned. JSON only controls visibility.

- Quotations/Reports dropdown:
  - show empty state when `emptyStateEnabled === true`
- Chat history:
  - show empty state when `chat.leftNavHistory.emptyStateEnabled === true`
  - help link uses `chat.leftNavHistory.helpUrl`

## Flow Engine Status (Current Commit)

`flowEngine` fields are included for future prototyping flows (snackbars, error states, component orchestration) but are inert at runtime in this commit.

