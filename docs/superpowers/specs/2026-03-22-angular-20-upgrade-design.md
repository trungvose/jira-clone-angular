# Angular 20 Upgrade Design Spec

## Goal

Upgrade Jira Clone from Angular 19 to Angular 20, including all ecosystem dependencies, plus four architectural modernizations: migrate build from webpack to esbuild (`application` builder), upgrade TailwindCSS v3 to v4, replace Karma with Vitest, migrate ESLint to flat config, and remove Storybook.

## Architecture

Single branch with atomic commits per step. Same proven pattern from prior migrations (v17->v18->v19). Each phase completes before the next begins. Build + lint + manual smoke test after each major phase.

## Tech Stack (Target)

Angular 20, TypeScript ~5.8.x, zone.js ~0.15.x, ng-zorro-antd 20, ngx-quill 28 + Quill 2, @angular/build (esbuild), TailwindCSS v4, Vitest, ESLint 9 flat config

---

## Phase 1: Core Angular 20 Upgrade

1. `ng update @angular/core@20 @angular/cli@20 --force` — bumps Angular core, CLI, compiler-cli, TypeScript to ~5.8
2. `ng update @angular/cdk@20` — Angular CDK 20
3. Temporarily bump `@angular-devkit/build-angular` to v20 (removed in Phase 4)

**Key version targets:**
- `@angular/*`: `^20.x`
- `@angular/compiler-cli`: `^20.x`
- `typescript`: `~5.8.x`
- `zone.js`: `~0.15.x` (no change, already at 0.15.1)
- Node.js: v24.12.0 (already compatible, Angular 20 requires >=20)

**Gotchas:**
- `ng update` may try to migrate to `@angular/build` builder — revert `angular.json` changes if so (handled properly in Phase 4)
- TypeScript 5.8 may surface new type errors
- `InjectFlags` API removed — schematic handles automatically
- `standalone: true` already removed in v19 migration, no action needed

## Phase 2: Ecosystem Dependencies

One commit per dependency:

1. `ng-zorro-antd` -> v20 via `ng update ng-zorro-antd`
   - Auto-migrates `[nz-icon]` selector -> `nz-icon` tag
   - `input-number-legacy` removed (not used in project)
   - `@WithConfig` migrated to standard decorator
   - `nz-tabset` selector removed (not used)
2. `@ant-design/icons-angular` -> `^20.0.0`
3. `ngx-quill` -> `^28.x` (Angular 20 compatible), `quill` stays at `^2.0.3`
4. `@angular-builders/custom-webpack` -> `^20.0.1` (temporary, removed in Phase 4)
5. `@angular-eslint/*` -> `20.x` (reconfigured in Phase 6)
6. `@ngneat/until-destroy` — keep at `^8.0.3`, force if needed
7. `@datorama/akita` + related packages — keep current versions, force if needed
8. `@sentry/angular` — keep at `^9.x`, verify compatibility

**No change:** `rxjs` (^7.8.1), `date-fns` (^2.14.0), `@ctrl/tinycolor` (^4.2.0)

**Tech debt flagged:** `@datorama/akita` is unmaintained. Plan replacement in a dedicated follow-up (signals-based state or lightweight alternative).

## Phase 3: Remove Storybook

Single commit. Remove all Storybook-related files and dependencies.

**Dev deps to remove:**
- `@storybook/addon-actions`, `@storybook/addon-essentials`, `@storybook/addon-google-analytics`, `@storybook/addon-links`, `@storybook/angular`
- `babel-loader`, `@babel/core`, `react-is`
- `@compodoc/compodoc` (only used for Storybook docs:json)

**Files to delete:**
- All `.stories.ts` files in `src/app/jira-control/`
- `.storybook/` config directory (if exists)

**Scripts to remove from `package.json`:**
- `storybook`, `build-storybook`, `docs:json`, `docs:html`

## Phase 4: Build Migration (webpack -> esbuild + TailwindCSS v4)

Migrate from `@angular-builders/custom-webpack:browser` to `@angular/build:application` and upgrade TailwindCSS from v3 to v4.

**Steps:**

1. Install `@angular/build` (replaces `@angular-devkit/build-angular` as the build package)
2. Update `angular.json`:
   - Build: `@angular-builders/custom-webpack:browser` -> `@angular/build:application`
   - Serve: `@angular-builders/custom-webpack:dev-server` -> `@angular/build:dev-server`
   - Remove webpack-specific options: `main` -> `browser`, remove `polyfills` file reference (use `polyfills` array or inline), remove `vendorChunk`, `buildOptimizer`, `aot` (always on with esbuild), `namedChunks`, `extractLicenses` (review defaults)
   - Keep: `outputPath`, `index`, `tsConfig`, `assets`, `styles`, `scripts`, `fileReplacements`, `budgets`
3. Upgrade TailwindCSS v3 -> v4:
   - `npm install tailwindcss@4`
   - Remove `tailwind.config.js` (v4 uses CSS-based config with `@theme`)
   - Remove `postcss-import`, `postcss-loader`, `postcss-scss`, `autoprefixer` (TailwindCSS v4 handles these internally)
   - Update `src/styles.scss` to use `@import "tailwindcss"` instead of `@tailwind` directives
   - May need to convert `styles.scss` to `styles.css` or keep SCSS if other SCSS features are used
4. Delete `webpack.config.js`
5. Remove dev deps: `@angular-builders/custom-webpack`, `@angular-devkit/build-angular`, `postcss-import`, `postcss-loader`, `postcss-scss`
6. Remove `src/polyfills.ts` if possible — Angular 20 supports inline polyfills in `angular.json`
7. Remove `src/test.ts` (Karma test entry point, replaced by Vitest in Phase 5)

