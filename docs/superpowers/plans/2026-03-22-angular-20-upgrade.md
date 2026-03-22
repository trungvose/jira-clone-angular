# Angular 20 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Jira Clone from Angular 19 to Angular 20, migrate build to esbuild, upgrade TailwindCSS to v4, replace Karma with Vitest, migrate ESLint to flat config, and remove Storybook.

**Architecture:** Single branch (`trung/v20-migration-part-6`) with atomic commits per step. Seven phases executed sequentially: core upgrade, ecosystem deps, Storybook removal, build migration, test migration, ESLint migration, final verification.

**Tech Stack:** Angular 20, TypeScript ~5.8, zone.js ~0.15, ng-zorro-antd 20, ngx-quill 28, @angular/build (esbuild), TailwindCSS v4, Vitest, ESLint 9 flat config

**Spec:** `docs/superpowers/specs/2026-03-22-angular-20-upgrade-design.md`

---

## File Structure

**Files to create:**
- `vitest.config.ts` — Vitest configuration with Angular plugin
- `src/test-setup.ts` — Vitest test setup (replaces `src/test.ts`)
- `eslint.config.js` — ESLint flat config (replaces `.eslintrc.json`)

**Files to modify:**
- `package.json` — all dependency versions, scripts
- `angular.json` — builder migration, polyfills, build options
- `tsconfig.json` — update compiler options for Angular 20
- `tsconfig.app.json` — remove polyfills.ts reference, remove stories exclusion
- `tsconfig.spec.json` — rewrite for Vitest
- `src/styles.scss` — TailwindCSS v4 imports
- `src/main.ts` — verify bootstrap still works (no changes expected)
- `src/app/app.module.spec.ts` — remove (references deleted AppModule)

**Files to delete:**
- `webpack.config.js` — replaced by esbuild application builder
- `tailwind.config.js` — TailwindCSS v4 uses CSS-based config
- `karma.conf.js` — replaced by Vitest
- `src/polyfills.ts` — inlined in angular.json
- `src/test.ts` — replaced by `src/test-setup.ts`
- `.eslintrc.json` — replaced by `eslint.config.js`
- `.storybook/main.js`, `.storybook/preview.js`, `.storybook/tsconfig.json`, `.storybook/typings.d.ts`
- `src/app/jira-control/avatar/avatar.stories.ts`
- `src/app/jira-control/breadcrumbs/breadcrumbs.stories.ts`
- `src/app/jira-control/button/button.stories.ts`
- `src/app/jira-control/input/input.stories.ts`

---

### Task 1: Core Angular 20 Upgrade

**Files:**
- Modify: `package.json`
- Modify: `angular.json` (may be auto-modified by ng update — revert builder changes)
- Modify: `tsconfig.json` (may be auto-modified)

- [ ] **Step 1: Run ng update for Angular core**

```bash
npx ng update @angular/core@20 @angular/cli@20 --force
```

Expected: Updates `@angular/core`, `@angular/cli`, `@angular/compiler-cli`, `typescript` to v20/5.8 range. May also update `zone.js`.

- [ ] **Step 2: Verify angular.json builder was NOT changed**

Check that `angular.json` still uses `@angular-builders/custom-webpack:browser` and `@angular-builders/custom-webpack:dev-server`. If `ng update` changed them to `@angular/build:application`, revert those changes only. We handle the builder migration in Task 4.

- [ ] **Step 3: Run npm install to resolve dependencies**

```bash
npm install
```

Fix any peer dependency conflicts. Use `--force` if needed for Akita/ngneat packages.

- [ ] **Step 4: Verify the app compiles**

```bash
npx ng build --configuration=development 2>&1 | head -20
```

