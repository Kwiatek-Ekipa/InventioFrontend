import { Routes } from '@angular/router';
import { LoginPageComponent, RegisterPageComponent } from '@features/auth/pages';
import { inject } from '@angular/core';
import { AuthService } from '@core/services';
import { AuthGuard, LoginGuard, RoleGuard } from '@core/guards';
import { UserLayoutComponent } from '@shared/layouts/user-layout/user-layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'worker',
    component: UserLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () => import('@features/worker/worker.routes'),
  },
  {
    path: 'technician',
    component: UserLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () => import('@features/technician/technician.routes'),
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