**Gotchas:**
- The `application` builder uses `browser` instead of `main` for the entry point
- `polyfills` becomes an array of strings (e.g., `["zone.js"]`) instead of a file path
- The `scripts` array for Quill may need adjustment — verify `quill/dist/quill.js` works with esbuild
- Budget config format may differ slightly
- `fileReplacements` syntax is the same
- SCSS is supported by the `application` builder natively

## Phase 5: Test Migration (Karma -> Vitest)

Replace Karma + Jasmine with Vitest.

**Steps:**

1. Install Vitest and Angular testing support:
   - `npm install -D vitest @analogjs/vitest-angular jsdom` (or use Angular's built-in Vitest support if available in v20)
2. Remove Karma dependencies:
   - `karma`, `karma-chrome-launcher`, `karma-coverage-istanbul-reporter`, `karma-jasmine`, `karma-jasmine-html-reporter`, `karma-coverage`
   - `jasmine-core`, `jasmine-spec-reporter`
   - `@types/jasmine`, `@types/jasminewd2`
   - `protractor`
3. Delete Karma config files:
   - `karma.conf.js`
   - `tsconfig.spec.json` (recreate for Vitest if needed)
4. Create `vitest.config.ts` with Angular plugin configuration
5. Update `package.json` test script: `"test": "vitest"` (or `"ng test"` if using Angular CLI's built-in Vitest support)
6. Update test files:
   - Replace `describe`/`it`/`expect` imports if needed (Vitest globals are compatible with Jasmine syntax)
   - Replace `TestBed` setup if Angular provides a Vitest-specific helper
   - Update any `TestBed.get()` -> `TestBed.inject()` calls
7. Remove `src/test.ts` (if not already removed in Phase 4)
8. Verify all existing tests pass

**Test files in scope (~15 spec files):**
- `app.component.spec.ts`, `app.module.spec.ts`
- Various component specs in `jira-control/` and `project/`
- Service specs, validator specs

**Gotchas:**
- Vitest uses `vi` instead of `jasmine` for spies — may need to update spy syntax
- `@analogjs/vitest-angular` provides the Angular compiler plugin for Vitest
- Zone.js test setup differs from Karma — need proper zone-patch imports

## Phase 6: ESLint Flat Config Migration

Migrate from `.eslintrc.json` to `eslint.config.js`.

**Steps:**

1. Run `ng update @angular-eslint/schematics` — auto-converts to flat config
2. Verify the generated `eslint.config.js` preserves custom rules:
   - Component/directive selector rules (no prefix)
   - Naming conventions
   - Disabled rules (`no-explicit-any`, `no-unused-vars`, etc.)
3. Delete `.eslintrc.json`
4. Remove deprecated options:
   - `createDefaultProgram: true` (deprecated, no longer needed)
5. Upgrade ESLint to v9 if the schematic doesn't do it automatically
6. Remove obsolete dev deps:
   - `codelyzer` (deprecated, replaced by @angular-eslint)
   - `tslint` (deprecated)
   - `nz-tslint-rules` (deprecated)
7. Run `ng lint` and fix any new issues
8. Update `package.json` lint script if needed

**Gotchas:**
- ESLint 9 flat config uses `export default [...]` array format
- `typescript-eslint` v8 is already installed (from v19 migration)
- Some rule names may have changed in the flat config format
- `e2e/tsconfig.json` reference in parserOptions — protractor is being removed, clean this up

## Phase 7: Final Verification

1. `npm run build` — production build succeeds
2. `npm run test` — all tests pass with Vitest
3. `npm run lint` — no lint errors
4. Manual smoke test — app loads, navigation works, board renders, issues display
5. Clean `npm install` from scratch — `rm -rf node_modules && npm install`

## Dependency Version Map

| Package | Current (v19) | Target (v20) |
|---------|--------------|--------------|
| `@angular/core` (and all `@angular/*`) | `^19.2.20` | `^20.x` |
| `@angular/cli` | `^19.2.22` | `^20.x` |
| `@angular/cdk` | `^19.2.19` | `^20.x` |
| `@angular/build` | n/a | `^20.x` (new) |
| `@angular-devkit/build-angular` | `^19.2.22` | removed |
| `@angular-builders/custom-webpack` | `^19.0.1` | removed |
| `@angular-eslint/*` | `19.8.1` | `20.x` |
| `@ant-design/icons-angular` | `^19.0.0` | `^20.0.0` |
| `ng-zorro-antd` | `^19.3.1` | `^20.x` |
| `ngx-quill` | `^27.1.2` | `^28.x` |
| `quill` | `^2.0.3` | `^2.0.3` (no change) |
| `typescript` | `~5.8.3` | `~5.8.x` (no change or minor bump) |
| `zone.js` | `~0.15.1` | `~0.15.x` (no change) |
| `tailwindcss` | `^3.0.12` | `^4.x` |
| `eslint` | `^8.57.0` | `^9.x` |
| `vitest` | n/a | `^latest` (new) |
| `karma` | `~6.3.16` | removed |
| `@storybook/*` | `^6.1.11` | removed |

## What's NOT in scope

- **Signal migration** (`@Input()` -> `input()`, `@Output()` -> `output()`) — deferred
- **Zoneless change detection** — still experimental
- **Functional guard conversion** — `ProjectGuard` appears unused
- **`inject()` migration** — deferred
- **Akita replacement** — flagged as tech debt, dedicated follow-up
- **`@let` template syntax** — optional, no automated schematic
