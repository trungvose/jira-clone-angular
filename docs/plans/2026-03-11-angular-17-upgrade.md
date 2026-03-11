# Angular 17 Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade Jira Clone from Angular 16 to Angular 17, then migrate to standalone components and new control flow syntax.

**Architecture:** Two-phase approach. Phase 1 follows the proven pattern from Parts 1-3: upgrade Angular core with `--force`, resolve each dependency one at a time, commit after each step. Phase 2 uses Angular CLI schematics to automate the standalone component migration (`ng generate @angular/core:standalone`) and control flow migration (`ng generate @angular/core:control-flow`). Stay on the `browser` builder (webpack) since the project depends on `@angular-builders/custom-webpack` for TailwindCSS PostCSS integration. Storybook v6→v7 migration is deferred to a separate task.

**Tech Stack:** Angular 17, TypeScript ~5.4, zone.js ~0.14.0, ng-zorro-antd 17, Storybook 6.x (unchanged, deferred)

---

## Key Changes in Angular 17

Angular 17 is a landmark release:
- **Standalone components are the default** for new projects — existing apps should migrate
- **New control flow syntax** (`@if`, `@for`, `@switch`) replaces structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`)
- **New `application` builder** (esbuild + Vite) — optional, we defer this since we use custom-webpack
- **Signals are stable** — no migration needed yet, but available for future use
- **TypeScript 5.2-5.4** required (currently ~5.1.6)
- **zone.js ~0.14.0** required (currently ~0.13.3)
- **Node.js 18.13+** required (Node 16 dropped)

## Dependency Version Map

| Package | Current (v16) | Target (v17) |
|---------|--------------|--------------|
| `@angular/core` (and all `@angular/*`) | `^16.2.12` | `^17.3.12` |
| `@angular/cli` | `^16.2.16` | `^17.3.11` |
| `@angular-devkit/build-angular` | `^16.2.16` | `^17.3.11` |
| `@angular/compiler-cli` | `^16.2.12` | `^17.3.12` |
| `@angular/cdk` | `^16.2.14` | `^17.3.10` |
| `@angular-builders/custom-webpack` | `^16.0.0` | `^17.0.2` |
| `@angular-eslint/*` | `16.3.1` | `17.5.3` |
| `@ant-design/icons-angular` | `^16.0.0` | `^17.0.0` |
| `ng-zorro-antd` | `^16.2.2` | `^17.4.1` |
| `ngx-quill` | `^22.1.1` | `^24.0.5` |
| `typescript` | `~5.1.6` | `~5.4.5` |
| `zone.js` | `~0.13.3` | `~0.14.10` |
| `@ngneat/content-loader` | `^7.0.0` | `^7.0.0` (no change, supports >=13) |
| `@ngneat/until-destroy` | `^8.0.3` | `^8.0.3` (no change, supports >=10) |
| `@sentry/angular` | `^9.30.0` | `^9.30.0` (no change, supports >=14) |
| `@datorama/akita` | `^7.1.1` | `^7.1.1` (no Angular peer dep) |
| `@storybook/angular` | `^6.1.11` | `^6.1.11` (deferred — v7 migration is separate) |

## Codebase Migration Summary

**NgModules to remove (8):**
- `AppModule` → standalone bootstrap with `bootstrapApplication()`
- `AppRoutingModule` → inline route config
- `ProjectModule` → standalone components
- `ProjectRoutingModule` → inline route config
- `JiraControlModule` → standalone components (6 shared components)
- `SnowModule` → standalone component
- `WorkInProgressModule` → standalone component
- `WorkInProgressRoutingModule` → inline route config

**Structural directives to migrate (~54 instances across 26 files):**
- `*ngIf` → `@if`
- `*ngFor` → `@for` (requires `track` expression)
- No `*ngSwitch` usage found

---

## Phase 1: Dependency Upgrades

### Task 1: Create a New Branch

**Files:** None

- [ ] **Step 1: Create the branch**

```bash
cd /Users/trung.vo/Source/jira-clone-angular
git checkout master
git pull origin master
git checkout -b trung/v20-migration-part-4
```

- [ ] **Step 2: Verify branch**

Run: `git branch --show-current`
Expected: `trung/v20-migration-part-4`

---

### Task 2: Run ng update for Angular 17

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Run ng update with --force**

The `@angular-eslint/schematics` will cause a peer dependency conflict (same as all previous parts). Use `--force` to proceed.

```bash
npx ng update @angular/core@17 @angular/cli@17 --force
```

Expected: Angular packages updated to v17. The schematics may auto-migrate some config in `angular.json`.

- [ ] **Step 2: Verify Angular version in package.json**

Run: `grep '"@angular/core"' package.json`
Expected: `"@angular/core": "^17.3.12"` (or similar 17.x)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "build(deps): ng update @angular/core@17 @angular/cli@17 --force"
```

---

### Task 3: Upgrade TypeScript to ~5.4

**Files:**
- Modify: `package.json`

Angular 17 requires TypeScript `>=5.2.0 <5.5.0`. Current `~5.1.6` is below minimum.

**Note:** Check if `ng update` in Task 2 already bumped TypeScript. If `package.json` already shows `~5.4.x`, skip this task.

- [ ] **Step 1: Update typescript version in package.json**

```diff
- "typescript": "~5.1.6"
+ "typescript": "~5.4.5"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade typescript to ~5.4.5 for Angular 17"
```

---

### Task 4: Upgrade zone.js to ~0.14.0

**Files:**
- Modify: `package.json`

Angular 17 requires `zone.js ~0.14.0` (currently `~0.13.3`).

**Note:** Check if `ng update` in Task 2 already bumped zone.js. If `package.json` already shows `~0.14.x`, skip this task.

- [ ] **Step 1: Update zone.js version in package.json**

```diff
- "zone.js": "~0.13.3"
+ "zone.js": "~0.14.10"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade zone.js to ~0.14.10 for Angular 17"
```

---

### Task 5: Upgrade @angular-builders/custom-webpack

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Verify compatibility**

```bash
npm view @angular-builders/custom-webpack@17.0.2 peerDependencies --json
```

Expected: `"@angular/compiler-cli": "^17.0.0"`

- [ ] **Step 2: Update version in package.json**

```diff
- "@angular-builders/custom-webpack": "^16.0.0"
+ "@angular-builders/custom-webpack": "^17.0.2"
```

- [ ] **Step 3: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular-builders/custom-webpack to 17.0.2"
```

---

### Task 6: Upgrade @angular-eslint/*

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update all @angular-eslint packages in package.json**

```diff
- "@angular-eslint/builder": "16.3.1",
- "@angular-eslint/eslint-plugin": "16.3.1",
- "@angular-eslint/eslint-plugin-template": "16.3.1",
- "@angular-eslint/schematics": "16.3.1",
- "@angular-eslint/template-parser": "16.3.1",
+ "@angular-eslint/builder": "17.5.3",
+ "@angular-eslint/eslint-plugin": "17.5.3",
+ "@angular-eslint/eslint-plugin-template": "17.5.3",
+ "@angular-eslint/schematics": "17.5.3",
+ "@angular-eslint/template-parser": "17.5.3",
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular-eslint/* to 17.5.3"
```

---

### Task 7: Upgrade @angular/cdk

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update version in package.json**

```diff
- "@angular/cdk": "^16.2.14"
+ "@angular/cdk": "^17.3.10"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular/cdk to 17.3.10"
```

---

### Task 8: Upgrade Ant Design Packages

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update @ant-design/icons-angular and ng-zorro-antd**

```diff
- "@ant-design/icons-angular": "^16.0.0"
+ "@ant-design/icons-angular": "^17.0.0"
```

```diff
- "ng-zorro-antd": "^16.2.2"
+ "ng-zorro-antd": "^17.4.1"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade ng-zorro-antd to 17.4.1 and @ant-design/icons-angular to 17.0.0"
```

---

### Task 9: Upgrade ngx-quill

**Files:**
- Modify: `package.json`

ngx-quill v24.x supports Angular 17 while keeping Quill v1. Do NOT upgrade to v25+ which requires Quill v2 (breaking changes).

- [ ] **Step 1: Verify compatibility**

```bash
npm view ngx-quill@24.0.5 peerDependencies --json
```

Expected: `"@angular/core": "^17.0.0"` and `"quill": "^1.3.7"`

If v24.0.5 does not exist or requires Angular 18+, try:
```bash
npm view ngx-quill versions --json | grep '"2[34]'
```
Pick the latest version that has `@angular/core: ^17.0.0` as peer dep.

- [ ] **Step 2: Update version in package.json**

```diff
- "ngx-quill": "^22.1.1"
+ "ngx-quill": "^24.0.5"
```

(Adjust version based on Step 1 findings)

- [ ] **Step 3: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 4: Check for breaking API changes**

```bash
grep -r "ngx-quill\|QuillModule\|quill-editor" src/ --include="*.ts" --include="*.html" -l
```

Review each file. Key things to check:
- `QuillModule.forRoot()` is still used in `app.module.ts` — will be replaced during standalone migration
- `QuillModule` import in `project.module.ts`
- Any `<quill-editor>` component usage in templates

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade ngx-quill to 24.x for Angular 17"
```

---

### Task 10: Verify clean npm install

**Files:** None

- [ ] **Step 1: Delete node_modules and package-lock.json for a clean install**

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: No errors. If `npm install` fails due to Storybook 6.x peer dependency conflicts with Angular 17, use `npm install --force` — Storybook migration is deferred to a separate PR.

- [ ] **Step 2: If errors occur, resolve them**

Use the proven pattern:
1. Read the error to identify the conflicting package
2. `npm view <package> versions --json` to find compatible versions
3. `npm view <package>@<version> peerDependencies --json` to verify
4. Update `package.json` and re-run `npm install`

- [ ] **Step 3: Commit clean lock file**

```bash
git add package-lock.json
git commit -m "build(deps): clean npm install with resolved Angular 17 dependencies"
```

---

### Task 11: Verify ng serve works

**Files:** Potentially various `.ts` files if compilation errors

- [ ] **Step 1: Run the dev server**

```bash
npm start
```

Expected: Application compiles and serves without errors.

- [ ] **Step 2: If there are compilation errors**

- Fix TypeScript errors caused by stricter TS 5.4 checks
- Fix any Angular 17 deprecation warnings
- Fix any ng-zorro-antd API changes (v16 → v17) — check [ng-zorro v17 migration guide](https://ng.ant.design/docs/migration-v17/en)

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve Angular 17 compilation issues"
```

---

### Task 12: Verify ng build works

**Files:** None

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds without errors.

- [ ] **Step 2: Fix any build-only errors**

Production builds are stricter (AOT compilation). Fix any errors that only appear during `ng build`.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve Angular 17 production build issues"
```

---

## Phase 2: Standalone Components Migration

Angular 17 provides a 3-step schematic to automate the standalone migration. Run them in order.

### Task 13: Convert components to standalone

**Files:** All `*.component.ts`, `*.directive.ts` files, all `*.module.ts` files

The schematic adds `standalone: true` to all components/directives/pipes, moves their NgModule imports into each component's `imports` array, and updates NgModule `exports`.

- [ ] **Step 1: Run the standalone conversion schematic**

```bash
npx ng generate @angular/core:standalone --mode convert-to-standalone
```

When prompted to select a path, use `./` to process the entire project.

Expected: Components gain `standalone: true` and `imports: [...]` in their decorators. Module files are updated to export standalone components.

- [ ] **Step 2: Verify the changes look correct**

Spot-check a few files:
- `src/app/jira-control/avatar/avatar.component.ts` should now have `standalone: true` and `imports: [CommonModule]`
- `src/app/project/project.component.ts` should have `standalone: true` and relevant imports

- [ ] **Step 3: Verify ng serve still works**

```bash
npm start
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: convert all components to standalone (Angular 17 migration step 1)"
```

---

### Task 14: Prune NgModules

**Files:** All `*.module.ts` files

The schematic removes NgModule classes that are no longer needed (their declarations are now standalone).

- [ ] **Step 1: Run the prune schematic**

```bash
npx ng generate @angular/core:standalone --mode prune-ng-modules
```

When prompted to select a path, use `./` to process the entire project.

Expected: `JiraControlModule`, `SnowModule`, `WorkInProgressModule`, `WorkInProgressRoutingModule`, and potentially `ProjectModule`/`ProjectRoutingModule` are removed or simplified. `AppModule` is kept (will be handled in next step).

- [ ] **Step 2: Verify the changes**

Check that:
- `src/app/jira-control/jira-control.module.ts` is deleted or empty
- `src/app/core/snow/snow.module.ts` is deleted or empty
- `NzIconModule.forChild(NZ_JIRA_ICONS)` icon registration is preserved — verify icons still load by checking if `importProvidersFrom(NzIconModule.forChild(NZ_JIRA_ICONS))` appears in the project route config or component providers
- Route configs still work (lazy loading may switch from `loadChildren` with modules to `loadComponent` or `loadChildren` with route configs)

- [ ] **Step 3: Verify ng serve still works**

```bash
npm start
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: prune NgModules after standalone conversion (Angular 17 migration step 2)"
```

---

### Task 15: Migrate to standalone bootstrap

**Files:**
- Modify: `src/main.ts`
- Modify/Delete: `src/app/app.module.ts`
- Modify: `src/app/app-routing.module.ts` (may be inlined into main.ts or app.routes.ts)

The schematic converts `platformBrowserDynamic().bootstrapModule(AppModule)` to `bootstrapApplication(AppComponent, {...})`.

- [ ] **Step 1: Run the standalone bootstrap schematic**

```bash
npx ng generate @angular/core:standalone --mode standalone-bootstrap
```

When prompted to select a path, use `./` to process the entire project.

Expected: `main.ts` changes from:
```typescript
platformBrowserDynamic().bootstrapModule(AppModule)
```
to:
```typescript
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(/* ... */),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // ... other providers
  ]
})
```

- [ ] **Step 2: Verify and clean up main.ts**

The schematic may use `importProvidersFrom()` for some modules. Check that:
- Sentry providers are preserved (ErrorHandler, TraceService, APP_INITIALIZER)
- Akita providers are preserved (NG_ENTITY_SERVICE_CONFIG, AkitaNgDevtools, AkitaNgRouterStoreModule)
- `NzIconModule.forRoot([])` is converted (may need `importProvidersFrom(NzIconModule.forRoot([]))`)
- `QuillModule.forRoot()` is converted (may need `importProvidersFrom(QuillModule.forRoot())`)
- Route config is extracted properly

- [ ] **Step 3: Verify ng serve still works**

```bash
npm start
```

- [ ] **Step 4: Verify ng build still works**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: migrate to standalone bootstrap with bootstrapApplication() (Angular 17 migration step 3)"
```