Expected: Build succeeds or shows only warnings (not errors). If TypeScript 5.8 surfaces new errors, fix them.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "build(deps): ng update @angular/core@20 @angular/cli@20 --force"
```

---

### Task 2: Upgrade @angular/cdk

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update CDK**

```bash
npx ng update @angular/cdk@20
```

If `ng update` fails, manually update in package.json and run `npm install`.

- [ ] **Step 2: Verify build**

```bash
npx ng build --configuration=development 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "build(deps): upgrade @angular/cdk to 20.x"
```

---

### Task 3: Upgrade Ecosystem Dependencies

**Files:**
- Modify: `package.json`

This task upgrades all third-party deps one at a time with a build check between each.

- [ ] **Step 1: Upgrade @angular-builders/custom-webpack to v20**

```bash
npm install -D @angular-builders/custom-webpack@20
```

Verify build: `npx ng build --configuration=development 2>&1 | head -20`

Commit:
```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @angular-builders/custom-webpack to 20.x"
```

- [ ] **Step 2: Upgrade @angular-eslint/* to v20**

```bash
npx ng update @angular-eslint/schematics@20
```

If that fails:
```bash
npm install -D @angular-eslint/builder@20 @angular-eslint/eslint-plugin@20 @angular-eslint/eslint-plugin-template@20 @angular-eslint/schematics@20 @angular-eslint/template-parser@20
```

Commit:
```bash
git add -A
git commit -m "build(deps): upgrade @angular-eslint/* to 20.x"
```

- [ ] **Step 3: Upgrade ng-zorro-antd to v20**

```bash
npx ng update ng-zorro-antd@20
```

This runs the ng-zorro v20 migration schematics automatically:
- Migrates `[nz-icon]` selector to `nz-icon` tag
- Migrates `@WithConfig` to standard decorator
- Renames watermark import path

Verify build after migration. Fix any issues the schematic missed.

Commit:
```bash
git add -A
git commit -m "build(deps): upgrade ng-zorro-antd to 20.x"
```

- [ ] **Step 4: Upgrade @ant-design/icons-angular to v20**

```bash
npm install @ant-design/icons-angular@20
```

Commit:
```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade @ant-design/icons-angular to 20.x"
```

- [ ] **Step 5: Upgrade ngx-quill to v28**

```bash
npm install ngx-quill@28
```

Verify build: `npx ng build --configuration=development 2>&1 | head -20`

Commit:
```bash
git add package.json package-lock.json
git commit -m "build(deps): upgrade ngx-quill to 28.x for Angular 20"
```

- [ ] **Step 6: Clean npm install**

```bash
rm -rf node_modules package-lock.json
npm install
```

If peer dep conflicts, use `npm install --force` and document which packages caused issues.

Verify build: `npx ng build --configuration=development 2>&1 | head -20`

Commit:
```bash
git add package.json package-lock.json
git commit -m "build(deps): clean npm install with resolved Angular 20 dependencies"
```

---

### Task 4: Remove Storybook

**Files:**
- Delete: `.storybook/main.js`, `.storybook/preview.js`, `.storybook/tsconfig.json`, `.storybook/typings.d.ts`
- Delete: `src/app/jira-control/avatar/avatar.stories.ts`
- Delete: `src/app/jira-control/breadcrumbs/breadcrumbs.stories.ts`
- Delete: `src/app/jira-control/button/button.stories.ts`
- Delete: `src/app/jira-control/input/input.stories.ts`
- Modify: `package.json` — remove deps and scripts
- Modify: `tsconfig.app.json` — remove `**/*.stories.*` exclusion

- [ ] **Step 1: Delete Storybook files**

```bash
rm -rf .storybook
rm src/app/jira-control/avatar/avatar.stories.ts
rm src/app/jira-control/breadcrumbs/breadcrumbs.stories.ts
rm src/app/jira-control/button/button.stories.ts
rm src/app/jira-control/input/input.stories.ts
```

- [ ] **Step 2: Remove Storybook dev dependencies from package.json**

Remove these from `devDependencies`:
- `@storybook/addon-actions`
- `@storybook/addon-essentials`
- `@storybook/addon-google-analytics`
- `@storybook/addon-links`
- `@storybook/angular`
- `babel-loader`
- `@babel/core`
- `react-is`
- `@compodoc/compodoc`

- [ ] **Step 3: Remove Storybook scripts from package.json**

Remove these from `scripts`:
- `storybook`
- `build-storybook`
- `docs:json`
- `docs:html`

- [ ] **Step 4: Remove stories exclusion from tsconfig.app.json**

Remove the `"**/*.stories.*"` entry from the `exclude` array in `tsconfig.app.json`. The file should become:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
```

Note: `src/polyfills.ts` reference will be removed in Task 5.

- [ ] **Step 5: Run npm install and verify build**

```bash
npm install
npx ng build --configuration=development 2>&1 | head -20
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove Storybook and related dependencies"
```

---

### Task 5: Build Migration (webpack -> esbuild + TailwindCSS v4)

**Files:**
- Modify: `angular.json` — change builders, update build options
- Modify: `package.json` — swap build deps, upgrade TailwindCSS
- Modify: `src/styles.scss` — TailwindCSS v4 imports
- Modify: `tsconfig.app.json` — remove polyfills.ts from files
- Delete: `webpack.config.js`
- Delete: `tailwind.config.js`
- Delete: `src/polyfills.ts`

- [ ] **Step 1: Install new build deps, remove old ones**

```bash
npm install -D @angular/build@20
npm install tailwindcss@4
npm uninstall @angular-builders/custom-webpack @angular-devkit/build-angular postcss-import postcss-loader postcss-scss @ngneat/tailwind autoprefixer 2>/dev/null; true
```

Note: `autoprefixer` may not be installed — the `2>/dev/null; true` handles that.

- [ ] **Step 2: Update angular.json build configuration**

Replace the build architect section. Key changes:
- Builder: `@angular-builders/custom-webpack:browser` -> `@angular/build:application`
- `main` -> `browser`
- `polyfills` file path -> array `["zone.js"]`
- Remove: `customWebpackConfig`, `aot`, `vendorChunk`, `buildOptimizer`, `namedChunks`, `extractLicenses` (defaults are fine with esbuild)
- Keep: `outputPath`, `index`, `tsConfig`, `assets`, `styles`, `scripts`, `budgets`, `fileReplacements`, `optimization`, `sourceMap`, `outputHashing`

The build section should become:

```json
{
  "builder": "@angular/build:application",
  "options": {
    "outputPath": "dist",
    "index": "src/index.html",
    "browser": "src/main.ts",
    "polyfills": ["zone.js"],
    "tsConfig": "tsconfig.app.json",
    "assets": [
      "src/assets",
      "src/data",
      {
        "glob": "_redirects",
        "input": "src",
        "output": "/"
      }
    ],
    "styles": [
      "./node_modules/quill/dist/quill.core.css",
      "./node_modules/quill/dist/quill.snow.css",
      "src/styles.scss"
    ],
    "scripts": [
      "./node_modules/quill/dist/quill.js"
    ]
  },
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ],
      "index": {
        "input": "src/index.prod.html",
        "output": "index.html"
      },
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "2mb",
          "maximumError": "5mb"
        },
        {
          "type": "anyComponentStyle",
          "maximumWarning": "6kb",
          "maximumError": "100kb"
        }
      ]
    },
    "development": {
      "optimization": false,
      "sourceMap": true
    }
  }
}
```

- [ ] **Step 3: Update angular.json serve and extract-i18n configuration**

Serve:
```json
{
  "builder": "@angular/build:dev-server",
  "options": {
    "buildTarget": "frontend:build:development"
  }
}
```

Extract-i18n:
```json
{
  "builder": "@angular/build:extract-i18n",
  "options": {
    "buildTarget": "frontend:build"
  }
}
```

- [ ] **Step 4: Update angular.json test configuration**

The test section currently uses `@angular-devkit/build-angular:karma`. Remove it entirely — it will be replaced by Vitest in Task 6. For now, either remove the test architect or leave it temporarily.

- [ ] **Step 5: Update TailwindCSS v4 imports in styles.scss**

Replace the TailwindCSS v3 directives with v4 import. The file becomes:

```scss
@import 'ng-zorro-antd/style/index.min.css';
@import 'ng-zorro-antd/tooltip/style/index.min.css';
@import 'ng-zorro-antd/spin/style/index.min.css';
@import 'ng-zorro-antd/modal/style/index.min.css';
@import 'ng-zorro-antd/dropdown/style/index.min.css';
@import 'ng-zorro-antd/select/style/index.min.css';
@import 'ng-zorro-antd/drawer/style/index.min.css';
@import 'ng-zorro-antd/notification/style/index.min.css';
@import 'ng-zorro-antd/popover/style/index.min.css';

