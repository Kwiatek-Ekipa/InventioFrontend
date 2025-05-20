import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Avatar } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';

import { UserInfoInterface } from '@core/interfaces';

const userAccountMenuItems: MenuItem[] = [
  {
    label: 'Konto użytkownika',
    items: [
      { label: 'Ustawienia', icon: 'pi pi-cog', routerLink: 'settings' },
      { label: 'Wyloguj', icon: 'pi pi-sign-out', id: 'logout' },
    ],
  },
  { separator: true },
];

@Component({
  selector: 'ui-side-nav [navigationItems]',
  imports: [Menu, Avatar, RouterLink, Ripple, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  public navigationItems: InputSignal<MenuItem[]> = input<MenuItem[]>([]);
  public userInfo: InputSignal<UserInfoInterface | null> = input<UserInfoInterface | null>(null);
  public userAccountMenuItems: MenuItem[] = userAccountMenuItems;
  public logout: OutputEmitterRef<void> = output();

  public userInitials(): string {
    const user = this.userInfo();

    if (!user) return '';

    return user.name.charAt(0) + user.surname.charAt(0);
  }

  public onMenuItemClick(item: MenuItem): void {
    switch (item.id) {
      case 'logout':
        this.logout.emit();
        break;
    }
  }

  public getMenuItemsWithSeparator(): MenuItem[] {
    return [{ separator: true }, ...this.navigationItems()];
  }
}
