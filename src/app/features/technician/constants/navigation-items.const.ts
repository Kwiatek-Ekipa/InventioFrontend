import { MenuItem } from 'primeng/api';

export const technicianNavigationItems: MenuItem[] = [
  {
    label: 'Pulpit',
    items: [{ label: 'Dashboard', icon: 'pi pi-objects-column', routerLink: '' }],
  },
  {
    label: 'Zasoby',
    items: [
      { label: 'Urządzenia', icon: 'pi pi-desktop', routerLink: 'devices' },
      { label: 'Użytkownicy', icon: 'pi pi-users', routerLink: 'users' },
      { label: 'Inwentaryzacja', icon: 'pi pi-warehouse', routerLink: 'stocktaking' },
    ],
  },
];