@import 'tailwindcss';

@theme {
  --color-transparent: transparent;
  --color-black: #000;
  --color-white: #fff;

  --color-gray-100: #f7fafc;
  --color-gray-200: #edf2f7;
  --color-gray-300: #e2e8f0;
  --color-gray-400: #cbd5e0;
  --color-gray-500: #a0aec0;
  --color-gray-600: #718096;
  --color-gray-700: #4a5568;
  --color-gray-800: #2d3748;
  --color-gray-900: #1a202c;

  --color-red-100: #fff5f5;
  --color-red-200: #fed7d7;
  --color-red-300: #feb2b2;
  --color-red-400: #fc8181;
  --color-red-500: #f56565;
  --color-red-600: #e53e3e;
  --color-red-700: #c53030;
  --color-red-800: #9b2c2c;
  --color-red-900: #742a2a;

  --color-orange-100: #fffaf0;
  --color-orange-200: #feebc8;
  --color-orange-300: #fbd38d;
  --color-orange-400: #f6ad55;
  --color-orange-500: #ed8936;
  --color-orange-600: #dd6b20;
  --color-orange-700: #c05621;
  --color-orange-800: #9c4221;
  --color-orange-900: #7b341e;

  --color-yellow-100: #fffff0;
  --color-yellow-200: #fefcbf;
  --color-yellow-300: #faf089;
  --color-yellow-400: #f6e05e;
  --color-yellow-500: #ecc94b;
  --color-yellow-600: #d69e2e;
  --color-yellow-700: #b7791f;
  --color-yellow-800: #975a16;
  --color-yellow-900: #744210;

  --color-green-100: #f0fff4;
  --color-green-200: #c6f6d5;
  --color-green-300: #9ae6b4;
  --color-green-400: #68d391;
  --color-green-500: #48bb78;
  --color-green-600: #38a169;
  --color-green-700: #2f855a;
  --color-green-800: #276749;
  --color-green-900: #22543d;

  --color-teal-100: #e6fffa;
  --color-teal-200: #b2f5ea;
  --color-teal-300: #81e6d9;
  --color-teal-400: #4fd1c5;
  --color-teal-500: #38b2ac;
  --color-teal-600: #319795;
  --color-teal-700: #2c7a7b;
  --color-teal-800: #285e61;
  --color-teal-900: #234e52;

  --color-blue-100: #ebf8ff;
  --color-blue-200: #bee3f8;
  --color-blue-300: #90cdf4;
  --color-blue-400: #63b3ed;
  --color-blue-500: #4299e1;
  --color-blue-600: #3182ce;
  --color-blue-700: #2b6cb0;
  --color-blue-800: #2c5282;
  --color-blue-900: #2a4365;

  --color-indigo-100: #ebf4ff;
  --color-indigo-200: #c3dafe;
  --color-indigo-300: #a3bffa;
  --color-indigo-400: #7f9cf5;
  --color-indigo-500: #667eea;
  --color-indigo-600: #5a67d8;
  --color-indigo-700: #4c51bf;
  --color-indigo-800: #434190;
  --color-indigo-900: #3c366b;

  --color-primary: #0747A6;
  --color-tertiary: #e6e9f0;
  --color-textDarkest: #172b4d;
  --color-textDark: #42526E;
  --color-textMedium: #5E6C84;
  --color-textLight: #8993a4;
  --color-textLink: #0052cc;
  --color-textLogo: #DEEBFF;

  --color-backgroundDarkPrimary: #0747A6;
  --color-backgroundMedium: #dfe1e6;
  --color-backgroundLight: #ebecf0;
  --color-backgroundLightest: #F4F5F7;
  --color-backgroundLightPrimary: #D2E5FE;
  --color-backgroundLightSuccess: #E4FCEF;

  --color-borderLightest: #dfe1e6;
  --color-borderLight: #C1C7D0;
  --color-borderInputFocus: #4c9aff;

  --spacing-sidebar: 240px;
  --spacing-navbarLeft: 64px;
  --spacing-px: 1px;
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-1-25: 0.3125rem;
  --spacing-1-5: 0.375rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-7: 1.75rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;
  --spacing-40: 10rem;
  --spacing-48: 12rem;
  --spacing-56: 14rem;
  --spacing-64: 16rem;
  --spacing-72: 18rem;
  --spacing-80: 20rem;
  --spacing-88: 22rem;

  --font-sans: 'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

  --text-xs: 0.75rem;
  --text-13: 0.8125rem;
  --text-sm: 0.875rem;
  --text-15: 0.9375rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-btn: 14.5px;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 4rem;

  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-DEFAULT: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;

  --shadow-none: none;
  --shadow-sidebar: 1px 0 0 0 #e6e6e6;
  --shadow-outline-white: 0 0 0 2px #fff;

  --inset-0: 0;
  --inset-navbarLeft: 64px;
  --inset-sidebar: 230px;
  --inset-auto: auto;
}

.pre-bootstrapping-container {
  @apply w-full h-full relative;
  .pre-bootstrapping-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

Note: TailwindCSS v4 uses `@theme` blocks for customization instead of `tailwind.config.js`. All custom colors, spacing, fonts, etc. from the old config are migrated to CSS custom properties. The `purge`/`content` config is no longer needed — TailwindCSS v4 auto-detects content files. The `variants` config is also gone — all variants are enabled by default in v4.

- [ ] **Step 6: Delete old build files**

```bash
rm webpack.config.js
rm tailwind.config.js
rm src/polyfills.ts
```

- [ ] **Step 7: Update tsconfig.app.json**

Remove `src/polyfills.ts` from the `files` array:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
```

- [ ] **Step 8: Run npm install and verify build**

```bash
npm install
npx ng build --configuration=development 2>&1 | head -40
```

If there are esbuild-specific errors (e.g., CommonJS warnings for Quill), address them. Common fixes:
- Add `allowedCommonJsDependencies` to build options if Quill triggers CJS warnings
- Adjust `scripts` array paths if they changed

Also verify production build:
```bash
npx ng build --configuration=production 2>&1 | head -40
```

- [ ] **Step 9: Verify dev server works**

```bash
npx ng serve &
sleep 10
curl -s http://localhost:4200 | head -5
kill %1
```

Expected: HTML response from the dev server.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "build: migrate to @angular/build application builder and TailwindCSS v4"
```

---

### Task 6: Test Migration (Karma -> Vitest)

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test-setup.ts`
- Modify: `package.json` — swap test deps and scripts
- Modify: `tsconfig.spec.json` — rewrite for Vitest
- Delete: `karma.conf.js`
- Delete: `src/test.ts`
- Delete: `src/app/app.module.spec.ts` (references non-existent AppModule)
- Modify: `src/app/app.component.spec.ts` — replace `jasmine.createSpy` with `vi.fn()`
- Modify: all other `.spec.ts` files — replace Jasmine spy APIs with Vitest equivalents

- [ ] **Step 1: Install Vitest dependencies**

```bash
npm install -D vitest @analogjs/vitest-angular jsdom @analogjs/vite-plugin-angular
```

- [ ] **Step 2: Remove Karma dependencies**

```bash
npm uninstall karma karma-chrome-launcher karma-coverage karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter jasmine-core jasmine-spec-reporter @types/jasmine @types/jasminewd2 protractor
```

- [ ] **Step 3: Delete Karma files**

```bash
rm karma.conf.js
rm src/test.ts
```

- [ ] **Step 4: Create vitest.config.ts**

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    environment: 'jsdom',
    reporters: ['default'],
  },
});
```

- [ ] **Step 5: Create src/test-setup.ts**

```typescript
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
```

- [ ] **Step 6: Update tsconfig.spec.json**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "vitest/globals",
      "node"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

- [ ] **Step 7: Update package.json test scripts**

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test-cover": "vitest run --coverage"
}
```

- [ ] **Step 8: Delete app.module.spec.ts**

This file imports `AppModule` which was removed during the Angular 18 migration (fully standalone now):

```bash
rm src/app/app.module.spec.ts
```

- [ ] **Step 9: Update spec files — replace Jasmine spies with Vitest**

In all `.spec.ts` files, replace Jasmine spy patterns with Vitest equivalents:

| Jasmine | Vitest |
|---------|--------|
| `jasmine.createSpy('name')` | `vi.fn()` |
| `jasmine.createSpy('name').and.callThrough()` | `vi.fn()` |
| `jasmine.createSpy('name').and.returnValue(x)` | `vi.fn().mockReturnValue(x)` |
| `spy.calls.reset()` | `spy.mockReset()` |
| `spyOn(obj, 'method')` | `vi.spyOn(obj, 'method')` |

Example — `src/app/app.component.spec.ts` becomes:

```typescript
import { AppComponent } from '@trungk18/app.component';
import { NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  let component: AppComponent;

  const router: any = {
    events: {
      subscribe: vi.fn()
    }
  };
  const projectQuery: any = {};
  const changeDetectorRef: any = {
    detectChanges: vi.fn()
  };
  const projectService: any = {
    setLoading: vi.fn()
  };
  const googleAnalyticsService: any = {
    sendPageView: vi.fn()
  };

  beforeEach(() => {
    environment.production = true;
    component = new AppComponent(
      router,
      projectQuery,
      changeDetectorRef,
      projectService,
      googleAnalyticsService
    );
  });
  it('should be able to set Loading', () => {
    expect(router.events.subscribe).toHaveBeenCalled();
    expect(projectService.setLoading).toHaveBeenCalledWith(true);
  });
  it('should be able to make ng After View Init', () => {
    component.ngAfterViewInit();
    expect(changeDetectorRef.detectChanges).toHaveBeenCalled();
  });
  it('should be able to handle Google Analytics', () => {
    component.handleGoogleAnalytics(new NavigationEnd(1, '/', '/'));
    expect(googleAnalyticsService.sendPageView).toHaveBeenCalled();
  });
  it('should not be able to handle Google Analytics', () => {
    googleAnalyticsService.sendPageView.mockReset();
    component.handleGoogleAnalytics({});
    expect(googleAnalyticsService.sendPageView).not.toHaveBeenCalled();
  });
});
```

Apply similar transformations to all other spec files that use `jasmine.createSpy` or `.calls.reset()`. Files using only `describe`/`it`/`expect`/`beforeEach` (like `no-whitespace.validator.spec.ts`) need no changes — Vitest globals are compatible.

- [ ] **Step 10: Run tests**

```bash
npx vitest run
```

Expected: All tests pass. Fix any failures.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "test: migrate from Karma to Vitest"
```

