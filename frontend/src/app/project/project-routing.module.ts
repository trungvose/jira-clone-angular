import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectConst } from './config/const';
import { BoardComponent } from './pages/board/board.component';
import { FullIssueDetailComponent } from './pages/full-issue-detail/full-issue-detail.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: "",
    component: ProjectComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
