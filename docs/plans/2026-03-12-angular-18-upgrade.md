# Angular 18 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Jira Clone from Angular 17 to Angular 18, including Quill v1→v2 migration and remaining NgModule cleanup.

**Architecture:** Two-phase approach. Phase 1 upgrades Angular core and all ecosystem dependencies one at a time, committing after each step — same proven pattern from Parts 1-4. Phase 2 completes the remaining NgModule→standalone migration (6 modules still use NgModule pattern). Quill v1→v2 is required because ngx-quill 26+ (the only version supporting Angular 18) requires Quill v2. Stay on the `browser` builder (webpack) since the project depends on `@angular-builders/custom-webpack` for TailwindCSS PostCSS integration. Storybook v6→v7 migration remains deferred.

**Tech Stack:** Angular 18, TypeScript ~5.4.5, zone.js ~0.14.10, ng-zorro-antd 18, ngx-quill 26 + Quill 2, Storybook 6.x (unchanged, deferred)

---

## Key Changes in Angular 18

Angular 18 continues the standalone-first direction:
- **Zoneless change detection** introduced as experimental (`provideExperimentalZonelessChangeDetection()`) — optional, we defer this
- **Signal-based inputs** (`input()` function) are stable — optional, no migration needed yet
- **Hybrid change detection** is the default (both NgZone and zoneless scheduler active)
- **`NgModuleFactory` removed** — verify no usage
- **`InjectFlags` removed** from DI — verify no usage
- **`TestBed.flushEffects()` removed** — replaced with `TestBed.tick()`
- **TypeScript >=5.4** required (currently ~5.4.5 — already compatible)
- **zone.js ~0.14.x** required (currently ~0.14.10 — already compatible)
- **Node.js 18.13+** required (currently Node 20 — already compatible)

## Dependency Version Map

| Package | Current (v17) | Target (v18) |
|---------|--------------|--------------|
| `@angular/core` (and all `@angular/*`) | `^17.3.12` | `^18.2.14` |
| `@angular/cli` | `^17.3.17` | `^18.2.14` |
| `@angular-devkit/build-angular` | `^17.3.17` | `^18.2.14` |
| `@angular/compiler-cli` | `^17.3.12` | `^18.2.14` |
| `@angular/cdk` | `^17.3.10` | `^18.2.14` |
| `@angular-builders/custom-webpack` | `^17.0.2` | `^18.0.0` |
| `@angular-eslint/*` | `17.5.3` | `18.4.3` |
| `@ant-design/icons-angular` | `^17.0.0` | `^18.0.0` |
| `ng-zorro-antd` | `^17.4.1` | `^18.2.1` |
| `ngx-quill` | `^24.0.5` | `^26.0.10` |
| `quill` | `^1.3.7` | `^2.0.3` |
| `typescript` | `~5.4.5` | `~5.4.5` (no change, already compatible) |
| `zone.js` | `~0.14.10` | `~0.14.10` (no change, already compatible) |
| `@ngneat/content-loader` | `^7.0.0` | `^7.0.0` (no change, supports >=13) |
| `@ngneat/until-destroy` | `^8.0.3` | `^8.0.3` (no change, supports >=10) |
| `@sentry/angular` | `^9.30.0` | `^9.30.0` (no change, supports >=14) |
| `@datorama/akita` | `^7.1.1` | `^7.1.1` (no Angular peer dep) |
| `@storybook/angular` | `^6.1.11` | `^6.1.11` (deferred — v7 migration is separate) |

## Remaining NgModules to Clean Up (6)

These modules survived the Angular 17 standalone migration and still use the NgModule pattern:

1. **`AppRoutingModule`** (`src/app/app-routing.module.ts`) — wraps `RouterModule.forRoot(routes)`, used in `main.ts` via `importProvidersFrom`
2. **`ProjectModule`** (`src/app/project/project.module.ts`) — the largest feature module, imports all project components + ng-zorro modules + `NzIconModule.forChild(NZ_JIRA_ICONS)`
3. **`ProjectRoutingModule`** (`src/app/project/project-routing.module.ts`) — wraps `RouterModule.forChild(routes)` for project child routes
4. **`WorkInProgressModule`** (`src/app/work-in-progress/work-in-progress.module.ts`) — thin wrapper around standalone `WorkInProgressComponent`
5. **`WorkInProgressRoutingModule`** (`src/app/work-in-progress/work-in-progress-routing.module.ts`) — wraps `RouterModule.forChild(routes)` for WIP route
6. **`JiraControlModule`** (`src/app/jira-control/jira-control.module.ts`) — re-exports 6 standalone components (barrel module)

