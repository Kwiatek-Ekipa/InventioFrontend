import { Routes } from '@angular/router';
import { LoginPageComponent, RegisterPageComponent } from '@features/auth/pages';
import { inject } from '@angular/core';
import { AuthService } from '@core/services';
import { HomePageComponent as WorkerHomePageComponent } from '@features/worker/pages/home-page/home-page.component';
import { HomePageComponent as TechnicianHomePageComponent } from '@features/technician/pages/home-page/home-page.component';
import { AuthGuard, LoginGuard, RoleGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WorkerHomePageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'worker',
    component: WorkerHomePageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'technician',
    component: TechnicianHomePageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'sign-in',
    component: LoginPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'sign-up',
    component: RegisterPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    redirectTo: (): string => {
      const isLoggedIn = inject(AuthService).isLoggedIn$.getValue();

      return isLoggedIn ? '' : 'sign-in';
    },
  },
];
