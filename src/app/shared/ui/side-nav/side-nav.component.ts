import { Component, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Avatar } from 'primeng/avatar';

import { UserInfoInterface } from '@core/interfaces';

@Component({
  selector: 'ui-side-nav [navigationItems] [userInfo]',
  imports: [Menu, Avatar, RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent implements OnInit {
  public navigationItems: InputSignal<MenuItem[]> = input<MenuItem[]>([]);
  public userInfo: InputSignal<UserInfoInterface | null> = input<UserInfoInterface | null>(null);
  public userAccountMenuItems: MenuItem[] = [];
  public logout: OutputEmitterRef<void> = output();

  public ngOnInit(): void {
    this.userAccountMenuItems = [
      {
        label: 'Konto użytkownika',
        items: [
          { label: 'Ustawienia', icon: 'pi pi-cog', routerLink: 'settings' },
          { label: 'Wyloguj', icon: 'pi pi-sign-out', command: (): void => this.logout.emit() },
        ],
      },
      { separator: true },
    ];
  }

  public userInitials(): string {
    const user = this.userInfo();

    if (!user) return '';

    return user.name.charAt(0) + user.surname.charAt(0);
  }

  public getMenuItemsWithSeparator(): MenuItem[] {
    return [{ separator: true }, ...this.navigationItems()];
  }
}
