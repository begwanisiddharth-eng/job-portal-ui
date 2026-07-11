---
name: Project Architecture: src/components Standards Gaps
description: Systemic, codebase-wide deviations from documented coding-standards.md found across src/components — not isolated to one file
type: project
---

Reviewed all files in `src/components/` (July 2026): CompaniesSection, ConfirmationModal, Footer, Hero, JobsSection, Layout, Navbar, ProtectedRoute, RefreshButton, ScrollToTop. Two rule violations are **pervasive, not isolated**:

1. **Default exports only.** Every single component file uses `export default ComponentName` with no named export, directly contradicting `.claude/rules/coding-standards.md` ("Named exports preferred over default exports for components"). This is the established pattern across the whole `src/components` directory (and likely `src/pages` too, unverified). Flagging this per-file in every review is noisy — worth raising once as a repo-wide convention decision (either bulk-migrate or update the rule doc) rather than fixing file-by-file.

2. **`dark:` Tailwind variant used extensively** (CompaniesSection, ConfirmationModal, Hero, JobsSection, Layout, Navbar, RefreshButton all use it heavily) despite the rule "do NOT use the `dark:` Tailwind variant — dark mode is controlled by ThemeContext via conditional class toggling." Root cause: `ThemeContext.jsx` (`src/context/ThemeContext.jsx`) actually implements dark mode by toggling a `dark`/`light` class on `document.documentElement`, which is the exact mechanism that makes Tailwind's `darkMode: 'class'` + `dark:` variant work. So the codebase's *actual* dark-mode architecture is "ThemeContext toggles a class, and components use `dark:` variants to react to it" — this is a coherent, real pattern, just not the one described in the rules doc (which implies manual `theme === 'dark' ? 'x' : 'y'` conditional className strings). Footer.jsx and ProtectedRoute.jsx and ScrollToTop.jsx are the only reviewed files that don't use `dark:` at all.

**Why:** These appear to be pre-existing, deliberate, consistent patterns across the whole component layer, not bugs introduced recently.
**How to apply:** Still flag both as rule violations per the documented standard (must-fix per the letter of the rules), but note in review output that they are repo-wide, not file-specific, so the team can decide once whether to update the code or update the rule doc — don't treat as N separate isolated defects.

Also noted: `ThemeContext.jsx` has several leftover `console.log` debug statements (init/apply/toggle theme) — not in `src/components` but adjacent, worth flagging if that file is ever reviewed.
