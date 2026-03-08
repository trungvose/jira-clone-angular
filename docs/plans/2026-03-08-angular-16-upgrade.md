# Angular 16 Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade Jira Clone from Angular 15 to Angular 16, continuing the incremental migration path toward Angular 20.

**Architecture:** Follow the same proven pattern from Parts 1 & 2: upgrade Angular core first with `--force`, then resolve each dependency conflict one at a time, committing after each successful step. Angular 16 introduces a **zone.js version bump** (`~0.11.4` → `~0.13.0`) and requires **TypeScript >=4.9.3 <5.2** (current `~4.8.4` needs upgrading to `~5.0`).

**Tech Stack:** Angular 16, TypeScript ~5.0, zone.js ~0.13.0, ng-zorro-antd 16, Storybook 6.x (unchanged)

---

## Key Changes in Angular 16

Angular 16 is notable for:
- **Signals** (developer preview) - no migration needed yet
- **Required inputs** - no migration needed yet
- **TypeScript 5.0+ support** - requires upgrade from 4.8.4
- **zone.js 0.13.x** - requires upgrade from 0.11.4
- **Node.js 16+** - verify your CI/local Node version

## Dependency Version Map

| Package | Current (v15) | Target (v16) |
|---------|--------------|--------------|
| `@angular/core` (and all `@angular/*`) | `^15.2.10` | `^16.2.12` |
| `@angular/cli` | `^15.2.11` | `^16.2.14` |
| `@angular-devkit/build-angular` | `^15.2.11` | `^16.2.14` |
| `@angular/compiler-cli` | `^15.2.10` | `^16.2.12` |
| `@angular/cdk` | `^15.2.9` | `^16.2.14` |
| `@angular-builders/custom-webpack` | `^15.0.0` | `^16.0.0` |
| `@angular-eslint/*` | `15.2.1` | `16.3.1` |
| `@ant-design/icons-angular` | `^15.0.0` | `^16.0.0` |
| `ng-zorro-antd` | `^15.0.0` | `^16.2.2` |
| `ngx-quill` | `^16.1.2` | `^22.1.1` |
| `typescript` | `~4.8.4` | `~5.0.4` |
| `zone.js` | `~0.11.4` | `~0.13.0` |
| `@ngneat/content-loader` | `^6.0.0` | `^7.0.0` |
| `@sentry/angular` | `^9.30.0` | `^9.30.0` (no change needed, supports `>=14.x`) |
| `@datorama/akita` | `^7.1.1` | `^7.1.1` (no Angular peer dep) |
| `@ngneat/until-destroy` | `^8.0.3` | `^8.0.3` (supports `>=10.x`) |
| `@storybook/angular` | `^6.1.11` | `^6.1.11` (supports `>=6.0.0`, no change needed) |

---

### Task 1: Create a New Branch

**Files:** None

**Step 1: Create the branch**

```bash
cd /Users/trung.vo/Source/jira-clone-angular
git checkout master
git pull origin master
git checkout -b trung/v20-migration-part-3
```

**Step 2: Verify branch**

Run: `git branch --show-current`
Expected: `trung/v20-migration-part-3`

---

### Task 2: Run ng update for Angular 16

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Run ng update with --force**

The `@angular-eslint/schematics` will cause a peer dependency conflict (same as Parts 1 & 2). Use `--force` to proceed.

```bash
npx ng update @angular/core@16 @angular/cli@16 --force
```

Expected: Angular packages updated to v16. The `ng update` schematics may also auto-migrate some code (e.g., updating `angular.json`).

**Step 2: Verify Angular version in package.json**

Run: `grep '"@angular/core"' package.json`
Expected: `"@angular/core": "^16.2.12"` (or similar 16.x)

**Step 3: Commit**

```bash
git add -A
git commit -m "build(deps): ng update @angular/core@16 @angular/cli@16 --force"
```

---

### Task 3: Upgrade TypeScript to ~5.0

**Files:**
- Modify: `package.json` (line ~91)

Angular 16 requires TypeScript `>=4.9.3 <5.2`. The current version `~4.8.4` is below the minimum for some Angular 16 sub-versions. Upgrade to `~5.0.4` for best compatibility.

**Step 1: Update typescript version in package.json**

```diff
- "typescript": "~4.8.4"
+ "typescript": "~5.0.4"
```

**Step 2: Run npm install --force**

```bash
npm install --force
```

