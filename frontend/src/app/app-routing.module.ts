import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { UnAuthenticatedGuard } from './core/guards/unauthenticated.guard';
import { JiraRoutingConst } from './core/utils/jira-routing.const';

const routes: Routes = [
  {
    path: JiraRoutingConst.Projects,
    canActivate: [AuthenticatedGuard],
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule)
  },
  {
    path: JiraRoutingConst.Login,
    canActivate: [UnAuthenticatedGuard],
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: JiraRoutingConst.SignUp,
    canActivate: [UnAuthenticatedGuard],
    loadChildren: () => import('./signup/signup.module').then((m) => m.SignUpModule)
  },
  {
    path: '',
    redirectTo: JiraRoutingConst.Projects,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
