import { MenuItem } from 'primeng/api';

export const workerNavigationItems: MenuItem[] = [
  {
    label: 'Pulpit',
    items: [
      {
        label: 'Panel Główny',
        icon: 'pi pi-objects-column',
        routerLink: '/worker',
        routerLinkActiveOptions: { exact: true },
      },
    ],
  },
  {
    label: 'Zasoby',
    items: [
      {
        label: 'Urządzenia',
        icon: 'pi pi-desktop',
        routerLink: '/worker/devices',
      },
    ],
  },
];
