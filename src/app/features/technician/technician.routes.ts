import { Routes } from '@angular/router';
import {
  DashboardPageComponent,
  DevicesPageComponent,
  SettingsPageComponent,
  StocktakingPageComponent,
  UsersPageComponent,
} from './pages';

export default [
  {
    path: '',
    component: DashboardPageComponent,
  },
  {
    path: 'devices',
    component: DevicesPageComponent,
  },
  {
    path: 'users',
    component: UsersPageComponent,
  },
  {
    path: 'stocktaking',
    component: StocktakingPageComponent,
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
  },
] as Routes;
