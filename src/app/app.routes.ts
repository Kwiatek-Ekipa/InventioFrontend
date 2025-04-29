import {Routes} from '@angular/router';
import {LoginComponent} from '@auth/pages/login/login.component';
import {RegisterComponent} from '@auth/pages/register/register.component';

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
