# Copilot Instructions

## Overview
This repository contains a Nuxt-based application integrated with a Chrome extension. The primary application lives in the `app/` directory, which follows a typical Nuxt structure, while the Chrome extension code is located in the `chrome-extension/` directory.

## Architecture & Data Flow
- The Nuxt app employs Vue's Composition API with shared logic implemented via composable functions in `/composables` (e.g., `useAuth.ts`, `useBrowserExtension.ts`, `useSignatureGenerator.ts`).
- UI components and layouts are organized in `/components` and `/layouts`, following a clear separation of concerns.
- The Chrome extension is structured with distinct files for background tasks, content scripts (e.g., `content-dashboard.js`, `content-working.js`), and popup interactions (`popup.js`, `popup-vue-compatible.html`).
- Integration points include the Nuxt module in `/modules` (e.g., `@nuxt/ui.ts`) and shared services in `/services` and `/utils`.

## Developer Workflows
- **Building & Running:** Use `pnpm dev` for development and `pnpm build` for production. The project is configured via `package.json` and managed with pnpm.
- **Styling:** Tailwind CSS is used for styling; configuration is available in `tailwind.config.js` and styles are located in `app/assets/css/styles.css`.
- **TypeScript Conventions:** Type safety is enforced through `tsconfig.json`, adhering to strict type-checking practices.
- **Chrome Extension Testing:** Follow the structure in `chrome-extension/manifest.json` to understand background, content, and popup script interactions.

## Project-Specific Conventions
- Vue components leverage the Composition API; common functionality is encapsulated in composable files within `/composables`.
- File naming generally uses kebab-case for scripts and lower-case naming conventions for directories.
- The separation between the main application and the Chrome extension is maintained by isolating their codebases into `app/` and `chrome-extension/` respectively.
- Key integration and configuration files include `nuxt.config.ts` for Nuxt settings and `CHROME_EXTENSION_SETUP.md` for extension-specific guidelines.

## External Dependencies & Integration Points
- This project is built with Nuxt 4 and leverages pnpm for dependency management.
- Tailwind CSS provides the styling backbone, while TypeScript ensures code reliability.
- The Chrome extension follows standard web extension development patterns, with clearly defined roles for background and content scripts.

## Final Notes
Ensure that any modifications respect the separation of concerns between the main Nuxt application and the extension code. Please review and advise on any unclear or incomplete sections for further iteration.
