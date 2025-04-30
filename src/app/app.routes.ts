import { Routes } from '@angular/router';
import { LoginPageComponent, RegisterPageComponent } from '@features/auth/pages';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: LoginPageComponent,
  },
  {
    path: 'sign-up',
    component: RegisterPageComponent,
  },
];
