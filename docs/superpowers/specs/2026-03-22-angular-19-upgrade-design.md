# Angular 19 Upgrade Design Spec

## Goal

Upgrade Jira Clone from Angular 18 to Angular 19, including all ecosystem dependencies and the flagship cleanup: removing explicit `standalone: true` from all components (now the default in Angular 19).

## Architecture

Same proven pattern from Parts 3-5: upgrade Angular core with `ng update --force`, resolve each dependency one at a time, commit after each step. Phase 2 verifies builds and lint. Stay on the `browser` builder (webpack) since the project depends on `@angular-builders/custom-webpack` for TailwindCSS PostCSS integration. Storybook v6→v7 migration remains deferred.

## Tech Stack

Angular 19, TypeScript ~5.6.2, zone.js ~0.15.0, ng-zorro-antd 19, ngx-quill 27 + Quill 2, Storybook 6.x (unchanged, deferred)

---

## Key Changes in Angular 19

- **`standalone: true` is now the default** — components, directives, and pipes no longer need explicit `standalone: true`. The `ng update` schematic removes it automatically. Components that are NOT standalone must now declare `standalone: false`.
- **TypeScript >=5.5 required** — current `~5.4.5` must be bumped
- **zone.js ~0.15.0 required** — current `~0.14.10` must be bumped
- **Node.js >=18.19.1** required — already compatible
- **`@angular/build` replaces `@angular-devkit/build-angular`** as default builder — we opt out since we use `@angular-builders/custom-webpack`
- **HMR for styles/templates** enabled by default — no action needed
- **Signal-based inputs/outputs/queries stable** — available but migration deferred
- **`linkedSignal` and `resource()` API** — new reactive primitives, optional
- **Zoneless change detection** — experimental, deferred

## Dependency Version Map

| Package | Current (v18) | Target (v19) |
|---------|--------------|--------------|
| `@angular/core` (and all `@angular/*`) | `^18.2.14` | `^19.2.x` |
| `@angular/cli` | `^18.2.21` | `^19.2.x` |
| `@angular-devkit/build-angular` | `^18.2.21` | `^19.2.x` |
| `@angular/compiler-cli` | `^18.2.14` | `^19.2.x` |
| `@angular/cdk` | `^18.2.14` | `^19.2.19` |
| `@angular-builders/custom-webpack` | `^18.0.0` | `^19.0.1` |
| `@angular-eslint/*` | `18.4.3` | `19.8.1` |
| `@ant-design/icons-angular` | `^18.0.0` | `^19.0.0` |
| `ng-zorro-antd` | `^18.2.1` | `^19.3.1` |
| `ngx-quill` | `^26.0.10` | `^27.1.2` |
| `quill` | `^2.0.3` | `^2.0.3` (no change) |
| `typescript` | `~5.4.5` | `~5.6.2` |
| `zone.js` | `~0.14.10` | `~0.15.0` |
| `@typescript-eslint/*` | `6.21.0` | `^8.0.0` |
| `eslint` | `^8.2.0` | `^8.57.0` |

**No change needed:** `@datorama/akita` (^7.1.1, no Angular peer dep), `@ngneat/content-loader` (^7.0.0, supports >=13), `@ngneat/until-destroy` (^8.0.3, supports >=10), `@sentry/angular` (^9.30.0, supports >=14), `rxjs` (^7.8.1), `quill` (^2.0.3), `@storybook/angular` (^6.1.11, deferred)

## Codebase State (pre-migration)

- **43 standalone components** — all with explicit `standalone: true` (to be removed by `ng update` schematic)
- **0 NgModules** — fully standalone architecture since Angular 18 migration
- **Modern control flow** — 100% using `@if`/`@for`/`@switch`, no legacy `*ngIf`/`*ngFor`
- **Modern bootstrap** — `bootstrapApplication()` with `provideRouter()`, `provideAnimations()`, `provideHttpClient()`
- **3 route config files** — `app.routes.ts`, `project.routes.ts`, `work-in-progress.routes.ts`
- **0 CommonModule imports** — fully tree-shaken
- **1 class-based guard** — `ProjectGuard implements CanActivate` (appears to be dead code, not in scope)

## What's NOT in scope

- **Esbuild/application builder migration** — staying on webpack due to `@angular-builders/custom-webpack` dependency
- **Signal migration** (`@Input()` → `input()`, `@Output()` → `output()`) — deferred to follow-up
- **Zoneless change detection** — still experimental
- **Functional guard conversion** — `ProjectGuard` appears unused
- **`inject()` migration** — deferred
- **Storybook upgrade** — deferred
- **`@let` template syntax adoption** — optional, no automated schematic

## Potential Gotchas

1. **`ng update` may try to migrate to `@angular/build` builder.** Must opt out or revert changes to `angular.json` since we use `@angular-builders/custom-webpack`. The `customWebpackConfig` block and `@angular-builders/custom-webpack:browser` builder must be preserved.

2. **`@angular-eslint` 19 requires `typescript-eslint` v8.** This is a major jump from v6.21.0. The `.eslintrc.json` format should still work with typescript-eslint v8, but some rule names or configs may have changed.

3. **`standalone: true` removal is automatic** via `ng update` schematic — verify it ran on all 43 components. If any were missed, manually remove the redundant flag.

4. **ng-zorro-antd v19 breaking changes** — check [ng-zorro v19 changelog](https://github.com/NG-ZORRO/ng-zorro-antd/releases) for component API changes. The `NzIconModule.forRoot([])` and `NzIconModule.forChild()` patterns should still work.

5. **TypeScript 5.6 stricter checks** — may surface new type errors in existing code. TS 5.6 includes stricter checks around unused imports and iterator helpers.

6. **zone.js 0.15.0** — jump from 0.14.x. Verify async operations (HTTP calls, timers, Akita state management) still work correctly.

7. **ngx-quill 27** — new major version for Angular 19. Still uses Quill v2. Check for any API changes in the `<quill-editor>` component or `QuillModule.forRoot()` config.

8. **Storybook 6.x** — will likely show more warnings with Angular 19 but should still work for basic component development. Do NOT attempt to upgrade Storybook in this PR.

9. **`@angular/platform-browser-dynamic`** — still in `package.json` but unused since `bootstrapApplication()`. The `ng update` schematic may remove it. This is expected.

10. **`polyfills.ts` file** — Angular 19 continues to support both the file-based approach and the `polyfills` array in `angular.json`. No forced migration.