We use `--force` because not all dependencies are resolved yet.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade typescript to ~5.0.4 for Angular 16"
```

---

### Task 4: Upgrade zone.js to ~0.13.0

**Files:**
- Modify: `package.json` (line ~44)

Angular 16 requires `zone.js ~0.13.0` (currently `~0.11.4`).

**Step 1: Update zone.js version in package.json**

```diff
- "zone.js": "~0.11.4"
+ "zone.js": "~0.13.0"
```

**Step 2: Run npm install --force**

```bash
npm install --force
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade zone.js to ~0.13.0 for Angular 16"
```

---

### Task 5: Upgrade @angular-builders/custom-webpack

**Files:**
- Modify: `package.json` (line ~47)

**Step 1: Verify compatibility**

```bash
npm view @angular-builders/custom-webpack@16.0.0 peerDependencies --json
```

Expected: `"@angular/compiler-cli": "^16.0.0"`

**Step 2: Update version in package.json**

```diff
- "@angular-builders/custom-webpack": "^15.0.0"
+ "@angular-builders/custom-webpack": "^16.0.0"
```

**Step 3: Run npm install --force**

```bash
npm install --force
```

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular-builders/custom-webpack to 16.0.0"
```

---

### Task 6: Upgrade @angular-eslint/*

**Files:**
- Modify: `package.json` (lines ~49-53)

**Step 1: Update all @angular-eslint packages in package.json**

```diff
- "@angular-eslint/builder": "15.2.1",
- "@angular-eslint/eslint-plugin": "15.2.1",
- "@angular-eslint/eslint-plugin-template": "15.2.1",
- "@angular-eslint/schematics": "15.2.1",
- "@angular-eslint/template-parser": "15.2.1",
+ "@angular-eslint/builder": "16.3.1",
+ "@angular-eslint/eslint-plugin": "16.3.1",
+ "@angular-eslint/eslint-plugin-template": "16.3.1",
+ "@angular-eslint/schematics": "16.3.1",
+ "@angular-eslint/template-parser": "16.3.1",
```

**Step 2: Run npm install --force**

```bash
npm install --force
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular-eslint/* to 16.3.1"
```

---

### Task 7: Upgrade @angular/cdk

**Files:**
- Modify: `package.json` (line ~21)

**Step 1: Update version in package.json**

```diff
- "@angular/cdk": "^15.2.9"
+ "@angular/cdk": "^16.2.14"
```

**Step 2: Run npm install --force**

```bash
npm install --force
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular/cdk to 16.2.14"
```

---

### Task 8: Upgrade Ant Design Packages

**Files:**
- Modify: `package.json` (lines ~29, ~39)

**Step 1: Update @ant-design/icons-angular and ng-zorro-antd**

```diff
- "@ant-design/icons-angular": "^15.0.0"
+ "@ant-design/icons-angular": "^16.0.0"
```

```diff
- "ng-zorro-antd": "^15.0.0"
+ "ng-zorro-antd": "^16.2.2"
```

**Step 2: Run npm install --force**

```bash
npm install --force
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade ng-zorro-antd and @ant-design/icons-angular to v16"
```

---

### Task 9: Upgrade ngx-quill

**Files:**
- Modify: `package.json` (line ~40)

The current `ngx-quill@16.1.2` does NOT correspond to Angular 16 — ngx-quill uses its own versioning. Version `22.1.1` is the one that supports Angular 16.

**Step 1: Verify compatibility**

```bash
npm view ngx-quill@22.1.1 peerDependencies --json
```

Expected: `"@angular/core": "^16.0.0"`

**Step 2: Update version in package.json**

```diff
- "ngx-quill": "^16.1.2"
+ "ngx-quill": "^22.1.1"
```

**Step 3: Run npm install --force**

```bash
npm install --force
```

**Step 4: Check for breaking API changes**

ngx-quill 22 may have API changes. Search for quill usage:

```bash
grep -r "ngx-quill\|QuillModule\|quill-editor" src/ --include="*.ts" --include="*.html" -l
```

Review each file for deprecated APIs and update if needed.

**Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade ngx-quill to 22.1.1 for Angular 16"
```

---

### Task 10: Upgrade @ngneat/content-loader (if needed)

**Files:**
- Modify: `package.json` (line ~33)

**Step 1: Check if upgrade is actually needed**

The current `@ngneat/content-loader@6.0.0` has peer dep `@angular/core >= 13.0.0`, so it should still work. However, version `7.0.0` exists with the same broad peer dep. Consider upgrading for latest fixes.

```bash
npm view @ngneat/content-loader@7.0.0 peerDependencies --json
```

**Step 2: Update if desired**

```diff
- "@ngneat/content-loader": "^6.0.0"
+ "@ngneat/content-loader": "^7.0.0"
```

**Step 3: Run npm install**

```bash
npm install
```

If npm install runs without errors at this point, all dependencies should be resolved!

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @ngneat/content-loader to 7.0.0"
```

---

### Task 11: Verify npm install works cleanly

**Files:** None

**Step 1: Delete node_modules and package-lock.json for a clean install**

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: No errors. If there are peer dependency warnings, review them but they should not be blocking.

**Step 2: If errors occur, resolve them**

Use the proven pattern:
1. Read the error to identify the conflicting package
2. `npm view <package> versions --json` to find compatible versions
3. `npm view <package>@<version> peerDependencies --json` to verify
4. Update `package.json` and re-run `npm install`

**Step 3: Commit clean lock file**

```bash
git add package-lock.json
git commit -m "build(deps): clean npm install with resolved Angular 16 dependencies"
```

---

### Task 12: Verify ng serve works

**Files:** None

**Step 1: Run the dev server**

```bash
npm start
```

Expected: Application compiles and serves without errors.

**Step 2: If there are compilation errors**

- Fix TypeScript errors caused by stricter TS 5.0 checks
- Fix any Angular 16 deprecation warnings
- Fix any ng-zorro-antd API changes (v15 → v16)

**Step 3: Test the application**

Open `http://localhost:4200` in browser. Verify:
- App loads without console errors
- Navigation works
- Key features (board view, issue detail, drag & drop) function correctly

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve Angular 16 compilation issues"
```

---

### Task 13: Verify ng build works

**Files:** None

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds without errors (recall in Part 1, `ng serve` worked but `ng build` failed due to the `--sourceMap=true` flag).

**Step 2: Fix any build-only errors**

Production builds are stricter (AOT compilation). Fix any errors that only appear during `ng build`.

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve Angular 16 production build issues"
```

---

### Task 14: Push and Create PR

**Files:** None

**Step 1: Push the branch**

```bash
git push origin trung/v20-migration-part-3
```

**Step 2: Create PR**

```bash
gh pr create --title "build(deps): upgrade Angular 15 to Angular 16" --body "## Summary
- Upgrade Angular core packages to v16.2.12
- Upgrade TypeScript to ~5.0.4 (required by Angular 16)
- Upgrade zone.js to ~0.13.0 (required by Angular 16)
- Upgrade @angular-builders/custom-webpack to 16.0.0
- Upgrade @angular-eslint/* to 16.3.1
- Upgrade @angular/cdk to 16.2.14
- Upgrade ng-zorro-antd to 16.2.2 and @ant-design/icons-angular to 16.0.0
- Upgrade ngx-quill to 22.1.1

## Notes
- Angular 16 introduces Signals (developer preview) - no migration needed yet
- Standalone components migration deferred to Angular 17 step
- Control flow syntax migration deferred to Angular 17 step

## Test plan
- [ ] npm install runs without errors
- [ ] ng serve compiles successfully
- [ ] ng build (prod) compiles successfully
- [ ] App loads and core features work in browser
- [ ] Netlify preview deployment succeeds
"
```

**Step 3: Verify CI passes**

Wait for Netlify preview build. If it fails, check the build logs and fix.

---

## Potential Gotchas

1. **TypeScript 5.0 breaking changes**: TS 5.0 has some strict type-checking improvements. Watch for new type errors in existing code.

2. **zone.js 0.13.0**: This is a significant jump from 0.11.4. Verify async operations (HTTP calls, timers) still work correctly.

3. **ng-zorro-antd v16 breaking changes**: Check the [ng-zorro changelog](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CHANGELOG.md) for any component API changes between v15 and v16.

4. **ngx-quill major version jump** (16 → 22): This is the biggest risk. The quill editor integration may have API changes. Test the rich text editor thoroughly.

5. **Storybook 6.x**: Storybook 6 has broad Angular support (`>=6.0.0`) so it should still work, but test `npm run storybook` to be sure.

6. **@sentry/angular**: Already at 9.30.0 which supports Angular 14-20. No change needed.

7. **@datorama/akita**: Has no Angular peer dependency. No change needed.
