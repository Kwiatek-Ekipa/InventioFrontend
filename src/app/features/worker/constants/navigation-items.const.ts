import { MenuItem } from 'primeng/api';

export const workerNavigationItems: MenuItem[] = [
  {
    label: 'Pulpit',
    items: [{ label: 'Panel Główny', icon: 'pi pi-objects-column', routerLink: '' }],
  },
  {
    label: 'Zasoby',
    items: [{ label: 'Urządzenia', icon: 'pi pi-desktop', routerLink: 'devices' }],
  },
];
