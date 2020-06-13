import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorksInProgressComponent } from './views/works-in-progress/works-in-progress.component';

const routes: Routes = [
  {
    path: '',
    component: WorksInProgressComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
