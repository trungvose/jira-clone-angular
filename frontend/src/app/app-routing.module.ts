import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JiraRoutingConst } from './core/utils/jira-routing.const';

const routes: Routes = [
  {
    path: JiraRoutingConst.Projects,
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule)
  },
  {
    path: JiraRoutingConst.Login,
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: JiraRoutingConst.SignUp,
    loadChildren: () => import('./signup/signup.module').then((m) => m.SignUpModule)
  },
  {
    path: '',
    redirectTo: JiraRoutingConst.Login,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
