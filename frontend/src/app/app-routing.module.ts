import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorksInProgressComponent } from './views/pages/works-in-progress/works-in-progress.component';
import { ProjectComponent } from './views/pages/project/project.component';

const routes: Routes = [
  {
    path:"",
    component: ProjectComponent,
    children: [

    ]
  },
  {
    path: 'wip',
    component: WorksInProgressComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