## Quill v1 → v2 Migration Impact

ngx-quill 26+ requires Quill v2 (`^2.0.0`). Key changes:

**Files affected:**
- `angular.json` — Quill CSS/JS paths change from `quill/dist/quill.*.css` to `quill/dist/quill.*.css` (paths may differ in v2)
- `src/app/project/config/editor.ts` — toolbar config (should be compatible)
- `src/app/project/components/issues/issue-description/issue-description.component.html` — `<quill-editor>` template
- `src/app/project/components/issues/issue-description/issue-description.component.ts` — `editorCreated()` handler
- `src/app/project/components/add-issue-modal/add-issue-modal.component.html` — `<quill-editor>` template
- `src/app/project/components/add-issue-modal/add-issue-modal.component.ts` — editor config

**Key Quill v2 breaking changes:**
- **`quill.min.js` does NOT exist in Quill v2.** The `angular.json` `scripts` array references `./node_modules/quill/dist/quill.min.js` — this must be replaced with `./node_modules/quill/dist/quill.js` or removed entirely (ngx-quill 26 imports Quill as an ES module, so the global script may no longer be needed).
- CSS files: `quill/dist/quill.snow.css` and `quill/dist/quill.core.css` should still exist in v2, verify paths after install.
- Quill v2 renders empty lines as `<div>` instead of `<p>` — check component SCSS files for Quill-specific CSS targeting `ql-editor p`.
- API is largely compatible for basic usage (toolbar, formatting).
- The `(onEditorCreated)` event and `[modules]` binding should still work with ngx-quill 26.

---

## Phase 1: Dependency Upgrades

### Task 1: Create a New Branch

**Files:** None

- [ ] **Step 1: Create the branch**

```bash
cd /Users/trung.vo/Source/jira-clone-angular
git checkout trung/v20-migration-part-4
git pull origin trung/v20-migration-part-4
git checkout -b trung/v20-migration-part-5
```

- [ ] **Step 2: Verify branch**

Run: `git branch --show-current`
Expected: `trung/v20-migration-part-5`

---

### Task 2: Run ng update for Angular 18

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Run ng update with --force**

The `@angular-eslint/schematics` will cause a peer dependency conflict (same as all previous parts). Use `--force` to proceed.

```bash
npx ng update @angular/core@18 @angular/cli@18 --force
```

Expected: Angular packages updated to v18 — this includes `@angular/core`, `@angular/cli`, `@angular/compiler-cli`, `@angular-devkit/build-angular`, and all other `@angular/*` packages. The schematics may auto-migrate some config in `angular.json` and remove deprecated options like `extractCss` (already the default in v18). It may also remove `@angular/platform-browser-dynamic` from `package.json` since it's unused with `bootstrapApplication()`.

- [ ] **Step 2: Verify Angular version in package.json**

Run: `grep '"@angular/core"' package.json`
Expected: `"@angular/core": "^18.x.x"`

- [ ] **Step 3: Check for auto-migrations**

The `ng update` schematic may:
- Remove `extractCss` from `angular.json` (deprecated, CSS extraction is always on)
- Update `tsconfig.json` settings
- Remove `@angular/platform-browser-dynamic` if no longer needed

Run: `git diff` to review all changes.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "build(deps): ng update @angular/core@18 @angular/cli@18 --force"
```

---

### Task 3: Upgrade @angular-builders/custom-webpack

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update version in package.json**

```diff
- "@angular-builders/custom-webpack": "^17.0.2"
+ "@angular-builders/custom-webpack": "^18.0.0"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular-builders/custom-webpack to 18.0.0"
```

---

### Task 4: Upgrade @angular-eslint/*

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update all @angular-eslint packages in package.json**

```diff
- "@angular-eslint/builder": "17.5.3",
- "@angular-eslint/eslint-plugin": "17.5.3",
- "@angular-eslint/eslint-plugin-template": "17.5.3",
- "@angular-eslint/schematics": "17.5.3",
- "@angular-eslint/template-parser": "17.5.3",
+ "@angular-eslint/builder": "18.4.3",
+ "@angular-eslint/eslint-plugin": "18.4.3",
+ "@angular-eslint/eslint-plugin-template": "18.4.3",
+ "@angular-eslint/schematics": "18.4.3",
+ "@angular-eslint/template-parser": "18.4.3",
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular-eslint/* to 18.4.3"
```

---

### Task 5: Upgrade @angular/cdk

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update version in package.json**

```diff
- "@angular/cdk": "^17.3.10"
+ "@angular/cdk": "^18.2.14"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular/cdk to 18.2.14"
```

---

### Task 6: Upgrade Ant Design Packages

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update @ant-design/icons-angular and ng-zorro-antd**

```diff
- "@ant-design/icons-angular": "^17.0.0"
+ "@ant-design/icons-angular": "^18.0.0"
```

```diff
- "ng-zorro-antd": "^17.4.1"
+ "ng-zorro-antd": "^18.2.1"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade ng-zorro-antd to 18.2.1 and @ant-design/icons-angular to 18.0.0"
```

---

### Task 7: Upgrade ngx-quill and Quill v1 → v2

**Files:**
- Modify: `package.json`
- Modify: `angular.json`

This is the most impactful dependency change. ngx-quill 26+ requires Quill v2 (`^2.0.0`), which replaces the Quill v1 (`^1.3.7`) currently in use.

- [ ] **Step 1: Update versions in package.json**

```diff
- "ngx-quill": "^24.0.5"
+ "ngx-quill": "^26.0.10"
```

```diff
- "quill": "^1.3.7"
+ "quill": "^2.0.3"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Verify Quill v2 CSS/JS paths**

Check if the Quill v2 distribution files exist at the paths referenced in `angular.json`:

```bash
ls node_modules/quill/dist/quill.core.css node_modules/quill/dist/quill.snow.css node_modules/quill/dist/quill.min.js 2>&1
```

If any paths have changed in Quill v2, update `angular.json` accordingly. The Quill v2 npm package may use different file names or paths.

If the old paths don't exist, check what's available:

```bash
ls node_modules/quill/dist/
```

Then update the `styles` and `scripts` arrays in both `build.options` and `test.options` in `angular.json`.

**Quill v2 likely requires these changes in `angular.json`:**

In both `build.options` and `test.options`, the `scripts` array currently has:
```json
"scripts": ["./node_modules/quill/dist/quill.min.js"]
```

Quill v2 does **not** ship `quill.min.js`. Replace with `quill.js`, or remove the scripts entry entirely if ngx-quill 26 handles the Quill import via ES modules (test this — if the editor works without the global script, remove it).

Also check if `quill.core.css` still exists separately from `quill.snow.css` — Quill v2 may have consolidated them.

- [ ] **Step 4: Verify editor config is compatible**

The toolbar configuration in `src/app/project/config/editor.ts` uses standard Quill toolbar options that are compatible with Quill v2:

```typescript
export const quillConfiguration = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean']
  ]
};
```

This should work without changes. No custom Quill modules or formats are used.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json angular.json
git commit -m "build(deps): upgrade ngx-quill to 26.x and quill to v2 for Angular 18"
```

---

### Task 8: Verify clean npm install

**Files:** None

- [ ] **Step 1: Delete node_modules and package-lock.json for a clean install**

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: No errors. If `npm install` fails due to Storybook 6.x peer dependency conflicts with Angular 18, use `npm install --force` — Storybook migration is deferred to a separate PR.

- [ ] **Step 2: If errors occur, resolve them**

Use the proven pattern:
1. Read the error to identify the conflicting package
2. `npm view <package> versions --json` to find compatible versions
3. `npm view <package>@<version> peerDependencies --json` to verify
4. Update `package.json` and re-run `npm install`

- [ ] **Step 3: Commit clean lock file**

```bash
git add package-lock.json
git commit -m "build(deps): clean npm install with resolved Angular 18 dependencies"
```

---

### Task 9: Verify ng serve works

**Files:** Potentially various `.ts` files if compilation errors

- [ ] **Step 1: Run the dev server**

```bash
npm start
```

Expected: Application compiles and serves without errors.

- [ ] **Step 2: Check for deprecated angular.json options**

If `ng update` did not already remove it, delete `"extractCss": true` from `angular.json` production configuration (line ~83). Angular 18 rejects this deprecated option — CSS extraction is always enabled.

Also check if `ng update` renamed `"browserTarget"` to `"buildTarget"` in the serve configuration. If not, it should still work but may show a deprecation warning.

- [ ] **Step 3: If there are compilation errors**

Common Angular 18 issues to check:
- **`NgModuleFactory` usage** — should not exist in this codebase, but verify
- **`InjectFlags` usage** — should not exist, but verify
- **Quill v2 runtime errors** — check browser console for Quill-related issues
- **ng-zorro-antd v18 API changes** — check [ng-zorro v18 changelog](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
- **`CanActivate` interface deprecation** — `ProjectGuard` (`src/app/project/project.guard.ts`) implements `CanActivate` which is deprecated in v18 in favor of functional guards (`CanActivateFn`). This may produce a warning but will still work. Note: `ProjectGuard` appears to be dead code (not referenced in any route config) — consider deleting it in this PR or a follow-up.

- [ ] **Step 3: Test Quill editor specifically**

Open `http://localhost:4200` and:
1. Navigate to any issue detail page — verify the rich text editor renders
2. Click "Create Issue" — verify the editor in the modal renders
3. Type text, apply formatting (bold, italic, lists) — verify toolbar works
4. Verify the `ql-snow` theme CSS renders correctly (editor border, toolbar styling)

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve Angular 18 compilation issues"
```

---

### Task 10: Verify ng build works

**Files:** None

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds without errors.

- [ ] **Step 2: Fix any build-only errors**

Production builds are stricter (AOT compilation). Fix any errors that only appear during `ng build`. Common issues:
- Deprecated `extractCss` option in `angular.json` may need removal
- Other deprecated build options

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve Angular 18 production build issues"
```

---

## Phase 2: Remaining NgModule Cleanup

The Angular 17 migration converted most components to standalone but left 5 NgModule wrappers. This phase eliminates them entirely.

### Tasks 11-13: Convert all routing modules to standalone route configs (ATOMIC)

> **Important:** Tasks 11, 12, and 13 must be done together as a single atomic unit. The app will not compile until all three are complete. Do NOT attempt to commit between them.

### Task 11: Convert AppRoutingModule to provideRouter

**Files:**
- Create: `src/app/app.routes.ts`
- Modify: `src/main.ts`
- Delete: `src/app/app-routing.module.ts`

Replace the `AppRoutingModule` NgModule with `provideRouter()` in the bootstrap config.

- [ ] **Step 1: Extract routes from AppRoutingModule**

Current `src/app/app-routing.module.ts`:
```typescript
const routes: Routes = [
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule)
  },
  {
    path: 'wip',
    loadChildren: () =>
      import('./work-in-progress/work-in-progress.module').then(
        (m) => m.WorkInProgressModule
      )
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  }
];
```

Note: The `loadChildren` for `project` and `wip` still point to NgModules. These will be updated in Tasks 12-13 when those modules are converted.

- [ ] **Step 2: Create `src/app/app.routes.ts`**

```typescript
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'project',
    loadChildren: () => import('./project/project.routes').then((m) => m.PROJECT_ROUTES)
  },
  {
    path: 'wip',
    loadChildren: () => import('./work-in-progress/work-in-progress.routes').then((m) => m.WIP_ROUTES)
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  }
];
```

Note: `project.routes.ts` and `work-in-progress.routes.ts` will be created in Tasks 12-13. For now, keep the module-based `loadChildren` if needed to avoid breaking the build — or create all route files in one go (Tasks 11-13 can be done together).

- [ ] **Step 3: Update `src/main.ts` to use `provideRouter`**

Replace `AppRoutingModule` in `importProvidersFrom()` with `provideRouter(appRoutes)`:

```typescript
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

// In the providers array, replace:
//   importProvidersFrom(..., AppRoutingModule, ...)
// with:
//   provideRouter(appRoutes),
```

The full updated `importProvidersFrom` line should remove `AppRoutingModule` and add `provideRouter(appRoutes)` as a separate provider.

- [ ] **Step 4: Delete `src/app/app-routing.module.ts`**

```bash
rm src/app/app-routing.module.ts
```

- [ ] **Step 5: Remove AppRoutingModule import from main.ts**

Remove the import line:
```typescript
// Remove this line:
import { AppRoutingModule } from './app/app-routing.module';
```

**Do not commit yet — proceed to Tasks 12 and 13.**

---

### Task 12: Convert WorkInProgress modules to route config

**Files:**
- Create: `src/app/work-in-progress/work-in-progress.routes.ts`
- Delete: `src/app/work-in-progress/work-in-progress.module.ts`
- Delete: `src/app/work-in-progress/work-in-progress-routing.module.ts`

- [ ] **Step 1: Create `src/app/work-in-progress/work-in-progress.routes.ts`**

```typescript
import { Routes } from '@angular/router';
import { WorkInProgressComponent } from './work-in-progress.component';

export const WIP_ROUTES: Routes = [
  { path: '', component: WorkInProgressComponent }
];
```

- [ ] **Step 2: Delete the module files**

```bash
rm src/app/work-in-progress/work-in-progress.module.ts
rm src/app/work-in-progress/work-in-progress-routing.module.ts
```

- [ ] **Step 3: Verify no other files import these modules**

```bash
grep -r "WorkInProgressModule\|WorkInProgressRoutingModule" src/ --include="*.ts" -l
```

Expected: No results (the old `app-routing.module.ts` reference is already removed in Task 11).

---

### Task 13: Convert ProjectModule to route config

**Files:**
- Create: `src/app/project/project.routes.ts`
- Delete: `src/app/project/project.module.ts`
- Delete: `src/app/project/project-routing.module.ts`

This is the most complex module conversion. `ProjectModule` imports ng-zorro modules, CDK modules, and registers icons via `NzIconModule.forChild(NZ_JIRA_ICONS)`.

- [ ] **Step 1: Create `src/app/project/project.routes.ts`**

```typescript
import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_JIRA_ICONS } from './config/icons';
import { ProjectComponent } from './project.component';
import { BoardComponent } from './pages/board/board.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FullIssueDetailComponent } from './pages/full-issue-detail/full-issue-detail.component';
import { ProjectConst } from './config/const';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    component: ProjectComponent,
    providers: [
      importProvidersFrom(NzIconModule.forChild(NZ_JIRA_ICONS))
    ],
    children: [
      {
        path: 'board',
        component: BoardComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: `issue/:${ProjectConst.IssueId}`,
        component: FullIssueDetailComponent
      },
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full'
      }
    ]
  }
];
```

Key: `NzIconModule.forChild(NZ_JIRA_ICONS)` is preserved via `providers` on the route, ensuring icons are registered when the project feature loads.

- [ ] **Step 2: Verify all standalone components have their own imports**

The old `ProjectModule` imported ng-zorro modules (NzToolTipModule, NzModalModule, etc.) for its declared components. Since all project components are already standalone, they should already have these imports in their own `imports` arrays.

Run a quick check:

```bash
grep -r "standalone: true" src/app/project/ --include="*.ts" -l | head -20
```

Verify that each standalone component imports the ng-zorro/CDK modules it needs directly. If any component relies on the `ProjectModule` to provide these imports, add them to the component's `imports` array.

- [ ] **Step 3: Delete the module files**

```bash
rm src/app/project/project.module.ts
rm src/app/project/project-routing.module.ts
```

- [ ] **Step 4: Verify no other files import these modules**

```bash
grep -r "ProjectModule\|ProjectRoutingModule" src/ --include="*.ts" -l
```

Expected: No results.

---

### Task 14: Delete JiraControlModule

**Files:**
- Delete: `src/app/jira-control/jira-control.module.ts`

`JiraControlModule` is a barrel module that only re-exports 6 standalone components. Since all consumers already import these components directly (they're standalone), the module is unnecessary.

- [ ] **Step 1: Check if any file imports JiraControlModule**

```bash
grep -r "JiraControlModule" src/ --include="*.ts" -l
```

Expected: Only `src/app/project/project.module.ts` (which was deleted in Task 13) and the module file itself.

- [ ] **Step 2: Delete the module file and its spec file**

```bash
rm src/app/jira-control/jira-control.module.ts
rm src/app/jira-control/jira-control.module.spec.ts
```

- [ ] **Step 3: Verify no remaining references**

```bash
grep -r "JiraControlModule" src/ --include="*.ts"
```

Expected: No results.

---

### Task 15: Clean up main.ts

**Files:**
- Modify: `src/main.ts`

After removing all NgModules, clean up `main.ts` to remove unnecessary `importProvidersFrom` wrappers where standalone equivalents exist.

- [ ] **Step 1: Remove BrowserModule from importProvidersFrom**

`BrowserModule` is not needed with `bootstrapApplication()` — it's automatically included.

- [ ] **Step 2: Remove ReactiveFormsModule from importProvidersFrom**

`ReactiveFormsModule` should be imported by each standalone component that uses reactive forms. Verify all form-using components import it:

```bash
grep -r "formControl\|formGroup\|formControlName" src/ --include="*.html" -l
```

For each file, check its corresponding `.ts` file imports `ReactiveFormsModule`.

- [ ] **Step 3: Remove NzSpinModule from importProvidersFrom**

`NzSpinModule` should be imported directly in `AppComponent` (which uses `<nz-spin>`). It's already in `AppComponent`'s imports as `NzSpinComponent`.

- [ ] **Step 4: Final main.ts should look like**

```typescript
import { enableProdMode, ErrorHandler, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { init, browserTracingIntegration } from '@sentry/angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { QuillModule } from 'ngx-quill';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

const initSentry = () => {
  init({
    dsn: 'https://b2af8332e38f486d910f06b79df66365@o495789.ingest.sentry.io/5569161',
    integrations: [
      browserTracingIntegration(),
    ],
    tracePropagationTargets: ['localhost', 'jira.trungk18.com'],
    tracesSampleRate: 1.0
  });
};

if (environment.production) {
  enableProdMode();
  initSentry();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(
            NzIconModule.forRoot([]),
            environment.production ? [] : AkitaNgDevtools,
            AkitaNgRouterStoreModule,
            QuillModule.forRoot()
        ),
        {
            provide: NG_ENTITY_SERVICE_CONFIG,
            useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }
        },
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler()
        },
        {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => { },
            deps: [Sentry.TraceService],
            multi: true,
        },
    ]
})
  .catch((err) => console.error(err));
```

- [ ] **Step 5: Commit all Phase 2 changes**

```bash
git add -A
git commit -m "refactor: remove all remaining NgModules, migrate to provideRouter and route configs"
```

---

## Phase 3: Final Verification & PR

### Task 16: Verify ng serve works

**Files:** Potentially various `.ts` files if issues

- [ ] **Step 1: Run the dev server**

```bash
npm start
```

Expected: Application compiles and serves without errors.

- [ ] **Step 2: Test in browser**

Open `http://localhost:4200` and verify:
- App loads without console errors
- Navigation works (sidebar, breadcrumbs)
- Board view renders with drag & drop
- Issue detail page with rich text editor (Quill v2)
- Settings page
- Search drawer
- Add issue modal with Quill editor
- Icons render correctly (NZ_JIRA_ICONS via forChild)

- [ ] **Step 3: Fix any issues and commit**

```bash
git add -A
git commit -m "fix: resolve post-migration runtime issues"
```

---

### Task 17: Verify ng build works

**Files:** None

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 2: Fix any build-only errors and commit**

```bash
git add -A
git commit -m "fix: resolve Angular 18 production build issues"
```

---

### Task 18: Run lint

**Files:** Various `.ts` files

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

- [ ] **Step 2: Fix any lint errors**

Common issues after the migration:
- Unused imports (removed modules)
- New @angular-eslint rules in v18

- [ ] **Step 3: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve post-migration lint issues"
```

---

### Task 19: Update eslint config and typescript-eslint if needed

**Files:**
- Modify: `.eslintrc.json` (if needed)
- Modify: `package.json` (if needed)

@angular-eslint v18.4.3 may require or recommend updated `@typescript-eslint/*` packages. Currently at `6.21.0`, check if v7+ is needed.

- [ ] **Step 1: Check if lint passes with current typescript-eslint**

If lint passed in Task 18, skip this task.

- [ ] **Step 2: If needed, upgrade typescript-eslint**

```diff
- "@typescript-eslint/eslint-plugin": "6.21.0",
- "@typescript-eslint/parser": "6.21.0",
+ "@typescript-eslint/eslint-plugin": "^7.18.0",
+ "@typescript-eslint/parser": "^7.18.0",
```

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json .eslintrc.json
git commit -m "fix: update eslint config and typescript-eslint for Angular 18 compatibility"
```

---

### Task 20: Push and Create PR

**Files:** None

- [ ] **Step 1: Push the branch**

```bash
git push origin trung/v20-migration-part-5
```

- [ ] **Step 2: Create PR**

```bash
gh pr create --title "build(deps): upgrade Angular 17 to Angular 18 with NgModule cleanup" --body "## Summary
- Upgrade Angular core packages to v18.2.14
- Upgrade @angular-builders/custom-webpack to 18.0.0
- Upgrade @angular-eslint/* to 18.4.3
- Upgrade @angular/cdk to 18.2.14
- Upgrade ng-zorro-antd to 18.2.1 and @ant-design/icons-angular to 18.0.0
- **Upgrade ngx-quill to 26.x and Quill v1 → v2** (required for Angular 18 support)
- **Remove all remaining NgModules** (AppRoutingModule, ProjectModule, ProjectRoutingModule, WorkInProgressModule, JiraControlModule)
- **Migrate to provideRouter()** with standalone route configs
- Clean up main.ts bootstrap providers

## Notes
- TypeScript ~5.4.5 and zone.js ~0.14.10 were already compatible — no upgrade needed
- Storybook v6→v7 migration deferred to a separate PR
- Build system migration (esbuild) deferred — staying on webpack due to @angular-builders/custom-webpack dependency
- Zoneless change detection and signal inputs are available but migration deferred

## Test plan
- [ ] npm install runs without errors
- [ ] ng serve compiles successfully
- [ ] ng build (prod) compiles successfully
- [ ] App loads and core features work in browser
- [ ] Rich text editor (Quill v2) works — create issue + edit issue description
- [ ] Drag and drop works
- [ ] Icons render correctly
- [ ] Netlify preview deployment succeeds
"
```

- [ ] **Step 3: Verify CI passes**

Wait for Netlify preview build. If it fails, check the build logs and fix.

---

## Potential Gotchas

1. **Quill v1 → v2 is the biggest risk.** The CSS file paths and JS bundle paths may change in Quill v2. Verify `angular.json` styles/scripts paths after installing. The toolbar config and `<quill-editor>` API should be compatible, but test formatting thoroughly.

2. **`CanActivate` interface deprecation.** `ProjectGuard` implements `CanActivate` which is deprecated in Angular 18. It will still work but produces a warning. Converting to `CanActivateFn` is optional and can be done in a future PR.

3. **`extractCss` build option.** Angular 18 may auto-remove this from `angular.json` during `ng update`. This is expected — CSS extraction is always enabled in v18.

4. **ng-zorro-antd v18 breaking changes.** Check the [ng-zorro v18 changelog](https://github.com/NG-ZORRO/ng-zorro-antd/releases) for any component API changes. The `NzIconModule.forRoot([])` and `NzIconModule.forChild()` patterns should still work.

5. **NgModule removal order matters.** Tasks 11-13 are atomic — all three must be completed before the app can compile. Task 14 (JiraControlModule) depends on Task 13 (ProjectModule deletion). All of Phase 2 should be committed together.

6. **Storybook 6.x.** Will likely show more warnings with Angular 18 but should still work for basic component development. Do NOT attempt to upgrade Storybook in this PR.

7. **`@angular/platform-browser-dynamic`** is no longer needed since we use `bootstrapApplication`. The `ng update` schematic may remove it from `package.json`. This is expected and correct.

8. **`polyfills.ts` file.** The legacy `polyfills.ts` file is still used. Angular 18 supports `polyfills` as an array in `angular.json` (e.g., `["zone.js"]`), but changing this is optional and can be done later.

9. **`@angular/platform-browser-dynamic`** is still in `package.json` but unused since `bootstrapApplication()` replaced `platformBrowserDynamic().bootstrapModule()`. The `ng update` schematic may remove it; if not, it can be removed manually from `package.json`.

10. **`jira-control.module.spec.ts`** exists alongside `jira-control.module.ts`. When deleting the module, the spec file must also be deleted or the build will fail.
