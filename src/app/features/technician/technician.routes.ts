import { Routes } from '@angular/router';
import { DevicesPageComponent } from '@features/technician/pages/devices-page/devices-page.component';
import { DashboardPageComponent } from '@features/technician/pages/dashboard-page/dashboard-page.component';

export default [
  {
    path: '',
    component: DashboardPageComponent,
  },
  {
    path: 'devices',
    component: DevicesPageComponent,
  },
] as Routes;