---

### Task 7: ESLint Flat Config Migration

**Files:**
- Create: `eslint.config.js`
- Delete: `.eslintrc.json`
- Modify: `package.json` — remove deprecated lint deps

- [ ] **Step 1: Run angular-eslint migration schematic**

```bash
npx ng generate @angular-eslint/schematics:convert-tslint-to-eslint 2>/dev/null; true
```

Or if the project already has eslint (it does), try the flat config migration:

```bash
npx @eslint/migrate-config .eslintrc.json
```

If the automated migration doesn't work, manually create the flat config.

- [ ] **Step 2: Create eslint.config.js (manual fallback)**

If the schematic didn't produce a working flat config, create it manually:

```javascript
// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: '',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: '',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/no-output-on-prefix': 'off',
      '@angular-eslint/no-empty-lifecycle-method': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'objectLiteralProperty',
          format: null,
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['camelCase', 'PascalCase'],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'no-underscore-dangle': 'off',
      'radix': 'off',
      'max-len': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
    ],
    rules: {},
  },
);
```

- [ ] **Step 3: Delete old config**

```bash
rm .eslintrc.json
```

- [ ] **Step 4: Remove deprecated lint dependencies**

```bash
npm uninstall codelyzer tslint nz-tslint-rules
```

- [ ] **Step 5: Upgrade ESLint to v9 if not already**

