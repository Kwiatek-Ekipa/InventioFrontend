import { Routes } from '@angular/router';
import {
  DashboardPageComponent,
  HardwarePageComponent,
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
    path: 'hardware',
    component: HardwarePageComponent,
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