---

## Phase 3: Control Flow Migration

### Task 16: Migrate structural directives to new control flow

**Files:** ~19 HTML template files with `*ngIf` and `*ngFor`

The schematic converts all structural directives to the new `@if`/`@for`/`@switch` syntax.

- [ ] **Step 1: Run the control flow migration schematic**

```bash
npx ng generate @angular/core:control-flow
```

When prompted to select a path, use `./` to process the entire project.

Expected transformations:

`*ngIf`:
```html
<!-- Before -->
<div *ngIf="condition">content</div>

<!-- After -->
@if (condition) {
  <div>content</div>
}
```

`*ngIf with else`:
```html
<!-- Before -->
<div *ngIf="condition; else elseBlock">content</div>
<ng-template #elseBlock>fallback</ng-template>

<!-- After -->
@if (condition) {
  <div>content</div>
} @else {
  fallback
}
```

`*ngFor`:
```html
<!-- Before -->
<div *ngFor="let item of items">{{ item }}</div>

<!-- After -->
@for (item of items; track item) {
  <div>{{ item }}</div>
}
```

**Important:** `@for` requires a `track` expression. The schematic usually adds `track $index` or `track item` — review and adjust if a better tracking expression exists (e.g., `track item.id`).

- [ ] **Step 2: Review the generated track expressions**

