import { Routes } from '@angular/router';
import { DashboardPageComponent, DevicesPageComponent, SettingsPageComponent } from '@features/worker/pages';

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
    path: 'settings',
    component: SettingsPageComponent,
  },
] as Routes;
