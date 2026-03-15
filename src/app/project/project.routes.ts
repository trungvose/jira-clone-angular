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
