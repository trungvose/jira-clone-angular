import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationLayoutComponent } from './components/organization-layout/organization-layout.component';
import { OrganizationDashboardComponent } from './pages/organization-dashboard/organization-dashboard.component';
import { OrganizationDetailsComponent } from './pages/organization-details/organization-details.component';
import { TeamManagementComponent } from './pages/team-management/team-management.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationLayoutComponent,
    children: [
      {
        path: '',
        component: OrganizationDashboardComponent
      },
      {
        path: 'teams/:teamId',
        component: TeamManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }