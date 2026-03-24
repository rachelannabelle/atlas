# AiBE Prototype PRD (Draft)

## Product Context

AiBE is a Gemini wrapper for guided enterprise workflows.  
This repository is used as a prototyping engine for customer experience and design validation.

## Problem

Prototype updates currently require engineering edits.  
Non-technical teams need to control UI text, scripted chat behavior, and navigation context directly.

## Goal

Enable one-prototype-per-repo operation where:
- one JSON file controls prototype content and scripted chat behavior
- non-technical users can update that JSON with LLM help
- the app reflects changes without rebuild

## Non-Goals (This Iteration)

- No live backend integration
- No multi-prototype switching in one repo
- No runtime flow-engine execution (schema only)

## Functional Requirements

- Load config from `public/prototype-config.json` at runtime.
- Validate config (`topNav`, `chat` required) and show safe error state if invalid.
- Drive top-nav role, buildings, user identity, and dropdown list items from JSON.
- Drive left-nav chat history from JSON.
- Use scripted chat turns for deterministic responses.
- Keep empty-state copy in FE; use JSON flags for visibility control.

## User Personas

- CX team member preparing demo scripts
- PM/designer adjusting prototype copy and context
- Intern maintaining demo setup using LLM assistance

## Success Criteria

- Non-technical user can edit one JSON file and see updates after refresh.
- Scripted chats can be replayed consistently for demos.
- Invalid config fails gracefully with a clear error message.

## Future Direction

- Activate `flowEngine` runtime support for snackbars, error states, and reasoning component orchestration.
- Add schema validation tooling and editor assistant prompts.

