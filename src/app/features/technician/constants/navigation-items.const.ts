import { MenuItem } from 'primeng/api';

export const technicianNavigationItems: MenuItem[] = [
  {
    label: 'Pulpit',
    items: [
      {
        label: 'Panel Główny',
        icon: 'pi pi-objects-column',
        routerLink: '/technician',
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
        routerLink: '/technician/hardware',
      },
      {
        label: 'Użytkownicy',
        icon: 'pi pi-users',
        routerLink: '/technician/users',
      },
      {
        label: 'Inwentaryzacja',
        icon: 'pi pi-warehouse',
        routerLink: '/technician/stocktaking',
      },
    ],
  },
];
