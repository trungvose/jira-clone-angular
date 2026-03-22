# Angular 19 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Jira Clone from Angular 18 to Angular 19, including all ecosystem dependencies and removing explicit `standalone: true` from all components (now the default in Angular 19).

**Architecture:** Same proven pattern from Parts 3-5: upgrade Angular core with `ng update --force`, resolve each dependency one at a time, commit after each step. Stay on the `browser` builder (webpack) since the project depends on `@angular-builders/custom-webpack` for TailwindCSS PostCSS integration. Storybook v6→v7 migration remains deferred.

**Tech Stack:** Angular 19, TypeScript ~5.6.2, zone.js ~0.15.0, ng-zorro-antd 19, ngx-quill 27 + Quill 2, Storybook 6.x (unchanged, deferred)

---

## Key Changes in Angular 19

- **`standalone: true` is now the default** — can be removed from all components/directives/pipes. `ng update` schematic does this automatically.
- **TypeScript >=5.5 required** — current `~5.4.5` must be bumped to `~5.6.2`
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
| `@ngneat/content-loader` | `^7.0.0` | `^7.0.0` (no change, supports >=13) |
| `@ngneat/until-destroy` | `^8.0.3` | `^8.0.3` (no change, supports >=10) |
| `@sentry/angular` | `^9.30.0` | `^9.30.0` (no change, supports >=14) |
| `@datorama/akita` | `^7.1.1` | `^7.1.1` (no Angular peer dep) |
| `@storybook/angular` | `^6.1.11` | `^6.1.11` (deferred — v7 migration is separate) |

---

## Phase 1: Dependency Upgrades

### Task 1: Create a New Branch

**Files:** None

- [ ] **Step 1: Create the branch**

```bash
cd /Users/trung.vo/Source/jira-clone-angular
git checkout master
git pull origin master
git checkout -b trung/v20-migration-part-6
```

- [ ] **Step 2: Verify branch**

Run: `git branch --show-current`
Expected: `trung/v20-migration-part-6`

---

### Task 2: Run ng update for Angular 19

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: Multiple `*.component.ts` files (standalone: true removal)

- [ ] **Step 1: Run ng update with --force**

The `@angular-eslint/schematics` will cause a peer dependency conflict (same as all previous parts). Use `--force` to proceed.

```bash
npx ng update @angular/core@19 @angular/cli@19 --force
```