Search for `track $index` and consider replacing with proper identity tracking where applicable:

```bash
grep -r "track \$index" src/ --include="*.html" -l
```

For lists of objects with IDs (issues, users, etc.), prefer `track item.id` over `track $index` for better performance.

- [ ] **Step 3: Verify ng serve still works**

```bash
npm start
```

- [ ] **Step 4: Verify ng build still works**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: migrate to new control flow syntax (@if, @for) from structural directives"
```

---

## Phase 4: Final Verification & PR

### Task 17: Clean up unused imports

**Files:** Various `.ts` files

After the standalone and control flow migrations, there may be unused imports of `CommonModule` (since `@if`/`@for` are built-in and don't need `CommonModule`).

- [ ] **Step 1: Check for unnecessary CommonModule imports**

In Angular 17 with the new control flow syntax, `CommonModule` is only needed if you still use `NgClass`, `NgStyle`, `AsyncPipe`, `DatePipe`, etc. If a component only used `*ngIf`/`*ngFor`, the `CommonModule` import can be removed.

```bash
grep -r "CommonModule" src/ --include="*.ts" -l
```

Review each file and remove `CommonModule` where it's no longer needed. Be careful — keep it if the component uses pipes like `| async`, `| date`, `| json`, or directives like `[ngClass]`, `[ngStyle]`.

- [ ] **Step 2: Run ng build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit if changes were made**

```bash
git add -A
git commit -m "refactor: remove unnecessary CommonModule imports after control flow migration"
```

---

### Task 18: Final verification

**Files:** None

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 2: Run dev server and test**

```bash
npm start
```

Open `http://localhost:4200` in browser. Verify:
- App loads without console errors
- Navigation works (sidebar, breadcrumbs)
- Board view renders with drag & drop
- Issue detail page with rich text editor (Quill)
- Settings page
- Search drawer
- Add issue modal

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Fix any lint errors that arise from the migration.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve post-migration lint and runtime issues"
```

---

### Task 19: Push and Create PR

**Files:** None

- [ ] **Step 1: Push the branch**

```bash
git push origin trung/v20-migration-part-4
```

- [ ] **Step 2: Create PR**

```bash
gh pr create --title "build(deps): upgrade Angular 16 to Angular 17 with standalone migration" --body "## Summary
- Upgrade Angular core packages to v17.3.12
- Upgrade TypeScript to ~5.4.5 (required by Angular 17)
- Upgrade zone.js to ~0.14.10 (required by Angular 17)
- Upgrade @angular-builders/custom-webpack to 17.0.2
- Upgrade @angular-eslint/* to 17.5.3
- Upgrade @angular/cdk to 17.3.10
- Upgrade ng-zorro-antd to 17.4.1 and @ant-design/icons-angular to 17.0.0
- Upgrade ngx-quill to 24.x
- **Migrate all components to standalone** (remove all NgModules)
- **Migrate to standalone bootstrap** (bootstrapApplication)
- **Migrate to new control flow syntax** (@if, @for replacing *ngIf, *ngFor)

## Notes
- Storybook v6→v7 migration deferred to a separate PR
- Build system migration (esbuild) deferred — staying on webpack due to @angular-builders/custom-webpack dependency
- Signals are stable but no migration needed yet

## Test plan
- [ ] npm install runs without errors
- [ ] ng serve compiles successfully
- [ ] ng build (prod) compiles successfully
- [ ] App loads and core features work in browser
- [ ] Rich text editor (Quill) works
- [ ] Drag and drop works
- [ ] Netlify preview deployment succeeds
"
```

- [ ] **Step 3: Verify CI passes**

Wait for Netlify preview build. If it fails, check the build logs and fix.

---

## Potential Gotchas

1. **TypeScript 5.4 breaking changes**: TS 5.4 introduces stricter checks. Watch for new type errors, especially around generic constraints and type narrowing in closures.

2. **zone.js 0.14.0**: Jump from 0.13.x. Verify async operations (HTTP calls, timers, Akita state management) still work correctly.

3. **ng-zorro-antd v17 breaking changes**: Check the [ng-zorro v17 migration guide](https://ng.ant.design/docs/migration-v17/en) for any component API changes. The `NzIconModule.forRoot([])` pattern may change.

4. **ngx-quill version selection**: Must find a version that supports Angular 17 AND Quill v1. The v25+ line requires Quill v2 which has breaking changes (different API, theme changes). Verify the exact version in Task 9 Step 1.

5. **Standalone migration schematic edge cases**:
   - `NzIconModule.forChild(NZ_JIRA_ICONS)` in ProjectModule — the schematic may need help converting this to `importProvidersFrom()` or `provideNzIcons()`.
   - `environment.production ? [] : AkitaNgDevtools` conditional import in AppModule — verify this is handled correctly.
   - Lazy-loaded routes may switch from `loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)` to `loadChildren: () => import('./project/project.routes').then(m => m.routes)` — verify route files are created.

6. **Control flow `track` expression**: The schematic defaults to `track $index` which is fine for simple lists but suboptimal for lists with identity (issues, users). Review and update to `track item.id` where applicable.

7. **Storybook 6.x**: Will likely still work since it has broad Angular support, but may show warnings. Do NOT attempt to upgrade Storybook in this PR — it's a separate major migration (v6 → v7/v8) with its own breaking changes.

8. **`polyfills.ts` file**: Angular 17's `ng update` may move the zone.js import from `polyfills.ts` into `angular.json`'s `polyfills` array. This is expected and correct.

9. **`@angular/common/http`**: Angular 17 deprecates `HttpClientModule` in favor of `provideHttpClient()`. The standalone bootstrap schematic should handle this, but verify.
