import { Routes } from '@angular/router';
import { LoginPageComponent, RegisterPageComponent } from '@features/auth/pages';
import { inject } from '@angular/core';
import { AuthService } from '@core/services';
import { HomePageComponent as WorkerHomePageComponent } from '@features/worker/pages/home-page/home-page.component';
import { HomePageComponent as TechnicianHomePageComponent } from '@features/technician/pages/home-page/home-page.component';
import { UserLayoutComponent } from '@shared/layouts/user-layout/user-layout.component';
import { AuthGuard, LoginGuard, RoleGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: WorkerHomePageComponent,
        canActivate: [RoleGuard],
      },
      {
        path: 'worker',
        component: WorkerHomePageComponent,
        canActivate: [RoleGuard],
      },
      {
        path: 'technician',
        component: TechnicianHomePageComponent,
        canActivate: [RoleGuard],
      },
    ],
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
