import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorksInProgressComponent } from './views/pages/works-in-progress/works-in-progress.component';
import { ProjectComponent } from './views/pages/project/project.component';
import { BoardComponent } from './views/pages/board/board.component';
import { SettingsComponent } from './views/pages/settings/settings.component';

const routes: Routes = [
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: BoardComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  },
  {
    path: 'wip',
    component: WorksInProgressComponent
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
