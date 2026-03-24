# Prototype JSON Guide

## Who This Is For

This guide is for interns and non-technical teammates who need to update prototype content in one place.

Main file to edit:
- `public/prototype-config.json`

Reference template:
- `product-context/prototype-config.template.json`

## Safe Editing Rules

- Keep valid JSON (double quotes, no trailing commas).
- Keep IDs unique (`scriptId`, item `id`).
- Keep required top-level keys: `topNav`, `chat`.
- Use ISO datetime for `createdAt` (example: `2026-03-24T09:30:00.000Z`).

## Quick Recipes

### Add a building
1. Add a new object to `topNav.buildings.items`.
2. Include `id` and `label`.

### Set default building
1. Set `topNav.buildings.defaultBuildingId` to one of the building IDs.

### Change role options
1. Edit `topNav.brand.roleOptions`.
2. Set `topNav.brand.selectedRole` to one of those values.

### Force empty states
- Quotations: set `topNav.quotationsMenu.emptyStateEnabled` to `true`.
- Reports: set `topNav.reportsMenu.emptyStateEnabled` to `true`.
- Chat history: set `chat.leftNavHistory.emptyStateEnabled` to `true`.

### Create a scripted chat
1. Add a script in `chat.scripts` with a new `scriptId`.
2. Add first user message in `messages`.
3. Add turns under `turns`.
4. Add a fallback response.
5. Add a left-nav item in `chat.leftNavHistory.items` referencing that `scriptId`.

## Deterministic Matching

Chat matching uses:
- lowercase + trimmed comparison

So these match:
- `Excavation Works`
- ` excavation works `
- `excavation works`

## Common Errors

- Missing top-level keys (`topNav`, `chat`) causes full-page config error.
- `scriptId` in chat history not found in `chat.scripts` shows inline:
  - `Script not found: [scriptId]`
- Invalid JSON syntax prevents config from loading.

## Suggested Prompt for LLM Editing

Use this with Claude or another LLM:

`Update this JSON without changing its structure. Keep valid JSON only. Add 2 new buildings, set default building to the second new one, add 1 new scripted chat with 3 turns, and keep all existing IDs unique.`

## Flow Engine Note

`flowEngine` exists for future behavior orchestration but is inert in this commit. Editing it does not change runtime behavior yet.

