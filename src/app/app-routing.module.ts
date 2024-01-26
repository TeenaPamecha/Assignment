import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [ {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    }]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: "enabled",
    anchorScrolling: "enabled",
    scrollOffset: [0, 64]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