Expected: Angular packages updated to v19. The schematics will:
- Update all `@angular/*` packages to v19
- **Remove `standalone: true`** from all component/directive/pipe decorators (since it's now the default)
- May attempt to migrate `angular.json` from `@angular-devkit/build-angular` to `@angular/build` — **revert this if it happens** (see Step 3)

- [ ] **Step 2: Verify Angular version in package.json**

Run: `grep '"@angular/core"' package.json`
Expected: `"@angular/core": "^19.x.x"`

- [ ] **Step 3: Check for unwanted angular.json builder migration**

The `ng update` schematic may replace the builder in `angular.json`. Verify:

```bash
grep "builder" angular.json
```

Expected: Should still show `@angular-builders/custom-webpack:browser` (NOT `@angular/build:application` or `@angular-devkit/build-angular:application`).

If the builder was changed:
1. Run `git diff angular.json` to see what changed
2. Revert the builder-related changes while keeping other valid updates
3. Ensure `customWebpackConfig` block is preserved

Also check if `@angular-devkit/build-angular` was removed from `package.json` — if so, add it back since `@angular-builders/custom-webpack` depends on it.

- [ ] **Step 4: Verify standalone: true was removed from components**

```bash
grep -r "standalone: true" src/ --include="*.ts" | wc -l
```

Expected: 0 (or close to 0). If any remain, the schematic missed them — can clean up manually later.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "build(deps): ng update @angular/core@19 @angular/cli@19 --force"
```

---

### Task 3: Upgrade TypeScript to ~5.6.2

**Files:**
- Modify: `package.json`

**Note:** Check if `ng update` in Task 2 already bumped TypeScript. If `package.json` already shows `~5.5.x` or `~5.6.x`, skip this task.

- [ ] **Step 1: Update typescript version in package.json**

```diff
- "typescript": "~5.4.5"
+ "typescript": "~5.6.2"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade typescript to ~5.6.2 for Angular 19"
```

---

### Task 4: Upgrade zone.js to ~0.15.0

**Files:**
- Modify: `package.json`

**Note:** Check if `ng update` in Task 2 already bumped zone.js. If `package.json` already shows `~0.15.x`, skip this task.

- [ ] **Step 1: Update zone.js version in package.json**

```diff
- "zone.js": "~0.14.10"
+ "zone.js": "~0.15.0"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade zone.js to ~0.15.0 for Angular 19"
```

---

### Task 5: Upgrade @angular-builders/custom-webpack

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update version in package.json**

```diff
- "@angular-builders/custom-webpack": "^18.0.0"
+ "@angular-builders/custom-webpack": "^19.0.1"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular-builders/custom-webpack to 19.0.1"
```

---

### Task 6: Upgrade @angular-eslint/* and @typescript-eslint/*

**Files:**
- Modify: `package.json`

**Important:** `@angular-eslint` v19 requires `typescript-eslint` v8 (currently at v6.21.0). These must be upgraded together. This is the biggest lint tooling change in this migration.

- [ ] **Step 1: Update all @angular-eslint and @typescript-eslint packages in package.json**

```diff
- "@angular-eslint/builder": "18.4.3",
- "@angular-eslint/eslint-plugin": "18.4.3",
- "@angular-eslint/eslint-plugin-template": "18.4.3",
- "@angular-eslint/schematics": "18.4.3",
- "@angular-eslint/template-parser": "18.4.3",
+ "@angular-eslint/builder": "19.8.1",
+ "@angular-eslint/eslint-plugin": "19.8.1",
+ "@angular-eslint/eslint-plugin-template": "19.8.1",
+ "@angular-eslint/schematics": "19.8.1",
+ "@angular-eslint/template-parser": "19.8.1",
```

```diff
- "@typescript-eslint/eslint-plugin": "6.21.0",
- "@typescript-eslint/parser": "6.21.0",
+ "@typescript-eslint/eslint-plugin": "^8.0.0",
+ "@typescript-eslint/parser": "^8.0.0",
```

Also update eslint if needed:
```diff
- "eslint": "^8.2.0"
+ "eslint": "^8.57.0"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Verify .eslintrc.json is still compatible**

typescript-eslint v8 may have renamed rules or changed defaults. Run a quick lint check:

```bash
npx ng lint 2>&1 | head -50
```

If there are config errors (not code lint errors), review `.eslintrc.json` and update rule names as needed. Common changes:
- Some `@typescript-eslint/*` rule names may have changed
- Parser options may need updating

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .eslintrc.json
git commit -m "build(deps): upgrade @angular-eslint/* to 19.8.1 and @typescript-eslint/* to 8.x"
```

---

### Task 7: Upgrade @angular/cdk

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update version in package.json**

```diff
- "@angular/cdk": "^18.2.14"
+ "@angular/cdk": "^19.2.19"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular/cdk to 19.2.19"
```

---

### Task 8: Upgrade Ant Design Packages

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update @ant-design/icons-angular and ng-zorro-antd**

```diff
- "@ant-design/icons-angular": "^18.0.0"
+ "@ant-design/icons-angular": "^19.0.0"
```

```diff
- "ng-zorro-antd": "^18.2.1"
+ "ng-zorro-antd": "^19.3.1"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade ng-zorro-antd to 19.3.1 and @ant-design/icons-angular to 19.0.0"
```

---

### Task 9: Upgrade ngx-quill

**Files:**
- Modify: `package.json`

ngx-quill 27.x supports Angular 19 and continues using Quill v2 (no change to quill package needed).

- [ ] **Step 1: Update version in package.json**

```diff
- "ngx-quill": "^26.0.10"
+ "ngx-quill": "^27.1.2"
```

- [ ] **Step 2: Run npm install --force**

```bash
npm install --force
```

- [ ] **Step 3: Check for breaking API changes**

```bash
grep -r "ngx-quill\|QuillModule\|quill-editor" src/ --include="*.ts" --include="*.html" -l
```

Review each file. The `QuillModule.forRoot()` pattern and `<quill-editor>` component API should be compatible. Verify:
- `QuillModule.forRoot()` in `main.ts` via `importProvidersFrom` still works
- `<quill-editor>` bindings (`[modules]`, `(onEditorCreated)`, `[(ngModel)]`) are unchanged

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade ngx-quill to 27.x for Angular 19"
```

---

### Task 10: Verify clean npm install

**Files:** None

- [ ] **Step 1: Delete node_modules and package-lock.json for a clean install**

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: No errors. If `npm install` fails due to Storybook 6.x peer dependency conflicts with Angular 19, use `npm install --force` — Storybook migration is deferred to a separate PR.

- [ ] **Step 2: If errors occur, resolve them**

Use the proven pattern:
1. Read the error to identify the conflicting package
2. `npm view <package> versions --json` to find compatible versions
3. `npm view <package>@<version> peerDependencies --json` to verify
4. Update `package.json` and re-run `npm install`

- [ ] **Step 3: Commit clean lock file**

```bash
git add package-lock.json
git commit -m "build(deps): clean npm install with resolved Angular 19 dependencies"
```

---

## Phase 2: Verification & Fixes

### Task 11: Verify ng serve works

**Files:** Potentially various `.ts` files if compilation errors

- [ ] **Step 1: Run the dev server**

```bash
npm start
```

Expected: Application compiles and serves without errors.

- [ ] **Step 2: Check for common Angular 19 issues**

If there are compilation errors, check for:
- **TypeScript 5.6 stricter checks** — new type errors from stricter unused import detection or iterator helpers
- **`standalone: true` removal side effects** — ensure no component accidentally lost its standalone status
- **ng-zorro-antd v19 API changes** — check [ng-zorro v19 changelog](https://github.com/NG-ZORRO/ng-zorro-antd/releases) for component API changes
- **`@angular/platform-browser-dynamic` removal** — if `ng update` removed it from `package.json`, verify `test.ts` doesn't import it. If it does, either add it back or update `test.ts`.
- **Builder configuration** — if `ng serve` fails with builder errors, verify `angular.json` still uses `@angular-builders/custom-webpack:browser` and `@angular-builders/custom-webpack:dev-server`

- [ ] **Step 3: Test in browser**

Open `http://localhost:4200` and verify:
- App loads without console errors
- Navigation works (sidebar, breadcrumbs)
- Board view renders with drag & drop
- Issue detail page with rich text editor (Quill v2)
- Settings page
- Search drawer
- Add issue modal with Quill editor
- Icons render correctly (NZ_JIRA_ICONS via forChild)

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve Angular 19 compilation issues"
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

Production builds are stricter (AOT compilation). Fix any errors that only appear during `ng build`. Common issues:
- Deprecated build options in `angular.json` that Angular 19 rejects
- Stricter template type checking

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve Angular 19 production build issues"
```

---

### Task 13: Run lint

**Files:** Various `.ts` files

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

- [ ] **Step 2: Fix any lint errors**

Common issues after the migration:
- Unused imports (from `standalone: true` removal)
- New @angular-eslint rules in v19
- @typescript-eslint v8 rule changes (stricter defaults, renamed rules)

If the eslint config itself is broken (not code issues, but config errors), update `.eslintrc.json`:
- Check if any `@typescript-eslint/*` rules were renamed in v8
- Check if any `@angular-eslint/*` rules were renamed in v19

- [ ] **Step 3: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve post-migration lint issues"
```

---

## Phase 3: PR

### Task 14: Push and Create PR

**Files:** None

- [ ] **Step 1: Push the branch**

```bash
git push origin trung/v20-migration-part-6
```

- [ ] **Step 2: Create PR**

```bash
gh pr create --title "build(deps): upgrade Angular 18 to Angular 19" --body "## Summary
- Upgrade Angular core packages to v19.2.x
- Upgrade TypeScript to ~5.6.2 (required by Angular 19)
- Upgrade zone.js to ~0.15.0 (required by Angular 19)
- Upgrade @angular-builders/custom-webpack to 19.0.1
- Upgrade @angular-eslint/* to 19.8.1 and @typescript-eslint/* to 8.x
- Upgrade @angular/cdk to 19.2.19
- Upgrade ng-zorro-antd to 19.3.1 and @ant-design/icons-angular to 19.0.0
- Upgrade ngx-quill to 27.x
- **Remove explicit \`standalone: true\`** from all components (now the default in Angular 19)

## Notes
- Storybook v6→v7 migration deferred to a separate PR
- Build system migration (esbuild) deferred — staying on webpack due to @angular-builders/custom-webpack dependency
- Signal-based inputs/outputs/queries are stable but migration deferred
- Zoneless change detection deferred (experimental)

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

1. **`ng update` may migrate the builder.** The Angular 19 `ng update` schematic may replace `@angular-devkit/build-angular:browser` with `@angular/build:application` in `angular.json`. This will BREAK the build because we use `@angular-builders/custom-webpack:browser` which depends on the webpack-based builder. Revert any builder changes immediately.

2. **`@angular-eslint` 19 + `typescript-eslint` 8 is the riskiest dep change.** typescript-eslint v8 is a major jump from v6 with potential rule renames and stricter defaults. The `.eslintrc.json` format should still work but rules may need updating.

3. **TypeScript 5.6 stricter checks.** TS 5.6 has stricter unused import detection and iterator protocol checks. May surface new type errors.

4. **zone.js 0.15.0.** Jump from 0.14.x. Verify async operations (HTTP calls, timers, Akita state management) still work correctly.

5. **ng-zorro-antd v19 breaking changes.** Check the [ng-zorro v19 changelog](https://github.com/NG-ZORRO/ng-zorro-antd/releases) for component API changes. The `NzIconModule.forRoot([])` and `NzIconModule.forChild()` patterns should still work.

6. **ngx-quill 27.** New major version for Angular 19. Still uses Quill v2. The `QuillModule.forRoot()` and `<quill-editor>` API should be compatible — verify in browser.

7. **`standalone: true` removal verification.** The `ng update` schematic should remove `standalone: true` from all 43 components automatically. Verify with `grep -r "standalone: true" src/`. If any were missed, remove manually.

8. **Storybook 6.x.** Will likely show more warnings with Angular 19 but should still work for basic component development. Do NOT attempt to upgrade Storybook in this PR.

9. **`@angular/platform-browser-dynamic`** is still in `package.json` but unused since `bootstrapApplication()`. The `ng update` schematic may remove it. This is expected — but verify `test.ts` doesn't break.

10. **`polyfills.ts` file.** Angular 19 continues to support the file-based approach. No forced migration.
