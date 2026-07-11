---
description: Core coding conventions for the JobPortal React codebase
---

# Coding Standards

## Language & Components

- No TypeScript — plain JSX only. Do not reference or suggest `.ts`/`.tsx` files.
- Functional components only — no class components.
- Named exports preferred over default exports for components.
- Files must match their component name (e.g., `JobCard.jsx` exports `JobCard`).

## Styling

- Tailwind CSS utility classes exclusively — no inline styles, no CSS modules.
- Mobile-first responsive design using `sm:`, `md:`, `lg:` breakpoints.
- Dark mode is controlled by `ThemeContext`, which toggles a `dark`/`light` class on `document.documentElement`. Use Tailwind's `dark:` variant for dark-mode styling — it reads that same class (`darkMode: 'class'`).

## Naming Conventions

- Components: `PascalCase`
- Variables and functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

## ESLint

- Flat config in `eslint.config.js`.
- `no-unused-vars` ignores names starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).
