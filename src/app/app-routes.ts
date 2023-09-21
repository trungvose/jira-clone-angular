import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'project',
    loadChildren: () => import('./project/project-routes').then((m) => m.PROJECT_ROUTES)
  },
  {
    path: 'wip',
    loadChildren: () =>
      import('./work-in-progress/work-in-progress.module').then((m) => m.WorkInProgressModule)
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  }
];
