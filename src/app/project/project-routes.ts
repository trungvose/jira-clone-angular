import { Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { ProjectComponent } from './project.component';
import { ProjectConst } from './config/const';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: 'board',
        component: BoardComponent
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then((m) => m.SettingsComponent)
      },
      {
        path: `issue/:${ProjectConst.IssueId}`,
        loadComponent: () =>
          import('./pages/full-issue-detail/full-issue-detail.component').then(
            (m) => m.FullIssueDetailComponent
          )
      },
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full'
      }
    ]
  }
];