```bash
npm install -D eslint@9
```

Also ensure `typescript-eslint` and `@eslint/js` are installed:

```bash
npm install -D @eslint/js typescript-eslint
```

- [ ] **Step 6: Update angular.json lint configuration if needed**

Check that the lint architect uses `@angular-eslint/builder:lint`. If it references eslintConfig, remove it (flat config is auto-detected).

- [ ] **Step 7: Run lint**

```bash
npx ng lint
```

Expected: No errors (or only pre-existing warnings). Fix any new issues caused by the ESLint 9 upgrade.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "build: migrate ESLint to flat config (ESLint 9)"
```

---

### Task 8: Final Verification and Cleanup

**Files:**
- Modify: `tsconfig.json` — clean up if needed
- Modify: `package.json` — verify no leftover unused deps

- [ ] **Step 1: Clean install**

```bash
rm -rf node_modules package-lock.json
npm install
```

- [ ] **Step 2: Production build**

```bash
npx ng build --configuration=production
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Run all tests**

```bash
npx vitest run
```

Expected: All tests pass.

- [ ] **Step 4: Run lint**

```bash
npx ng lint
```

Expected: No errors.

- [ ] **Step 5: Dev server smoke test**

```bash
npx ng serve &
sleep 15
curl -s http://localhost:4200 | head -10
kill %1
```

Expected: HTML output from the running application.

- [ ] **Step 6: Remove any leftover unused deps**

Check for deps that are no longer needed:
- `ts-node` — may not be needed without Karma
- `@angular/platform-browser-dynamic` — still needed for test setup (`platformBrowserDynamicTesting`)
- `husky` / `lint-staged` — keep if still wanted

- [ ] **Step 7: Final commit if any cleanup was needed**

```bash
git add -A
git commit -m "chore: final cleanup for Angular 20 migration"
```
