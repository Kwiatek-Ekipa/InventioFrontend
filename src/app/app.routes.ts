import {Routes} from '@angular/router';
import {LoginComponent, RegisterComponent} from '@features/auth/pages';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: RegisterComponent
  }
];
