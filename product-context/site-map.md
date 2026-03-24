# Site Map

**Status:** Work in Progress (WIP)  
**Last Updated:** March 24, 2026  
**Version:** 1.0

---

## Overview

This document outlines the site structure and navigation architecture for the AiBE application. As the design progresses, this document will be updated to reflect new pages and deeper navigation levels.

---

## Navigation Architecture

### L0 Pages (Top Level)

#### 1. Homepage - "Chat Page"
- **Route:** `/` or `/chat`
- **Purpose:** Main chat interface for interacting with AiBE
- **CTAs to Navigate Here:**
  - Logo (click)
  - "AiBE" text on top nav header (click)
  - "+ New chat" CTA on top nav header

#### 2. Knowledge Base
- **Route:** `/knowledge-base` or `/documents`
- **Purpose:** Document repository and knowledge management
- **CTAs to Navigate Here:**
  - "Knowledge Base" CTA on top nav header

#### 3. Quotations
- **Route:** `/quotations`
- **Purpose:** Quotation management and generation
- **CTAs to Navigate Here:**
  - "Quotations" CTA on top nav header

#### 4. Reports
- **Route:** `/reports`
- **Purpose:** Reporting and analytics
- **CTAs to Navigate Here:**
  - "Reports" CTA on top nav header

#### 5. Terms and Policies
- **Route:** `/terms-and-policies`
- **Purpose:** Legal information, terms of service, privacy policy
- **CTAs to Navigate Here:**
  - Avatar dropdown menu → "Terms and Policies" menu item
- **Access Level:** Secondary navigation

#### 6. Help
- **Route:** External link (CMS-managed)
- **Purpose:** FAQ and help documentation
- **CTAs to Navigate Here:**
  - Avatar dropdown menu → "Help" menu item
- **Access Level:** Secondary navigation
- **Notes:** Currently links to an external FAQ page managed on a separate CMS

#### 7. Settings
- **Route:** `/settings`
- **Purpose:** User preferences and account settings
- **CTAs to Navigate Here:**
  - Avatar dropdown menu → "Settings" menu item
- **Access Level:** Secondary navigation

---

## Navigation Patterns

### Primary Navigation (Top Nav Header)
- Logo & AiBE text
- "+ New chat" button
- Knowledge Base link
- Quotations link
- Reports link
- Avatar (dropdown trigger)

### Secondary Navigation (Avatar Dropdown)
- Terms and Policies
- Help
- Settings

---

## L1 Pages (Sub-pages)

> **Note:** L1 pages will be added here as the architecture develops.

---

## L2+ Pages (Deeper Navigation)

> **Note:** Additional navigation levels will be documented here as they are defined.

---

## Future Considerations

- [ ] Define L1 pages for each L0 section
- [ ] Document modal/drawer interactions
- [ ] Add breadcrumb navigation patterns
- [ ] Define deep-linking structure
- [ ] Document mobile navigation variations
- [ ] Add user flow diagrams

---

## Quick Reference

| Page | Route | Nav Type | CTA Location |
|------|-------|----------|--------------|
| Chat Page | `/` | Primary | Logo, AiBE text, + New chat |
| Knowledge Base | `/knowledge-base` | Primary | Top nav header |
| Quotations | `/quotations` | Primary | Top nav header |
| Reports | `/reports` | Primary | Top nav header |
| Terms and Policies | `/terms-and-policies` | Secondary | Avatar dropdown |
| Help | External | Secondary | Avatar dropdown |
| Settings | `/settings` | Secondary | Avatar dropdown |

---

## Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-03-24 | 1.0 | Initial site map created with L0 pages |
